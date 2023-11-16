// NOTE: removed the "remove button" functionality for the purpose of implementing localStorage


const addTodo = document.querySelector("#add-todo"); // the container around add to-do's
const item = document.querySelector("input[type=text]"); // the text input box
const todoList = document.querySelector("#to-do-list"); // the entire UL container containing to-do's
const savedTodos = JSON.parse(localStorage.getItem("to-dos")) || [];

for (let i = 0; i < savedTodos.length; i++) {
    let new_todo = document.createElement("li");
    //let remove_btn = document.createElement("button");
    
    new_todo.innerText = savedTodos[i].todo;
    new_todo.completed = savedTodos[i].completed ? true : false;
    if (savedTodos[i].completed === true) {
        new_todo.style.textDecoration = "line-through";
    }
    //remove_btn.innerText = "remove";
    //remove_btn.append(new_todo);
    todoList.append(new_todo);
}


addTodo.addEventListener("submit", function(e) {
    e.preventDefault();
    let new_todo = document.createElement("li");
    //let remove_btn = document.createElement("button");

    new_todo.innerText = item.value;
    new_todo.completed = false;
    //remove_btn.innerText = "remove";
    //new_todo.append(remove_btn);
    todoList.append(new_todo);
    item.value = '';

    // add item to local storage
    savedTodos.push({todo: new_todo.innerText, completed: false});
    localStorage.setItem("to-dos", JSON.stringify(savedTodos));
    
});

todoList.addEventListener("click", function(e) {
    // if (e.target.tagName === "BUTTON") {
    //     e.target.parentElement.remove();
    // }
    // else if (e.target.tagName === "LI") {
        if (e.target.completed === false) {
            e.target.style.textDecoration = "line-through";
            e.target.completed = true;
        }
        else {
            e.target.style.textDecoration = "none";
            e.target.completed = false;
        }
    // }

    // loops for the item within the localStorage object and updates the "completed" status
    for (let i = 0; i < savedTodos.length; i++) {
        if (savedTodos[i].todo === e.target.innerText) {
          savedTodos[i].completed = !savedTodos[i].completed;
          localStorage.setItem("to-dos", JSON.stringify(savedTodos));
        }
    }
});


