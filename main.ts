const form = document.querySelector("form")!;
const input = document.querySelector("input")!;
const taskContainer = document.createElement("div");
document.body.appendChild(taskContainer);

let doneContainer: HTMLDivElement | null = null;

function removeTaskFromArrays(taskText: string, isDone: boolean) {
  if (isDone) {
    DoneTasksArry = DoneTasksArry.filter((t) => t !== taskText);
    saveDoneTasks();
  } else {
    tasksArry = tasksArry.filter((t) => t !== taskText);
    saveTasks();
  }
}

function updateTaskArray(oldTask: string, newTask: string){
  const StorageTaskSet = JSON.parse(localStorage.getItem("tasksArry")!);
  const index = StorageTaskSet.indexOf(oldTask);
    StorageTaskSet[index] = newTask;
    localStorage.setItem("tasksArry", JSON.stringify(StorageTaskSet));
  }



function deleteAllTasks() {
  taskContainer.innerHTML = "";
  if (doneContainer) {
    doneContainer.remove();
    doneContainer = null;
  }
  tasksArry = [];
  DoneTasksArry = [];
  saveTasks();
  saveDoneTasks();
}

const deletAll = document.createElement("button");
deletAll.textContent = "delet All tasks";
deletAll.onclick = deleteAllTasks;
form.appendChild(deletAll);

function createTask(taskText: string, isDone: boolean = false) {
  const task = document.createElement("div");
  task.classList = "task";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isDone;

  const taskInput = document.createElement("p");
  taskInput.textContent = taskText;
  let OldTask = taskInput.textContent;

  const delet = document.createElement("button");
  delet.classList = "Btn";
  delet.textContent = "❌";
  delet.onclick = () => {
    task.remove();
    removeTaskFromArrays(taskText, checkbox.checked);
  };

  const edit = document.createElement("button");
  edit.classList.add("Btn");
  edit.textContent = "✏️";
  edit.onclick = () => {
    taskInput.setAttribute("contentEditable", "true");
    taskInput.focus();
    taskInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter"){
        taskInput.setAttribute("contentEditable", "false");
        updateTaskArray(OldTask,taskInput.textContent);
        OldTask = taskInput.textContent
      } 
      else if (e.key === "Escape") {
        taskInput.textContent = OldTask;
        taskInput.setAttribute("contentEditable", "false");
      }
    });
  };

  task.append(checkbox, taskInput, delet, edit);

  if (isDone) {
    if (!doneContainer) createDoneContainer();
    doneContainer!.appendChild(task);
  } else {
    taskContainer.appendChild(task);
  }

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      if (!doneContainer) createDoneContainer();
      doneContainer!.appendChild(task);

      removeTaskFromArrays(taskText, false); 
      DoneTasksArry.push(taskText);
      saveDoneTasks();
    } else {
      taskContainer.appendChild(task);

      removeTaskFromArrays(taskText, true); 
      tasksArry.push(taskText);
      saveTasks();
    }
  });
}

function createDoneContainer() {
  doneContainer = document.createElement("div");
  doneContainer.appendChild(document.createElement("hr"));

  const title = document.createElement("h2");
  title.textContent = "Tasks done";

  const deletAllDone = document.createElement("button");
  deletAllDone.classList = "Btn";
  deletAllDone.textContent = "🗑️";
  deletAllDone.onclick = () => {
    const tasks = doneContainer!.querySelectorAll(".task");
    tasks.forEach((task) => task.remove());
    DoneTasksArry = [];
    saveDoneTasks();
  };

  doneContainer.appendChild(deletAllDone);
  doneContainer.appendChild(title);
  document.body.appendChild(doneContainer);
}

let tasksArry: string[] = JSON.parse(localStorage.getItem("tasksArry") || "[]");
let DoneTasksArry: string[] = JSON.parse(localStorage.getItem("DoneTasksArry") || "[]");

function saveTasks() {
  localStorage.setItem("tasksArry", JSON.stringify(tasksArry));
}
function saveDoneTasks() {
  localStorage.setItem("DoneTasksArry", JSON.stringify(DoneTasksArry));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!input.value) return;
  tasksArry.push(input.value);
  saveTasks();
  createTask(input.value);
  input.value = "";
});

tasksArry.forEach((taskText) => createTask(taskText));
DoneTasksArry.forEach((taskText) => createTask(taskText, true));
