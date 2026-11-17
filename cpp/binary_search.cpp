#include "algorithms.hpp"
#include "visualizer.hpp"

/**
 * Binary Search Implementation (FODSA Standard)
 * Finds the first occurrence of target in an ascending-ordered array.
 * 
 * Time Complexity:
 *   - Best Case: O(1)
 *   - Average Case: O(log n)
 *   - Worst Case: O(log n)
 * Space Complexity: O(1) Auxiliary
 * Requires Sorted Input: Yes (strictly ascending or non-decreasing)
 * 
 * Returns index of first occurrence, or -1 if not found.
 */
int binarySearch(const std::vector<int>& arr, int target, PerformanceStats* stats, Visualizer* vis) {
    int n = static_cast<int>(arr.size());
    if (n == 0) return -1;

    int low = 0;
    int high = n - 1;

    if (vis) {
        vis->render(arr, "Start Binary Search",
            "Initial range [low=" + std::to_string(low) + " .. high=" +
            std::to_string(high) + "] for target " + std::to_string(target),
            {low, high}, ':');
    }

    while (low <= high) {
        // Prevents integer overflow: low + (high - low) / 2
        int mid = low + (high - low) / 2;
        if (stats) stats->comparisons++;

        if (vis) {
            vis->render(arr, "Inspect Midpoint",
                "Range [" + std::to_string(low) + ".." + std::to_string(high) +
                "]. Inspecting mid=" + std::to_string(mid) + " (val=" +
                std::to_string(arr[mid]) + ") vs target=" + std::to_string(target),
                {mid}, '?');
        }

        if (arr[mid] < target) {
            if (vis) {
                vis->render(arr, "Discard Left Half",
                    "arr[" + std::to_string(mid) + "] = " + std::to_string(arr[mid]) +
                    " < " + std::to_string(target) + ". Discarding left half; low -> " +
                    std::to_string(mid + 1),
                    {mid}, '>');
            }
            low = mid + 1;
        } else {
            // arr[mid] >= target: search left half to find the first occurrence
            if (vis) {
                vis->render(arr, "Narrow Right Half",
                    "arr[" + std::to_string(mid) + "] = " + std::to_string(arr[mid]) +
                    " >= " + std::to_string(target) + ". Keeping left half to locate first occurrence; high -> " +
                    std::to_string(mid - 1),
                    {mid}, '<');
            }
            high = mid - 1;
        }
    }

    // After loop, if target exists, 'low' points to the first occurrence
    if (low < n && arr[low] == target) {
        if (vis) {
            vis->render(arr, "Target Found",
                "First occurrence of target " + std::to_string(target) +
                " found at index " + std::to_string(low),
                {low}, '!');
        }
        return low;
    }

    if (vis) {
        vis->render(arr, "Target Not Found",
            "Target " + std::to_string(target) + " not present in array.", {});
    }
    return -1;
}

