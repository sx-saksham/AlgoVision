# AlgoVision — C++ FODSA Algorithm Suite

This directory contains the **Core C++ Algorithm Implementations** for the **Foundations of Data Structures and Algorithms (FODSA)** curriculum.

---

## 📚 Curriculum Coverage

| Algorithm | Category | Best Time | Average Time | Worst Time | Space | Stable |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Bubble Sort** | Sorting | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes |
| **Selection Sort** | Sorting | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | No |
| **Insertion Sort** | Sorting | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes |
| **Merge Sort** | Divide & Conquer | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ | Yes |
| **Quick Sort** | Divide & Conquer | $O(n \log n)$ | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$ | No |
| **Linear Search** | Searching | $O(1)$ | $O(n)$ | $O(n)$ | $O(1)$ | N/A |
| **Binary Search** | Searching | $O(1)$ | $O(\log n)$ | $O(\log n)$ | $O(1)$ | N/A |

---

## 🛠️ How to Compile and Run

### Option 1: Using GCC / MinGW (g++)
```bash
# In the cpp directory:
g++ -std=c++17 -O2 main.cpp bubble_sort.cpp selection_sort.cpp insertion_sort.cpp merge_sort.cpp quick_sort.cpp linear_search.cpp binary_search.cpp -o algovision_cli

# Run:
./algovision_cli         # On Linux/macOS
algovision_cli.exe       # On Windows
```

### Option 2: Using Makefile
```bash
make
make run
```

### Option 3: Using CMake
```bash
mkdir build && cd build
cmake ..
cmake --build .
./algovision_cli
```

### Option 4: On Windows
Double-click `build_and_run.bat` or run it from Command Prompt / PowerShell.

---

## 🖥️ Terminal Visualizer Features
- **Interactive Menu**: Choose from any of the 7 algorithms or run the self-test regression suite.
- **Custom Input**: Test with the default array, enter custom space-separated integers, or generate random arrays.
- **Display Modes**:
  - `Auto-Play`: Step-by-step console animation with ASCII horizontal bar rendering.
  - `Step-by-Step`: Press `[Enter]` to inspect each comparison, swap, shift, or partition.
  - `Silent`: Direct execution with performance metric summary (comparisons, swaps, shifts, writes).

---

## 🔗 Architecture & Connection to Web Visualizer
- The core data structures and logic are defined in standard **C++17** (`std::vector<int>`, pass-by-reference).
- The web interface (`../public/index.html`) translates these exact algorithmic traces into graphical animations in the browser, featuring a synchronized **C++ Code Inspector** that highlights the active C++ line in real time.

