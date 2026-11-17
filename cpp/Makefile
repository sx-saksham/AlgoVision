# Makefile for AlgoVision C++ FODSA Suite
CXX = g++
CXXFLAGS = -std=c++17 -Wall -Wextra -O2

SRCS = main.cpp \
       bubble_sort.cpp \
       selection_sort.cpp \
       insertion_sort.cpp \
       merge_sort.cpp \
       quick_sort.cpp \
       linear_search.cpp \
       binary_search.cpp

OBJS = $(SRCS:.cpp=.o)
TARGET = algovision_cli

all: $(TARGET)

$(TARGET): $(OBJS)
	$(CXX) $(CXXFLAGS) -o $(TARGET) $(OBJS)

%.o: %.cpp algorithms.hpp visualizer.hpp
	$(CXX) $(CXXFLAGS) -c $< -o $@

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(OBJS) $(TARGET) $(TARGET).exe

