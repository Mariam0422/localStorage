function changeColor() {
  const colorValue = document.getElementById("colorPicker").value;
  localStorage.setItem("bgColor", colorValue);
  document.body.style.backgroundColor = colorValue;
}

const todoListContainer = document.getElementById("todoList"); //<ul></ul>;
// localStorage : {
// taskList: '[{todo: 'React', isDone: false}]'
// }
const taskList = JSON.parse(localStorage.getItem("taskList")) || [];

function changeLocaleStorage() {
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

function changeToDo(e) {
  const element = e.target;
  const parent = element.parentElement;
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
            <button class = "removeBtn">&#10062</button> 
            ${item.todo}             
             <button class = "doneBtn">&#9989</button></li>
             `;
  });

  todoListContainer.innerHTML = liElements.join("");
}

function createTodo() {
  const inputValue = document.getElementById("todoInput").value;
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
