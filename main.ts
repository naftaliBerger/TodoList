const form = document.querySelector("form")!;
const input = document.querySelector("input")!;
const taskContainer = document.createElement("div");
document.body.appendChild(taskContainer);

let doneContainer: HTMLDivElement | null = null;

// const deletAll = document.createElement("buttuo");
//   deletAll.classList = "Btn";
//   deletAll.textContent = "🗑️";
//   deletAll.onclick = () =>{
//     taskContainer.remove();
//   }
//   taskContainer.appendChild(deletAll)

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!input.value) return;

  const task = document.createElement("div");
  task.id = "task";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  const delet = document.createElement("button");
  delet.classList = "Btn";
  delet.textContent = "❌";
  delet.onclick = () => {
    task.remove();
  };

  let taskInput = document.createElement("p");
  taskInput.textContent = input.value;
  const OldTask = taskInput.textContent;
  const edit = document.createElement("button");
  edit.classList = "Btn";
  edit.textContent = "✏️";
  edit.onclick = () => {
    taskInput.setAttribute("contentEditable", "true");
    taskInput.focus();

    taskInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        taskInput.setAttribute("contentEditable", "false");
      } else if (e.key === "Escape") {
        taskInput.textContent = OldTask;
        taskInput.setAttribute("contentEditable", "false");
      }
    });
  };
  task.append(checkbox, taskInput, delet, edit);

  taskContainer.appendChild(task);

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      if (!doneContainer) {
        doneContainer = document.createElement("div");
        doneContainer.appendChild(document.createElement("hr"));
        const title = document.createElement("h2");
        title.textContent = "Tasks done";

        
        doneContainer.appendChild(title);
        document.body.appendChild(doneContainer);
      }

      doneContainer.appendChild(task);
    } else {
      taskContainer.appendChild(task);
    }
  });

  input.value = "";
});
