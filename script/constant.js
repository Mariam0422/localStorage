const todoListContainer = document.getElementById("todoList"); 
const taskList = JSON.parse(localStorage.getItem("taskList")) || [];
const searchInput = document.getElementById("searchTodo");
const searchButton = document.getElementById("searchButton");

export {
    todoListContainer,
    taskList,
    searchInput,
    searchButton
}