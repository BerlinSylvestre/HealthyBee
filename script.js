// Select form and log table elements
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
    addRowToTable(rowData);
  });
};

// Function to create and add a new row to the table
const addRowToTable = (rowData = ["", "", "", "", "", ""]) => {
  const newRow = document.createElement('tr');
  rowData.forEach(data => {
    const cell = document.createElement('td');
    cell.className = "px-4 py-2 border border-gray-600";
    cell.contentEditable = "true";
    cell.textContent = data;
    newRow.appendChild(cell);
  });

  // Add edit and delete buttons
  const actionCell = document.createElement('td');
  actionCell.className = "px-4 py-2 border border-gray-600 text-center";

  const deleteButton = document.createElement('button');
  deleteButton.textContent = "Delete";
  deleteButton.className = "bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded";
  deleteButton.addEventListener('click', () => {
    newRow.remove();
    saveData();
  });

  const saveButton = document.createElement('button');
  saveButton.textContent = "Save";
  saveButton.className = "bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 ml-2 rounded";
  saveButton.addEventListener('click', saveData);

  actionCell.appendChild(saveButton);
  actionCell.appendChild(deleteButton);
  newRow.appendChild(actionCell);

  logTable.appendChild(newRow);
};

// Add a copy button to copy the code
const addCopyButton = () => {
  const copyButton = document.createElement('button');
  copyButton.textContent = "Copy Code";
  copyButton.className = "bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded fixed bottom-4 right-4 shadow-lg";
  copyButton.addEventListener('click', () => {
    const codeToCopy = document.querySelector('pre');
    navigator.clipboard.writeText(codeToCopy.textContent)
      .then(() => alert('Code copied to clipboard!'))
      .catch(err => alert('Failed to copy code: ' + err));
  });
  document.body.appendChild(copyButton);
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

  // Add the new data as a row in the table
  addRowToTable([date, food, calories, steps, gym, weight]);

  // Save the updated data to localStorage
  saveData();

  // Reset the form
  form.reset();
});

// Load data from localStorage when the page loads
window.addEventListener('DOMContentLoaded', () => {
  loadData();
  addCopyButton();
});

