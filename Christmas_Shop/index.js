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
const sliderArray = Array.from(slider.children);
let currentIndex = 0
console.log(sliderArray);
leftBtn.classList.add("disabled");
rightBtn.addEventListener("click", () => {
    const width = window.innerWidth;
    let visibleArea = width;
    if (width > 768) {
        slider.scrollLeft += (1993 - visibleArea) / 3;
        console.log((1993 - visibleArea) / 3)
        leftBtn.classList.remove("disabled");
    }
    if (width <= 768) {
        slider.scrollLeft += (1993 - visibleArea) / 6;
        leftBtn.classList.remove("disabled");
    }
})
leftBtn.addEventListener("click", () => {
    const width = window.innerWidth;
    if (width > 768) {
        slider.scrollLeft -= 239;
    }
    if (width <= 768) {
        slider.scrollLeft -= 119;
        leftBtn.classList.remove("disabled");
    }
})

// Timer//
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const currentYear = new Date().getFullYear();
const newYear = new Date(currentYear + 1, 0, 1, 0, 0, 0);

function countdown() {
    const present = Date.now();
    const msToNY= newYear - present;
    const daysCount = Math.floor(msToNY / (86400 * 1000));
    const hoursCount = Math.floor((msToNY / (3600 * 1000)) % 24);
    const minutesCount = Math.floor((msToNY / (60 * 1000)) % 60);
    const secondsCount = Math.floor((msToNY / 1000) % 60);
    days.textContent = daysCount;
    hours.textContent = hoursCount;
    minutes.textContent = minutesCount;
    seconds.textContent = secondsCount;
}
setInterval(countdown, 1000)

// Best Gifts //
const giftsCatalog = document.getElementById("catalog")
let giftsData = [];
function readJson() {
    fetch('https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/christmas-shop/gifts.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            giftsData = data;
            randomGifts();
        })
        .catch(err => {
            console.error('Failed to fetch data:', err);
        });
}
readJson();

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function randomGifts() {
    giftsCatalog.innerHTML = '';
    const shuffledGifts = shuffleArray(giftsData).slice(0, 4);
    shuffledGifts.forEach(gift => {
        const giftCard = document.createElement('div');
        giftCard.classList.add('gifts_example');
        let categoryStyle = '';
        if (gift.category === "For Health") {
            categoryStyle = "gift_health";
        } else if (gift.category === "For Work") {
            categoryStyle = "gift_work";
        } else if (gift.category === "For Harmony") {
            categoryStyle = "gift_harmony";
        }
        giftCard.innerHTML = `
            <img src="img/${gift.category.toLowerCase()}.png" alt="giftforhealth">
            <div class="gift_description">
                <div class="${categoryStyle}">${gift.category.toUpperCase()}</div>
                <div class="gift_name">${gift.name.toUpperCase()}</div>
            </div>
        `;
        giftsCatalog.appendChild(giftCard);
    });
}
