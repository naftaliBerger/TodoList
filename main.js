var form = document.querySelector("form");
var input = document.querySelector("input");
var taskContainer = document.createElement("div");
document.body.appendChild(taskContainer);
var doneContainer = null;
form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!input.value)
        return;
    var task = document.createElement("div");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    var delet = document.createElement("button");
    delet.id = "deletBtn";
    delet.textContent = "❌";
    delet.onclick = function () {
        task.remove();
    };
    task.appendChild(checkbox);
    task.append(" ", input.value);
    task.append(" ", delet);
    taskContainer.appendChild(task);
    //   taskContainer.append(" ", input.value);
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            console.log('chek');
            if (!doneContainer) {
                console.log('ghjkl');
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
            //   document.body.appendChild(task);
            console.log('fghjkl');
        }
    });
    input.value = "";
});
