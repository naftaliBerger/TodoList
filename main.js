var form = document.querySelector("form");
var input = document.querySelector("input");
var taskContainer = document.createElement("div");
document.body.appendChild(taskContainer);
var doneContainer = null;
function removeTaskFromArrays(taskText, isDone) {
    if (isDone) {
        DoneTasksArry = DoneTasksArry.filter(function (t) { return t !== taskText; });
        saveDoneTasks();
    }
    else {
        tasksArry = tasksArry.filter(function (t) { return t !== taskText; });
        saveTasks();
    }
}
function updateTaskArray(oldTask, newTask) {
    var StorageTaskSet = JSON.parse(localStorage.getItem("tasksArry"));
    var index = StorageTaskSet.indexOf(oldTask);
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
var deletAll = document.createElement("button");
deletAll.textContent = "delet All tasks";
deletAll.onclick = deleteAllTasks;
form.appendChild(deletAll);
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
    delet.classList = "Btn";
    delet.textContent = "❌";
    delet.onclick = function () {
        task.remove();
        removeTaskFromArrays(taskText, checkbox.checked);
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
                updateTaskArray(OldTask, taskInput.textContent);
                OldTask = taskInput.textContent;
            }
            else if (e.key === "Escape") {
                taskInput.textContent = OldTask;
                taskInput.setAttribute("contentEditable", "false");
            }
        });
    };
    task.append(checkbox, taskInput, delet, edit);
    if (isDone) {
        if (!doneContainer)
            createDoneContainer();
        doneContainer.appendChild(task);
    }
    else {
        taskContainer.appendChild(task);
    }
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            if (!doneContainer)
                createDoneContainer();
            doneContainer.appendChild(task);
            removeTaskFromArrays(taskText, false);
            DoneTasksArry.push(taskText);
            saveDoneTasks();
        }
        else {
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
    var title = document.createElement("h2");
    title.textContent = "Tasks done";
    var deletAllDone = document.createElement("button");
    deletAllDone.classList = "Btn";
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
var tasksArry = JSON.parse(localStorage.getItem("tasksArry") || "[]");
var DoneTasksArry = JSON.parse(localStorage.getItem("DoneTasksArry") || "[]");
function saveTasks() {
    localStorage.setItem("tasksArry", JSON.stringify(tasksArry));
}
function saveDoneTasks() {
    localStorage.setItem("DoneTasksArry", JSON.stringify(DoneTasksArry));
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
