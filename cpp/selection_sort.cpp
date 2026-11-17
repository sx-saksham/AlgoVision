#include "algorithms.hpp"
#include "visualizer.hpp"
#include <utility>

/**
 * Selection Sort Implementation (FODSA Standard)
 * 
 * Time Complexity:
 *   - Best Case: O(n^2)
 *   - Average Case: O(n^2)
 *   - Worst Case: O(n^2)
 * Space Complexity: O(1) Auxiliary
 * Stable: No (default array implementation)
 * In-place: Yes
 */
void selectionSort(std::vector<int>& arr, PerformanceStats* stats, Visualizer* vis) {
    int n = static_cast<int>(arr.size());
    if (n <= 1) return;

    if (vis) {
        vis->render(arr, "Initial State", "Starting Selection Sort on input array.", {});
    }

    for (int start = 0; start < n - 1; ++start) {
        int minIdx = start;

        if (vis) {
            vis->render(arr, "New Minimum",
                "Setting initial minimum candidate for unsorted prefix at index " +
                std::to_string(start) + " (" + std::to_string(arr[start]) + ")",
                {start}, '*');
        }

        for (int j = start + 1; j < n; ++j) {
            if (stats) stats->comparisons++;

            if (vis) {
                vis->render(arr, "Compare",
                    "Comparing arr[" + std::to_string(j) + "] = " + std::to_string(arr[j]) +
                    " with current min arr[" + std::to_string(minIdx) + "] = " + std::to_string(arr[minIdx]),
                    {j, minIdx}, '?');
            }

            if (arr[j] < arr[minIdx]) {
                minIdx = j;

                if (vis) {
                    vis->render(arr, "Updated Minimum",
                        "New minimum found: arr[" + std::to_string(minIdx) + "] = " +
                        std::to_string(arr[minIdx]),
                        {minIdx}, '!');
                }
            }
        }

        if (minIdx != start) {
            std::swap(arr[start], arr[minIdx]);
            if (stats) stats->swaps++;

            if (vis) {
                vis->render(arr, "Swap Minimum",
                    "Placed minimum element " + std::to_string(arr[start]) +
                    " at sorted position " + std::to_string(start),
                    {start, minIdx}, '=');
            }
        } else {
            if (vis) {
                vis->render(arr, "In Place",
                    "Minimum element " + std::to_string(arr[start]) +
                    " is already at index " + std::to_string(start),
                    {start}, '=');
            }
        }
    }

    if (vis) {
        vis->render(arr, "Complete", "Selection Sort complete.", {});
    }
}

