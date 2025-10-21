var form = document.querySelector("form");
var input = document.querySelector("input");
var taskContainer = document.createElement("div");
document.body.appendChild(taskContainer);
var doneContainer = null;
var deletAll = document.createElement("button");
deletAll.textContent = "delet All tasks";
deletAll.onclick = function () {
    taskContainer.innerHTML = "";
    if (doneContainer) {
        doneContainer.remove();
        doneContainer = null;
    }
};
form.appendChild(deletAll);
form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!input.value)
        return;
    var task = document.createElement("div");
    task.classList = "task";
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    var delet = document.createElement("button");
    delet.classList = "Btn";
    delet.textContent = "❌";
    delet.onclick = function () {
        task.remove();
    };
    var taskInput = document.createElement("p");
    taskInput.textContent = input.value;
    var OldTask = taskInput.textContent;
    var edit = document.createElement("button");
    edit.classList = "Btn";
    edit.textContent = "✏️";
    edit.onclick = function () {
        taskInput.setAttribute("contentEditable", "true");
        taskInput.focus();
        taskInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                taskInput.setAttribute("contentEditable", "false");
            }
            else if (e.key === "Escape") {
                taskInput.textContent = OldTask;
                taskInput.setAttribute("contentEditable", "false");
            }
        });
    };
    task.append(checkbox, taskInput, delet, edit);
    taskContainer.appendChild(task);
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            if (!doneContainer) {
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
                };
                doneContainer.appendChild(deletAllDone);
                doneContainer.appendChild(title);
                document.body.appendChild(doneContainer);
            }
            doneContainer.appendChild(task);
        }
        else {
            taskContainer.appendChild(task);
        }
    });
    input.value = "";
});
