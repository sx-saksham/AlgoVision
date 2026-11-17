cmake_minimum_required(VERSION 3.12)
project(AlgoVision_FODSA_CPP CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(SOURCES
    main.cpp
    bubble_sort.cpp
    selection_sort.cpp
    insertion_sort.cpp
    merge_sort.cpp
    quick_sort.cpp
    linear_search.cpp
    binary_search.cpp
)

add_executable(algovision_cli ${SOURCES})

