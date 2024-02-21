document.getElementById('new-todo-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const todoInput = document.getElementById('todo-input');
    const todoTitle = todoInput.value;
  
    if (todoTitle) {
      fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: todoTitle }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        addTodoToList(data);
        todoInput.value = ''; // Clear input field
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  });
  
  function addTodoToList(todo) {
    const listElement = document.createElement('li');
    listElement.textContent = todo.title;
    listElement.id = `todo-${todo._id}`;
  
    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteTodo(todo._id);
    listElement.appendChild(deleteBtn);
  
    // Update button
    const updateBtn = document.createElement('button');
    updateBtn.textContent = 'Toggle Complete';
    updateBtn.onclick = () => toggleTodoStatus(todo);
    listElement.appendChild(updateBtn);
  
    // Style completed todo
    if (todo.completed) {
      listElement.style.textDecoration = "line-through";
    }
  
    document.getElementById('todo-list').appendChild(listElement);
  }
  
  // Load existing todos on page load
  document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/todos')
      .then(response => response.json())
      .then(todos => {
        todos.forEach(todo => {
          addTodoToList(todo);
        });
      })
      .catch(error => console.error('Error loading todos:', error));
  });
  
  function deleteTodo(todoId) {
    fetch(`/api/todos/${todoId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        const todoItem = document.getElementById(`todo-${todoId}`);
        todoItem.remove();
      }
    })
    .catch(error => console.error('Error:', error));
  }
  
  function toggleTodoStatus(todo) {
    fetch(`/api/todos/${todo._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: !todo.completed }),
    })
    .then(response => response.json())
    .then(updatedTodo => {
      const todoItem = document.getElementById(`todo-${todo._id}`);
      todo.completed = !todo.completed; // Update local todo state
      todoItem.style.textDecoration = todo.completed ? "line-through" : "none";
    })
    .catch(error => console.error('Error:', error));
  }
  