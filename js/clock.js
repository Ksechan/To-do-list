const clock = document.getElementById("clock")
const today = document.getElementById("today")


function currentTime() {
  const date = new Date();  
  const hours = String(date.getHours()).padStart("2", 0)
  if (hours === 0) {
    let cvHour = hours
  } else {
    cvHour = hours % 12
  }
  cvHour = String(cvHour).padStart("2", 0)
  const minutes = String(date.getMinutes()).padStart("2",0)
  const seconds = String(date.getSeconds()).padStart("2",0)
  const ampm = hours <= 12 ? 'AM' : 'PM';
  today.innerHTML = date.toDateString()
  clock.innerHTML = `${ampm} ${cvHour} : ${minutes} : ${seconds}`
}


setInterval(currentTime, 1000)