#include "algorithms.hpp"
#include "visualizer.hpp"
#include <vector>

namespace {

void merge(std::vector<int>& arr, int low, int mid, int high, PerformanceStats* stats, Visualizer* vis) {
    std::vector<int> temp;
    temp.reserve(high - low + 1);

    int i = low;
    int j = mid + 1;

    if (vis) {
        vis->render(arr, "Merge Range",
            "Merging subarrays [" + std::to_string(low) + ".." + std::to_string(mid) +
            "] and [" + std::to_string(mid + 1) + ".." + std::to_string(high) + "]",
            {low, mid, mid + 1, high}, ':');
    }

    while (i <= mid && j <= high) {
        if (stats) stats->comparisons++;

        if (vis) {
            vis->render(arr, "Compare Fronts",
                "Comparing front elements: arr[" + std::to_string(i) + "] = " + std::to_string(arr[i]) +
                " and arr[" + std::to_string(j) + "] = " + std::to_string(arr[j]),
                {i, j}, '?');
        }

        if (arr[i] <= arr[j]) {
            temp.push_back(arr[i++]);
        } else {
            temp.push_back(arr[j++]);
        }
    }

    while (i <= mid) {
        temp.push_back(arr[i++]);
    }

    while (j <= high) {
        temp.push_back(arr[j++]);
    }

    // Write back to original array
    for (size_t k = 0; k < temp.size(); ++k) {
        arr[low + k] = temp[k];
        if (stats) stats->writes++;

        if (vis) {
            vis->render(arr, "Write Back",
                "Written merged value " + std::to_string(temp[k]) +
                " into arr[" + std::to_string(low + k) + "]",
                {static_cast<int>(low + k)}, '=');
        }
    }
}

} // anonymous namespace

/**
 * Merge Sort Implementation (FODSA Standard - Divide & Conquer)
 * 
 * Recurrence: T(n) = 2T(n/2) + O(n) => O(n log n) by Master Theorem
 * Time Complexity:
 *   - Best Case: O(n log n)
 *   - Average Case: O(n log n)
 *   - Worst Case: O(n log n)
 * Space Complexity: O(n) Auxiliary buffer
 * Stable: Yes
 * In-place: No
 */
void mergeSort(std::vector<int>& arr, int low, int high, PerformanceStats* stats, Visualizer* vis) {
    if (low >= high) return;

    int mid = low + (high - low) / 2;

    if (vis) {
        vis->render(arr, "Divide",
            "Dividing range [" + std::to_string(low) + ".." + std::to_string(high) +
            "] around midpoint " + std::to_string(mid),
            {low, mid, high}, '/');
    }

    mergeSort(arr, low, mid, stats, vis);
    mergeSort(arr, mid + 1, high, stats, vis);
    merge(arr, low, mid, high, stats, vis);
}

