const tasksContainer = document.querySelector(".tasks-container");
const inputRef = document.querySelector(".enter-task input");
const addButtonRef = document.querySelector(".enter-task .add");
const editButtonRef = document.querySelector(".enter-task .edit");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTask();
addButtonRef.addEventListener("click", (e) => {
  //   console.log(e.target.tagName);
  addTask(inputRef.value);
});

function deleteTask(taskDetail) {
  const currTask = tasks.findIndex((task) => task == taskDetail);
  tasks.splice(currTask, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(todo) {
  if (todo === "") {
    window.alert("Please enter a task :/");
  } else {
    tasks.push(todo);
    tasksContainer.innerHTML += `
        <div class="task" >
            <p class="task-detail" contenteditable="false" >${todo} </p>

            <button class="edit">
            <span id="edit" class="material-symbols-outlined"> edit </span>
            </button>

            <button class="delete">
            <span id="delete" class="material-symbols-outlined"> delete </span>
            </button>
        </div>
        `;

    saveData();
  }

  //   Button functionality

  taskRef = document.querySelectorAll(".task");
  taskRef.forEach((task, idx) => {
    task.addEventListener("click", function (e) {
      //   console.log(e.target.id);
      if (e.target.tagName === "P") {
        e.target.classList.toggle("checked");
      } else if (e.target.id === "delete") {
        const currentTask = e.target.closest(".task");
        const taskDetail = currentTask.children[0].innerText;
        deleteTask(taskDetail);
        currentTask.remove();
      } else if (e.target.id === "edit") {
        updateTask(task, idx);
      }
    });
    saveData();
  });

  inputRef.value = "";
}

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask() {
  tasks.forEach((todo) => {
    tasksContainer.innerHTML += `
        <div class="task">
            <p class="task-detail" contenteditable="true" >${todo} </p>

            <button class="edit">
            <span id="edit" class="material-symbols-outlined"> edit </span>
            </button>

            <button class="delete">
            <span id="delete" class="material-symbols-outlined"> delete </span>
            </button>
        </div>
        `;
  });

  taskRef = document.querySelectorAll(".task");
  taskRef.forEach((task, idx) => {
    task.addEventListener("click", function (e) {
      //   console.log(e.target.id);
      if (e.target.tagName === "P") {
        e.target.classList.toggle("checked");
      } else if (e.target.id === "delete") {
        const currentTask = e.target.closest(".task");
        const taskDetail = currentTask.children[0].innerText;
        deleteTask(taskDetail);
        currentTask.remove();
      } else if (e.target.id === "edit") {
        updateTask(task, idx);
      }
    });
  });
}

function updateTask(taskElement, index) {
  const taskDetailRef = taskElement.querySelector(".task-detail");
  taskDetailRef.setAttribute("contenteditable", "true");
  taskDetailRef.focus(); // Optional: Focus on the task for easier editing

  taskDetailRef.addEventListener("input", function () {
    const updatedTaskDetail = taskDetailRef.innerText;
    tasks[index] = updatedTaskDetail;
    saveData();
  });

  taskDetailRef.addEventListener("blur", function () {
    taskDetailRef.setAttribute("contenteditable", "false");
  });
}
