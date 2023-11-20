const addTodo = document.querySelector("#add-todo"); // the container around add to-do's
const item = document.querySelector("input[type=text]"); // the text input box
const todoList = document.querySelector("#to-do-list"); // the entire UL container containing to-do's
const savedTodos = JSON.parse(localStorage.getItem("to-dos")) || [];

for (let i = 0; i < savedTodos.length; i++) {
    let new_todo = document.createElement("li");
    let remove_btn = document.createElement("button");
    
    new_todo.innerText = savedTodos[i].todo;
    new_todo.completed = savedTodos[i].completed ? true : false;
    if (savedTodos[i].completed === true) {
        new_todo.style.textDecoration = "line-through";
    }
    remove_btn.innerText = "remove";
    new_todo.append(remove_btn);
    todoList.append(new_todo);
}


addTodo.addEventListener("submit", function(e) {
    e.preventDefault();
    let new_todo = document.createElement("li");
    let remove_btn = document.createElement("button");

    new_todo.innerText = item.value;
    new_todo.completed = false;
    item.value = '';
    // add item to local storage
    savedTodos.push({todo: new_todo.innerText, completed: false});
    localStorage.setItem("to-dos", JSON.stringify(savedTodos));

    remove_btn.innerText = "remove";
    new_todo.append(remove_btn);
    todoList.append(new_todo);
    
});

todoList.addEventListener("click", function(e) {
    let clickedItem = e.target;
    //console.log(clickedItem);
    if (clickedItem.tagName === "BUTTON") {
        let item_wo_rm = clickedItem.parentElement.innerText.replace('remove', '');
        // console.log(item_wo_rm);
        clickedItem.parentElement.remove();
        for (let i = 0; i < savedTodos.length; i++) {
            if (savedTodos[i].todo === item_wo_rm) {
                console.log("Matched! Time to remove " + savedTodos[i].todo);
                savedTodos.splice(i, 1);
                localStorage.setItem("to-dos", JSON.stringify(savedTodos));
            }
        }
        return;
    }
    else if (clickedItem.tagName === "LI") {
        if (clickedItem.completed === false) {
            clickedItem.style.textDecoration = "line-through";
            clickedItem.completed = true;
        }
        else {
            clickedItem.style.textDecoration = "none";
            clickedItem.completed = false;
        }
        // loops for the item within the localStorage object and updates the "completed" status
        for (let i = 0; i < savedTodos.length; i++) {
            let item_wo_rm = clickedItem.innerText.replace('remove', '');
            // console.log(savedTodos[i].todo);
            // console.log(item_wo_rm);
            if (savedTodos[i].todo === item_wo_rm) {
                //console.log(savedTodos[i].todo + savedTodos[i].completed)
                // console.log("changing completed to opposite")
                savedTodos[i].completed = !savedTodos[i].completed;
                console.log(item_wo_rm + ' ' + savedTodos[i].completed);
                localStorage.setItem("to-dos", JSON.stringify(savedTodos));
            }
        }
    }
});


