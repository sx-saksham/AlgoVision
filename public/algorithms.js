const ALL_COMPLEXITIES = {
  best: 'O(n)',
  average: 'O(n²)',
  worst: 'O(n²)',
  space: 'O(1)',
};

const algorithms = {
  bubble: {
    id: 'bubble',
    name: 'Bubble sort',
    shortName: 'BUBBLE SORT',
    description: 'Repeatedly compare neighbors and swap a pair when it is out of order. One large value can travel to the end in each pass.',
    coreIdea: 'Repeatedly compare neighboring values. If the left value is larger, swap the pair. Each full pass carries the largest remaining value to its final position.',
    complexity: ALL_COMPLEXITIES,
    complexityNote: 'A pass with no swaps stops early; otherwise, each pass compares the remaining pairs.',
    steps: [
      'Start at the left edge of the unsorted section.',
      'Compare adjacent values; a comparison does not change the array.',
      'Swap only when the left value is greater.',
      'At the end of a pass, the largest remaining value is in place.',
      'Stop early when a pass contains no swaps.',
    ],
    pseudocode: [
      'for end ← n − 1 down to 1',
      '    swapped ← false',
      '    for j ← 0 to end − 1',
      '        compare A[j] and A[j + 1]',
      '        if A[j] > A[j + 1], swap them',
      '            swapped ← true',
      '    mark A[end] as sorted',
      '    if not swapped: break',
      'mark the entire array as sorted',
    ],
    run: bubbleSort,
  },
  selection: {
    id: 'selection',
    name: 'Selection sort',
    shortName: 'SELECTION SORT',
    description: 'Scan the unsorted section for its smallest value, then place that value at the front of the section.',
    coreIdea: 'Keep a sorted prefix and an unsorted suffix. Find the smallest value in the suffix, then exchange it into the next open position.',
    complexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    complexityNote: 'Each pass scans the remaining values; extra space remains constant.',
    steps: [
      'Mark the first unsorted position as the current minimum.',
      'Scan the rest of the unsorted section one value at a time.',
      'Keep the index of the smallest value seen so far.',
      'Place the minimum at the front of the unsorted section.',
      'Grow the sorted prefix by one position.',
    ],
    pseudocode: [
      'for start ← 0 to n − 2',
      '    minimum ← start',
      '    for j ← start + 1 to n − 1',
      '        compare A[j] with A[minimum]',
      '        if A[j] < A[minimum]: minimum ← j',
      '    if minimum ≠ start: swap them',
      '    mark A[start] as sorted',
      'mark the entire array as sorted',
    ],
    run: selectionSort,
  },
  insertion: {
    id: 'insertion',
    name: 'Insertion sort',
    shortName: 'INSERTION SORT',
    description: 'Grow a sorted section from left to right. Hold one value as a key, shift larger values right, and insert the key into the opening.',
    coreIdea: 'Treat the left side as an ordered hand of cards. Hold the next key aside, shift larger items right to make room, then insert the key into the gap.',
    complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    complexityNote: 'Sorted input needs few shifts; reverse order needs many. Extra space remains constant.',
    steps: [
      'Treat the first value as an already-sorted section.',
      'Lift the next value out as the key.',
      'Compare the key with values immediately to its left.',
      'Shift every larger value one place to the right.',
      'Insert the key into the opening and extend the sorted section.',
    ],
    pseudocode: [
      'for i ← 1 to n − 1',
      '    key ← A[i]',
      '    j ← i − 1',
      '    while j ≥ 0 and A[j] > key',
      '        A[j + 1] ← A[j]   // shift',
      '        j ← j − 1',
      '    A[j + 1] ← key       // insert',
      '    mark A[0 … i] as sorted',
      'mark the entire array as sorted',
    ],
    run: insertionSort,
  },
  merge: {
    id: 'merge', name: 'Merge sort', shortName: 'MERGE SORT',
    description: 'Divide the array into smaller sections, then merge ordered sections back together.',
    coreIdea: 'Recursively split the array until each section has one value, then merge neighboring ordered sections by repeatedly writing the smaller front value.',
    complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
    complexityNote: 'Every level compares and writes n values; temporary merge buffers use linear auxiliary space.',
    steps: ['Split the current range into left and right halves.', 'Continue splitting until each range has one value.', 'Compare the front values of the two ordered halves.', 'Write the smaller value into the next output position.', 'Copy any remaining values, then continue merging upward.'],
    pseudocode: ['mergeSort(A, low, high)', '    if low >= high: return', '    mid ← floor((low + high) / 2)', '    mergeSort(A, low, mid)', '    mergeSort(A, mid + 1, high)', '    merge the two ordered halves', '    i ← low; j ← mid + 1; k ← low', '    while i ≤ mid and j ≤ high', '        write the smaller front value to A[k]', '    copy any remaining values to A[k]', 'mergeSort(A, 0, n − 1)'],
    run: mergeSort,
  },
  quick: {
    id: 'quick', name: 'Quick sort', shortName: 'QUICK SORT',
    description: 'Partition each range around a pivot, then sort the smaller ranges on either side.',
    coreIdea: 'Choose the last value as pivot, move values no greater than it to the left, place the pivot at its final index, then recurse on both sides.',
    complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(log n) avg' },
    complexityNote: 'Average recursion depth is O(log n) for balanced partitions; worst-case recursion depth is O(n).',
    steps: ['Choose a pivot from the current range.', 'Compare each remaining value with the pivot.', 'Move values no greater than the pivot into the left partition.', 'Place the pivot between the two partitions.', 'Recursively process the left and right ranges.'],
    pseudocode: ['quickSort(A, low, high)', '    if low >= high: return', '    pivot ← A[high]', '    boundary ← low', '    for j ← low to high − 1', '        compare A[j] with pivot', '        if A[j] ≤ pivot: swap A[j], A[boundary]', '            boundary ← boundary + 1', '    swap A[boundary], A[high]', '    quickSort(A, low, boundary − 1)', '    quickSort(A, boundary + 1, high)'],
    run: quickSort,
  },
  linear: {
    id: 'linear', name: 'Linear search', shortName: 'LINEAR SEARCH',
    description: 'Check each value from left to right until the target is found or the array ends.',
    coreIdea: 'Inspect each element in order. Stop at the first match; if no element matches, report that the target is absent.',
    complexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)' },
    complexityNote: 'The first value may match immediately; in the worst case every value is checked.',
    steps: ['Start at index 0; the array does not need to be sorted.', 'Compare the current value with the target.', 'If they match, return this first matching index.', 'Otherwise mark it checked and move one index right.', 'If the array ends, report that the target is absent.'],
    pseudocode: ['linearSearch(A, target)', '    for i ← 0 to n − 1', '        compare A[i] with target', '        if A[i] = target: return i', '    return NOT_FOUND'],
    run: linearSearch,
  },
  binary: {
    id: 'binary', name: 'Binary search', shortName: 'BINARY SEARCH',
    description: 'Search a sorted array by checking the midpoint and discarding half the remaining range.',
    coreIdea: 'Maintain a sorted search interval. Compare its midpoint with the target and keep only the half that can contain the first matching occurrence.',
    complexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(1)' },
    complexityNote: 'Each comparison halves the interval. The input must be sorted; duplicates return the first occurrence.',
    steps: ['Confirm the array is sorted in ascending order.', 'Set low and high to the current search interval.', 'Inspect the midpoint of the interval.', 'Keep the left half if the midpoint is at least the target; otherwise keep the right half.', 'When the interval ends, return the first match or report absence.'],
    pseudocode: ['binarySearchFirst(A, target)', '    low ← 0; high ← n − 1', '    while low ≤ high', '        mid ← floor((low + high) / 2)', '        compare A[mid] with target', '        if A[mid] < target: low ← mid + 1', '        else: high ← mid − 1', '    if low < n and A[low] = target: return low', '    return NOT_FOUND'],
    run: binarySearch,
  },
};

function allIndices(array) {
  return Array.from({ length: array.length }, (_, index) => index);
}

function makeEvent(array, counts, type, tokens, detail = {}) {
  return {
    type,
    array: array.slice(),
    tokens: tokens.slice(),
    counts: { ...counts },
    sortedIndices: [],
    roles: {},
    indices: [],
    codeLine: 0,
    learningStep: 0,
    label: 'Operation',
    explanation: '',
    ...detail,
  };
}

function record(events, array, counts, type, tokens, detail) {
  events.push(makeEvent(array, counts, type, tokens, detail));
}

function finishResult(array, counts, events, algorithmId, tokens) {
  record(events, array, counts, 'finish', tokens, {
    sortedIndices: allIndices(array),
    codeLine: algorithms[algorithmId].pseudocode.length - 1,
    learningStep: algorithms[algorithmId].steps.length,
    label: 'Array sorted',
    explanation: array.length === 0
      ? 'The array is empty, so it is already in ascending order. No comparisons or movements were needed.'
      : array.length === 1
        ? 'A single value is already in ascending order. No comparisons or movements were needed.'
      : 'Every value is now in ascending order. The final event state and counters are the result of the recorded operations.',
  });
  return { algorithmId, initialArray: events[0].array.slice(), finalArray: array.slice(), events, totals: { ...counts } };
}

function bubbleSort(input) {
  const array = input.slice();
  const tokens = allIndices(array);
  const counts = { comparisons: 0, swaps: 0, shifts: 0, writes: 0 };
  const events = [];
  const sorted = new Set();

  for (let end = array.length - 1; end > 0; end -= 1) {
    let swapped = false;
    for (let index = 0; index < end; index += 1) {
      const left = array[index];
      const right = array[index + 1];
      const willSwap = left > right;
      counts.comparisons += 1;
      record(events, array, counts, 'compare', tokens, {
        indices: [index, index + 1],
        values: [left, right],
        roles: { [index]: 'compare', [index + 1]: 'compare' },
        sortedIndices: [...sorted],
        codeLine: 3,
        learningStep: 1,
        label: willSwap ? 'Compare · out of order' : 'Compare · in order',
        explanation: willSwap
          ? `${left} is greater than ${right}. This pair needs a swap to move the larger value right.`
          : `${left} is not greater than ${right}. This comparison leaves the pair in place.`,
      });

      if (willSwap) {
        [array[index], array[index + 1]] = [array[index + 1], array[index]];
        [tokens[index], tokens[index + 1]] = [tokens[index + 1], tokens[index]];
        counts.swaps += 1;
        swapped = true;
        record(events, array, counts, 'swap', tokens, {
          indices: [index, index + 1],
          values: [array[index], array[index + 1]],
          roles: { [index]: 'moving', [index + 1]: 'moving' },
          sortedIndices: [...sorted],
          codeLine: 4,
          learningStep: 2,
          label: 'Swap neighbors',
          explanation: `Swap ${right} and ${left}. The larger value moves one position toward the right edge.`,
        });
      }
    }
    sorted.add(end);
    if (end === 1 || !swapped) sorted.add(0);
    record(events, array, counts, 'pass', tokens, {
      indices: [end],
      values: [array[end]],
      roles: { [end]: 'sorted' },
      sortedIndices: [...sorted],
      codeLine: !swapped ? 7 : 6,
      learningStep: !swapped ? 4 : 3,
      label: !swapped ? 'No swaps · finish early' : 'Pass complete',
      explanation: !swapped
        ? 'No pair changed during this pass, so the whole array is already sorted. Bubble sort stops early.'
        : `${array[end]} has reached its final position at index ${end}. The next pass can ignore it.`,
    });
    if (!swapped) break;
  }

  return finishResult(array, counts, events, 'bubble', tokens);
}

function selectionSort(input) {
  const array = input.slice();
  const tokens = allIndices(array);
  const counts = { comparisons: 0, swaps: 0, shifts: 0, writes: 0 };
  const events = [];
  const sorted = new Set();

  for (let start = 0; start < array.length - 1; start += 1) {
    let minimum = start;
    record(events, array, counts, 'minimum', tokens, {
      indices: [minimum],
      values: [array[minimum]],
      roles: { [minimum]: 'minimum' },
      sortedIndices: [...sorted],
      currentMinimum: { index: minimum, value: array[minimum] },
      codeLine: 1,
      learningStep: 0,
      label: 'Choose a starting minimum',
      explanation: `${array[minimum]} at index ${minimum} is the smallest value seen so far in this pass.`,
    });

    for (let index = start + 1; index < array.length; index += 1) {
      const candidate = array[index];
      const previousMinimum = minimum;
      const beforeValue = array[minimum];
      const improved = candidate < beforeValue;
      counts.comparisons += 1;
      if (improved) minimum = index;
      record(events, array, counts, 'compare', tokens, {
        indices: [index, previousMinimum],
        values: [candidate, beforeValue],
        roles: improved
          ? { [previousMinimum]: 'compare', [index]: 'minimum' }
          : { [index]: 'compare', [previousMinimum]: 'minimum' },
        sortedIndices: [...sorted],
        currentMinimum: { index: minimum, value: array[minimum] },
        candidateIndex: index,
        improved,
        codeLine: improved ? 4 : 3,
        learningStep: 1,
        label: improved ? 'New minimum found' : 'Compare with minimum',
        explanation: improved
          ? `${candidate} at index ${index} is smaller than the previous minimum ${beforeValue}. The minimum marker moves to index ${index}.`
          : `${candidate} is not smaller than the current minimum ${array[minimum]}. Keep the minimum at index ${minimum}.`,
      });
    }

    if (minimum !== start) {
      const startValue = array[start];
      const minValue = array[minimum];
      [array[start], array[minimum]] = [array[minimum], array[start]];
      [tokens[start], tokens[minimum]] = [tokens[minimum], tokens[start]];
      counts.swaps += 1;
      record(events, array, counts, 'swap', tokens, {
        indices: [start, minimum],
        values: [array[start], array[minimum]],
        roles: { [start]: 'moving', [minimum]: 'moving' },
        sortedIndices: [...sorted],
        currentMinimum: { index: start, value: minValue },
        codeLine: 5,
        learningStep: 2,
        label: 'Place the minimum',
        explanation: `Exchange ${minValue} at index ${minimum} with ${startValue} at index ${start}. The minimum takes the first unsorted position.`,
      });
    } else {
      record(events, array, counts, 'place', tokens, {
        indices: [start],
        values: [array[start]],
        roles: { [start]: 'minimum' },
        sortedIndices: [...sorted],
        currentMinimum: { index: start, value: array[start] },
        codeLine: 5,
        learningStep: 2,
        label: 'Minimum already in place',
        explanation: `${array[start]} is already the smallest value in the unsorted section, so no swap is needed.`,
      });
    }
    sorted.add(start);
    record(events, array, counts, 'settle', tokens, {
      indices: [start],
      values: [array[start]],
      roles: { [start]: 'sorted' },
      sortedIndices: [...sorted],
      currentMinimum: { index: start, value: array[start] },
      codeLine: 6,
      learningStep: 3,
      label: 'Grow the sorted prefix',
      explanation: `${array[start]} is now in its final position. The sorted prefix ends at index ${start}.`,
    });
  }
  return finishResult(array, counts, events, 'selection', tokens);
}

function insertionSort(input) {
  const array = input.slice();
  const tokens = allIndices(array);
  let nextToken = tokens.length;
  const counts = { comparisons: 0, swaps: 0, shifts: 0, writes: 0 };
  const events = [];

  for (let index = 1; index < array.length; index += 1) {
    const key = array[index];
    const keyToken = tokens[index];
    let cursor = index - 1;
    const sortedPrefix = allIndices(array.slice(0, index));
    record(events, array, counts, 'key', tokens, {
      indices: [index],
      values: [key],
      roles: { [index]: 'insertion-key' },
      sortedIndices: sortedPrefix,
      heldValue: key,
      heldToken: keyToken,
      sourceIndex: index,
      insertionIndex: cursor + 1,
      codeLine: 1,
      learningStep: 1,
      label: 'Lift the next key',
      explanation: `Hold ${key} from index ${index} aside as the key. The sorted section to its left stays in order while space is made.`,
    });

    while (cursor >= 0) {
      const compared = array[cursor];
      const shouldShift = compared > key;
      counts.comparisons += 1;
      const validPrefix = cursor === index - 1 ? sortedPrefix : allIndices(array.slice(0, cursor));
      record(events, array, counts, 'compare', tokens, {
        indices: [cursor],
        values: [compared, key],
        roles: { [cursor]: 'compare', ...(cursor + 1 < index ? { [cursor + 1]: 'destination' } : {}), ...(cursor + 1 === index ? { [index]: 'insertion-key' } : {}) },
        sortedIndices: validPrefix,
        heldValue: key,
        heldToken: keyToken,
        insertionIndex: cursor + 1,
        codeLine: 3,
        learningStep: 2,
        label: shouldShift ? 'Compare · make room' : 'Compare · opening found',
        explanation: shouldShift
          ? `${compared} at index ${cursor} is greater than the held key ${key}. Shift ${compared} one place to the right.`
          : `${compared} is not greater than the held key ${key}. The opening at index ${cursor + 1} is where the key belongs.`,
      });
      if (!shouldShift) break;

      array[cursor + 1] = array[cursor];
      tokens[cursor + 1] = nextToken;
      nextToken += 1;
      counts.shifts += 1;
      record(events, array, counts, 'shift', tokens, {
        indices: [cursor, cursor + 1],
        values: [array[cursor], array[cursor + 1]],
        roles: { [cursor]: 'moving', [cursor + 1]: 'destination' },
        sortedIndices: allIndices(array.slice(0, cursor)),
        heldValue: key,
        heldToken: keyToken,
        insertionIndex: cursor,
        sourceIndex: index,
        codeLine: 4,
        learningStep: 3,
        label: 'Shift one place right',
        explanation: `Move ${array[cursor]} one position to the right, from index ${cursor} to ${cursor + 1}. Keep the held key ${key} aside while the opening moves left.`,
      });
      cursor -= 1;
    }

    array[cursor + 1] = key;
    tokens[cursor + 1] = keyToken;
    const insertedAt = cursor + 1;
    record(events, array, counts, 'insert', tokens, {
      indices: [insertedAt],
      values: [key],
      roles: { [insertedAt]: 'inserted' },
      sortedIndices: allIndices(array.slice(0, index + 1)),
      heldValue: key,
      heldToken: keyToken,
      insertionIndex: insertedAt,
      codeLine: 6,
      learningStep: 4,
      label: 'Insert the key',
      explanation: `Place the held key ${key} into the opening at index ${insertedAt}. The ordered section now contains indices 0 through ${index}.`,
    });
  }

  return finishResult(array, counts, events, 'insertion', tokens);
}

function mergeSort(input) {
  const array = input.slice();
  const tokens = allIndices(array);
  let nextToken = tokens.length;
  const counts = { comparisons: 0, swaps: 0, shifts: 0, writes: 0 };
  const events = [];
  const sorted = new Set();

  function mergeRange(low, high) {
    if (low >= high) {
      if (low === high) sorted.add(low);
      return;
    }
    const mid = Math.floor((low + high) / 2);
    const rangeRoles = Object.fromEntries(Array.from({ length: high - low + 1 }, (_, offset) => [low + offset, low + offset <= mid ? 'active-left' : 'active-right']));
    record(events, array, counts, 'divide', tokens, {
      indices: [low, mid, mid + 1, high], roles: rangeRoles, sortedIndices: [...sorted], low, mid, high, codeLine: 2, learningStep: 0,
      label: `Divide ${low}–${high}`, explanation: `Divide indices ${low}–${high} into a left range (${low}–${mid}) and a right range (${mid + 1}–${high}). The array has not changed.`,
    });
    mergeRange(low, mid);
    mergeRange(mid + 1, high);
    const leftValues = array.slice(low, mid + 1);
    const rightValues = array.slice(mid + 1, high + 1);
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = low;
    for (let index = low; index <= high; index += 1) sorted.delete(index);
    const writeRoles = (writtenIndex) => {
      const roles = {};
      for (let index = low; index <= mid; index += 1) roles[index] = 'active-left';
      for (let index = mid + 1; index <= high; index += 1) roles[index] = 'active-right';
      if (writtenIndex !== undefined) roles[writtenIndex] = 'written';
      return roles;
    };
    record(events, array, counts, 'merge', tokens, {
      indices: [low, mid, mid + 1, high], low, mid, high, roles: rangeRoles, sortedIndices: [...sorted], codeLine: 5, learningStep: 2,
      label: `Merge ${low}–${mid} and ${mid + 1}–${high}`,
      explanation: `Merge the ordered left range (${low}–${mid}) and right range (${mid + 1}–${high}) into indices ${low}–${high}.`,
    });
    while (leftIndex < leftValues.length && rightIndex < rightValues.length) {
      const leftValue = leftValues[leftIndex];
      const rightValue = rightValues[rightIndex];
      const leftPosition = low + leftIndex;
      const rightPosition = mid + 1 + rightIndex;
      counts.comparisons += 1;
      record(events, array, counts, 'compare', tokens, {
        indices: [leftPosition, rightPosition], values: [leftValue, rightValue], roles: { [leftPosition]: 'active-left', [rightPosition]: 'active-right' },
        sortedIndices: [...sorted], low, mid, high, codeLine: 7, learningStep: 2, label: 'Compare merge fronts',
        explanation: `Compare ${leftValue} at the front of the left range with ${rightValue} at the front of the right range. Write the smaller value next.`,
      });
      const takeLeft = leftValue <= rightValue;
      const value = takeLeft ? leftValue : rightValue;
      if (takeLeft) leftIndex += 1;
      else rightIndex += 1;
      array[outputIndex] = value;
      tokens[outputIndex] = nextToken++;
      counts.writes += 1;
      record(events, array, counts, 'write', tokens, {
        indices: [outputIndex], values: [value], roles: writeRoles(outputIndex), sortedIndices: [...sorted], low, mid, high,
        codeLine: 8, learningStep: 3, label: `Write ${value} at index ${outputIndex}`,
        explanation: `Write ${value} into index ${outputIndex}, the next open position in the merged range. This is an array write, not a swap.`,
      });
      outputIndex += 1;
    }
    while (leftIndex < leftValues.length || rightIndex < rightValues.length) {
      const takeLeft = rightIndex >= rightValues.length || (leftIndex < leftValues.length && leftValues[leftIndex] <= rightValues[rightIndex]);
      const value = takeLeft ? leftValues[leftIndex] : rightValues[rightIndex];
      if (takeLeft) leftIndex += 1;
      else rightIndex += 1;
      array[outputIndex] = value;
      tokens[outputIndex] = nextToken++;
      counts.writes += 1;
      record(events, array, counts, 'write', tokens, {
        indices: [outputIndex], values: [value], roles: writeRoles(outputIndex), sortedIndices: [...sorted], low, mid, high,
        codeLine: 9, learningStep: 3, label: `Write remaining ${value}`,
        explanation: `Write the remaining ordered value ${value} at index ${outputIndex}. No comparison is needed because the other half is exhausted.`,
      });
      outputIndex += 1;
    }
    for (let index = low; index <= high; index += 1) sorted.add(index);
    record(events, array, counts, 'partition', tokens, {
      indices: Array.from({ length: high - low + 1 }, (_, offset) => low + offset),
      roles: Object.fromEntries(Array.from({ length: high - low + 1 }, (_, offset) => [low + offset, 'sorted'])),
      sortedIndices: [...sorted], low, mid, high, codeLine: 9, learningStep: 4, label: 'Merge complete',
      explanation: `Indices ${low}–${high} now form one sorted range.`,
    });
  }

  if (array.length > 0) mergeRange(0, array.length - 1);
  return finishResult(array, counts, events, 'merge', tokens);
}

function quickSort(input) {
  const array = input.slice();
  const tokens = allIndices(array);
  const counts = { comparisons: 0, swaps: 0, shifts: 0, writes: 0 };
  const events = [];
  const sorted = new Set();

  function partitionRoles(low, high, pivotIndex, boundary, currentIndex) {
    const roles = {};
    for (let index = low; index < high; index += 1) roles[index] = index < boundary ? 'active-left' : 'active-right';
    if (currentIndex !== undefined) roles[currentIndex] = 'compare';
    roles[pivotIndex] = 'pivot';
    return roles;
  }

  function partitionRange(low, high) {
    if (low > high) return;
    if (low === high) {
      sorted.add(low);
      record(events, array, counts, 'partition', tokens, { indices: [low], roles: { [low]: 'sorted' }, sortedIndices: [...sorted], low, high, codeLine: 1, learningStep: 4, label: 'Single value is in place', explanation: `The one-value range at index ${low} is already in its final position.` });
      return;
    }
    const pivot = array[high];
    record(events, array, counts, 'pivot', tokens, {
      indices: [high], values: [pivot], roles: partitionRoles(low, high, high, low), sortedIndices: [...sorted], low, high, pivotIndex: high, pivotValue: pivot,
      codeLine: 2, learningStep: 0, label: `Choose pivot ${pivot}`,
      explanation: `Choose ${pivot} at index ${high} as the pivot for range ${low}–${high}. Selecting a pivot does not swap any values.`,
    });
    let boundary = low;
    for (let index = low; index < high; index += 1) {
      const value = array[index];
      counts.comparisons += 1;
      const belongsLeft = value <= pivot;
      record(events, array, counts, 'compare', tokens, {
        indices: [index, high], values: [value, pivot], roles: partitionRoles(low, high, high, boundary, index), sortedIndices: [...sorted], low, high, pivotIndex: high, pivotValue: pivot, boundary,
        codeLine: 5, learningStep: 1, label: belongsLeft ? 'At or below pivot' : 'Above pivot',
        explanation: belongsLeft ? `${value} is at most pivot ${pivot}, so it belongs on the pivot’s left side.` : `${value} is greater than pivot ${pivot}, so it stays in the right partition.`,
      });
      if (belongsLeft) {
        if (boundary !== index) {
          const displaced = array[boundary];
          [array[boundary], array[index]] = [array[index], array[boundary]];
          [tokens[boundary], tokens[index]] = [tokens[index], tokens[boundary]];
          counts.swaps += 1;
          const roles = partitionRoles(low, high, high, boundary + 1);
          roles[boundary] = 'moving';
          roles[index] = 'moving';
          record(events, array, counts, 'swap', tokens, {
            indices: [boundary, index], values: [array[boundary], array[index]], roles, sortedIndices: [...sorted], low, high, pivotIndex: high, pivotValue: pivot, boundary,
            codeLine: 6, learningStep: 2, label: 'Move value into left partition',
            explanation: `Swap ${value} into the next left-partition position at index ${boundary}; ${displaced} moves to index ${index}.`,
          });
        }
        boundary += 1;
      }
    }
    if (boundary !== high) {
      const displaced = array[boundary];
      [array[boundary], array[high]] = [array[high], array[boundary]];
      [tokens[boundary], tokens[high]] = [tokens[high], tokens[boundary]];
      counts.swaps += 1;
      const roles = partitionRoles(low, high, boundary, boundary);
      roles[boundary] = 'pivot';
      roles[high] = 'moving';
      record(events, array, counts, 'swap', tokens, {
        indices: [boundary, high], values: [array[boundary], array[high]], roles, sortedIndices: [...sorted], low, high, pivotIndex: boundary, pivotValue: pivot, boundary,
        codeLine: 8, learningStep: 3, label: 'Place pivot at its final index',
        explanation: `Move pivot ${pivot} to index ${boundary}, between the two partitions. ${displaced} moves to the pivot’s former position.`,
      });
    }
    sorted.add(boundary);
    const finalizedRoles = partitionRoles(low, high, boundary, boundary);
    finalizedRoles[boundary] = 'sorted';
    record(events, array, counts, 'partition', tokens, {
      indices: [low, boundary, high], values: [array[boundary]], roles: finalizedRoles, sortedIndices: [...sorted], low, high, pivotIndex: boundary, pivotValue: pivot, boundary,
      codeLine: 9, learningStep: 4, label: `Partition at index ${boundary}`,
      explanation: `Pivot ${pivot} is finalized at index ${boundary}. Continue with left range ${low}–${boundary - 1} and right range ${boundary + 1}–${high}.`,
    });
    partitionRange(low, boundary - 1);
    partitionRange(boundary + 1, high);
  }

  if (array.length > 0) partitionRange(0, array.length - 1);
  return finishResult(array, counts, events, 'quick', tokens);
}

function searchCounts() { return { comparisons: 0, swaps: 0, shifts: 0, writes: 0 }; }

function finishSearch(array, counts, events, algorithmId, tokens, resultIndex, resultRoles = {}) {
  const found = resultIndex >= 0;
  if (found) resultRoles[resultIndex] = 'found';
  record(events, array, counts, found ? 'found' : 'notfound', tokens, {
    resultIndex, indices: found ? [resultIndex] : [], values: found ? [array[resultIndex]] : [],
    roles: resultRoles, sortedIndices: [],
    codeLine: found ? (algorithmId === 'linear' ? 3 : 7) : (algorithmId === 'linear' ? 4 : 8), learningStep: found ? 2 : 4,
    label: found ? `Found ${array[resultIndex]} at index ${resultIndex}` : 'Target not found',
    explanation: found ? `Target ${array[resultIndex]} is found at index ${resultIndex}. This is the first matching occurrence.` : 'Target not found. Every necessary value or search interval has been checked.',
  });
  return { algorithmId, initialArray: array.slice(), finalArray: array.slice(), events, totals: { ...counts }, resultIndex };
}

function validateTarget(target) {
  if (!Number.isInteger(target)) throw new TypeError('Search target must be an integer.');
}

function linearSearch(input, target) {
  validateTarget(target);
  const array = input.slice();
  const tokens = allIndices(array);
  const counts = searchCounts();
  const events = [];
  const checkedRoles = {};
  for (let index = 0; index < array.length; index += 1) {
    counts.comparisons += 1;
    const roles = Object.fromEntries(Array.from({ length: index }, (_, checked) => [checked, 'checked']));
    roles[index] = 'compare';
    record(events, array, counts, 'compare', tokens, {
      indices: [index], values: [array[index], target], roles, sortedIndices: [], target, currentIndex: index,
      codeLine: 2, learningStep: 1, label: `Check index ${index}`,
      explanation: array[index] === target ? `Compare ${array[index]} at index ${index} with target ${target}: they match. Stop at this first occurrence.` : `Compare ${array[index]} at index ${index} with target ${target}: they differ. Move one position to the right.`,
    });
    if (array[index] === target) return finishSearch(array, counts, events, 'linear', tokens, index, checkedRoles);
    checkedRoles[index] = 'checked';
  }
  return finishSearch(array, counts, events, 'linear', tokens, -1, checkedRoles);
}

function binarySearch(input, target) {
  validateTarget(target);
  const array = input.slice();
  if (array.some((value, index) => index > 0 && array[index - 1] > value)) {
    throw new RangeError('Binary Search requires an ascending sorted array. Choose “Sort array for Binary Search” before searching this input.');
  }
  const tokens = allIndices(array);
  const counts = searchCounts();
  const events = [];
  let low = 0;
  let high = array.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const value = array[mid];
    counts.comparisons += 1;
    const roles = {};
    for (let index = 0; index < low; index += 1) roles[index] = 'eliminated';
    for (let index = high + 1; index < array.length; index += 1) roles[index] = 'eliminated';
    roles[mid] = 'midpoint';
    record(events, array, counts, 'compare', tokens, {
      indices: [mid], values: [value, target], roles, sortedIndices: [], target, low, mid, high,
      codeLine: 4, learningStep: 2, label: `Check midpoint ${mid}`,
      explanation: value === target ? `Midpoint ${mid} contains ${value}, equal to target ${target}. Continue left to check whether an earlier duplicate exists.` : `${value} at midpoint ${mid} is ${value < target ? 'below' : 'above'} target ${target}; discard one half of the sorted interval.`,
    });
    if (value < target) low = mid + 1;
    else high = mid - 1;
    const intervalRoles = {};
    for (let index = 0; index < low; index += 1) intervalRoles[index] = 'eliminated';
    for (let index = high + 1; index < array.length; index += 1) intervalRoles[index] = 'eliminated';
    record(events, array, counts, 'interval', tokens, {
      indices: low <= high ? [low, high] : [], roles: intervalRoles, sortedIndices: [], target, low, high,
      codeLine: value < target ? 5 : 6, learningStep: 3,
      label: low <= high ? `Keep interval ${low}–${high}` : 'Search interval is empty',
      explanation: low <= high ? `Discard the other half. The next possible first match is within indices ${low}–${high}.` : `The interval is empty, so target ${target} is absent.`,
    });
  }
  const resultIndex = low < array.length && array[low] === target ? low : -1;
  const resultRoles = Object.fromEntries(array.map((_, index) => [index, 'eliminated']));
  return finishSearch(array, counts, events, 'binary', tokens, resultIndex, resultRoles);
}

export function getAlgorithm(id) {
  return algorithms[id] || algorithms.bubble;
}

export function listAlgorithms() {
  return Object.values(algorithms).map(({ run, ...definition }) => definition);
}

export function generateTrace(id, input, options = {}) {
  if (!Array.isArray(input) || input.some((value) => !Number.isInteger(value))) {
    throw new TypeError('The input array must contain only integers.');
  }
  const algorithm = getAlgorithm(id);
  if (id === 'linear' || id === 'binary') return algorithm.run(input, options.target);
  return algorithm.run(input);
}
