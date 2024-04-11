const todoListContainer = document.getElementById("todoList"); 
const taskList = JSON.parse(localStorage.getItem("taskList")) || [];
const searchInput = document.getElementById("searchTodo");
const searchButton = document.getElementById("searchButton");
const doneTask = document.getElementById("doneTask");
const isntDone = document.getElementById("isntDone")
export {
    todoListContainer,
    taskList,
    searchInput,
    searchButton,
    doneTask,
    isntDone
}