# Blueprint for Menu Recommender

## Overview
This application is a simple web-based menu recommender. Users can select between "Lunch" and "Dinner" and then receive a random menu recommendation. It also includes a theme toggle for light and dark modes.

## Current Features
- **Meal Type Selection:** Users can choose between "Lunch" and "Dinner" via radio buttons.
- **Menu Recommendation:** Based on the selected meal type, a random menu item is displayed.
- **Theme Toggle:** Users can switch between light and dark modes.
- **Responsive Design:** Basic responsiveness is implemented through CSS.

## Planned Features (for current request)

### Objective
Add filtering capabilities to the menu recommender page for cuisine type and meal heaviness.

### Details
1.  **Cuisine Filters:** Introduce radio buttons for "한식" (Korean), "중식" (Chinese), "일식" (Japanese), and "양식" (Western).
2.  **Heaviness Filter:** Introduce radio buttons for "헤비한 것" (Heavy) and "가벼운것" (Light).

### Implementation Plan
1.  **Enhance Menu Data (main.js):**
    *   Transform `lunchMenus` and `dinnerMenus` from arrays of strings into arrays of objects. Each object will contain `name`, `cuisine`, and `heaviness` properties.
2.  **Modify `index.html`:**
    *   Add new `div` containers for "Cuisine Filters" and "Heaviness Filters".
    *   Within these containers, add `label` and `input` (radio button) elements for each filter option, similar to the existing meal type selector to maintain consistent styling and UX.
3.  **Modify `style.css`:**
    *   Add basic styling for the new filter containers and radio buttons to ensure visual consistency with existing elements.
    *   Potentially adjust layout to accommodate the new filter groups.
4.  **Modify `main.js`:**
    *   Update `recommendMenu` function to:
        *   Read the selected cuisine filter value.
        *   Read the selected heaviness filter value.
        *   Filter the `menuList` (both lunch and dinner) based on the selected cuisine and heaviness before picking a random item.
        *   Ensure a message is displayed if no menu items match the selected filters.
    *   Add event listeners for the new filter radio buttons to trigger the recommendation logic (or refresh the recommendation) when changed.