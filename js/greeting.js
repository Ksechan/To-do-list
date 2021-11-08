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
  const date = new Date().getHours()
    if (0 <= date && date < 11) {
      greeting.innerHTML = `Good morning ${userName} !`
    } else if (11 <= date && date < 17) {
      greeting.innerHTML = `Good afternoon ${userName} !`
    } else if (17 <= date && date < 21) {
      greeting.innerHTML = `Good evening ${userName} !`
    } else {
      (21 <= date && date < 0)
      greeting.innerHTML = `Good night ${userName} !`
      }
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
