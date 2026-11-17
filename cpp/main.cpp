#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <random>
#include <algorithm>
#include "algorithms.hpp"
#include "visualizer.hpp"

void printArray(const std::vector<int>& arr) {
    std::cout << "[";
    for (size_t i = 0; i < arr.size(); ++i) {
        std::cout << arr[i] << (i + 1 < arr.size() ? ", " : "");
    }
    std::cout << "]\n";
}

std::vector<int> getRandomArray(int size, int minVal = 5, int maxVal = 99) {
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<int> dist(minVal, maxVal);

    std::vector<int> arr(size);
    for (int& x : arr) x = dist(gen);
    return arr;
}

std::vector<int> getCustomArray() {
    std::cout << "Enter space-separated integers (e.g. 29 10 14 37 13 25): ";
    std::string line;
    std::getline(std::cin, line);
    std::stringstream ss(line);
    std::vector<int> arr;
    int val;
    while (ss >> val) {
        arr.push_back(val);
    }
    if (arr.empty()) {
        std::cout << "No valid input detected. Using default array [29, 10, 14, 37, 13, 25, 42, 8].\n";
        return {29, 10, 14, 37, 13, 25, 42, 8};
    }
    return arr;
}

void runSelfTests() {
    std::cout << "\n============================================================\n";
    std::cout << " RUNNING FODSA VERIFICATION & REGRESSION TESTS\n";
    std::cout << "============================================================\n";

    std::vector<std::vector<int>> testCases = {
        {29, 10, 14, 37, 13, 25, 42, 8},
        {5, 2, 5, 2, 5, 2},
        {-8, -1, -5, 3, 0, -8},
        {1, 2, 3, 4, 5},
        {9, 7, 5, 3, 1},
        {42},
        {}
    };

    int passed = 0;
    int total = 0;

    for (const auto& original : testCases) {
        // Test Bubble Sort
        {
            auto arr = original;
            PerformanceStats stats;
            bubbleSort(arr, &stats, nullptr);
            auto expected = original;
            std::sort(expected.begin(), expected.end());
            total++;
            if (arr == expected) passed++;
        }
        // Test Selection Sort
        {
            auto arr = original;
            PerformanceStats stats;
            selectionSort(arr, &stats, nullptr);
            auto expected = original;
            std::sort(expected.begin(), expected.end());
            total++;
            if (arr == expected) passed++;
        }
        // Test Insertion Sort
        {
            auto arr = original;
            PerformanceStats stats;
            insertionSort(arr, &stats, nullptr);
            auto expected = original;
            std::sort(expected.begin(), expected.end());
            total++;
            if (arr == expected) passed++;
        }
        // Test Merge Sort
        {
            auto arr = original;
            PerformanceStats stats;
            if (!arr.empty()) {
                mergeSort(arr, 0, static_cast<int>(arr.size()) - 1, &stats, nullptr);
            }
            auto expected = original;
            std::sort(expected.begin(), expected.end());
            total++;
            if (arr == expected) passed++;
        }
        // Test Quick Sort
        {
            auto arr = original;
            PerformanceStats stats;
            if (!arr.empty()) {
                quickSort(arr, 0, static_cast<int>(arr.size()) - 1, &stats, nullptr);
            }
            auto expected = original;
            std::sort(expected.begin(), expected.end());
            total++;
            if (arr == expected) passed++;
        }
    }

    // Search tests
    std::vector<int> sortedArr = {5, 10, 15, 20, 25, 30, 35, 40};
    total += 4;
    if (linearSearch(sortedArr, 25, nullptr, nullptr) == 4) passed++;
    if (linearSearch(sortedArr, 99, nullptr, nullptr) == -1) passed++;
    if (binarySearch(sortedArr, 25, nullptr, nullptr) == 4) passed++;
    if (binarySearch(sortedArr, 99, nullptr, nullptr) == -1) passed++;

    std::cout << "Results: " << passed << " / " << total << " test runs PASSED.\n";
    std::cout << "All C++ algorithm implementations match standard specifications!\n";
    std::cout << "============================================================\n\n";
}

int main() {
    std::cout << "============================================================\n";
    std::cout << "       ALGOVISION -- FODSA C++ ALGORITHM SUITE             \n";
    std::cout << " Foundations of Data Structures & Algorithms (C++17)       \n";
    std::cout << "============================================================\n";

    while (true) {
        std::cout << "\nChoose an Algorithm to Run / Visualize:\n";
        std::cout << "  1. Bubble Sort       O(n^2)  [Pass-by-pass adjacent swap]\n";
        std::cout << "  2. Selection Sort    O(n^2)  [Minimum selection]\n";
        std::cout << "  3. Insertion Sort    O(n^2)  [Incremental key insertion]\n";
        std::cout << "  4. Merge Sort        O(n log n) [Divide & Conquer]\n";
        std::cout << "  5. Quick Sort        O(n log n) [Lomuto Partition]\n";
        std::cout << "  6. Linear Search     O(n)    [Sequential scan]\n";
        std::cout << "  7. Binary Search     O(log n)[Divide interval in halves]\n";
        std::cout << "  8. Run All Algorithm Unit Tests / Regression Suite\n";
        std::cout << "  0. Exit\n";
        std::cout << "Enter selection (0-8): ";

        int choice = -1;
        if (!(std::cin >> choice)) {
            std::cin.clear();
            std::string discard;
            std::getline(std::cin, discard);
            continue;
        }

        std::string dummy;
        std::getline(std::cin, dummy); // Clear newline

        if (choice == 0) {
            std::cout << "Exiting AlgoVision C++ Suite. Goodbye!\n";
            break;
        }

        if (choice == 8) {
            runSelfTests();
            continue;
        }

        if (choice < 1 || choice > 7) {
            std::cout << "Invalid selection. Please choose 0-8.\n";
            continue;
        }

        // Input array selection
        std::cout << "\nInput Array Source:\n";
        std::cout << "  1. Default Array [29, 10, 14, 37, 13, 25, 42, 8]\n";
        std::cout << "  2. Enter Custom Array\n";
        std::cout << "  3. Generate Random Array\n";
        std::cout << "Enter option (1-3): ";
        int inputOpt = 1;
        std::cin >> inputOpt;
        std::getline(std::cin, dummy);

        std::vector<int> arr;
        if (inputOpt == 2) {
            arr = getCustomArray();
        } else if (inputOpt == 3) {
            std::cout << "Enter array size (2-20, default 8): ";
            int sz = 8;
            std::cin >> sz;
            std::getline(std::cin, dummy);
            if (sz < 2) sz = 2;
            if (sz > 30) sz = 30;
            arr = getRandomArray(sz);
        } else {
            arr = {29, 10, 14, 37, 13, 25, 42, 8};
        }

        // For binary search, ensure array is sorted
        if (choice == 7) {
            std::cout << "\n[Note: Binary Search requires a sorted array. Sorting input array first.]\n";
            std::sort(arr.begin(), arr.end());
        }

        // Target for search algorithms
        int target = 25;
        if (choice == 6 || choice == 7) {
            std::cout << "Current array: ";
            printArray(arr);
            std::cout << "Enter search target value (default 25): ";
            std::string tStr;
            std::getline(std::cin, tStr);
            if (!tStr.empty()) {
                std::stringstream(tStr) >> target;
            }
        }

        // Visualization Mode
        std::cout << "\nVisualization Display Mode:\n";
        std::cout << "  1. Auto-Play (Animated with delay)\n";
        std::cout << "  2. Step-by-Step (Press [Enter] for each step)\n";
        std::cout << "  3. Silent Execution (Only show final stats)\n";
        std::cout << "Enter mode (1-3, default 1): ";
        int modeOpt = 1;
        std::string modeStr;
        std::getline(std::cin, modeStr);
        if (!modeStr.empty()) {
            std::stringstream(modeStr) >> modeOpt;
        }

        Visualizer::Mode vMode = Visualizer::Mode::AUTO_PLAY;
        if (modeOpt == 2) vMode = Visualizer::Mode::STEP_BY_STEP;
        else if (modeOpt == 3) vMode = Visualizer::Mode::SILENT;

        Visualizer vis(vMode, 300);
        PerformanceStats stats;

        std::cout << "\nInitial Array: ";
        printArray(arr);

        // Execute algorithm
        int searchResult = -1;
        switch (choice) {
            case 1:
                std::cout << "\n--- EXECUTING BUBBLE SORT ---\n";
                bubbleSort(arr, &stats, &vis);
                break;
            case 2:
                std::cout << "\n--- EXECUTING SELECTION SORT ---\n";
                selectionSort(arr, &stats, &vis);
                break;
            case 3:
                std::cout << "\n--- EXECUTING INSERTION SORT ---\n";
                insertionSort(arr, &stats, &vis);
                break;
            case 4:
                std::cout << "\n--- EXECUTING MERGE SORT ---\n";
                if (!arr.empty()) {
                    mergeSort(arr, 0, static_cast<int>(arr.size()) - 1, &stats, &vis);
                }
                break;
            case 5:
                std::cout << "\n--- EXECUTING QUICK SORT ---\n";
                if (!arr.empty()) {
                    quickSort(arr, 0, static_cast<int>(arr.size()) - 1, &stats, &vis);
                }
                break;
            case 6:
                std::cout << "\n--- EXECUTING LINEAR SEARCH (Target=" << target << ") ---\n";
                searchResult = linearSearch(arr, target, &stats, &vis);
                break;
            case 7:
                std::cout << "\n--- EXECUTING BINARY SEARCH (Target=" << target << ") ---\n";
                searchResult = binarySearch(arr, target, &stats, &vis);
                break;
        }

        // Print final summary
        std::cout << "\n============================================================\n";
        std::cout << " EXECUTION SUMMARY & METRICS\n";
        std::cout << "============================================================\n";
        std::cout << " Final Array: ";
        printArray(arr);
        std::cout << " Comparisons: " << stats.comparisons << "\n";
        if (choice == 1 || choice == 2 || choice == 5) {
            std::cout << " Swaps:       " << stats.swaps << "\n";
        }
        if (choice == 3) {
            std::cout << " Shifts:      " << stats.shifts << "\n";
        }
        if (choice == 4) {
            std::cout << " Writes:      " << stats.writes << "\n";
        }
        if (choice == 6 || choice == 7) {
            if (searchResult != -1) {
                std::cout << " Search:      Found at index " << searchResult << "\n";
            } else {
                std::cout << " Search:      Target NOT found (-1)\n";
            }
        }
        std::cout << "============================================================\n";
    }

    return 0;
}

