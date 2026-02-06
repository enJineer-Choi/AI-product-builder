const resultArea = document.getElementById('result-area');
const recommendBtn = document.getElementById('recommend-btn');
const themeToggleBtn = document.getElementById('theme-toggle');
const radioButtons = document.getElementsByName('meal-type');

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
  "Kimchi Stew (Kimchi-jjigae)", 
  "Burger", 
  "Club Sandwich", 
  "Ramen", 
  "Bibimbap", 
  "Pork Cutlet (Tonkatsu)", 
  "Carbonara Pasta", 
  "Caesar Salad",
  "Subway Sandwich",
  "Gimbap"
];

const dinnerMenus = [
  "Fried Chicken", 
  "Pepperoni Pizza", 
  "Sushi Platter", 
  "Grilled Pork Belly (Samgyeopsal)", 
  "Ribeye Steak", 
  "Tacos", 
  "Chicken Curry", 
  "Sashimi",
  "Lamb Skewers",
  "Spicy Stir-fried Octopus"
];

function getSelectedMealType() {
  for (const radio of radioButtons) {
    if (radio.checked) {
      return radio.value;
    }
  }
  return 'lunch'; // Default
}

function recommendMenu() {
  const mealType = getSelectedMealType();
  const menuList = mealType === 'lunch' ? lunchMenus : dinnerMenus;
  const randomMenu = menuList[Math.floor(Math.random() * menuList.length)];
  
  // Simple loading effect
  resultArea.innerHTML = '<span class="placeholder">Choosing...</span>';
  recommendBtn.disabled = true;

  setTimeout(() => {
    resultArea.innerHTML = `<div class="result-text">${randomMenu}</div>`;
    recommendBtn.disabled = false;
  }, 500);
}

recommendBtn.addEventListener('click', recommendMenu);
