import { generateTrace, getAlgorithm } from './algorithms.js';

const INITIAL_ARRAY = [64, 23, 87, 45, 12, 78, 34, 56];
const SVG_NS = 'http://www.w3.org/2000/svg';
const HERO_ICONS = {
  bubble: '<path d="M4 10h22l-6-6m6 6-6 6M28 22H6l6 6m-6-6 6-6"/>',
  selection: '<path d="m16 3 2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8L16 3Z"/><path d="M5 22h22"/>',
  insertion: '<path d="M7 23 22 8M11 8h11v11"/><path d="M4 4v5m0 5v6"/>',
  merge: '<path d="M5 4v5c0 2 3 3 7 3m7 8v-5c0-2-3-3-7-3m0 0-4-4m4 4-4 4m4-4 4-4m-4 4 4 4"/>',
  quick: '<path d="M4 6h16M4 16h16M7 11h10m-4-4 4 4-4 4"/>',
  linear: '<circle cx="13" cy="13" r="7"/><path d="m18 18 4 4M10 13h6"/>',
  binary: '<path d="M4 6h16M4 16h16M7 11h10m-4-4 4 4-4 4"/>',
};
const ALGORITHM_COPY = {
  bubble: {
    description: 'Repeatedly compare adjacent elements and swap them if they are in the wrong order.',
    complexityTitle: 'Average and worst-case time. Best-case O(n) with early termination.',
    timeNote: 'Average / worst',
  },
  selection: {
    description: 'Find the smallest element in the unsorted section and place it into its next correct position.',
    complexityTitle: 'Best, average, and worst-case time are all O(n²) comparisons.',
    timeNote: 'All cases',
  },
  insertion: {
    description: 'Shift larger elements to the right, then insert each held key into its correct position.',
    complexityTitle: 'Average and worst-case time. Best-case O(n) when the array is already sorted.',
    timeNote: 'Average / worst',
  },
  merge: { description: 'Divide the array into smaller sections, then merge ordered sections back together.', complexityTitle: 'O(n log n) time in every case; O(n) auxiliary merge space.', timeNote: 'All cases' },
  quick: { description: 'Partition each range around a pivot, then sort the smaller ranges on either side.', complexityTitle: 'Average O(n log n), worst O(n²); recursion space depends on partition depth.', timeNote: 'Average case' },
  linear: { description: 'Check each value from left to right until the target is found or the array ends.', complexityTitle: 'Best O(1); average and worst O(n). Constant auxiliary space.', timeNote: 'Average / worst' },
  binary: { description: 'Search a sorted array by checking the midpoint and discarding half the remaining range.', complexityTitle: 'O(log n) time and O(1) auxiliary space; the input must be sorted.', timeNote: 'All cases' },
};
const state = {
  algorithmId: 'bubble',
  originalArray: INITIAL_ARRAY.slice(),
  trace: null,
  cursor: 0,
  isPlaying: false,
  timer: null,
  delay: 800,
  searchTarget: 23,
  chartNodes: new Map(),
  errorMessage: '',
};

const elements = {
  algorithms: [...document.querySelectorAll('[data-algorithm]')],
  heroIcon: document.getElementById('algorithm-hero-icon'),
  heroTitle: document.getElementById('hero-title'),
  heroDescription: document.getElementById('hero-description'),
  heroTime: document.getElementById('hero-time'),
  heroTimeNote: document.getElementById('hero-time-note'),
  heroSpace: document.getElementById('hero-space'),
  legend: document.getElementById('legend'),
  chart: document.getElementById('sort-chart'),
  bars: document.getElementById('chart-bars'),
  indices: document.getElementById('chart-indices'),
  grid: document.getElementById('chart-grid'),
  baseline: document.getElementById('chart-baseline'),
  arraySizeLabel: document.getElementById('array-size-label'),
  randomize: document.getElementById('randomize-button'),
  previous: document.getElementById('previous-button'),
  next: document.getElementById('next-button'),
  play: document.getElementById('play-button'),
  playIcon: document.getElementById('play-icon'),
  playLabel: document.getElementById('play-label'),
  reset: document.getElementById('reset-button'),
  speed: document.getElementById('speed-range'),
  speedLabel: document.getElementById('speed-label'),
  size: document.getElementById('size-range'),
  sizeValue: document.getElementById('size-value'),
  comparison: document.getElementById('comparison-count'),
  swaps: document.getElementById('swap-count'),
  shifts: document.getElementById('shift-count'),
  writes: document.getElementById('write-count'),
  swapsCard: document.querySelector('.swaps-stat'),
  shiftsCard: document.querySelector('.shifts-stat'),
  writesCard: document.querySelector('.writes-stat'),
  statsGrid: document.querySelector('.stats-grid'),
  progress: document.querySelector('.progress-track'),
  progressFill: document.getElementById('progress-fill'),
  progressRing: document.getElementById('progress-ring-fill'),
  progressLabel: document.getElementById('progress-label'),
  progressCurrent: document.getElementById('progress-current'),
  progressTotal: document.getElementById('progress-total'),
  playbackStatus: document.getElementById('playback-status'),
  operationKind: document.getElementById('operation-kind'),
  eventNumber: document.getElementById('event-number'),
  inspectorTitle: document.getElementById('inspector-heading'),
  explanation: document.getElementById('event-explanation'),
  operationDetails: document.getElementById('operation-details'),
  codeLine: document.getElementById('step-code-line'),
  codeSnippet: document.getElementById('step-code-snippet'),
  currentArray: document.getElementById('current-array'),
  timeline: document.getElementById('event-timeline'),
  steps: document.getElementById('learning-steps'),
  complexitySummary: document.getElementById('complexity-summary'),
  complexitySpace: document.getElementById('complexity-space-detail'),
  complexityNote: document.getElementById('complexity-note'),
  pseudocode: document.getElementById('pseudocode-list'),
  sidebar: document.getElementById('algorithm-sidebar'),
  sidebarToggle: document.getElementById('sidebar-toggle'),
  sidebarScrim: document.getElementById('sidebar-scrim'),
  searchControls: document.getElementById('search-target-controls'),
  searchTarget: document.getElementById('search-target'),
  sortForBinary: document.getElementById('sort-for-binary'),
  binarySortNote: document.getElementById('binary-sort-note'),
  announcer: document.getElementById('live-announcer'),
};

function svgElement(name, attributes = {}) {
  const node = document.createElementNS(SVG_NS, name);
  for (const [attribute, value] of Object.entries(attributes)) node.setAttribute(attribute, String(value));
  return node;
}

function currentEvent() {
  return state.cursor > 0 ? state.trace.events[state.cursor - 1] : null;
}

function currentArray() {
  return currentEvent()?.array ?? state.originalArray;
}

function clearChartNodes() {
  state.chartNodes.clear();
  elements.bars.replaceChildren();
}

function setTrace() {
  stopPlayback();
  state.errorMessage = '';
  try {
    state.trace = generateTrace(state.algorithmId, state.originalArray, { target: Number(elements.searchTarget.value) });
    state.cursor = 0;
    clearChartNodes();
    render();
  } catch (error) {
    stopPlayback();
    state.errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred while preparing the sort.';
    state.trace = { events: [], algorithmId: state.algorithmId, initialArray: state.originalArray.slice(), finalArray: state.originalArray.slice(), totals: { comparisons: 0, swaps: 0, shifts: 0 } };
    state.cursor = 0;
    clearChartNodes();
    render();
  }
}

function stopPlayback() {
  state.isPlaying = false;
  if (state.timer !== null) {
    window.clearTimeout(state.timer);
    state.timer = null;
  }
}

function scheduleTick() {
  if (!state.isPlaying || state.timer !== null) return;
  state.timer = window.setTimeout(() => {
    state.timer = null;
    if (!state.isPlaying) return;
    if (state.cursor >= state.trace.events.length) {
      stopPlayback();
      renderPlayback();
      return;
    }
    state.cursor += 1;
    render();
    if (state.cursor >= state.trace.events.length) {
      stopPlayback();
      renderPlayback();
      return;
    }
    scheduleTick();
  }, state.delay);
}

function togglePlayback() {
  if (state.isPlaying) {
    stopPlayback();
  } else {
    if (state.cursor >= state.trace.events.length) {
      state.cursor = 0;
      render();
    }
    state.isPlaying = true;
    scheduleTick();
  }
  renderPlayback();
}

function stepForward() {
  stopPlayback();
  if (state.cursor < state.trace.events.length) state.cursor += 1;
  render();
}

function stepBackward() {
  stopPlayback();
  if (state.cursor > 0) state.cursor -= 1;
  render();
}

function resetTrace() {
  stopPlayback();
  state.cursor = 0;
  render();
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomArray(size) {
  return Array.from({ length: size }, () => randomInteger(8, 96));
}

function delayFromRange(value) {
  return Number(elements.speed.min) + Number(elements.speed.max) - Number(value);
}

function setInputArray(array) {
  stopPlayback();
  state.originalArray = array.slice();
  state.cursor = 0;
  setTrace();
}

function renderPlayback() {
  const status = state.errorMessage
    ? 'Unavailable'
    : state.isPlaying
      ? 'Playing'
      : state.cursor === 0
        ? 'Ready'
        : state.cursor >= state.trace.events.length
          ? 'Complete'
          : 'Paused';
  elements.playbackStatus.textContent = status;
  elements.playbackStatus.className = `playback-status playback-${status.toLowerCase()}`;
  elements.playLabel.textContent = state.isPlaying ? 'Pause' : 'Play';
  elements.playIcon.innerHTML = state.isPlaying
    ? '<path d="M7 5h4v14H7zM15 5h4v14h-4z"/>'
    : '<path d="m8 5 12 7-12 7V5Z"/>';
  elements.play.setAttribute('aria-label', state.isPlaying ? 'Pause animation' : 'Play animation');
  elements.play.title = state.isPlaying ? 'Pause animation (Space)' : 'Play animation (Space)';
  elements.previous.disabled = state.cursor === 0;
  elements.next.disabled = state.cursor >= state.trace.events.length;
  elements.play.disabled = state.trace.events.length === 0;
}

function renderProgress() {
  const total = state.trace.events.length;
  const percent = total === 0 ? 0 : Math.round((state.cursor / total) * 100);
  elements.progressFill.style.width = `${percent}%`;
  elements.progressLabel.textContent = `${percent}%`;
  elements.progressCurrent.textContent = String(state.cursor);
  elements.progressTotal.textContent = String(total);
  elements.progress.setAttribute('aria-valuenow', String(percent));
  elements.progressRing.style.setProperty('--progress', `${percent * 3.6}deg`);
  elements.eventNumber.textContent = state.cursor === 0 ? 'Initial array' : `${state.cursor} / ${total}`;
}

function renderMetrics(event) {
  const counts = event?.counts ?? { comparisons: 0, swaps: 0, shifts: 0, writes: 0 };
  elements.comparison.textContent = String(counts.comparisons);
  elements.swaps.textContent = String(counts.swaps);
  elements.shifts.textContent = String(counts.shifts);
  elements.writes.textContent = String(counts.writes ?? 0);
  const showSwaps = ['bubble', 'selection', 'quick'].includes(state.algorithmId);
  const showShifts = state.algorithmId === 'insertion';
  const showWrites = state.algorithmId === 'merge';
  elements.swapsCard.hidden = !showSwaps;
  elements.shiftsCard.hidden = !showShifts;
  elements.writesCard.hidden = !showWrites;
  elements.statsGrid.style.setProperty('--metric-columns', String(2 + Number(showSwaps) + Number(showShifts) + Number(showWrites)));
}

function renderLegend() {
  const entriesByAlgorithm = {
    bubble: [['dot-normal', 'Normal'], ['dot-compare', 'Comparing'], ['dot-swap', 'Swapping'], ['dot-sorted', 'Sorted']],
    selection: [['dot-normal', 'Normal'], ['dot-compare', 'Comparing'], ['dot-minimum', 'Minimum'], ['dot-swap', 'Swapping'], ['dot-sorted', 'Sorted']],
    insertion: [['dot-normal', 'Normal'], ['dot-compare', 'Comparing'], ['dot-shift', 'Shifted'], ['dot-inserted', 'Inserted'], ['dot-sorted', 'Sorted']],
    merge: [['dot-normal', 'Normal'], ['dot-left', 'Left half'], ['dot-right', 'Right half'], ['dot-compare', 'Comparing'], ['dot-written', 'Written'], ['dot-sorted', 'Merged']],
    quick: [['dot-normal', 'Normal'], ['dot-left', 'Left partition'], ['dot-right', 'Right partition'], ['dot-pivot', 'Pivot'], ['dot-compare', 'Comparing'], ['dot-swap', 'Swapping'], ['dot-sorted', 'Finalized']],
    linear: [['dot-normal', 'Unchecked'], ['dot-checked', 'Checked'], ['dot-compare', 'Current'], ['dot-found', 'Match']],
    binary: [['dot-normal', 'Active range'], ['dot-midpoint', 'Midpoint'], ['dot-eliminated', 'Eliminated'], ['dot-found', 'Match']],
  };
  const entries = entriesByAlgorithm[state.algorithmId] || entriesByAlgorithm.bubble;
  elements.legend.replaceChildren(...entries.map(([className, label]) => {
    const item = document.createElement('span');
    const swatch = document.createElement('i');
    swatch.className = `legend-dot ${className}`;
    const text = document.createTextNode(label);
    item.append(swatch, text);
    return item;
  }));
}

function renderChart(event) {
  const values = currentArray();
  const tokens = event?.tokens ?? values.map((_, index) => index);
  const roles = event?.roles ?? {};
  const sorted = new Set(event?.sortedIndices ?? []);
  const hiddenToken = event?.heldValue !== undefined && event.type !== 'insert' && event.type !== 'finish'
    ? event.heldToken
    : undefined;
  const viewWidth = 900;
  const viewHeight = 340;
  const width = 862;
  const left = 28;
  const top = 20;
  const bottom = 296;
  const range = bottom - top;
  const chartBounds = elements.chart.getBoundingClientRect();
  const chartWidth = chartBounds.width || viewWidth;
  const chartHeight = chartBounds.height || viewHeight;
  const chartScale = Math.max(0.01, Math.min(chartWidth / viewWidth, chartHeight / viewHeight));
  const renderScale = Math.max(0.45, chartScale);
  const itemCount = Math.max(values.length, 1);
  const gapPixels = values.length > 12 ? 3.5 : 4;
  const barGap = gapPixels / chartScale;
  const groupFraction = Math.min(0.95, 0.84 + Math.max(0, values.length - 18) * 0.016);
  const groupWidth = Math.min(
    width * groupFraction,
    values.length * 100 + Math.max(0, values.length - 1) * barGap,
  );
  const barWidth = (groupWidth - Math.max(0, values.length - 1) * barGap) / itemCount;
  const slot = barWidth + barGap;
  const groupStart = left + (width - groupWidth) / 2;
  const scaleValues = state.originalArray;
  const minimum = scaleValues.length ? Math.min(...scaleValues) : 0;
  const maximum = scaleValues.length ? Math.max(...scaleValues) : 0;
  const zeroY = minimum < 0
    ? (maximum > 0 ? top + (maximum / (maximum - minimum)) * range : top)
    : bottom;
  if (!elements.grid.hasChildNodes()) {
    for (const y of [top + range / 4, top + range / 2, top + range * 3 / 4]) {
      elements.grid.append(svgElement('line', { x1: left, x2: left + width, y1: y, y2: y, class: 'chart-gridline' }));
    }
  }
  elements.baseline.setAttribute('y1', String(zeroY));
  elements.baseline.setAttribute('y2', String(zeroY));
  elements.indices.replaceChildren();
  for (let index = 0; index < values.length; index += 1) {
    const label = svgElement('text', { x: groupStart + index * slot + barWidth / 2, y: 326, class: 'bar-index', 'text-anchor': 'middle' });
    label.style.fontSize = `${12 / renderScale}px`;
    label.textContent = String(index);
    elements.indices.append(label);
  }

  const visible = new Set(tokens.filter((token) => token !== hiddenToken));
  for (const [token, node] of state.chartNodes) {
    if (!visible.has(token)) {
      node.group.style.opacity = '0';
      node.group.style.pointerEvents = 'none';
    }
  }

  for (let index = 0; index < values.length; index += 1) {
    const token = tokens[index];
    if (token === hiddenToken) continue;
    const value = values[index];
    let node = state.chartNodes.get(token);
    if (!node) {
      const group = svgElement('g', { class: 'bar-item', 'data-token': token });
      group.style.opacity = '0';
      const rect = svgElement('rect', { x: 0, y: zeroY, width: barWidth, height: 1, rx: Math.min(5, barWidth / 6), class: 'value-bar' });
      const label = svgElement('text', { x: barWidth / 2, y: bottom - 12, class: 'bar-value', 'text-anchor': 'middle' });
      group.append(rect, label);
      elements.bars.append(group);
      node = { group, rect, label };
      state.chartNodes.set(token, node);
      requestAnimationFrame(() => { node.group.style.opacity = '1'; });
    }

    const x = groupStart + index * slot;
    const height = value >= 0
      ? (maximum > 0 ? (value / maximum) * (zeroY - top) : 2)
      : (minimum < 0 ? (Math.abs(value) / Math.abs(minimum)) * (bottom - zeroY) : 2);
    const barY = value >= 0 ? zeroY - height : zeroY;
    node.group.setAttribute('transform', `translate(${x} 0)`);
    node.rect.setAttribute('x', '0');
    node.rect.setAttribute('y', String(barY));
    node.rect.setAttribute('width', String(barWidth));
    node.rect.setAttribute('height', String(Math.max(height, 2)));
    node.rect.setAttribute('rx', String(Math.min(5, barWidth / 6)));
    node.label.setAttribute('x', String(barWidth / 2));
    const valueFont = Math.min(30, (values.length > 18 ? 10 : values.length > 12 ? 13 : 17) / renderScale);
    node.label.style.fontSize = `${valueFont}px`;
    const labelY = value >= 0
      ? Math.min(bottom - 10, Math.max(top + 14, barY + height - 12))
      : Math.min(bottom + 15, Math.max(top + 14, barY + height - 7));
    node.label.setAttribute('y', String(labelY));
    node.label.textContent = String(value);
    node.label.setAttribute('class', `bar-value value-${roles[index] || (sorted.has(index) ? 'sorted' : 'idle')}`);
    node.group.style.opacity = '1';
    node.group.style.pointerEvents = '';
    const role = roles[index] || (sorted.has(index) ? 'sorted' : 'idle');
    const visualRole = role === 'moving' && event?.type === 'shift' ? 'shifted' : role;
    node.rect.setAttribute('class', `value-bar bar-${visualRole}`);
    node.group.setAttribute('aria-label', `Index ${index}, value ${value}${sorted.has(index) ? ', sorted' : ''}`);
  }

  elements.chart.setAttribute('aria-label', `${getAlgorithm(state.algorithmId).name}: ${values.length} values shown as bars${event ? `, ${event.label}` : ''}.`);
}

function operationTitle(event) {
  if (event.type === 'compare') {
    if (state.algorithmId === 'linear') return 'Checking a value';
    if (state.algorithmId === 'binary') return 'Checking the midpoint';
    if (state.algorithmId === 'selection' && event.improved) return 'Found a new minimum';
    if (state.algorithmId === 'selection') return 'Comparing with the minimum';
    return 'Comparing elements';
  }
  const titles = {
    swap: 'Swapping elements', minimum: 'Selecting a starting minimum', place: 'Placing the minimum',
    settle: 'Finalizing a sorted element', pass: 'Completing this pass', key: 'Holding the next key',
    shift: 'Shifting an element', insert: 'Inserting the key', finish: 'Sorting complete',
    divide: 'Dividing the range', merge: 'Merging sorted ranges', write: 'Writing a value',
    pivot: 'Choosing a pivot', partition: state.algorithmId === 'quick' ? 'Completing the partition' : 'Merge complete',
    interval: 'Updating the search interval', found: 'Target found', notfound: 'Target not found',
  };
  return titles[event.type] || event.label || getAlgorithm(state.algorithmId).name;
}

function operationBadge(event) {
  const mapping = {
    compare: ['Compare', 'badge-compare'], swap: ['Swap', 'badge-swap'],
    minimum: ['Minimum', 'badge-minimum'], place: ['Place', 'badge-minimum'],
    settle: ['Sorted', 'badge-sorted'], pass: ['Pass', 'badge-sorted'],
    key: ['Key', 'badge-key'], shift: ['Shift', 'badge-shift'], insert: ['Insert', 'badge-insert'],
    finish: ['Done', 'badge-sorted'], divide: ['Divide', 'badge-compare'], merge: ['Merge', 'badge-insert'],
    write: ['Write', 'badge-shift'], pivot: ['Pivot', 'badge-minimum'], partition: ['Partition', 'badge-sorted'],
    interval: ['Range', 'badge-compare'], found: ['Found', 'badge-sorted'], notfound: ['Absent', 'badge-error'],
  };
  return mapping[event.type] || ['Operation', 'badge-ready'];
}

function operationDetailLabels(event) {
  const details = [];
  const indices = [...new Set(event.indices || [])];
  const hasRange = Number.isInteger(event.low) && Number.isInteger(event.high);
  if (indices.length > 2 && hasRange) {
    details.push(`Range ${event.low}–${event.high}`);
  } else {
    indices.slice(0, 2).forEach((index) => {
      const value = event.array[index];
      details.push(`Index ${index}${value === undefined ? '' : ` · ${value}`}`);
    });
    if (indices.length > 2) details.push(`+${indices.length - 2} indices`);
  }
  if (hasRange && !(indices.length > 2)) details.push(`Range ${event.low}–${event.high}`);
  if (Number.isInteger(event.mid)) details.push(`Midpoint ${event.mid}`);
  if (event.pivotValue !== undefined) details.push(`Pivot ${event.pivotValue}`);
  if (event.currentMinimum) details.push(`Minimum ${event.currentMinimum.value} · index ${event.currentMinimum.index}`);
  if (event.heldValue !== undefined) details.push(`Key ${event.heldValue}`);
  if (event.target !== undefined) details.push(`Target ${event.target}`);
  return details;
}

function renderOperationDetails(event) {
  const [, badgeClass] = operationBadge(event);
  const nodes = operationDetailLabels(event).map((label) => {
    const chip = document.createElement('span');
    chip.className = `operation-detail-chip detail-${badgeClass.slice(6)}`;
    chip.textContent = label;
    return chip;
  });
  if (nodes.length === 0) {
    const hint = document.createElement('span');
    hint.className = 'operation-detail-hint';
    hint.textContent = 'No index or value details for this event.';
    nodes.push(hint);
  }
  elements.operationDetails.replaceChildren(...nodes);
}

function renderInspector(event) {
  if (!event) {
    elements.operationKind.textContent = state.errorMessage ? 'Error' : '—';
    elements.operationKind.className = `operation-badge ${state.errorMessage ? 'badge-error' : 'badge-ready'}`;
    elements.inspectorTitle.textContent = state.errorMessage ? 'Unable to build this trace' : 'Ready to begin';
    elements.explanation.textContent = state.errorMessage || 'Play the trace or step forward to see which elements this algorithm examines.';
    elements.codeLine.textContent = '—';
    elements.codeSnippet.textContent = 'Choose an algorithm operation to see its matching pseudocode.';
    const hint = document.createElement('span');
    hint.className = 'operation-detail-hint';
    hint.textContent = 'Index and value details appear here.';
    elements.operationDetails.replaceChildren(hint);
    elements.currentArray.replaceChildren(...state.originalArray.map((value, index) => arrayChip(value, index, null)));
    renderTimeline();
    return;
  }

  const [badge, badgeClass] = operationBadge(event);
  elements.operationKind.textContent = badge;
  elements.operationKind.className = `operation-badge ${badgeClass}`;
  elements.inspectorTitle.textContent = operationTitle(event);
  elements.explanation.textContent = event.explanation;
  renderOperationDetails(event);
  elements.codeLine.textContent = event.codeLine >= 0 ? `LINE ${String(event.codeLine + 1).padStart(2, '0')}` : '';
  elements.codeSnippet.textContent = getAlgorithm(state.algorithmId).pseudocode[event.codeLine] || event.explanation;
  elements.currentArray.replaceChildren(...event.array.map((value, index) => arrayChip(value, index, event)));
  renderTimeline();
}

function arrayChip(value, index, event) {
  const chip = document.createElement('span');
  chip.className = 'array-chip';
  chip.setAttribute('role', 'listitem');
  const role = event?.roles?.[index];
  if (role) chip.classList.add(`chip-${role}`);
  if (event?.sortedIndices?.includes(index)) chip.classList.add('chip-sorted');
  chip.title = `Index ${index}: ${value}`;
  chip.setAttribute('aria-label', `Index ${index}: ${value}`);
  chip.textContent = String(value);
  return chip;
}

function renderTimeline() {
  const start = Math.max(0, state.cursor - 4);
  const recent = state.trace.events.slice(start, state.cursor);
  elements.timeline.replaceChildren();
  if (!recent.length) {
    const item = document.createElement('li');
    item.className = 'timeline-empty';
    item.textContent = 'Your recent steps will appear here.';
    elements.timeline.append(item);
    return;
  }
  recent.forEach((event, offset) => {
    const item = document.createElement('li');
    const isCurrent = state.cursor > 0 && start + offset === state.cursor - 1;
    if (isCurrent) {
      item.classList.add('is-current');
      item.setAttribute('aria-current', 'step');
    }
    const dot = document.createElement('span');
    dot.className = `timeline-dot timeline-${event.type}`;
    const text = document.createElement('span');
    text.textContent = event.label;
    const number = document.createElement('small');
    number.textContent = String(start + offset + 1).padStart(2, '0');
    item.append(dot, text, number);
    elements.timeline.append(item);
  });
}

function renderLearning(event) {
  const algorithm = getAlgorithm(state.algorithmId);
  const step = event?.learningStep ?? 0;
  elements.steps.replaceChildren();
  algorithm.steps.forEach((text, index) => {
    const item = document.createElement('li');
    item.className = index < step ? 'step-done' : index === step ? 'step-current' : '';
    const marker = document.createElement('span');
    marker.className = 'step-marker';
    marker.textContent = index < step ? '✓' : String(index + 1);
    const content = document.createElement('span');
    content.textContent = text;
    item.append(marker, content);
    elements.steps.append(item);
  });

  elements.complexitySummary.replaceChildren();
  for (const [label, key] of [['Best', 'best'], ['Average', 'average'], ['Worst', 'worst']]) {
    const cell = document.createElement('div');
    cell.className = 'complexity-cell';
    const caption = document.createElement('small');
    caption.textContent = label;
    const value = document.createElement('strong');
    value.textContent = algorithm.complexity[key];
    cell.append(caption, value);
    elements.complexitySummary.append(cell);
  }
  elements.complexitySpace.textContent = `SPACE ${algorithm.complexity.space}`;
  elements.complexityNote.textContent = algorithm.complexityNote;

  elements.pseudocode.replaceChildren();
  const activeLine = event?.codeLine ?? -1;
  algorithm.pseudocode.forEach((line, index) => {
    const item = document.createElement('li');
    if (index === activeLine) item.classList.add('pseudo-active');
    const number = document.createElement('span');
    number.className = 'line-number';
    number.textContent = String(index + 1);
    const code = document.createElement('code');
    code.append(...highlightPseudo(line));
    item.append(number, code);
    elements.pseudocode.append(item);
  });
}

function highlightPseudo(text) {
  return text.split(/(\b(?:for|if|while|and|not|break|mark|swap|compare|true|false)\b)/gi).map((fragment) => {
    if (/^(for|if|while|and|not|break|mark|swap|compare|true|false)$/i.test(fragment)) {
      const keyword = document.createElement('span');
      keyword.className = 'code-keyword';
      keyword.textContent = fragment;
      return keyword;
    }
    return document.createTextNode(fragment);
  });
}

function renderHero() {
  const algorithm = getAlgorithm(state.algorithmId);
  const copy = ALGORITHM_COPY[state.algorithmId];
  const title = algorithm.name.replace(/\b\w/g, (character) => character.toUpperCase());
  elements.heroIcon.className = `hero-icon icon-${state.algorithmId}`;
  elements.heroIcon.innerHTML = `<svg viewBox="0 0 32 32" aria-hidden="true">${HERO_ICONS[state.algorithmId]}</svg>`;
  elements.heroTitle.textContent = title;
  elements.heroDescription.textContent = copy.description;
  elements.heroTime.textContent = algorithm.complexity.average;
  elements.heroTimeNote.textContent = copy.timeNote;
  elements.heroSpace.textContent = algorithm.complexity.space;
  const timeCard = elements.heroTime.closest('.complexity-card');
  timeCard.title = copy.complexityTitle;
  timeCard.setAttribute('aria-label', copy.complexityTitle);
  elements.arraySizeLabel.textContent = `(${state.originalArray.length} elements)`;
  elements.size.value = String(state.originalArray.length);
  elements.sizeValue.textContent = String(state.originalArray.length);
  const searchMode = state.algorithmId === 'linear' || state.algorithmId === 'binary';
  elements.searchControls.hidden = !searchMode;
  elements.sortForBinary.hidden = state.algorithmId !== 'binary' || isSorted(state.originalArray);
  elements.binarySortNote.hidden = state.algorithmId !== 'binary' || isSorted(state.originalArray);
  renderLegend();
}

function isSorted(values) {
  return values.every((value, index) => index === 0 || values[index - 1] <= value);
}

function render() {
  const event = currentEvent();
  renderHero();
  renderProgress();
  renderMetrics(event);
  renderChart(event);
  renderInspector(event);
  renderLearning(event);
  renderPlayback();
  const notice = event ? operationTitle(event) : `${getAlgorithm(state.algorithmId).name} is ready to run.`;
  elements.announcer.textContent = notice;
}

function chooseAlgorithm(id) {
  if (id === state.algorithmId) {
    closeSidebar();
    return;
  }
  state.algorithmId = id;
  elements.algorithms.forEach((button) => {
    const selected = button.dataset.algorithm === id;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  setTrace();
  closeSidebar();
}

function openSidebar() {
  document.body.classList.add('sidebar-open');
  elements.sidebarToggle.setAttribute('aria-expanded', 'true');
  elements.sidebarToggle.setAttribute('aria-label', 'Close algorithm menu');
}

function closeSidebar() {
  document.body.classList.remove('sidebar-open');
  elements.sidebarToggle.setAttribute('aria-expanded', 'false');
  elements.sidebarToggle.setAttribute('aria-label', 'Open algorithm menu');
}

function bindEvents() {
  elements.algorithms.forEach((button) => button.addEventListener('click', () => chooseAlgorithm(button.dataset.algorithm)));
  elements.randomize.addEventListener('click', () => setInputArray(randomArray(state.originalArray.length)));
  elements.previous.addEventListener('click', stepBackward);
  elements.next.addEventListener('click', stepForward);
  elements.reset.addEventListener('click', resetTrace);
  elements.play.addEventListener('click', togglePlayback);
  elements.speed.addEventListener('input', () => {
    state.delay = delayFromRange(elements.speed.value);
    elements.speedLabel.textContent = `${state.delay}ms`;
    if (state.isPlaying) {
      if (state.timer !== null) window.clearTimeout(state.timer);
      state.timer = null;
      scheduleTick();
    }
  });
  elements.size.addEventListener('input', () => {
    const size = Number(elements.size.value);
    elements.sizeValue.textContent = String(size);
    setInputArray(randomArray(size));
  });
  elements.searchTarget.addEventListener('input', () => {
    state.searchTarget = elements.searchTarget.value.trim() === '' ? NaN : Number(elements.searchTarget.value);
    setTrace();
  });
  elements.sortForBinary.addEventListener('click', () => {
    if (state.algorithmId !== 'binary') return;
    setInputArray(state.originalArray.slice().sort((left, right) => left - right));
  });
  elements.sidebarToggle.addEventListener('click', () => {
    if (elements.sidebarToggle.getAttribute('aria-expanded') === 'true') closeSidebar();
    else openSidebar();
  });
  elements.sidebarScrim.addEventListener('click', closeSidebar);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeSidebar();
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const target = event.target;
    if (target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT|BUTTON|A|SUMMARY)$/.test(target.tagName))) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      stepBackward();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      stepForward();
    } else if (event.key === ' ' || event.code === 'Space') {
      event.preventDefault();
      togglePlayback();
    } else if (event.key.toLowerCase() === 'r') {
      resetTrace();
    }
  });
}

function init() {
  state.trace = generateTrace(state.algorithmId, state.originalArray, { target: state.searchTarget });
  elements.speed.value = String(Number(elements.speed.min) + Number(elements.speed.max) - state.delay);
  elements.speedLabel.textContent = `${state.delay}ms`;
  bindEvents();
  render();
}

init();
