// Select elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from LocalStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <button onclick="deleteTask(${index})">✖</button>
    `;
    taskList.appendChild(li);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add new task
addTaskBtn.addEventListener('click', () => {
  if (taskInput.value.trim() !== "") {
    tasks.push({ text: taskInput.value, completed: false });
    taskInput.value = "";
    renderTasks();
  }
});

// Add task with Enter key
taskInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addTaskBtn.click();
});

// Toggle task completion
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Initial render
renderTasks();
