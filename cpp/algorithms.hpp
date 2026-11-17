#ifndef ALGOVISION_ALGORITHMS_HPP
#define ALGOVISION_ALGORITHMS_HPP

#include <vector>
#include <string>
#include <iostream>

// Forward declaration of Visualizer interface
class Visualizer;

struct PerformanceStats {
    long long comparisons = 0;
    long long swaps = 0;
    long long shifts = 0;
    long long writes = 0;

    void reset() {
        comparisons = 0;
        swaps = 0;
        shifts = 0;
        writes = 0;
    }
};

// ============================================================
// FODSA (Foundations of Data Structures and Algorithms)
// Standard C++ Algorithm Implementations
// ============================================================

// --- Sorting Algorithms ---
void bubbleSort(std::vector<int>& arr, PerformanceStats* stats = nullptr, Visualizer* vis = nullptr);
void selectionSort(std::vector<int>& arr, PerformanceStats* stats = nullptr, Visualizer* vis = nullptr);
void insertionSort(std::vector<int>& arr, PerformanceStats* stats = nullptr, Visualizer* vis = nullptr);
void mergeSort(std::vector<int>& arr, int low, int high, PerformanceStats* stats = nullptr, Visualizer* vis = nullptr);
void quickSort(std::vector<int>& arr, int low, int high, PerformanceStats* stats = nullptr, Visualizer* vis = nullptr);

// --- Searching Algorithms ---
int linearSearch(const std::vector<int>& arr, int target, PerformanceStats* stats = nullptr, Visualizer* vis = nullptr);
int binarySearch(const std::vector<int>& arr, int target, PerformanceStats* stats = nullptr, Visualizer* vis = nullptr);

#endif // ALGOVISION_ALGORITHMS_HPP

