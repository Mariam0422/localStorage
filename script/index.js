import { createListener } from "./helpers.js";
import { todoListContainer,taskList, searchInput, searchButton, form } from "./constant.js";

createListener("#colorPicker", "input", (e) => {
  localStorage.setItem("bgColor", e.target.value);
  document.body.style.backgroundColor = e.target.value;
})

form.addEventListener('submit', (event) => {
  event.preventDefault()
})

function changeLocaleStorage() {
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

createListener("#addToDoForm", "submit", (e) => {
  e.preventDefault();
  const inputValue = document.getElementById("todoInput").value;
  const warningtext = document.getElementById('warningText')
  
  if(inputValue.length === 0) {
    warningtext.innerHTML = 'Please Type Something';
    return
  } else if(inputValue.length > 60) {
    warningtext.innerHTML = 'text should be less than 60 symbols';
    return
  }
  warningtext.innerHTML = '';
  document.getElementById("todoInput").value = "";
  const task = {
    isDone: false,
    todo: inputValue,
  };
  taskList.push(task);
  changeLocaleStorage();
  renderList();
})


createListener("#todoList", "click", (e) => {
  const element = e.target;
  const parent = element.parentElement.parentElement;
  
  if (e.target.className === "doneBtn") {
    const index = parent.dataset.index;
    taskList[index].isDone = !taskList[index].isDone;
    changeLocaleStorage();
    renderList();
  } else if (e.target.className === "removeBtn") {
    const index = parent.dataset.index;
    taskList.splice(index, 1);
    changeLocaleStorage();
    renderList();
  }
})

function renderList(listData = taskList) {
  const liElements = listData.map((item, index) => {
    const myClass = item.isDone ? "done" : "";
    return `
            <li data-index = ${index} class = "${myClass}">
              <p>${item.todo}</p>           
              <div>
                <button class = "doneBtn">&#9989</button>
                <button class = "removeBtn">&#10062</button>
              </div>
            </li>
             `;
  });

  todoListContainer.innerHTML = liElements.join("");
}   


searchButton.addEventListener("click", function() {
   searchTasks(searchInput.value);
})

function searchTasks(searchText){
  let lis = todoListContainer.querySelectorAll("li");
  lis.forEach(li => {
    const taskText = li.querySelector("p").textContent.toLowerCase();
    if(taskText.includes(searchText.toLowerCase())){
       li.style.display = "block";
    }
    else{
      li.style.display = "none";
    }
    searchInput.value = "";
  });
}

createListener('#doneTask', 'change', (e) => {
  if(e.target.checked){
    let arrDoneTask = taskList.filter((task) => {
      return task.isDone
      })
      renderList(arrDoneTask)
    }
})



createListener('#isntDone', 'change', (e) => {
  if(e.target.checked){
    let filtered = taskList.filter((task) => {
      return !task.isDone
      })
      renderList(filtered)
    }
});


createListener('#all', 'change', (e) => {
  if(e.target.checked){
    let allTodo = []
      for(let i = 0; i < taskList.length; i++) {
        allTodo.push(taskList[i])
      }
      renderList(allTodo)
    }
  
});






(function () {
  const bgColor = localStorage.getItem("bgColor");
  document.body.style.backgroundColor = bgColor;
  renderList();
})();