@echo off
echo ========================================================
echo   Compiling AlgoVision C++ FODSA Suite (C++17)
echo ========================================================

where g++ >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Using MinGW / GCC Compiler (g++)...
    g++ -std=c++17 -O2 main.cpp bubble_sort.cpp selection_sort.cpp insertion_sort.cpp merge_sort.cpp quick_sort.cpp linear_search.cpp binary_search.cpp -o algovision_cli.exe
    if %ERRORLEVEL% EQU 0 (
        echo Compilation successful! Running algovision_cli.exe...
        echo.
        algovision_cli.exe
        goto end
    ) else (
        echo Compilation failed. Please check errors above.
        pause
        goto end
    )
)

where cl >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Using MSVC (cl.exe)...
    cl /EHsc /std:c++17 main.cpp bubble_sort.cpp selection_sort.cpp insertion_sort.cpp merge_sort.cpp quick_sort.cpp linear_search.cpp binary_search.cpp /Fe:algovision_cli.exe
    if %ERRORLEVEL% EQU 0 (
        echo Compilation successful! Running algovision_cli.exe...
        echo.
        algovision_cli.exe
        goto end
    ) else (
        echo Compilation failed.
        pause
        goto end
    )
)

echo [ERROR] Neither g++ nor cl was found in PATH.
echo Please install MinGW/GCC or Visual Studio C++, or run inside VS Code / Code::Blocks / Dev-C++.
echo Manual command: g++ -std=c++17 *.cpp -o algovision_cli.exe
pause

:end

