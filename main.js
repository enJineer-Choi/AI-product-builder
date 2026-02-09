const resultArea = document.getElementById('result-area');
const recommendBtn = document.getElementById('recommend-btn');
const randomRecommendBtn = document.getElementById('random-recommend-btn'); // New button
const themeToggleBtn = document.getElementById('theme-toggle');
const mealTypeRadioButtons = document.getElementsByName('meal-type');
const cuisineTypeRadioButtons = document.getElementsByName('cuisine-type');
const heavinessTypeRadioButtons = document.getElementsByName('heaviness-type');

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
  randomRecommendBtn.disabled = true; // Disable random button too

  setTimeout(() => {
    if (menuList.length === 0) {
      resultArea.innerHTML = '<div class="result-text" style="font-size:1.2rem;">일치하는 메뉴를 찾을 수 없습니다!</div>';
    } else {
      const randomMenu = menuList[Math.floor(Math.random() * menuList.length)];
      resultArea.innerHTML = `<div class="result-text">${randomMenu.name}</div>`;
    }
    recommendBtn.disabled = false;
    randomRecommendBtn.disabled = false; // Enable random button
  }, 500);
}

function recommendRandomMenu() {
  // Combine all menus
  const allMenus = [...lunchMenus, ...dinnerMenus];

  resultArea.innerHTML = '<span class="placeholder">고르는 중...</span>';
  recommendBtn.disabled = true;
  randomRecommendBtn.disabled = true;

  setTimeout(() => {
    const randomMenu = allMenus[Math.floor(Math.random() * allMenus.length)];
    resultArea.innerHTML = `<div class="result-text">${randomMenu.name}</div>`;
    recommendBtn.disabled = false;
    randomRecommendBtn.disabled = false;
  }, 500);
}


recommendBtn.addEventListener('click', recommendMenu);
randomRecommendBtn.addEventListener('click', recommendRandomMenu); // New event listener

// Add event listeners to meal type and new filter radio buttons to trigger recommendation
mealTypeRadioButtons.forEach(radio => radio.addEventListener('change', recommendMenu));
cuisineTypeRadioButtons.forEach(radio => radio.addEventListener('change', recommendMenu));
heavinessTypeRadioButtons.forEach(radio => radio.addEventListener('change', recommendMenu));

