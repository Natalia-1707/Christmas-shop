// burger //
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("burger").addEventListener("click", function() {
        document.querySelector(".header").classList.toggle("open")
    })
    document.querySelectorAll(".link_nav").forEach(function(link) {
        link.addEventListener("click", function() {
             document.querySelector(".header").classList.remove("open");
        });
    })
})

// slider //
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");
const slider = document.getElementById("slider");
const firstCardWidth = slider.querySelector(".slider_word").offsetWidth;
console.log(firstCardWidth); 
rightBtn.addEventListener("click", () => {
    slider.scrollLeft += firstCardWidth;
})