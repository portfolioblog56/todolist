const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

async function loadTodos() {
    try {
        const response = await fetch(`${API_URL}/todos`, {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
            },
        });

        if (response.ok) {
            const todos = await response.json();
            displayTodos(todos);
        } else {
            throw new Error('Failed to load todos');
        }
    } catch (error) {
        console.error('Load todos error:', error);
        alert('Failed to load todos');
    }
}

function displayTodos(todos) {
    todoList.innerHTML = '';
    todos.forEach((todo) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${todo.isComplete ? 'completed' : ''}">${todo.text}</span>
            <button onclick="toggleTodo('${todo._id}', ${!todo.isComplete})">
                ${todo.isComplete ? 'Undo' : 'Complete'}
            </button>
            <button onclick="deleteTodo('${todo._id}')">Delete</button>
        `;
        todoList.appendChild(li);
    });
}

async function addTodo(text) {
    try {
        const response = await fetch(`${API_URL}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({ text }),
        });

        if (response.ok) {
            loadTodos();
        } else {
            throw new Error('Failed to add todo');
        }
    } catch (error) {
        console.error('Add todo error:', error);
        alert('Failed to add todo');
    }
}

async function toggleTodo(id, isComplete) {
    try {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({ isComplete }),
        });

        if (response.ok) {
            loadTodos();
        } else {
            throw new Error('Failed to update todo');
        }
    } catch (error) {
        console.error('Toggle todo error:', error);
        alert('Failed to update todo');
    }
}

async function deleteTodo(id) {
    try {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'x-auth-token': localStorage.getItem('token'),
            },
        });

        if (response.ok) {
            loadTodos();
        } else {
            throw new Error('Failed to delete todo');
        }
    } catch (error) {
        console.error('Delete todo error:', error);
        alert('Failed to delete todo');
    }
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
        addTodo(text);
        todoInput.value = '';
    }
});

// Initial load of todos
if (localStorage.getItem('token')) {
    loadTodos();
}