# Lotto Number Generator

## Overview

This is a simple web application that generates and displays a set of 6 unique lottery numbers from 1 to 45. The numbers are displayed one by one with a colorful animation. It supports both Dark and Light modes.

## Features

*   **Number Generation:** Generates 6 unique random numbers between 1 and 45.
*   **One-by-One Display:** Numbers appear sequentially, not all at once.
*   **Colorful UI:** Each number is displayed in a colored circle.
*   **On-Demand Generation:** A button allows the user to generate a new set of numbers at any time.
*   **Dark/Light Mode:** Users can toggle between dark and light themes. The preference is saved.

## Current Plan (Dark Mode Implementation)

1.  **CSS:**
    *   Introduce CSS variables for colors (background, text, container).
    *   Create a `[data-theme="dark"]` selector to override variables.
    *   Style the theme toggle button.
2.  **HTML:**
    *   Add a button to toggle the theme.
3.  **JavaScript:**
    *   Check `localStorage` for saved theme preference on load.
    *   Implement toggle logic to switch `data-theme` attribute on `<html>`.
    *   Save the new preference to `localStorage`.
4.  **Deployment:**
    *   Commit and push changes to GitHub.