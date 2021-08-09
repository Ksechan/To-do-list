const images = [
  "img-1.jpeg", "img-2.jpg", "img-3.jpg", "img-4.jpg"
]

const currentImg = images[Math.floor(Math.random() * images.length)]
const img = document.createElement("img")
img.setAttribute("src", `img/${currentImg}`)
img.classList.add("bg-img")
document.body.appendChild(img)