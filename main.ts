const form = document.querySelector("form")!;
const input = document.querySelector("input")!;

let doneContainer: HTMLDivElement | null = null; 
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!input.value) return;

  const taskContainer = document.createElement("div");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const task = document.createElement("div");
  task.appendChild(checkbox);
  task.append(" ", input.value);

  
  taskContainer.appendChild(task);
//   taskContainer.append(" ", input.value);

  document.body.appendChild(taskContainer); 

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
        console.log('chek');
        
      if (!doneContainer) {
        console.log('ghjkl');
        
        doneContainer = document.createElement("div");
        doneContainer.appendChild(document.createElement("hr"));
        const title = document.createElement("h2");
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
