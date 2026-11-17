#ifndef ALGOVISION_VISUALIZER_HPP
#define ALGOVISION_VISUALIZER_HPP

#include <vector>
#include <string>
#include <iostream>
#include <iomanip>
#include <thread>
#include <chrono>
#include <algorithm>

// Terminal visualizer for C++ algorithmic traces
class Visualizer {
public:
    enum class Mode {
        STEP_BY_STEP, // User presses Enter to advance
        AUTO_PLAY,    // Automatically delay between steps
        SILENT        // Only record stats without printing
    };

private:
    Mode mode;
    int delayMs;
    int stepCount = 0;

public:
    explicit Visualizer(Mode m = Mode::AUTO_PLAY, int delay = 350)
        : mode(m), delayMs(delay) {}

    void setMode(Mode m) { mode = m; }
    void setDelay(int ms) { delayMs = ms; }
    void reset() { stepCount = 0; }

    void render(const std::vector<int>& arr,
                const std::string& opName,
                const std::string& explanation,
                const std::vector<int>& highlightIndices = {},
                char marker = '*') {
        if (mode == Mode::SILENT) return;

        stepCount++;
        std::cout << "\n============================================================\n";
        std::cout << " Step " << std::setw(3) << stepCount << " | Operation: " << opName << "\n";
        std::cout << " Explanation: " << explanation << "\n";
        std::cout << "------------------------------------------------------------\n";

        // Find max element for scaling
        int maxVal = 1;
        for (int v : arr) {
            if (v > maxVal) maxVal = v;
        }

        // Horizontal ASCII Bars
        for (size_t i = 0; i < arr.size(); ++i) {
            bool isHighlighted = false;
            for (int idx : highlightIndices) {
                if (static_cast<size_t>(idx) == i) {
                    isHighlighted = true;
                    break;
                }
            }

            std::cout << " [" << std::setw(2) << i << "] "
                      << std::setw(4) << arr[i] << " | ";

            int barLen = (maxVal > 0) ? std::max(1, (arr[i] * 30) / maxVal) : 1;
            char barChar = isHighlighted ? marker : '#';

            if (isHighlighted) {
                std::cout << ">> ";
            } else {
                std::cout << "   ";
            }

            for (int b = 0; b < barLen; ++b) {
                std::cout << barChar;
            }

            if (isHighlighted) {
                std::cout << " (ACTIVE)";
            }
            std::cout << "\n";
        }
        std::cout << "============================================================\n";

        if (mode == Mode::STEP_BY_STEP) {
            std::cout << ">> Press [Enter] for next step...";
            std::string line;
            std::getline(std::cin, line);
        } else if (mode == Mode::AUTO_PLAY && delayMs > 0) {
            std::this_thread::sleep_for(std::chrono::milliseconds(delayMs));
        }
    }
};

#endif // ALGOVISION_VISUALIZER_HPP

