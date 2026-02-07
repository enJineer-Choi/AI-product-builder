const resultArea = document.getElementById('result-area');
const recommendBtn = document.getElementById('recommend-btn');
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
  { name: "Kimchi Stew (Kimchi-jjigae)", cuisine: "korean", heaviness: "heavy" }, 
  { name: "Burger", cuisine: "western", heaviness: "heavy" }, 
  { name: "Club Sandwich", cuisine: "western", heaviness: "light" }, 
  { name: "Ramen", cuisine: "japanese", heaviness: "heavy" }, 
  { name: "Bibimbap", cuisine: "korean", heaviness: "light" }, 
  { name: "Pork Cutlet (Tonkatsu)", cuisine: "japanese", heaviness: "heavy" }, 
  { name: "Carbonara Pasta", cuisine: "western", heaviness: "heavy" }, 
  { name: "Caesar Salad", cuisine: "western", heaviness: "light" },
  { name: "Subway Sandwich", cuisine: "western", heaviness: "light" },
  { name: "Gimbap", cuisine: "korean", heaviness: "light" }
];

const dinnerMenus = [
  { name: "Fried Chicken", cuisine: "western", heaviness: "heavy" }, 
  { name: "Pepperoni Pizza", cuisine: "western", heaviness: "heavy" }, 
  { name: "Sushi Platter", cuisine: "japanese", heaviness: "light" }, 
  { name: "Grilled Pork Belly (Samgyeopsal)", cuisine: "korean", heaviness: "heavy" }, 
  { name: "Ribeye Steak", cuisine: "western", heaviness: "heavy" }, 
  { name: "Tacos", cuisine: "western", heaviness: "heavy" }, 
  { name: "Chicken Curry", cuisine: "indian", heaviness: "heavy" }, // Added Indian for variety
  { name: "Sashimi", cuisine: "japanese", heaviness: "light" },
  { name: "Lamb Skewers", cuisine: "chinese", heaviness: "heavy" },
  { name: "Spicy Stir-fried Octopus", cuisine: "korean", heaviness: "heavy" }
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
  resultArea.innerHTML = '<span class="placeholder">Choosing...</span>';
  recommendBtn.disabled = true;

  setTimeout(() => {
    if (menuList.length === 0) {
      resultArea.innerHTML = '<div class="result-text" style="font-size:1.2rem;">No matching menu found!</div>';
    } else {
      const randomMenu = menuList[Math.floor(Math.random() * menuList.length)];
      resultArea.innerHTML = `<div class="result-text">${randomMenu.name}</div>`;
    }
    recommendBtn.disabled = false;
  }, 500);
}

recommendBtn.addEventListener('click', recommendMenu);

// Add event listeners to meal type and new filter radio buttons to trigger recommendation
mealTypeRadioButtons.forEach(radio => radio.addEventListener('change', recommendMenu));
cuisineTypeRadioButtons.forEach(radio => radio.addEventListener('change', recommendMenu));
heavinessTypeRadioButtons.forEach(radio => radio.addEventListener('change', recommendMenu));

