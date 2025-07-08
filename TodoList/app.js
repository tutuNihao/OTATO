// 初始化任务数组
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// DOM元素
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// 初始化渲染
renderTasks();

// 添加任务函数
function addTask() {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    taskInput.value = '';
    updateStorageAndRender();
  }
}

// 处理任务状态切换
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  updateStorageAndRender();
}

// 删除任务
function deleteTask(index) {
  tasks.splice(index, 1);
  updateStorageAndRender();
}

// 更新本地存储并重新渲染
function updateStorageAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// 渲染任务列表
function renderTasks() {
  taskList.innerHTML = tasks.map((task, index) => `
    <li class="task-item ${task.completed ? 'completed' : ''}" onclick="toggleTask(${index})">
      <span>${task.text}</span>
      <button class="delete-btn" onclick="event.stopPropagation(); deleteTask(${index})">
        删除
      </button>
    </li>
  `).join('');
}

// 回车键提交支持
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});