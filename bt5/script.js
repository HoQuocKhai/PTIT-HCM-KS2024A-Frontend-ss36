let task = [
    {
        name: 'nội dung',
        status: 'pending'
    },
]

if(localStorage.getItem("task")) {
    task = JSON.parse(localStorage.getItem("task"))
}else {
    localStorage.setItem("task", JSON.stringify(task))
}

function setTask(){
  localStorage.setItem("task", JSON.stringify(task));
}

function addTask(event){
    event.preventDefault()
    let nameTask = document.querySelector("input").value.trim()
    console.log(nameTask)
    let newTask = {
        name: nameTask,
        status:'pending'
    }
    task.push(newTask)
    renderTasks()
    setTask()
}

function renderTasks() {
    renderPending();
    renderInProgress();
    renderDone();
    setTask();
}

function renderPending() {
    let container = document.getElementById("pendingTasks");
    container.innerHTML = task.filter(t => t.status === 'pending').map((t, i) => `
        <div class="task">
            <p>${t.name}</p>
            <button onclick="moveToInProgress(${i})">Chuyển tiếp</button>
        </div>
    `).join('');
}

function renderInProgress() {
    let container = document.getElementById("inProgressTasks");
    container.innerHTML = task.filter(t => t.status === 'inProgress').map((t, i) => `
        <div class="task">
            <p>${t.name}</p>
            <button onclick="moveToDone(${i})">Hoàn thành</button>
        </div>
    `).join('');
}

function renderDone() {
    let container = document.getElementById("doneTasks");
    container.innerHTML = task.filter(t => t.status === 'done').map(t => `
        <div class="task">
            <p>${t.name}</p>
        </div>
    `).join('');
}
function moveToInProgress(index) {
    let pendingList = task.filter(t => t.status === 'pending');
    let item = pendingList[index];
    let realIndex = task.indexOf(item);
    if (realIndex !== -1) {
        task[realIndex].status = 'inProgress';
        renderTasks();
    }
}

function moveToDone(index) {
    let inProgressList = task.filter(t => t.status === 'inProgress');
    let item = inProgressList[index];
    let realIndex = task.indexOf(item);
    if (realIndex !== -1) {
        task[realIndex].status = 'done';
        renderTasks();
    }
}
renderTasks()