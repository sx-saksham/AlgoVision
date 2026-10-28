# AlgoVision — Final UI polish outcomes

## 1. Preserve the existing product and working implementation
- [x] Improve the existing AlgoVision project using its current implementation as the starting point; do not create a completely new design or discard parts already working.
- [x] Preserve the current overall design language: clean light theme, blue accent, white cards, subtle borders, restrained shadows, compact header, algorithm navigation/sidebar, central sorting visualization, Step Information, playback controls, statistics, and educational material. Keep the visualization and learning experience primary; this is not a generic SaaS dashboard.
- [x] Retain the three current sorting methods—Bubble Sort, Selection Sort, and Insertion Sort—and their working bar visualization, Randomize/Reset, Play/Pause, previous/next stepping, speed and size sliders, comparisons/swaps/shifts, progress, current array, step explanations, pseudocode, and complexity information.
- [x] Do not add frameworks, dependencies, cloud services, databases, API keys, or unrelated features. Keep the current sort engines and Node server unchanged apart from wording/metadata; no genuine integration bug required algorithm logic or server changes.

## 2. Remove the requested unnecessary interface elements
- [x] Header contains only the AlgoVision logo/name and the small tagline “Visualize. Learn. Understand.” Remove Visualizer, Learn, Complexity, and About navigation links; the DSA Tools button; and the theme toggle. Keep one polished light theme.
- [x] Sidebar contains only a small “SORTING ALGORITHMS” heading and selectors for Bubble Sort, Selection Sort, and Insertion Sort. Remove the Searching section, Linear Search and Binary Search, all “Coming Soon” labels and lock icons, and the Quick Tip card.
- [x] Each remaining algorithm selector has a small, consistently sized simple icon, its algorithm name, a short description, and a subtle, clearly visible active state. Avoid emoji and mismatched icon styles.
- [x] Do not display unimplemented features.

## 3. Typography system and component polish
- [x] Use one modern sans-serif font throughout, preferably Inter; if an external font is not practical, use a consistent system sans-serif fallback. Monospace is reserved for pseudocode and suitable technical values.
- [x] Establish consistent CSS variables for font sizes, spacing, colors, borders, and radii; use consistent line heights, spacing, and font weights across the entire interface.
- [x] Follow the requested typography scale: product name 22–24px semibold/bold; main algorithm heading 28–32px semibold/bold; section headings 16–18px semibold; sidebar algorithm names 14–15px semibold; body descriptions 14px; button labels 13–14px medium/semibold; statistic labels 12–13px; statistic values 25–28px semibold/bold; metadata at least 12px where reasonably possible; array indices 11–12px; pseudocode approximately 13–14px.
- [x] Avoid illegibly small text, inconsistent serif/monospace/sans-serif mixing, unnecessary gradients/glow, excessive corner rounding, giant icons, decorative animation, and gratuitous UI elements.

## 4. Main algorithm header and complexity
- [x] At the top of main content show a small algorithm icon, current algorithm name, concise explanation, time complexity, and space complexity. Keep this section compact; the algorithm name is the strongest main-content heading.
- [x] Put the time/space complexity in two compact aligned cards on the right when there is room, wrapping naturally at narrower widths.
- [x] Complexity must be accurate and switch when the algorithm changes.

## 5. Sorting visualization
- [x] Keep the array bar chart as the most important part of AlgoVision. Provide sufficient chart height/width, a shared baseline, consistent bar spacing, proportional scaling, centered bars that do not overflow, clearly readable values near the lower part of bars, and array indices beneath them. Add subtle horizontal grid lines only when they improve readability.
- [x] Use consistent event colors: normal blue; comparing amber/yellow; swapping coral/red; shifted orange; inserted green; current minimum purple; sorted green. Only show legend states relevant to the selected algorithm where practical, and ensure those swatches match the actual bar states.
- [x] Keep bar transitions smooth and subtle without slowing actual playback. The chart remains useful with small and larger arrays; the default eight-bar chart, values, and indices fit the reviewed phone viewport, while larger phone arrays scroll inside the chart.
- [x] Immediately display bars for a valid default array on page load; do not show an empty chart asking the user to randomize first.

## 6. Step Information and live playback status
- [x] Retain a clean right-hand Step Information panel and show playback status, current operation, actual indices/values being compared/swapped/shifted/processed, current array, and a compact recent-event timeline.
- [x] Before playback, show a clean initial state and brief instruction. During playback explain actual events in plain English, not raw internal event names.
- [x] Use clear algorithm-appropriate operation explanations, including Bubble “Comparing 23 and 87. Since 23 is smaller, these elements stay in place”; Selection “Checking 12 against the current minimum, 23. The new minimum is 12”; and Insertion “Moving 64 one position to the right to make room for 23” when these reflect the real event values.
- [x] Where feasible, show a pseudocode or relevant code line matching the current operation. Keep the panel readable and compact; avoid redundant metadata.

## 7. Playback controls and statistics
- [x] Keep Randomize, Reset, Previous, Play/Pause, Next, speed slider, and array-size slider. Use consistent heights, label typography, spacing, and icon sizes. Play is the primary blue button; secondary controls use neutral styling, and Randomize uses restrained navy.
- [x] Show the true delay in milliseconds and communicate slower/faster direction. Disable controls when unavailable; Previous is disabled before the first event and Play changes to Pause during playback. Keep controls usable and avoid awkward wrapping at normal desktop widths.
- [x] Show four consistent cards: Comparisons, Swaps, Shifts, and Progress. Each has consistent label, readable value, padding, and alignment with minimal decoration.
- [x] Counters reflect actual events. Bubble and Selection Sort do not accumulate Insertion Sort shifts; Insertion counts shifts separately from swaps. Progress accurately reflects the current location in the event sequence.

## 8. Learning section
- [x] Below statistics, show two balanced cards: Algorithm Explanation with a few short numbered steps and current conceptual-step highlight where appropriate; and Pseudocode with clean indentation and readable syntax highlighting.
- [x] Both cards update when the selected algorithm changes. Use consistent headings, padding, borders, and spacing. Keep explanations concise so they support rather than overwhelm the visualization.

## 9. Desktop, tablet, and mobile behavior
- [x] At desktop sizes such as 1366×768 or 1536×864, the main interface is visible and well balanced where reasonably possible; chart receives most horizontal space; sidebar remains compact; inspector supports readable explanations; controls and statistics align cleanly; avoid excessive unused space and unnecessary vertical scrolling.
- [x] On tablets, allow the sidebar and inspector to reposition naturally. On mobile, stack the interface into one column, keep the chart usable and text readable, keep controls accessible, and prevent horizontal overflow. Do not merely shrink desktop UI until everything is tiny.

## 10. Preserve functionality and verify the actual repository
- [x] Verify all three algorithm selectors; algorithm switching updates description, pseudocode, complexity, and visualization; Randomize creates a new array; Reset restores the correct initial state; Play/Pause, Previous/Next, speed, and array-size controls work; counters/progress update; inspector matches the current event; and animation timers never overlap.
- [x] Verify that all three algorithms continue to produce correctly sorted arrays. Run the existing algorithm tests, test the main controls in a real browser, check the immediate initial bars, inspect desktop/mobile, inspect all three algorithms, and fix visible or functional defects before declaring completion. Confirm there are no JavaScript console errors.
- [x] Continue to run locally with the project's existing Node.js setup. Do not add dependencies or replace the current implementation with a static mockup.

## 11. Existing C++/API requirement — repository mismatch
- [ ] The brief states that the actual algorithms are C++, that Node runs compiled programs, and that API endpoints already exist. The current checked-out project tree instead contains browser-local JavaScript trace generators and a Node static-file server; no C++ source, compiled sorting binaries, or sorting API endpoints were present. Do not fabricate those components or claim this UI polish preserves them. Keep the implemented JS algorithms/server intact, and leave this requirement unresolved until the actual C++/API source is provided or made available.


# Playback layout stability — follow-up request

## 12. Keep the page and main panels stationary during playback
- [x] “Keep the page layout completely stable during playback.” “The overall page height and the positions of the main interface panels must not change as sorting events occur.” “The chart, playback controls, statistics cards, and Step Information panel must remain stationary.” “Only the intended visualization elements, such as bar heights, bar colors, and relevant text values, should change.”
- [x] “Give the visualization container a stable height.” “Ensure bar labels, array indices, and the chart baseline do not cause layout changes.” “Reserve sufficient space for the Step Information panel's operation descriptions and event timeline.” “Prevent changing descriptions, pseudocode highlights, and timeline entries from repeatedly increasing or decreasing the panel height.” “Use appropriate `min-height`, fixed layout constraints where suitable, and `overflow` rules where necessary.” “Do not solve this by hiding important information or making the entire panel scroll unnecessarily.”
- [x] “Comparing, swapping, shifting, inserting, and sorted states must not change bar dimensions, borders, margins, padding, or surrounding element sizes.” “Use `outline`, `box-shadow`, or color changes for highlighting where appropriate.” “Ensure CSS transitions animate only the intended properties.”

## 13. Preserve user scrolling and stable playback across sizes and algorithms
- [x] “Check whether focus changes, automatically scrolled elements, `scrollIntoView()`, or DOM updates are causing the viewport to move during playback.” “Remove unnecessary automatic scrolling.” “Do not repeatedly move keyboard focus during animation.” “Preserve normal user scrolling when they deliberately scroll the page.”
- [x] “Changing the array-size slider may intentionally change the number and width of bars, but it must not cause repeated page jumping during playback.” “Playback should remain stable for all three algorithms: Bubble Sort, Selection Sort, and Insertion Sort.”
- [x] Evidence gathered: “Load the application and start with a randomized array.” “Click Play and observe the page throughout the entire sorting animation.” “Repeat with all three algorithms.” “Test different array sizes.” “Confirm that the page does not jump vertically while the animation runs.” “Check the browser console for errors.” Inspect the actual CSS and JavaScript to identify the root cause. Implement the smallest appropriate fix rather than rewriting the UI or animation engine. Do not modify the sorting algorithms or backend unless a genuine cause is found there. “The task is not complete until the layout remains visually stationary throughout playback.” Full browser Play runs completed at 1, 8, and 24 elements for each of Bubble, Selection, and Insertion Sort; all monitored panel position/size deltas and document-height changes were zero. A separate deliberately scrolled 24-item Insertion playback preserved its exact scroll offset, the console had no errors, and responsive desktop/tablet/mobile screenshots were reviewed.


# Compact edge-to-edge sorting chart — follow-up request

## 14. Compact visualization header and use chart height effectively
- [x] Keep the array heading, element count, legend, and array-size slider in a compact header row.
- [x] Start the bar chart immediately below this header.
- [x] Minimize unnecessary vertical padding and margins inside the visualization panel.
- [x] The bars should use the available chart height efficiently, without leaving a huge empty area above or around them.
- [x] Keep the chart visually balanced at different array sizes.

## 15. Make the bars touch and fill the available chart width
- [x] Bars must sit directly next to each other, with zero or almost zero horizontal gaps.
- [x] Use the full available chart width for the bars.
- [x] Distribute the width dynamically according to the array size.
- [x] For 8 elements, the bars should be wide and touch each other.
- [x] For 15 elements, the bars should become narrower while still touching.
- [x] For larger arrays, continue shrinking the bars as needed rather than introducing large gaps.
- [x] Keep small, readable integer labels at the bottom of each bar. Adjust their font size for larger arrays if necessary.
- [x] Preserve the existing colors and smooth animations for comparisons, swaps, and sorted elements.

## 16. Improve chart proportions, baseline, and bar alignment
- [x] Make the chart area compact and purposeful.
- [x] The bars should occupy most of the available horizontal space and a sensible amount of the vertical space.
- [x] Keep the baseline directly beneath the bars, with index labels immediately below it.
- [x] Remove excessive whitespace between the chart header and the baseline/bar area.
- [x] Ensure bars remain correctly aligned when their heights change during animation.

## 17. Prevent page movement during animation
- [x] Prevent layout shifts during animation.
- [x] Give the chart a stable height.
- [x] Do not allow changing labels, highlighted states, counters, or the step inspector to change the overall page height.
- [x] Reserve sufficient space for dynamic text before playback starts.
- [x] Animate only the intended visual properties of the bars, such as color and position, without affecting document layout.
- [x] Keep the page's scroll position stable during playback.

## 18. Preserve existing behavior and responsive layouts
- [x] Do not break Bubble Sort, Selection Sort, or Insertion Sort.
- [x] Do not break Play, Pause, Step, Reset, or Randomize.
- [x] Do not break the speed control or array-size control.
- [x] Do not break comparisons, swaps, shifts, or progress counters.
- [x] Do not break Step Information, Current Array, or Recent Events.
- [x] Do not break responsive desktop or mobile layouts.

## 19. Required completion evidence
- [x] After implementing the changes, test the chart with 8 and 15 elements.
- [x] Test all three algorithms during playback.
- [x] Confirm the bars touch each other or have only a negligible gap.
- [x] Confirm the space between the legend and bars is minimal.
- [x] Confirm the page does not jump vertically during animation.
- [x] Confirm the layout remains responsive.
- [x] Inspect the existing HTML and CSS before changes; modify the actual layout and chart styles rather than adding arbitrary overrides that conflict with existing rules.
- [x] Browser evidence: Full randomized Play runs for Bubble, Selection, and Insertion Sort at both 8 and 15 elements all completed; every measured horizontal gap was zero (floating-point error below 1e-12), labels fit their bars, and square bar corners preserve contact. The tallest bar began approximately 23px below the chart header at the tested desktop viewport. Chart, workspace, Step Information, controls, statistics, and learning-panel position/size deltas were zero; document height and scroll remained unchanged throughout each run. A separate 24-element check confirmed 24 bars fill the chart with zero gap and readable labels. Desktop (1536×864), tablet (768×1024), and mobile (390×844) screenshots were reviewed; mobile chart stayed within the viewport. Play/Pause, Previous/Next, Reset, Randomize, size/speed controls, and progress were regression-checked. No JavaScript errors occurred in the interaction checks.


# Restore centered, spaced bar-group proportions — follow-up request

## 20. Restore a small consistent visible gap
- [x] Bars must have a small, consistent gap between adjacent bars. Do NOT make the bars touch each other. Do NOT stretch the bars to fill the entire chart width.
- [x] Use approximately 3–5px gaps between bars on desktop, adjusting slightly for smaller screens or larger arrays.
- [x] Keep the bars grouped together in a visually balanced arrangement, with reasonable empty space on the left and right.

## 21. Calculate natural bar widths and keep values readable
- [x] Calculate bar widths based on the number of elements and the intended width of the bar group, not the full width of the chart.
- [x] For 6–8 elements, use comfortably wide bars with visible gaps.
- [x] For 15 elements, reduce bar width proportionally while preserving the same visual style.
- [x] Keep the bars aligned along a shared baseline.
- [x] Keep each integer value readable near the bottom of its bar.
- [x] Preserve the original smooth comparison, swapping, and sorted-state animations.

## 22. Keep compact vertical spacing and natural bar proportions
- [x] Keep the array title, element count, legend, and array-size control in a compact header.
- [x] Leave only a small amount of space between this header and the top of the bars. Do not leave a huge empty area above the bars.
- [x] The graph should use its available height naturally without stretching the bars vertically.

## 23. Keep the graph stable without changing other functionality
- [x] Reserve a fixed chart height so the page does not jump during playback.
- [x] Changing bar colors, values, or algorithm states must not move the surrounding page.
- [x] Do not change the height of the chart or its parent containers during animation.
- [x] Do not change the algorithm implementations, controls, counters, or Step Information. Do not redesign the overall interface.

## 24. Verify the corrected reference proportions
- [x] Inspect the existing chart CSS and JavaScript before editing. Find the bar container's width, gap, alignment, and height calculations. Make a targeted fix instead of adding conflicting CSS overrides.
- [x] Test 6–8 and 15 elements; confirm bars have visible 3–5px desktop gaps, form a centered group with side margins, and scale width according to the group width instead of filling the plot.
- [x] Confirm the chart header and bars have only a small top gap and that bar height uses natural proportional scaling.
- [x] Exercise all three algorithms during playback and verify chart and surrounding-container heights, panel positions, and page scrolling remain stable.
- [x] Confirm desktop and mobile remain responsive and controls, counters, and the Step Information panel remain functional.


## Current centered-group correction — observed evidence

At a 1280×1100 desktop viewport, settled 6-, 8-, and 15-bar layouts measured 4px, 4px, and 3.5px between neighboring bar rectangles, respectively. The centered groups occupied 72.9%, 84%, and 84% of the baseline width with equal side margins; all value labels fit. The tallest bar was 14.2px below the compact header, and its measured height matched the fixed 900×340 viewBox scale rather than the chart container’s vertical stretch. Full randomized Play runs for Bubble, Selection, and Insertion Sort at both 8 and 15 elements all finished; measured panel geometry, document height, and scroll deltas were zero. Desktop, tablet, and phone captures were reviewed, and the app raised no JavaScript errors during the browser interaction checks.



# Four algorithm extensions — user-selected browser-local implementation

The checked-out project contains browser-local JavaScript generators and a static Node server, not the C++/API backend described in the source brief. Per user selection, extend this existing project using its current JavaScript trace-generator and shared animation architecture; do not create a second project or claim C++/API integration. The following UI, event behavior, algorithm semantics, and test requirements apply to the current project-compatible implementation.

## 25. Merge Sort and Quick Sort
- [x] Add Merge Sort to the existing browser-local algorithm engine. Show the array divided into smaller subarrays; left and right sections being merged; compared elements; elements written into correct positions; and the array gradually becoming sorted. Use distinct states for normal, compared, active left/right subarrays where useful, being written/merged, and completed elements. The step inspector explains each merge operation in understandable language. Track comparisons and array writes separately; do not count writes as swaps. Display time complexity O(n log n) and auxiliary space O(n).
- [x] Add Quick Sort to the existing browser-local algorithm engine. Show the selected pivot; comparisons with it; partition boundaries; swaps during partitioning; array after each partition; and recursive subarrays being processed. Use distinct states for normal, pivot, comparing, swapping, partition boundaries where useful, and finalized/sorted pivot positions. Explain why each comparison or swap occurs. Track comparisons and swaps accurately; pivot selection is not a swap. Display average O(n log n), worst O(n²), and auxiliary-space explanation: typically O(log n) average recursion depth for balanced partitions and potentially O(n) worst-case depth.

## 26. Linear and Binary Search
- [x] Add Linear Search with an integer target input. Inspect elements one by one from left to right; distinguish the current element from previously checked elements; highlight a match and report its index; clearly report “Target not found” when absent; track comparisons accurately; display O(n) time and O(1) auxiliary space. Reuse the existing Play/Pause, Step, Reset, and speed controls. The array need not be sorted.
- [x] Add Binary Search with an integer target input and enforce the sorted-input precondition. If the current input is unsorted, do not perform an invalid search; provide a clear option to sort it before starting and explain that sorting changes array order. Show current low, mid, and high indices; highlight the inspected midpoint; indicate the eliminated half; update the interval after each comparison; highlight a match and report its index; clearly report absent targets; track comparisons accurately; display O(log n) time and O(1) auxiliary space for iterative search. Handle duplicates consistently and document that this implementation returns the first matching occurrence. Reuse Play/Pause, Step, Reset, and speed controls.

## 27. Integrate algorithms into existing interface and shared trace engine
- [x] Integrate Merge Sort, Quick Sort, Linear Search, and Binary Search into the existing sidebar, grouped under Sorting Algorithms (Bubble, Selection, Insertion, Merge, Quick) and Searching Algorithms (Linear, Binary), using existing icon and visual conventions. Remove “Coming Soon”/disabled labels for implemented algorithms. Do not add navigation pages or unrelated features.
- [x] Selecting any algorithm updates its name/icon, description, complexity, chart, event legend, step inspector, pseudocode, applicable counters/progress, and algorithm-specific controls such as search target. Preserve the existing design, UI, and three working sorting algorithms; keep the interface responsive.
- [x] Extend the existing structured event system rather than creating separate animation systems. Events contain enough information to reproduce their intermediate state. Use only necessary, consistently-defined events among compare, swap, write, pivot selection, partition, divide, merge, search midpoint, search interval update, found, not found, and complete. The shared Step advances exactly one event; Play executes events in order; Pause stops immediately; Reset restores the original input and clears counters; Randomize creates a new valid input; algorithm changes stop playback and clear stale algorithm-specific state. Prevent overlapping timers and page movement during playback.

## 28. Regression evidence and architecture limitation
- [x] Test all seven algorithms. For sorting: unsorted, already sorted, reverse-sorted, duplicates, negative values, single element, smallest supported size, and largest supported size; verify sorted output. For searches: targets at beginning/middle/end, absent targets, duplicates, negative values, and single-element arrays; verify results and comparison counts. Verify Binary Search does not search an unsorted array unless the user chooses to sort it first. Verify JSON/backend claims are not made for this browser-local path; test event state reconstruction, counters, controls, state clearing on algorithm changes, desktop/mobile rendering, and browser console where executed. Report only tests actually run and disclose remaining limitations.
- [x] Keep the original sort behavior intact and avoid unrelated auth, databases, leaderboards, AI, or external services. The selected implementation path does not implement the attachment’s requested C++ generators, JSON API endpoints, Node algorithm routes, or existing C++ backend integration; document this limitation transparently.


# Step Information panel refinement — follow-up request

## 29. Make the current operation clear and readable
- [x] Make the current operation the visual focus. Display a clear operation title such as “Comparing elements”, “Swapping elements”, “Shifting element”, “Found minimum”, or “Target found”; show a concise, understandable explanation of what is happening and why; display relevant indices and values clearly; use subtle color-coded badges for operation types; avoid oversized decorative elements, excessive borders, and unnecessary empty space.

## 30. Improve the current-array and recent-event displays
- [x] Display array values in a compact, readable sequence with consistent spacing, highlight relevant elements using the same colors as the visualization, keep the array usable for larger supported input sizes, and prevent value overflow or page shifts.
- [x] Display recent events as a compact chronological list with a short description and appropriate visual indicator for each event. Clearly distinguish comparisons, swaps, shifts, insertions, minimum selections, successful searches, and completion events where applicable. Highlight the current event, and keep the list readable without making the panel unnecessarily tall.

## 31. Keep the Step Information panel and page stable
- [x] The Step Information panel must not jump, resize unpredictably, or cause the page to move during animation. Reserve appropriate space for dynamic descriptions; use stable heights or sensible minimum heights; prevent long descriptions from changing overall page layout; and, if the recent-events list grows, scroll within that list instead of expanding the page indefinitely. Playback must not cause layout shifts.

## 32. Preserve the design, algorithms, responsive behavior, and accessibility
- [x] Polish rather than replace the existing interface. Establish consistent typography for headings, body text, labels, and secondary information; standardize font weights, line heights, padding, margins, gaps, and alignment; keep borders subtle, radii consistent, the existing clean light style, blue primary accents, and restrained operation-state colors; avoid unnecessary gradients, glassmorphism, excessive shadows, neon effects, generic dashboards, and unhelpful decoration.
- [x] Do not redesign or change the graph’s existing bar spacing, widths, dimensions, layout, value/index labels, state colors, or animation. Do not break the seven algorithms; Randomize/Reset; Play/Pause; Previous/Next; speed/size controls; applicable counters; progress; explanations; pseudocode/current-line highlighting; algorithm-specific details; search behavior/results; or responsive layouts. Adapt information for the selected algorithm, showing relevant search information rather than sorting-specific counters. Do not replace real algorithm events with placeholders or hardcoded demonstrations.
- [x] Modify only necessary files, preserve architecture and algorithm logic, avoid unnecessary dependencies, and maintain semantic HTML and visible keyboard-focus states. At normal browser zoom, keep the panel readable at desktop, laptop, tablet, and mobile sizes; prevent horizontal overflow, overlapping controls, clipped text, and unpredictable page movement; stack the panel as needed on small screens.
- [x] Run the existing test suite and verify all seven algorithms, playback/pause/stepping/reset/randomization/speed, event-driven inspector updates for comparisons/swaps/shifts/insertions/searches, correct sorting-vs-searching information, layout stability during playback, and desktop/mobile behavior. Report only checks actually run, files changed, and any remaining issues.

### Verification evidence
- `npm test` passed: 645 sorting traces and 20 search runs; JavaScript syntax and `git diff --check` passed.
- Browser interactions verified operation details, chronological/current event indication, found/not-found search results, search-specific counter visibility, playback controls, and 24-item horizontal scrolling.
- Desktop/laptop/tablet/mobile widths (1440, 1024, 768, 390, 320px) had no page horizontal overflow; panel height/top remained stable through playback for all seven algorithms. No application console errors were observed. The chart CSS/rendering and `algorithms.js` were unchanged.

# Final Step Information and typography polish — 2026-10-28

## 33. Make Step Information readable without nested description scrolling
- [x] Remove unnecessary nested scrolling inside the current-operation description; let operation descriptions wrap naturally and remain readable, with a clear visual hierarchy between title and explanation. Display relevant indices and values compactly and readably. Increase array-value readability while keeping consistent spacing. Improve recent events with readable descriptions and subtle color indicators. Keep the layout stable during playback, avoid a large empty section before events appear, and scroll within the recent-events section rather than expanding the page if its list becomes long. Do not simply enlarge the panel without improving its internal layout.

## 34. Apply the requested typography scale without changing the visual style
- [x] Use a consistent typography scale: main algorithm heading 28–32px; section headings 16–18px; explanations/body text 14–15px; array values 13–14px; secondary labels approximately 12px; pseudocode 13–14px where space permits. Keep font families, weights, and line heights consistent and preserve the current overall visual style.

## 35. Preserve the graph and application behavior during this final polish
- [x] Preserve the graph exactly in principle: do not change bar widths or spacing, graph rendering logic, value/index labels, operation-state colors, graph dimensions unnecessarily, or animation behavior; bars continue to touch or nearly touch as they do now. Preserve the sidebar and do not add navigation items or decorative elements. Preserve all seven algorithms and randomization, reset, playback, stepping, speed controls, array-size controls, counters, explanations, pseudocode, and algorithm-specific behavior. Do not change algorithms unless a genuine bug is discovered.

## 36. Prevent layout shifts and verify the requested states
- [x] During playback, the page must not jump vertically, the graph must not move when the operation description changes, the inspector must not expand and collapse, and long event descriptions must not disrupt the interface. Run the existing test suite and check the interface at 100% browser zoom; verify the panel before playback, during comparisons and swaps, after completion, and on at least one searching algorithm. Report the actual files changed and tests performed.

### Verification evidence
- Files changed: `public/styles.css` and this `TODO.md` only. `public/app.js`, `public/algorithms.js`, graph rendering selectors, SVG/bar styling, and sidebar markup were not changed.
- `npm test` passed: 645 sorting traces and 20 search runs. `node --check` passed for app, algorithm, and test JavaScript; `git diff --check` passed.
- Preview browser verified at 100% zoom (`devicePixelRatio` 1, 1280px viewport): ready, comparison, swap, completion, Linear Search comparison, and found states. The description and metadata rows have no nested scrolling; details wrap; array values render at 13px. The panel and graph retained the same top and height across these states.
- Real timed playback was sampled 94 times over 1.1 seconds: inspector and graph top/height, page height, and scroll position all had zero-pixel variation. Responsive checks at 1024, 768, 390, and 320px reported no horizontal overflow; panel heights remained fixed at each width.
