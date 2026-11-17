#include "algorithms.hpp"
#include "visualizer.hpp"
#include <utility>

namespace {

int partition(std::vector<int>& arr, int low, int high, PerformanceStats* stats, Visualizer* vis) {
    int pivot = arr[high];
    int boundary = low;

    if (vis) {
        vis->render(arr, "Select Pivot",
            "Range [" + std::to_string(low) + ".." + std::to_string(high) +
            "]. Selected pivot arr[" + std::to_string(high) + "] = " + std::to_string(pivot),
            {high}, 'P');
    }

    for (int j = low; j < high; ++j) {
        if (stats) stats->comparisons++;

        if (vis) {
            vis->render(arr, "Compare Pivot",
                "Comparing arr[" + std::to_string(j) + "] = " + std::to_string(arr[j]) +
                " with pivot " + std::to_string(pivot),
                {j, high}, '?');
        }

        if (arr[j] <= pivot) {
            if (j != boundary) {
                std::swap(arr[j], arr[boundary]);
                if (stats) stats->swaps++;

                if (vis) {
                    vis->render(arr, "Swap to Left",
                        "Swapped arr[" + std::to_string(j) + "] into left boundary position " +
                        std::to_string(boundary),
                        {j, boundary}, '<');
                }
            }
            boundary++;
        }
    }

    std::swap(arr[boundary], arr[high]);
    if (stats) stats->swaps++;

    if (vis) {
        vis->render(arr, "Place Pivot",
            "Placed pivot " + std::to_string(pivot) +
            " at final partitioned boundary index " + std::to_string(boundary),
            {boundary}, '=');
    }

    return boundary;
}

} // anonymous namespace

/**
 * Quick Sort Implementation (FODSA Standard - Lomuto Partitioning)
 * 
 * Recurrence:
 *   - Best/Average Case: T(n) = 2T(n/2) + O(n) => O(n log n)
 *   - Worst Case (sorted/reverse): T(n) = T(n-1) + O(n) => O(n^2)
 * Time Complexity:
 *   - Best Case: O(n log n)
 *   - Average Case: O(n log n)
 *   - Worst Case: O(n^2)
 * Space Complexity: O(log n) average recursion stack, O(n) worst-case
 * Stable: No
 * In-place: Yes
 */
void quickSort(std::vector<int>& arr, int low, int high, PerformanceStats* stats, Visualizer* vis) {
    if (low >= high) return;

    int pIndex = partition(arr, low, high, stats, vis);
    quickSort(arr, low, pIndex - 1, stats, vis);
    quickSort(arr, pIndex + 1, high, stats, vis);
}

