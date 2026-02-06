const lottoNumbersContainer = document.getElementById('lotto-numbers');
const generateBtn = document.getElementById('generate-btn');
const themeToggleBtn = document.getElementById('theme-toggle');

const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFA1'];

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

// Lotto Logic
function generateLottoNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNumber);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

function displayNumbers(numbers) {
  lottoNumbersContainer.innerHTML = '';
  // Disable button while animating
  generateBtn.disabled = true;
  
  numbers.forEach((number, index) => {
    setTimeout(() => {
      const numberElement = document.createElement('div');
      numberElement.classList.add('lotto-number');
      numberElement.style.backgroundColor = colors[index % colors.length];
      numberElement.textContent = number;
      lottoNumbersContainer.appendChild(numberElement);

      // Re-enable button after last number
      if (index === numbers.length - 1) {
        generateBtn.disabled = false;
      }
    }, index * 300); // 300ms delay for faster feel
  });
}

generateBtn.addEventListener('click', () => {
  const lottoNumbers = generateLottoNumbers();
  displayNumbers(lottoNumbers);
});