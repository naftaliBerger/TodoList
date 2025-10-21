var form = document.querySelector("form");
var input = document.querySelector("input");
var taskContainer = document.createElement("div");
document.body.appendChild(taskContainer);
var doneContainer = null;
// const deletAll = document.createElement("buttuo");
//   deletAll.classList = "Btn";
//   deletAll.textContent = "🗑️";
//   deletAll.onclick = () =>{
//     taskContainer.remove();
//   }
//   taskContainer.appendChild(deletAll)
form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!input.value)
        return;
    var task = document.createElement("div");
    task.id = "task";
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
