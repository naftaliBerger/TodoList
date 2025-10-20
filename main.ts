const form = document.querySelector("form")!;
const input = document.querySelector("input")!;

const taskContainer = document.createElement("div");
document.body.appendChild(taskContainer); 

let doneContainer: HTMLDivElement | null = null; 
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!input.value) return;
  
  const task = document.createElement("div");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  const delet = document.createElement("button");
  delet.id = "deletBtn";
  delet.textContent = "❌";
  delet.onclick = () => {
    task.remove();
  }

  task.appendChild(checkbox);
  task.append(" ", input.value);
  task.append(" ", delet);
  
  
  taskContainer.appendChild(task);
//   taskContainer.append(" ", input.value);


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
