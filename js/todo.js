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
  const button = li.querySelectorAll('button')
  button[0].classList.add("hidden")
  button[1].classList.add("hidden")
  const targetNode = event.target.parentElement
  const targetNodeId = targetNode.id
  console.log(targetNode)

  const replaceForm = document.createElement("form")
  li.appendChild(replaceForm)
  replaceForm.classList.add("replace-form")
  let replaceInput = document.createElement("input")
  replaceForm.appendChild(replaceInput)
  replaceInput.classList.add("replace-input")
  replaceInput.focus();

  const replaceInputSubmit = document.createElement("input")
  replaceInputSubmit.value = "✎"
  replaceInputSubmit.type = "submit"
  replaceForm.appendChild(replaceInputSubmit)
  replaceInputSubmit.classList.add("replace-btn")

  const replaceInputInit = document.createElement("input")
  replaceInputInit.type = "submit"
  replaceInputInit.value = "☓"
  replaceForm.appendChild(replaceInputInit)
  replaceInputInit.classList.add("replace-init-btn")
  replaceInputInit.addEventListener("submit", (event) => {
    button[0].classList.remove("hidden");
    button[1].classList.remove("hidden");
    event.preventDefault(); // 이거 안댐
  })
  // 수정하다가 X버튼 누르면 수정칸이 사라져야함

  const span = targetNode.querySelector("span")
  replaceInput.setAttribute('placeholder', span.innerHTML)
  replaceInput.setAttribute('maxlength', 20)
  span.classList.add("hidden")


  replaceForm.addEventListener("submit", (event) => {
    event.preventDefault()
    span.classList.remove("hidden")
    const replaceInputValue = replaceInput.value
    replaceForm.innerHTML = ""
    span.innerHTML = replaceInputValue
    const editTodo = todosArray.filter(function (todosArray) { return todosArray.id == targetNodeId });
    editTodo[0].text = replaceInputValue
    button[0].classList.remove("hidden")
    button[1].classList.remove("hidden")
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
  replaceButton.classList.add("btn")
  replaceButton.innerHTML = "✎"
  replaceButton.addEventListener("click", replaceTodo)
  const deleteButton = document.createElement("button")
  deleteButton.classList.add("btn")
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