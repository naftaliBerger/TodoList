const form = document.querySelector("form")!;
const input = document.querySelector("input")!;
const taskContainer = document.createElement("div");
document.body.appendChild(taskContainer);

let doneContainer: HTMLDivElement | null = null;

const deletAll = document.createElement("button");
  deletAll.textContent = "delet All tasks";
  deletAll.onclick = () =>{
    taskContainer.innerHTML = "";
    if(doneContainer){
      doneContainer.remove();
      doneContainer = null;
    }
  }
  form.appendChild(deletAll)

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!input.value) return;

  const task = document.createElement("div");
  task.classList = "task";
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

        const deletAllDone = document.createElement("button");
        deletAllDone.classList = "Btn";
        deletAllDone.textContent = "🗑️";
        deletAllDone.onclick = () => {
        const tasks = doneContainer!.querySelectorAll(".task");
        tasks.forEach(task => task.remove());
};

        
        doneContainer.appendChild(deletAllDone);
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
