const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');

async function loadAlgorithms() {
  const source = await fs.readFile(path.join(__dirname, '..', 'public', 'algorithms.js'), 'utf8');
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
  return import(moduleUrl);
}

function randomIntegerGenerator(seed) {
  let value = seed >>> 0;
  return (minimum, maximum) => {
    value = (1664525 * value + 1013904223) >>> 0;
    return minimum + (value % (maximum - minimum + 1));
  };
}

function buildSortCases() {
  const cases = [
    { label: 'ordinary unsorted values', values: [29, 12, 48, 7, 33] },
    { label: 'duplicates', values: [5, 2, 5, 2, 5, 2] },
    { label: 'negative integers', values: [-8, -1, -5, 3, 0, -8] },
    { label: 'already sorted', values: [-3, 0, 2, 10] },
    { label: 'reverse sorted', values: [9, 7, 5, 3, 1] },
    { label: 'two elements', values: [2, -4] },
    { label: 'single element', values: [7] },
    { label: 'empty array', values: [] },
    { label: 'largest supported 24-element array', values: Array.from({ length: 24 }, (_, index) => 24 - index) },
  ];
  const randomInteger = randomIntegerGenerator(20261026);
  for (let index = 0; index < 120; index += 1) {
    const length = randomInteger(1, 24);
    const values = Array.from({ length }, () => randomInteger(-40, 40));
    cases.push({ label: `seeded randomized input ${index + 1}`, values });
  }
  return cases;
}

function assertTraceSnapshots(trace, algorithm, label) {
  let previousCounts = { comparisons: 0, swaps: 0, shifts: 0, writes: 0 };
  let previousArray = trace.initialArray.slice();
  for (const [eventIndex, event] of trace.events.entries()) {
    assert.equal(event.array.length, trace.initialArray.length, `${algorithm}: ${label}, event ${eventIndex} has complete array snapshot`);
    assert.equal(event.tokens.length, event.array.length, `${algorithm}: ${label}, event ${eventIndex} has complete item identities`);
    assert.equal(new Set(event.tokens).size, event.tokens.length, `${algorithm}: ${label}, event ${eventIndex} has distinct visual identities`);
    const expectedCounts = { ...previousCounts };
    if (event.type === 'compare') expectedCounts.comparisons += 1;
    if (event.type === 'swap') expectedCounts.swaps += 1;
    if (event.type === 'shift') expectedCounts.shifts += 1;
    if (event.type === 'write') expectedCounts.writes += 1;
    assert.deepEqual(event.counts, expectedCounts, `${algorithm}: ${label}, event ${eventIndex} counter totals match its operation`);
    previousCounts = event.counts;
    for (const index of event.indices ?? []) assert.ok(Number.isInteger(index) && index >= 0 && index < event.array.length, `${algorithm}: ${label}, event ${eventIndex} index ${index} is valid`);
    if (event.type === 'swap') {
      const replayed = previousArray.slice();
      const [left, right] = event.indices;
      [replayed[left], replayed[right]] = [replayed[right], replayed[left]];
      assert.deepEqual(event.array, replayed, `${algorithm}: ${label}, event ${eventIndex} swap snapshot replays correctly`);
    }
    if (event.type === 'write') {
      const changed = event.array.flatMap((value, index) => value === previousArray[index] ? [] : [index]);
      assert.ok(changed.length <= 1 && (changed.length === 0 || changed[0] === event.indices[0]), `${algorithm}: ${label}, event ${eventIndex} changes only its destination`);
      assert.equal(event.array[event.indices[0]], event.values[0], `${algorithm}: ${label}, event ${eventIndex} writes its recorded value`);
    }
    previousArray = event.array;
  }
  assert.deepEqual(trace.totals, previousCounts, `${algorithm}: ${label} final counters match the trace`);
}

function testSorts(generateTrace, sortCases) {
  const algorithms = ['bubble', 'selection', 'insertion', 'merge', 'quick'];
  let traces = 0;
  for (const algorithm of algorithms) {
    for (const { label, values } of sortCases) {
      const original = values.slice();
      const trace = generateTrace(algorithm, values);
      const expected = values.slice().sort((left, right) => left - right);
      assert.deepEqual(trace.finalArray, expected, `${algorithm}: ${label} sorts ascending`);
      assert.deepEqual(values, original, `${algorithm}: ${label} does not mutate its input`);
      assert.equal(trace.events.at(-1)?.type, 'finish', `${algorithm}: ${label} ends with finish`);
      assert.deepEqual(trace.events.at(-1).sortedIndices, values.map((_, index) => index), `${algorithm}: ${label} marks all final positions sorted`);
      assertTraceSnapshots(trace, algorithm, label);
      assert.equal(trace.events.filter((event) => event.type === 'swap').length, trace.totals.swaps, `${algorithm}: ${label} swap metric equals swap operations`);
      assert.equal(trace.events.filter((event) => event.type === 'write').length, trace.totals.writes, `${algorithm}: ${label} write metric equals write operations`);
      if (algorithm === 'merge') {
        assert.equal(trace.totals.swaps, 0, `${label}: Merge Sort does not count writes as swaps`);
        assert.equal(trace.totals.writes, values.length === 0 ? 0 : trace.events.filter((event) => event.type === 'write').length, `${label}: Merge Sort writes are reported separately`);
        assert.ok(trace.events.some((event) => event.type === 'divide') || values.length < 2, `${label}: Merge Sort records range division`);
        assert.ok(trace.events.some((event) => event.type === 'merge') || values.length < 2, `${label}: Merge Sort records merges`);
      }
      if (algorithm === 'quick') {
        assert.ok(trace.events.some((event) => event.type === 'pivot') || values.length < 2, `${label}: Quick Sort identifies pivots`);
        assert.ok(trace.events.some((event) => event.type === 'partition') || values.length === 0, `${label}: Quick Sort records partitions`);
      }
      if (algorithm === 'selection') {
        for (const event of trace.events.filter((item) => item.type === 'compare')) {
          assert.equal(event.indices.length, 2, `${label}: Selection comparison reports two positions`);
          assert.notEqual(event.indices[0], event.indices[1], `${label}: Selection comparison positions differ`);
          assert.deepEqual(event.indices.map((index) => event.array[index]), event.values, `${label}: Selection indices match compared values`);
        }
      }
      traces += 1;
    }
  }
  assert.match(generateTrace('bubble', []).events.at(-1).explanation, /array is empty/i);
  assert.match(generateTrace('bubble', [7]).events.at(-1).explanation, /single value/i);
  return traces;
}

function testSearches(generateTrace) {
  const cases = [
    { label: 'beginning', array: [-5, -1, 2, 8, 13], target: -5, expected: 0 },
    { label: 'middle', array: [-5, -1, 2, 8, 13], target: 2, expected: 2 },
    { label: 'end', array: [-5, -1, 2, 8, 13], target: 13, expected: 4 },
    { label: 'absent above', array: [-5, -1, 2, 8, 13], target: 99, expected: -1 },
    { label: 'absent between', array: [-5, -1, 2, 8, 13], target: 3, expected: -1 },
    { label: 'duplicate first occurrence', array: [-3, 2, 2, 2, 9], target: 2, expected: 1 },
    { label: 'negative target', array: [-10, -4, -1, 6], target: -4, expected: 1 },
    { label: 'single-element match', array: [-7], target: -7, expected: 0 },
    { label: 'single-element miss', array: [-7], target: 0, expected: -1 },
    { label: 'empty array', array: [], target: 0, expected: -1 },
  ];
  let runs = 0;
  for (const algorithm of ['linear', 'binary']) {
    for (const { label, array, target, expected } of cases) {
      const input = algorithm === 'binary' ? array.slice() : (label === 'beginning' ? [array[0], ...array.slice(1)] : array.slice());
      if (algorithm === 'binary') input.sort((left, right) => left - right);
      const before = input.slice();
      const trace = generateTrace(algorithm, input, { target });
      assert.equal(trace.resultIndex, expected, `${algorithm}: ${label} returns expected index`);
      assert.deepEqual(trace.finalArray, before, `${algorithm}: ${label} leaves the input unchanged`);
      assert.deepEqual(input, before, `${algorithm}: ${label} does not mutate caller input`);
      assert.equal(trace.totals.comparisons, trace.events.filter((event) => event.type === 'compare').length, `${algorithm}: ${label} comparison count matches probes`);
      assert.equal(trace.totals.swaps, 0, `${algorithm}: ${label} has no swaps`);
      assert.equal(trace.totals.writes, 0, `${algorithm}: ${label} has no array writes`);
      assert.equal(trace.events.at(-1).type, expected >= 0 ? 'found' : 'notfound', `${algorithm}: ${label} ends with an explicit result`);
      assertTraceSnapshots(trace, algorithm, label);
      if (algorithm === 'linear' && expected >= 0) assert.equal(trace.totals.comparisons, expected + 1, `${label}: Linear Search stops at the first match`);
      if (algorithm === 'binary' && expected >= 0) assert.equal(trace.resultIndex, expected, `${label}: Binary Search returns the first duplicate`);
      for (const event of trace.events.filter((item) => item.type === 'compare')) {
        assert.equal(event.values[1], target, `${algorithm}: ${label} probe records the target`);
        if (algorithm === 'binary') assert.ok(event.mid >= event.low && event.mid <= event.high, `${label}: midpoint is inside the active interval`);
      }
      runs += 1;
    }
  }
  const unsortedLinear = generateTrace('linear', [8, -4, 11, 2], { target: 2 });
  assert.equal(unsortedLinear.resultIndex, 3, 'Linear Search finds a target in an unsorted array');
  assert.equal(unsortedLinear.totals.comparisons, 4, 'Linear Search checks each preceding value exactly once');
  assert.equal(unsortedLinear.events.at(-1).roles[0], 'checked', 'Linear Search keeps previous values marked checked at the result');
  assert.equal(unsortedLinear.events.at(-1).roles[3], 'found', 'Linear Search highlights the matching value at the result');
  assert.throws(() => generateTrace('binary', [4, 1, 3], { target: 3 }), /requires an ascending sorted array/i, 'Binary Search rejects unsorted input');
  assert.throws(() => generateTrace('linear', [1], { target: 1.5 }), /target must be an integer/i, 'Search targets must be integers');
  return runs;
}

async function main() {
  const { generateTrace, listAlgorithms } = await loadAlgorithms();
  const ids = listAlgorithms().map((algorithm) => algorithm.id);
  assert.deepEqual(ids, ['bubble', 'selection', 'insertion', 'merge', 'quick', 'linear', 'binary'], 'All seven algorithms are registered in the intended order');
  const sortCases = buildSortCases();
  const sortTraces = testSorts(generateTrace, sortCases);
  const searchRuns = testSearches(generateTrace);
  for (const [algorithm, array, label] of [['bubble', [1, 1.5], 'sort input'], ['merge', [NaN], 'sort input']]) {
    assert.throws(() => generateTrace(algorithm, array), /only integers/i, `${label} rejects non-integer values`);
  }
  console.log(`PASS ${sortTraces} sorting traces (${sortCases.length} cases × 5 algorithms), ${searchRuns} search runs, counters, event snapshots, first-match behavior, Binary Search sorted-input guard, and target/input validation.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
