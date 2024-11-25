//burger //
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("burger").addEventListener("click", function() {
        document.querySelector(".header").classList.toggle("open")
    })
    document.querySelectorAll(".link_nav").forEach(function(link) {
        link.addEventListener("click", function() {
             document.querySelector(".header").classList.remove("open");
        });
    })
    document.querySelector(".non_interactive").addEventListener("click", function(event) {
        event.preventDefault();
        document.querySelector(".header").classList.remove("open");
    })
})

