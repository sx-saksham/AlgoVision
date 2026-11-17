#include "algorithms.hpp"
#include "visualizer.hpp"

/**
 * Linear Search Implementation (FODSA Standard)
 * 
 * Time Complexity:
 *   - Best Case: O(1) (target is at index 0)
 *   - Average Case: O(n)
 *   - Worst Case: O(n) (target at end or absent)
 * Space Complexity: O(1) Auxiliary
 * Requires Sorted Input: No
 * 
 * Returns index of first occurrence, or -1 if not found.
 */
int linearSearch(const std::vector<int>& arr, int target, PerformanceStats* stats, Visualizer* vis) {
    int n = static_cast<int>(arr.size());

    if (vis) {
        vis->render(arr, "Start Search",
            "Starting Linear Search for target = " + std::to_string(target), {});
    }

    for (int i = 0; i < n; ++i) {
        if (stats) stats->comparisons++;

        if (vis) {
            vis->render(arr, "Probe",
                "Checking index " + std::to_string(i) + " (value = " +
                std::to_string(arr[i]) + ") against target " + std::to_string(target),
                {i}, '?');
        }

        if (arr[i] == target) {
            if (vis) {
                vis->render(arr, "Target Found",
                    "Target " + std::to_string(target) + " found at index " + std::to_string(i),
                    {i}, '!');
            }
            return i;
        }
    }

    if (vis) {
        vis->render(arr, "Not Found",
            "Target " + std::to_string(target) + " not present in array.", {});
    }
    return -1;
}

