const lottoNumbersContainer = document.getElementById('lotto-numbers');
const generateBtn = document.getElementById('generate-btn');

const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFA1'];

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
  numbers.forEach((number, index) => {
    setTimeout(() => {
      const numberElement = document.createElement('div');
      numberElement.classList.add('lotto-number');
      numberElement.style.backgroundColor = colors[index % colors.length];
      numberElement.textContent = number;
      lottoNumbersContainer.appendChild(numberElement);
    }, index * 500); // 500ms delay between each number
  });
}

generateBtn.addEventListener('click', () => {
  const lottoNumbers = generateLottoNumbers();
  displayNumbers(lottoNumbers);
});
