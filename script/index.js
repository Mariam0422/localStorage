function changeColor() {
  const colorValue = document.getElementById("colorPicker").value;
  localStorage.setItem("bgColor", colorValue);
  document.body.style.backgroundColor = colorValue;
}

const todoListContainer = document.getElementById("todoList"); 
const taskList = JSON.parse(localStorage.getItem("taskList")) || [];

function changeLocaleStorage() {
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

function changeToDo(e) {
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
}

todoListContainer.addEventListener("click", changeToDo);

function renderList() {
  const liElements = taskList.map((item, index) => {
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

function createTodo() {
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
}

(function () {
  const bgColor = localStorage.getItem("bgColor");
  document.body.style.backgroundColor = bgColor;
  renderList();
})();
                    
const craetBtn = document.getElementById('creatBtn')
craetBtn.addEventListener('click', createTodo)

const colorPickerInput = document.getElementById('colorPicker')
colorPickerInput.addEventListener('input', changeColor);

const searchInput = document.getElementById("searchTodo");
const searchButton = document.getElementById("searchButton");
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