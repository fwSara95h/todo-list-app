document.getElementById('new-todo-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const todoInput = document.getElementById('todo-input');
  const todoTitle = todoInput.value.trim();

  if (todoTitle) {
    createTodo({ title: todoTitle, completed: false });
    todoInput.value = ''; // Clear input field
  }
});

function createTodo(todo) {
  // Replace with your API endpoint to create a todo
  fetch('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })
  .then(response => response.json())
  .then(addTodoToList)
  .catch(error => console.error('Error:', error));
}

function addTodoToList(todo) {
  const listElement = document.createElement('li');
  listElement.id = `todo-${todo._id}`;

  const toggleCheckbox = document.createElement('input');
  toggleCheckbox.type = 'checkbox';
  toggleCheckbox.checked = todo.completed;
  toggleCheckbox.classList.add('toggle-completed');
  toggleCheckbox.addEventListener('change', () => toggleTodoStatus(todo._id, toggleCheckbox.checked));
  listElement.appendChild(toggleCheckbox);

  const titleSpan = document.createElement('span');
  titleSpan.textContent = todo.title;
  titleSpan.classList.add('todo-title');
  listElement.appendChild(titleSpan);

  /*const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.addEventListener('click', () => editTodo(todo._id, titleSpan));
  listElement.appendChild(editBtn);*/

  const duplicateBtn = document.createElement('button');
  duplicateBtn.textContent = 'Duplicate';
  duplicateBtn.addEventListener('click', () => duplicateTodo(todo));
  listElement.appendChild(duplicateBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => deleteTodo(todo._id, listElement));
  listElement.appendChild(deleteBtn);

  document.getElementById('todo-list').appendChild(listElement);
}

function toggleTodoStatus(id, completed) {
  // Replace with your API endpoint to update a todo's completion status
  fetch(`/api/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ completed }),
  })
  .then(response => response.json())
  .catch(error => console.error('Error:', error));
}

/*function editTodo(id, titleSpan) {
  const newTitle = prompt("Edit your task:", titleSpan.textContent);
  if (newTitle) {
    // Replace with your API endpoint to update a todo's title
    fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTitle }),
    })
    .then(response => response.json())
    .then(updatedTodo => {
      titleSpan.textContent = updatedTodo.title;
    })
    .catch(error => console.error('Error:', error));
  }
}*/

function duplicateTodo(todo) {
  const newTodo = { ...todo, _id: undefined };
  createTodo(newTodo);
}

function deleteTodo(id, listElement) {
  // Replace with your API endpoint to delete a todo
  fetch(`/api/todos/${id}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (response.ok) {
      listElement.remove();
    }
  })
  .catch(error => console.error('Error:', error));
}

// Load existing todos on page load
document.addEventListener('DOMContentLoaded', function() {
  // Replace with your API endpoint to fetch todos
  fetch('/api/todos')
    .then(response => response.json())
    .then(todos => todos.forEach(addTodoToList))
    .catch(error => console.error('Error:', error));
});
