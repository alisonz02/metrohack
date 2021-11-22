let taskItems = [];
//for levelling up
var count = 0; 

function renderTask(task) {
  localStorage.setItem('taskItems', JSON.stringify(taskItems));

  const list = document.querySelector('.js-task-list');
  const item = document.querySelector(`[data-key='${task.id}']`);
  
  if (task.deleted) {
    item.remove();
    if (taskItems.length === 0) list.innerHTML = '';
    return
  }

  const isChecked = task.checked ? 'done': '';
  const node = document.createElement("li");
  node.setAttribute('class', `task-item ${isChecked}`);
  node.setAttribute('data-key', task.id);
  node.innerHTML = `
    <input id="${task.id}" type="checkbox"/>
    <label for="${task.id}" class="tick js-tick"></label>
    <span>${task.text}</span>
    <button class="delete-task js-delete-task">
    <svg><use href="#delete-icon"></use></svg>
    </button>
  `;

  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
}

function addTask(text) {
  const task = {
    text,
    checked: false,
    id: Date.now(),
  };

  taskItems.push(task);
  renderTask(task);
}

function toggleDone(key) {
  const index = taskItems.findIndex(item => item.id === Number(key));
  taskItems[index].checked = !taskItems[index].checked;
  renderTask(taskItems[index]);
  count++;
  checkExp(count);
}



function deleteTask(key) {
  const index = taskItems.findIndex(item => item.id === Number(key));
  const task = {
    deleted: true,
    ...taskItems[index]
  };
  taskItems = taskItems.filter(item => item.id !== Number(key));
  renderTask(task);
}

const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('.js-task-input');

  const text = input.value.trim();
  if (text !== '') {
    addTask(text);
    input.value = '';
    input.focus();
  }
});

const list = document.querySelector('.js-task-list');
list.addEventListener('click', event => {
  if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }
  
  if (event.target.classList.contains('js-delete-task')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTask(itemKey);
  }
});

function checkExp(int) {
  var progressWidth = (int * 10);

  if (progressWidth >= 100) {
  progressWidth = progressWidth - 100;
  }
  document.getElementById("myProgress").style.width = progressWidth + '%'; 
}

document.addEventListener('DOMContentLoaded', () => {
  const ref = localStorage.getItem('taskItems');
  if (ref) {
    taskItems = JSON.parse(ref);
    taskItems.forEach(t => {
      renderTask(t);
    });
  }
});