let nextTaskId = 1;
const columns = document.querySelectorAll('.column');
const addBtn = document.getElementById('add-task-btn');
const taskInput = document.getElementById('new-task-input');
const columnSelect = document.getElementById('new-task-column');
let draggedCard = null;

function setupCard(card) {
  // Drag events
  card.addEventListener('dragstart', () => {
    draggedCard = card;
    setTimeout(() => card.style.display = 'none', 0);
  });
  card.addEventListener('dragend', () => {
    setTimeout(() => {
      card.style.display = 'block';
      draggedCard = null;
    }, 0);
  });
  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.innerHTML = '&times;';
  deleteBtn.addEventListener('click', () => card.remove());
  card.appendChild(deleteBtn);
}

columns.forEach(column => {
  column.addEventListener('dragover', e => {
    e.preventDefault();
    column.classList.add('dragover');
  });
  column.addEventListener('dragleave', () => column.classList.remove('dragover'));
  column.addEventListener('drop', () => {
    column.classList.remove('dragover');
    if (draggedCard) column.appendChild(draggedCard);
  });
});

function createCard(content) {
  const card = document.createElement('div');
  card.className = 'card';
  card.setAttribute('draggable', 'true');
  card.id = `task-${nextTaskId++}`;

  const text = document.createElement('span');
  text.textContent = content;
  card.appendChild(text);

  setupCard(card);
  return card;
}

addBtn.addEventListener('click', () => {
  const content = taskInput.value.trim();
  if (!content) return;
  const columnId = columnSelect.value;
  const column = document.getElementById(columnId);
  const card = createCard(content);
  column.appendChild(card);
  taskInput.value = '';
});

// Initial example tasks
['Завершити звіт по проекту', 'Написати програму для API оновлення цін', 'Підготувати презентацію для інвесторів', 'Перекласти інструкцію користувача'].forEach((text, idx) => {
  const initialColumn = idx < 2 ? 'todo' : idx < 3 ? 'inProgress' : 'done';
  const card = createCard(text);
  document.getElementById(initialColumn).appendChild(card);
});