# Blueprint: Menu Recommender Application

## Overview
This application helps users decide what to eat by recommending menu items based on meal type (lunch/dinner), cuisine, and heaviness preferences. It also includes a "Recommend Any" button for a completely random suggestion. The entire site is now localized for Korean users.

## Project Outline

### Initial Version Features
*   **Meal Type Selection**: Users can choose between "Lunch ☀️" and "Dinner 🌙".
*   **Cuisine Filtering**: Options to filter by "All", "Korean (한식)", "Chinese (중식)", "Japanese (일식)", and "Western (양식)".
*   **Heaviness Filtering**: Options to filter by "All", "Heavy 🥩", and "Light 🥗".
*   **Recommendation Button**: A "Recommend Menu" button to get a suggestion based on selected filters.
*   **Theme Toggle**: A button to switch between light and dark modes.
*   **Dynamic Result Area**: Displays the recommended menu or a message if no matching menu is found.

### Current Version Features (Added in this iteration)
*   **Korean Localization**: The entire user interface, including titles, labels, button texts, and all food names, has been translated into Korean.
*   **"아무거나 추천해줘" Button**: A new button has been added below "메뉴 추천" that, when clicked, provides a completely random food recommendation from all available lunch and dinner menus, disregarding any filters.

## Plan for Current Change (Completed)
1.  **Modify `index.html`**:
    *   Changed `lang` attribute to `ko`.
    *   Translated `<title>` to "메뉴 추천".
    *   Translated `<h1>What to Eat?</h1>` to `<h1>오늘 뭐 먹지?</h1>`.
    *   Translated "Lunch ☀️" to "점심 ☀️" and "Dinner 🌙" to "저녁 🌙".
    *   Translated "Cuisine" to "음식 종류".
    *   Translated "All" (cuisine) to "전체".
    *   Translated "Heaviness" to "음식의 무게".
    *   Translated "All" (heaviness) to "전체".
    *   Translated "Heavy 🥩" to "든든한 🥩" and "Light 🥗" to "가벼운 🥗".
    *   Translated "Select a meal type and click the button!" to "식사 종류를 선택하고 버튼을 클릭하세요!".
    *   Translated "Recommend Menu" to "메뉴 추천".
    *   Added a new button with `id="random-recommend-btn"` and text "아무거나 추천해줘" after the `recommend-btn`.
2.  **Modify `main.js`**:
    *   Added `const randomRecommendBtn = document.getElementById('random-recommend-btn');`.
    *   Implemented `recommendRandomMenu()` function to select a random menu from all available options, regardless of filters.
    *   Added an event listener for `randomRecommendBtn` to call `recommendRandomMenu()`.
    *   Translated all food names in `lunchMenus` and `dinnerMenus` to Korean:
        *   **Lunch**: 김치찌개, 버거, 클럽 샌드위치, 라면, 비빔밥, 돈까스, 까르보나라 파스타, 시저 샐러드, 서브웨이 샌드위치, 김밥.
        *   **Dinner**: 프라이드 치킨, 페퍼로니 피자, 모듬 초밥, 삼겹살, 립아이 스테이크, 타코, 치킨 카레, 사시미, 양꼬치, 낙지볶음.
    *   Translated "Choosing..." to "고르는 중...".
    *   Translated "No matching menu found!" to "일치하는 메뉴를 찾을 수 없습니다!".
    *   Disabled both recommend buttons during loading.
