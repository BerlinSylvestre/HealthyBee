const form = document.getElementById('foodLogForm');
const logTable = document.getElementById('logTable');

// Function to save data to localStorage
const saveData = () => {
  const rows = [...logTable.querySelectorAll('tr')];
  const data = rows.map(row => {
    const cells = [...row.querySelectorAll('td')];
    return cells.map(cell => cell.textContent);
  });
  localStorage.setItem('fitnessLog', JSON.stringify(data));
};

// Function to load data from localStorage
const loadData = () => {
  const savedData = JSON.parse(localStorage.getItem('fitnessLog')) || [];
  savedData.forEach(rowData => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = rowData.map(data => `
      <td class="px-4 py-2 border border-gray-600" contenteditable="true">${data}</td>
    `).join('');
    logTable.appendChild(newRow);
  });
};

// Event listener for form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const date = document.getElementById('date').value;
  const food = document.getElementById('food').value;
  const calories = document.getElementById('calories').value;
  const steps = document.getElementById('steps').value || 'N/A';
  const gym = document.getElementById('gym').value || 'N/A';
  const weight = document.getElementById('weight').value || 'N/A';

  // Create a new row with the entered data
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td class="px-4 py-2 border border-gray-600" contenteditable="true">${date}</td>
    <td class="px-4 py-2 border border-gray-600" contenteditable="true">${food}</td>
    <td class="px-4 py-2 border border-gray-600" contenteditable="true">${calories}</td>
    <td class="px-4 py-2 border border-gray-600" contenteditable="true">${steps}</td>
    <td class="px-4 py-2 border border-gray-600" contenteditable="true">${gym}</td>
    <td class="px-4 py-2 border border-gray-600" contenteditable="true">${weight}</td>
  `;
  logTable.appendChild(newRow);

  // Save the updated data to localStorage
  saveData();

  // Reset the form
  form.reset();
});

// Load data from localStorage when the page loads
window.addEventListener('DOMContentLoaded', loadData);
