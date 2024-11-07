const todoInput = document.getElementById('task-input')
const container = document.querySelector('.todo-section')


const addTodoNewLocal = (localTodo) =>{
    return localStorage.setItem('todoList' , JSON.stringify(localTodo))
}
const addTodoDiv = (currTodo) => {
    const divEle = document.createElement("div")
    divEle.classList.add('todo-elem')
    divEle.innerHTML = `<li>${currTodo}</li> 
    <button class="remBtn"> Remove </button>`
    container.appendChild(divEle)
    todoInput.value = "";
}

const getTodo = () => {
    return JSON.parse(localStorage.getItem('todoList'));
};

let localTodo = getTodo() || [];
const addTodo = (e) => {
    e.preventDefault()

    const todoText = todoInput.value.trim()
    todoInput.value = "";

    if (todoText !== "" && !localTodo.includes(todoText)) {
        localTodo.push(todoText);
        localTodo = [...new Set(localTodo)]
        localStorage.setItem('todoList', JSON.stringify(localTodo));
        console.log(localTodo);

        addTodoDiv(todoText);
    }
}

const showTodo = () => {
    console.log(localTodo)
    localTodo.forEach((currTodo) => {
        addTodoDiv(currTodo);
    });
}
showTodo();


const removeTodo = (e) => {
    let todoEle = e.target
    let todoCurrEle = todoEle.previousElementSibling.innerText
    let remove = todoEle.parentElement
    
   localTodo =  localTodo.filter((todo) =>{
        return todo !== todoCurrEle;
    })
    addTodoNewLocal(localTodo)
    remove.remove()
    console.log(localTodo)
}


document.getElementById("btn").addEventListener('click', (e) => {
   
    addTodo(e);
})

container.addEventListener('click', (e) => {
    if(e.target.classList.contains("remBtn")){
        removeTodo(e);
    }
    e.preventDefault();
})