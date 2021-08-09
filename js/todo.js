const todoForm = document.getElementById("todo-form")
const todoInput = todoForm.querySelector("input")
const todoList = document.getElementById("todo-list")


let TODOS_KEY = 'toDos'

let todosArray = [];

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todosArray))
}


function replaceTodo(event) {
  event.preventDefault()
  const li = event.target.parentElement
  const targetNode = event.target.parentElement

  const span = targetNode.querySelector("span")
  span.classList.add("hidden")
  const replaceForm = document.createElement("form")
  li.appendChild(replaceForm)
  const replaceInput = document.createElement("input")
  replaceForm.appendChild(replaceInput)
  replaceInput.focus();
  
  const replaceInputSubmit = document.createElement("input")
  replaceInputSubmit.type = "submit"
  replaceForm.appendChild(replaceInputSubmit)


  replaceForm.addEventListener("submit", (event) => {
    event.preventDefault()
    span.classList.remove("hidden")
    const replaceInputValue = replaceInput.value
    replaceForm.innerHTML = ""
    span.innerHTML = replaceInputValue
    const targetNodeId = targetNode.id
    const editTodo = todosArray.filter(function (todosArray) { return todosArray.id == targetNodeId });
    editTodo[0].text = replaceInputValue
    saveTodos()
  })
}


function deleteTodo(event) {
  const li = event.target.parentElement
  li.remove()
  todosArray = todosArray.filter((toDo) => toDo.id !== parseInt(li.id))
  saveTodos()
}

function handleTodoList(newTodo) {
  const li = document.createElement("li")
  li.id = newTodo.id
  const span = document.createElement("span")
  span.innerHTML = newTodo.text
  const replaceButton = document.createElement("button")
  replaceButton.innerHTML = "✎"
  replaceButton.addEventListener("click", replaceTodo)
  const deleteButton = document.createElement("button")
  deleteButton.innerHTML = "☓"
  deleteButton.addEventListener("click", deleteTodo)
  li.appendChild(span)
  li.appendChild(replaceButton)
  li.appendChild(deleteButton)
  todoList.appendChild(li)
}

function todoSubmit(event) {
  event.preventDefault()
  const newTodo = todoInput.value
  const newTodoObj = {
  text: newTodo,
  id: Date.now()
}
  todoInput.value = ""
  todosArray.push(newTodoObj)
  handleTodoList(newTodoObj)
  saveTodos()
}

todoForm.addEventListener("submit", todoSubmit)

const savedTodos = localStorage.getItem(TODOS_KEY)
if (savedTodos !== null) {
  const parsedTodos = JSON.parse(savedTodos)
  todosArray = parsedTodos
  parsedTodos.forEach(handleTodoList)
}