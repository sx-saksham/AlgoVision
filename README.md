# AlgoVision — Visualize. Learn. Understand.

AlgoVision is an interactive algorithm visualizer built on the project’s existing vanilla JavaScript frontend and Node static-file server. This extension adds Merge Sort, Quick Sort, Linear Search, and Binary Search to the existing Bubble, Selection, and Insertion sorts while preserving the shared chart, inspector, playback controls, counters, responsive layout, and learning panels.

## Added behavior

**Merge Sort** records recursive divide ranges, merges, front-to-front comparisons, and each write-back as its own reversible array snapshot. Writes have their own counter and are never counted as swaps. The chart distinguishes left/right ranges and newly written values. Its displayed complexity is O(n log n) time in all cases and O(n) auxiliary space.

**Quick Sort** uses the last value in each range as a Lomuto partition pivot. Events show pivot selection, comparisons, actual swaps, completed pivot partitions, and recursive ranges in the inspector. Pivot selection is not counted as a swap. Complexity is average O(n log n), worst O(n²); the note explains average O(log n) and worst O(n) recursion depth.

**Linear Search** accepts an integer target and checks the array left-to-right without requiring sorted input. Checked values remain visually distinct from the current probe; the first match returns its index, otherwise the result says “Target not found.” Complexity is average/worst O(n), best O(1), and auxiliary space O(1).

**Binary Search** refuses an unsorted input. In that state, the inspector explains the ascending-order requirement and the array panel exposes “Sort array first” plus a note that sorting changes the order. Only the user’s explicit action sorts the current values and starts a fresh trace. During search, low/mid/high values, the active midpoint, and eliminated ranges are shown; duplicates return the first occurrence. Complexity is average/worst O(log n), best O(1), and auxiliary space O(1).

All seven algorithms use the same event snapshots and single guarded playback timer. Next advances one event, Previous reverses one event, Play/Pause follows the trace order, Reset returns to the current run’s baseline and clears counters, and Randomize creates a new integer input. Counters are shown only when meaningful to the selected algorithm: comparisons always, swaps for Bubble/Selection/Quick, shifts for Insertion, and writes for Merge. Search results and algorithm-specific target controls update with algorithm selection.

## Project structure

```text
algovision/
├── package.json              # Dependency-free start and test scripts
├── server.js                 # Node built-in static-file server
├── README.md                 # Usage, architecture, validation, limitations
├── TODO.md                   # Detailed requested outcomes and status
├── app.config.ts             # Project identity/logo metadata
├── tests/
│   └── algorithms.test.cjs   # Node built-in sort/search trace tests
└── public/
    ├── index.html            # Accessible shell, grouped algorithm selector, visualizer
    ├── styles.css            # Existing light UI, responsive layout, trace-state colors
    ├── app.js                # Shared chart, inspector, controls, counters, learning UI
    ├── algorithms.js         # Seven pure JavaScript trace generators and metadata
    ├── algovision-mark.svg   # Site mark and favicon
    └── manus-routes.json     # Single-page route declaration
```

## Run locally

Requires Node.js and a browser. There are no npm dependencies to install and no C++ compiler is used by this project path.

For a private laptop-local run, bind the server to loopback:

- PowerShell: `$env:HOST='127.0.0.1'; npm start`
- Windows Command Prompt: `set HOST=127.0.0.1&& npm start`
- macOS/Linux: `HOST=127.0.0.1 npm start`

Open `http://localhost:3000`. Run `npm test` to execute the algorithm regression suite. Stop the server with `Ctrl+C`. The managed Preview uses the configured port 3000; the static Node server defaults to `0.0.0.0` when `HOST` is unset.

## Validation executed

- `npm test` passes **645 sorting traces** (129 input cases × 5 sorts) and **20 search runs** (10 cases × 2 searches), plus an unsorted Linear Search case. Sorting coverage includes unsorted, already sorted, reverse sorted, duplicates, negative values, empty/single/two-element arrays, the 24-item maximum, and 120 seeded random inputs.
- Tests verify ascending outputs, input immutability, unique visual tokens in every event snapshot, valid event indices, comparison/swap/shift/write counters, Quick Sort swap replay, Merge Sort destination-only write events, Selection Sort inspection indices, and Merge/Quick structural events.
- Search tests cover targets at the start, middle and end, absent targets, duplicates/first occurrence, negative values, single-element and empty arrays; they verify comparison counts, unchanged arrays, probe/interval state, integer target validation, Linear Search on unsorted input, and rejection of unsorted Binary Search input.
- Browser checks passed **22 interaction assertions**, including complete traces for all five sorts; Linear Search found/not-found; Binary Search unsorted refusal, explicit sorting and successful first-match result; correct Merge write-vs-swap metrics; and Play/Pause, Reset, and Randomize.
- **Six additional 390px checks passed** in a same-origin mobile-width iframe: Linear target controls fit inside the array card, neither search mode has horizontal page overflow, and the mobile sidebar remains a drawer. A separate mobile-width run confirmed switching algorithms clears counters and cancels playback immediately without delayed advancement.
- Desktop (1536×1000), tablet (768×1024), and mobile (390×844) screenshots were reviewed. Browser console inspection after interaction tests showed no application runtime errors. The static route manifest, all requested static assets, unique DOM IDs, and JavaScript ID references also passed checks.
- JavaScript syntax checks pass for the app controller, algorithm module, Node static server, and test runner. No algorithm API/JSON endpoint is claimed or tested because this selected browser-local path adds none.

## Architecture/API limitation

The supplied follow-up brief described existing C++ implementations, a Node API pattern and JSON endpoints. They are not present in the checked-out AlgoVision project: the repository contains browser-local JavaScript algorithms and a Node static-file server only. As selected by the user, this extension follows the project that actually exists and implements all four new generators in `public/algorithms.js`; it does **not** add C++ sources, compile programs, algorithm API routes, or JSON API endpoints. The only server endpoints remain the existing static-file GET/HEAD responses. If C++/API integration is later required, the original backend source/build and API contract must be supplied or separately authorized for creation.

No authentication, database, leaderboard, AI service, external dependency, or additional page was added.
