const form = document.querySelector("form")!;
const input = document.querySelector("input")!;
const taskContainer = document.createElement("div");
taskContainer.classList.add("taskContainer");
document.body.appendChild(taskContainer);

let doneContainer: HTMLDivElement | null = null;
let tasksArry: string[] = JSON.parse(localStorage.getItem("tasksArry") || "[]");
let DoneTasksArry: string[] = JSON.parse(
  localStorage.getItem("DoneTasksArry") || "[]"
);

const deletAll = document.createElement("button");
deletAll.textContent = "delet All tasks";
deletAll.onclick = deleteAllTasks;
form.appendChild(deletAll);


function removeTaskFromStorage(taskText: string, isDone: boolean) {
  if (isDone) {
    DoneTasksArry = DoneTasksArry.filter((t) => t !== taskText);
    saveDoneTasks();
  } else {
    tasksArry = tasksArry.filter((t) => t !== taskText);
    saveTasks();
  }
}

function updateStoredTask(oldTask: string, newTask: string) {
  const StorageTaskSet = JSON.parse(localStorage.getItem("tasksArry")!);
  const index = StorageTaskSet.indexOf(oldTask);
  StorageTaskSet[index] = newTask;
  localStorage.setItem("tasksArry", JSON.stringify(StorageTaskSet));
}

function saveTaskOrderInStorege(){
  const tasks = Array.from(taskContainer.children);
  const taskTexts = tasks.map((task) => task.querySelector("p")!.textContent!);

  tasksArry = taskTexts;
  saveTasks();
};

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
  delet.classList.add("Btn");
  delet.textContent = "❌";
  delet.onclick = () => {
    task.remove();
    removeTaskFromStorage(taskText, checkbox.checked);
  };

  const edit = document.createElement("button");
  edit.classList.add("Btn");
  edit.textContent = "✏️";
  edit.onclick = () => {
    taskInput.setAttribute("contentEditable", "true");
    taskInput.focus();
    taskInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        taskInput.setAttribute("contentEditable", "false");
        updateStoredTask(OldTask, taskInput.textContent);
        OldTask = taskInput.textContent;
      } else if (e.key === "Escape") {
        taskInput.textContent = OldTask;
        taskInput.setAttribute("contentEditable", "false");
      }
    });
  };

  dragAndDrop(task);
  task.setAttribute("draggable", "true");
  task.append(checkbox, taskInput, delet, edit);

  if (isDone) {
    if (!doneContainer) createDoneContainer();
    doneContainer!.appendChild(task);
    task.setAttribute("draggable", "false")

  } else {
    taskContainer.appendChild(task);
  }

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      if (!doneContainer) createDoneContainer();
      doneContainer!.appendChild(task);

      removeTaskFromStorage(taskText, false);
      DoneTasksArry.push(taskText);
      saveDoneTasks();
      task.setAttribute("draggable", "false")
    } else {
      taskContainer.appendChild(task);

      removeTaskFromStorage(taskText, true);
      tasksArry.push(taskText);
      saveTasks();
      task.setAttribute("draggable", "true");
    }
  });
  return task;
}

function createDoneContainer() {
  doneContainer = document.createElement("div");
  doneContainer.classList.add("done-container");
  doneContainer.appendChild(document.createElement("hr"));

  const title = document.createElement("h2");
  title.textContent = "Tasks done";

  const deletAllDone = document.createElement("button");
  deletAllDone.classList = "BtnDon";
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


function saveTasks() {
  localStorage.setItem("tasksArry", JSON.stringify(tasksArry));
}
function saveDoneTasks() {
  localStorage.setItem("DoneTasksArry", JSON.stringify(DoneTasksArry));
}

function dragAndDrop(task: HTMLDivElement) {
  let dragged: HTMLElement | null = null;

  task.addEventListener("dragstart", (e) => {
    dragged = e.target as HTMLElement;
    dragged.classList.add("dragging");
  });

  task.addEventListener("dragend", () => {
    if (dragged) dragged.classList.remove("dragging");
    dragged = null;
    saveTaskOrderInStorege()
  });

  taskContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
    // const dragging = document.querySelector(".dragging") as HTMLElement;

    const after = e.target as HTMLElement;
    console.log(after);
    
    
    // if (dragged && after && dragged !== after) {
  const children = Array.from(taskContainer.children);
  const draggedIndex = children.indexOf(dragged!);
  const afterIndex = children.indexOf(after);

  if (draggedIndex < afterIndex) {
    taskContainer.insertBefore(dragged!, after.nextSibling);
  } else {
    taskContainer.insertBefore(dragged!, after);
  // }
}

  });
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
