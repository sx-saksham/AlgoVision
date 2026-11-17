#include "algorithms.hpp"
#include "visualizer.hpp"

/**
 * Insertion Sort Implementation (FODSA Standard)
 * 
 * Time Complexity:
 *   - Best Case: O(n) (already sorted)
 *   - Average Case: O(n^2)
 *   - Worst Case: O(n^2) (reverse sorted)
 * Space Complexity: O(1) Auxiliary
 * Stable: Yes
 * In-place: Yes
 */
void insertionSort(std::vector<int>& arr, PerformanceStats* stats, Visualizer* vis) {
    int n = static_cast<int>(arr.size());
    if (n <= 1) return;

    if (vis) {
        vis->render(arr, "Initial State", "Starting Insertion Sort. arr[0] is trivially sorted.", {0});
    }

    for (int i = 1; i < n; ++i) {
        int key = arr[i];
        int j = i - 1;

        if (vis) {
            vis->render(arr, "Select Key",
                "Lifting key = " + std::to_string(key) + " from index " + std::to_string(i),
                {i}, '^');
        }

        while (j >= 0) {
            if (stats) stats->comparisons++;

            if (vis) {
                vis->render(arr, "Compare Key",
                    "Comparing key (" + std::to_string(key) + ") with arr[" +
                    std::to_string(j) + "] = " + std::to_string(arr[j]),
                    {j, j + 1}, '?');
            }

            if (arr[j] > key) {
                arr[j + 1] = arr[j];
                if (stats) stats->shifts++;

                if (vis) {
                    vis->render(arr, "Shift Right",
                        "Shifted arr[" + std::to_string(j) + "] (" + std::to_string(arr[j + 1]) +
                        ") right to position " + std::to_string(j + 1),
                        {j, j + 1}, '>');
                }
                --j;
            } else {
                break;
            }
        }

        arr[j + 1] = key;

        if (vis) {
            vis->render(arr, "Insert Key",
                "Inserted key (" + std::to_string(key) + ") into opening at index " +
                std::to_string(j + 1),
                {j + 1}, '=');
        }
    }

    if (vis) {
        vis->render(arr, "Complete", "Insertion Sort complete.", {});
    }
}

