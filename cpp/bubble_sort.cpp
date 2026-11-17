#include "algorithms.hpp"
#include "visualizer.hpp"
#include <utility>

/**
 * Bubble Sort Implementation (FODSA Standard)
 * 
 * Time Complexity:
 *   - Best Case: O(n) (when already sorted, early exit with swapped flag)
 *   - Average Case: O(n^2)
 *   - Worst Case: O(n^2) (reverse sorted)
 * Space Complexity: O(1) Auxiliary
 * Stable: Yes
 * In-place: Yes
 */
void bubbleSort(std::vector<int>& arr, PerformanceStats* stats, Visualizer* vis) {
    int n = static_cast<int>(arr.size());
    if (n <= 1) return;

    if (vis) {
        vis->render(arr, "Initial State", "Starting Bubble Sort on input array.", {});
    }

    for (int end = n - 1; end > 0; --end) {
        bool swapped = false;

        for (int j = 0; j < end; ++j) {
            if (stats) stats->comparisons++;

            if (vis) {
                vis->render(arr, "Compare",
                    "Comparing arr[" + std::to_string(j) + "] = " + std::to_string(arr[j]) +
                    " and arr[" + std::to_string(j + 1) + "] = " + std::to_string(arr[j + 1]),
                    {j, j + 1}, '?');
            }

            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
                swapped = true;
                if (stats) stats->swaps++;

                if (vis) {
                    vis->render(arr, "Swap",
                        "Swapped out-of-order elements: " + std::to_string(arr[j]) +
                        " <-> " + std::to_string(arr[j + 1]),
                        {j, j + 1}, '<');
                }
            }
        }

        if (vis) {
            vis->render(arr, "Pass Complete",
                "Element at index " + std::to_string(end) + " (" + std::to_string(arr[end]) +
                ") is now locked in its sorted position.",
                {end}, '=');
        }

        // Optimization: Early exit if no swaps occurred in this pass
        if (!swapped) {
            if (vis) {
                vis->render(arr, "Early Exit",
                    "No elements were swapped during pass. Array is fully sorted.", {});
            }
            break;
        }
    }

    if (vis) {
        vis->render(arr, "Complete", "Bubble Sort complete.", {});
    }
}

