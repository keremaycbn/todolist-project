// Tüm Elementleri Seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");


eventListeners();


function eventListeners(){ // Tüm eventlistenerler
    
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}
function clearAllTodos(e){
    if (confirm("Tümünü Silmek İstediğinize emin misiniz ?")) {
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}
function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    
    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1){
            
            listItem.setAttribute("style","display : none !important");
        }
        else {
            listItem.setAttribute("style","display : block");
        }
    })



}
function deleteTodo(e){

    if (e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo başarıyla silindi...");
    }

}
function deleteTodoFromStorage(deleteTodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if( todo === deleteTodo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodotoUI(todo);
    })
}

  
function addTodo(e){
    
    const newTodo = todoInput.value.trim();

        if (newTodo === '') {

            showAlert('danger','Bir Todo Girin...');
        }
        else {
            addTodotoUI(newTodo);
            addTodoToStorage(newTodo);
            showAlert('success','Todo Başarıyla Eklendi...')
        }
    


    e.preventDefault();
}


function getTodosFromStorage(){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
} 



function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
    
    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));

}

function showAlert(type,message){
    const alert = document.createElement("div")
    alert.className = `alert alert-${type}`
    alert.textContent = message;
    firstCardBody.appendChild(alert);
    setTimeout(function(){
        alert.remove();
    },1000);

}

function addTodotoUI (newTodo){  // String değerini List İtem olarak UI'ya eklicek

    // <!-- <li class="list-group-item d-flex justify-content-between">
    // Todo 1
    // <a href = "#" class ="delete-item">
    //     <i class = "fa fa-remove"></i>
    // </a> -->

    // List İtem Oluşturma
    const listItem = document.createElement("Li");
    const link = document.createElement("a");
    // Link Oluşturma
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove' ></i>";
    listItem.className = "list-group-item d-flex justify-content-between";
    // Text Node Ekleme
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // Todo List'e List İtem'ı ekleme
    todoList.appendChild(listItem);
    todoInput.value = "";

}

