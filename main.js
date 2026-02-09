const resultArea = document.getElementById('result-area');
const recommendBtn = document.getElementById('recommend-btn');
const randomRecommendBtn = document.getElementById('random-recommend-btn');
const saveMenuBtn = document.getElementById('save-menu-btn'); // New constant
const savedMenusList = document.getElementById('saved-menus-list'); // New constant
const themeToggleBtn = document.getElementById('theme-toggle');
const mealTypeRadioButtons = document.getElementsByName('meal-type');
const cuisineTypeRadioButtons = document.getElementsByName('cuisine-type');
const heavinessTypeRadioButtons = document.getElementsByName('heaviness-type');

let savedMenus = []; // Array to hold saved menu items

// Theme Logic
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  document.documentElement.setAttribute('data-theme', 'dark');
}

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Menu Data
const lunchMenus = [
  { name: "김치찌개", cuisine: "korean", heaviness: "heavy" }, 
  { name: "버거", cuisine: "western", heaviness: "heavy" }, 
  { name: "클럽 샌드위치", cuisine: "western", heaviness: "light" }, 
  { name: "라면", cuisine: "japanese", heaviness: "heavy" }, 
  { name: "비빔밥", cuisine: "korean", heaviness: "light" }, 
  { name: "돈까스", cuisine: "japanese", heaviness: "heavy" }, 
  { name: "까르보나라 파스타", cuisine: "western", heaviness: "heavy" }, 
  { name: "시저 샐러드", cuisine: "western", heaviness: "light" },
  { name: "서브웨이 샌드위치", cuisine: "western", heaviness: "light" },
  { name: "김밥", cuisine: "korean", heaviness: "light" }
];

const dinnerMenus = [
  { name: "프라이드 치킨", cuisine: "western", heaviness: "heavy" }, 
  { name: "페퍼로니 피자", cuisine: "western", heaviness: "heavy" }, 
  { name: "모듬 초밥", cuisine: "japanese", heaviness: "light" }, 
  { name: "삼겹살", cuisine: "korean", heaviness: "heavy" }, 
  { name: "립아이 스테이크", cuisine: "western", heaviness: "heavy" }, 
  { name: "타코", cuisine: "western", heaviness: "heavy" }, 
  { name: "치킨 카레", cuisine: "indian", heaviness: "heavy" }, 
  { name: "사시미", cuisine: "japanese", heaviness: "light" },
  { name: "양꼬치", cuisine: "chinese", heaviness: "heavy" },
  { name: "낙지볶음", cuisine: "korean", heaviness: "heavy" }
];

function getSelectedRadioValue(radioElements) {
  for (const radio of radioElements) {
    if (radio.checked) {
      return radio.value;
    }
  }
  return 'all'; // Default to 'all' for filters
}

function recommendMenu() {
  const mealType = getSelectedRadioValue(mealTypeRadioButtons);
  const selectedCuisine = getSelectedRadioValue(cuisineTypeRadioButtons);
  const selectedHeaviness = getSelectedRadioValue(heavinessTypeRadioButtons);

  let menuList = mealType === 'lunch' ? [...lunchMenus] : [...dinnerMenus];

  // Apply cuisine filter
  if (selectedCuisine !== 'all') {
    menuList = menuList.filter(menu => menu.cuisine === selectedCuisine);
  }

  // Apply heaviness filter
  if (selectedHeaviness !== 'all') {
    menuList = menuList.filter(menu => menu.heaviness === selectedHeaviness);
  }

  // Simple loading effect
  resultArea.innerHTML = '<span class="placeholder">고르는 중...</span>';
  recommendBtn.disabled = true;
  randomRecommendBtn.disabled = true;
  saveMenuBtn.disabled = true;

  setTimeout(() => {
    if (menuList.length === 0) {
      resultArea.innerHTML = '<div class="result-text" style="font-size:1.2rem;">일치하는 메뉴를 찾을 수 없습니다!</div>';
    } else {
      const randomMenu = menuList[Math.floor(Math.random() * menuList.length)];
      resultArea.innerHTML = `<div class="result-text">${randomMenu.name}</div>`;
    }
    recommendBtn.disabled = false;
    randomRecommendBtn.disabled = false;
    saveMenuBtn.disabled = false;
  }, 500);
}

function recommendRandomMenu() {
  // Combine all menus
  const allMenus = [...lunchMenus, ...dinnerMenus];

  resultArea.innerHTML = '<span class="placeholder">고르는 중...</span>';
  recommendBtn.disabled = true;
  randomRecommendBtn.disabled = true;
  saveMenuBtn.disabled = true;

  setTimeout(() => {
    const randomMenu = allMenus[Math.floor(Math.random() * allMenus.length)];
    resultArea.innerHTML = `<div class="result-text">${randomMenu.name}</div>`;
    recommendBtn.disabled = false;
    randomRecommendBtn.disabled = false;
    saveMenuBtn.disabled = false;
  }, 500);
}

function loadSavedMenus() {
  const storedMenus = localStorage.getItem('eatenMenus');
  if (storedMenus) {
    savedMenus = JSON.parse(storedMenus);
  }
  renderSavedMenus();
}

function renderSavedMenus() {
  savedMenusList.innerHTML = ''; // Clear current list
  if (savedMenus.length === 0) {
    savedMenusList.innerHTML = '<li>아직 저장된 메뉴가 없습니다.</li>';
    return;
  }
  savedMenus.forEach((menuName, index) => {
    const listItem = document.createElement('li');
    listItem.style.display = 'flex';
    listItem.style.justifyContent = 'space-between';
    listItem.style.alignItems = 'center';
    listItem.style.padding = '8px 0';
    listItem.style.borderBottom = '1px solid #eee';
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      listItem.style.borderBottom = '1px solid #333';
    }

    const menuText = document.createElement('span');
    menuText.textContent = menuName;
    listItem.appendChild(menuText);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.style.background = 'none';
    deleteButton.style.border = '1px solid #ff6b6b';
    deleteButton.style.color = '#ff6b6b';
    deleteButton.style.padding = '5px 10px';
    deleteButton.style.borderRadius = '5px';
    deleteButton.style.cursor = 'pointer';
    deleteButton.style.marginLeft = '10px';
    deleteButton.addEventListener('click', () => deleteSavedMenu(index));
    listItem.appendChild(deleteButton);

    savedMenusList.appendChild(listItem);
  });
}

function saveCurrentMenu() {
  const currentMenuElement = resultArea.querySelector('.result-text');
  if (currentMenuElement) {
    const menuToSave = currentMenuElement.textContent;
    if (menuToSave && 
        menuToSave !== '고르는 중...' && 
        menuToSave !== '일치하는 메뉴를 찾을 수 없습니다!' &&
        !savedMenus.includes(menuToSave)) {
      savedMenus.push(menuToSave);
      localStorage.setItem('eatenMenus', JSON.stringify(savedMenus));
      renderSavedMenus();
    }
  }
}

function deleteSavedMenu(index) {
  savedMenus.splice(index, 1);
  localStorage.setItem('eatenMenus', JSON.stringify(savedMenus));
  renderSavedMenus();
}


recommendBtn.addEventListener('click', recommendMenu);
randomRecommendBtn.addEventListener('click', recommendRandomMenu);
saveMenuBtn.addEventListener('click', saveCurrentMenu); // New event listener

// Add event listeners to meal type and new filter radio buttons to trigger recommendation
mealTypeRadioButtons.forEach(radio => radio.addEventListener('change', recommendMenu));
cuisineTypeRadioButtons.forEach(radio => radio.addEventListener('change', recommendMenu));
heavinessTypeRadioButtons.forEach(radio => radio.addEventListener('change', recommendMenu));

// Load saved menus on page load
document.addEventListener('DOMContentLoaded', loadSavedMenus);


