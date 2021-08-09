const loginForm = document.getElementById("login-form")
const loginInput = loginForm.querySelector("input")
const greeting = document.querySelector("#greeting")
const todoHiddenRemove = document.getElementById("todo-form")


const USERNAME_KEY = "username";


loginInput.focus()

function login(event) {
  event.preventDefault()
  const userName = loginInput.value
  localStorage.setItem(USERNAME_KEY, userName)
  loginForm.classList.add("hidden")
  todoHiddenRemove.classList.remove("hidden")
  paintGreetings(userName)
}

function paintGreetings(userName) {
  greeting.innerHTML = `Good Morning ${userName} !`
  greeting.classList.remove("hidden")
}

loginForm.addEventListener("submit", login)

const savedUserName = localStorage.getItem(USERNAME_KEY)

if (savedUserName === null) {
  loginForm.addEventListener("submit", login)
} else {
  loginForm.classList.add("hidden")
  todoHiddenRemove.classList.remove("hidden")
  paintGreetings(savedUserName)
}

