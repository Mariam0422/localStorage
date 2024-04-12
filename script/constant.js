const todoListContainer = document.getElementById("todoList"); 
const taskList = JSON.parse(localStorage.getItem("taskList")) || [];
const searchInput = document.getElementById("searchTodo");
const searchButton = document.getElementById("searchButton");
const doneTask = document.getElementById("doneTask");
const isntDone = document.getElementById("isntDone");
const allTodo = document.getElementById('all')
const form = document.querySelector('form'); 
 
form.addEventListener('submit', function(event) { 
  event.preventDefault(); 
  // Your form submission logic here 
}); 

export {
    todoListContainer,
    taskList,
    searchInput,
    searchButton,
    doneTask,
    isntDone,
    allTodo,
    form
}