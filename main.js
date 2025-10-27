var form = document.querySelector("form");
var input = document.querySelector("input");
var taskContainer = document.createElement("div");
taskContainer.classList.add("taskContainer");
document.body.appendChild(taskContainer);
var doneContainer = null;
var tasksArry = JSON.parse(localStorage.getItem("tasksArry") || "[]");
var DoneTasksArry = JSON.parse(localStorage.getItem("DoneTasksArry") || "[]");
var deletAll = document.createElement("button");
deletAll.textContent = "delet All tasks";
deletAll.onclick = deleteAllTasks;
form.appendChild(deletAll);
function removeTaskFromStorage(taskText, isDone) {
    if (isDone) {
        DoneTasksArry = DoneTasksArry.filter(function (t) { return t !== taskText; });
        saveDoneTasks();
    }
    else {
        tasksArry = tasksArry.filter(function (t) { return t !== taskText; });
        saveTasks();
    }
}
function updateStoredTask(oldTask, newTask) {
    var StorageTaskSet = JSON.parse(localStorage.getItem("tasksArry"));
    var index = StorageTaskSet.indexOf(oldTask);
    StorageTaskSet[index] = newTask;
    localStorage.setItem("tasksArry", JSON.stringify(StorageTaskSet));
}
function saveTaskOrderInStorege() {
    var tasks = Array.from(taskContainer.children);
    var taskTexts = tasks.map(function (task) { return task.querySelector("p").textContent; });
    tasksArry = taskTexts;
    saveTasks();
}
;
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
function createTask(taskText, isDone) {
    if (isDone === void 0) { isDone = false; }
    var task = document.createElement("div");
    task.classList = "task";
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isDone;
    var taskInput = document.createElement("p");
    taskInput.textContent = taskText;
    var OldTask = taskInput.textContent;
    var delet = document.createElement("button");
    delet.classList.add("Btn");
    delet.textContent = "❌";
    delet.onclick = function () {
        task.remove();
        removeTaskFromStorage(taskText, checkbox.checked);
    };
    var edit = document.createElement("button");
    edit.classList.add("Btn");
    edit.textContent = "✏️";
    edit.onclick = function () {
        taskInput.setAttribute("contentEditable", "true");
        taskInput.focus();
        taskInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                taskInput.setAttribute("contentEditable", "false");
                updateStoredTask(OldTask, taskInput.textContent);
                OldTask = taskInput.textContent;
            }
            else if (e.key === "Escape") {
                taskInput.textContent = OldTask;
                taskInput.setAttribute("contentEditable", "false");
            }
        });
    };
    dragAndDrop(task);
    task.setAttribute("draggable", "true");
    task.append(checkbox, taskInput, delet, edit);
    if (isDone) {
        if (!doneContainer)
            createDoneContainer();
        doneContainer.appendChild(task);
        task.setAttribute("draggable", "false");
    }
    else {
        taskContainer.appendChild(task);
    }
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            if (!doneContainer)
                createDoneContainer();
            doneContainer.appendChild(task);
            removeTaskFromStorage(taskText, false);
            DoneTasksArry.push(taskText);
            saveDoneTasks();
            task.setAttribute("draggable", "false");
        }
        else {
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
    var title = document.createElement("h2");
    title.textContent = "Tasks done";
    var deletAllDone = document.createElement("button");
    deletAllDone.classList = "BtnDon";
    deletAllDone.textContent = "🗑️";
    deletAllDone.onclick = function () {
        var tasks = doneContainer.querySelectorAll(".task");
        tasks.forEach(function (task) { return task.remove(); });
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
function dragAndDrop(task) {
    var dragged = null;
    task.addEventListener("dragstart", function (e) {
        dragged = e.target;
        dragged.classList.add("dragging");
    });
    task.addEventListener("dragend", function () {
        if (dragged)
            dragged.classList.remove("dragging");
        dragged = null;
        saveTaskOrderInStorege();
    });
    taskContainer.addEventListener("dragover", function (e) {
        e.preventDefault();
        // const dragging = document.querySelector(".dragging") as HTMLElement;
        var after = e.target;
        console.log(after);
        // if (dragged && after && dragged !== after) {
        var children = Array.from(taskContainer.children);
        var draggedIndex = children.indexOf(dragged);
        var afterIndex = children.indexOf(after);
        if (draggedIndex < afterIndex) {
            taskContainer.insertBefore(dragged, after.nextSibling);
        }
        else {
            taskContainer.insertBefore(dragged, after);
            // }
        }
    });
}
form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!input.value)
        return;
    tasksArry.push(input.value);
    saveTasks();
    createTask(input.value);
    input.value = "";
});
tasksArry.forEach(function (taskText) { return createTask(taskText); });
DoneTasksArry.forEach(function (taskText) { return createTask(taskText, true); });
