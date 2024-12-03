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
const slider = document.getElementById("slider_wrapper")
const sliderElements = document.getElementById("slider");
const sliderArray = Array.from(sliderElements.children);
let totalWidth = 1993;
leftBtn.classList.add("disabled");
const updateMaxScroll = () => slider.scrollWidth - slider.offsetWidth;
rightBtn.addEventListener("click", () => {
    const width = slider.offsetWidth;
    let visibleArea = width;
    if (width > 768) {
        slider.scrollLeft += (1993 - visibleArea) / 3;
        leftBtn.classList.remove("disabled");
        const maxScrollLeft = updateMaxScroll();
        if (maxScrollLeft - slider.scrollLeft <= slider.scrollLeft) {
            rightBtn.classList.add("disabled");
        } else {
            rightBtn.classList.remove("disabled");
        }
    }
    if (width <= 768) {
        leftBtn.classList.remove("disabled");
        slider.scrollLeft += (1993 - visibleArea) / 6;
        const maxScrollLeft = updateMaxScroll();
        if (maxScrollLeft - ((1993 - visibleArea) / 6) <= slider.scrollLeft) {
            rightBtn.classList.add("disabled");
        } else {
            rightBtn.classList.remove("disabled");
        }
    }
})
leftBtn.addEventListener("click", () => {
    const width = slider.offsetWidth;
    let visibleArea = width;
    if (width > 768) {
        slider.scrollLeft -= (1993 - visibleArea) / 3;
        rightBtn.classList.remove("disabled");
        const maxScrollLeft = updateMaxScroll();
        if (maxScrollLeft - slider.scrollLeft <= slider.scrollLeft) {
            leftBtn.classList.remove("disabled");
        } else {
            leftBtn.classList.add("disabled");
        }
    }
    if (width <= 768) {
        slider.scrollLeft -= (1993 - visibleArea) / 6;
        rightBtn.classList.remove("disabled");
        console.log (slider.scrollLeft)
        const maxScrollLeft = updateMaxScroll();
        if (300 <= slider.scrollLeft) {
            leftBtn.classList.remove("disabled");
        } else {
            leftBtn.classList.add("disabled");
        }
    }
})
window.addEventListener("resize", () => {
    slider.scrollLeft = 0;
    leftBtn.classList.add("disabled");
    rightBtn.classList.remove("disabled");
});

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

function categoryStyle(gift) {
    if (gift.category === "For Health") {
        return "gift_health";
    } else if (gift.category === "For Work") {
        return "gift_work";
    } else if (gift.category === "For Harmony") {
        return "gift_harmony";
    }
    return "";
}

function randomGifts() {
    giftsCatalog.innerHTML = '';
    const shuffledGifts = shuffleArray(giftsData).slice(0, 4);
    shuffledGifts.forEach(gift => {
        const giftCard = document.createElement('div');
        giftCard.classList.add('gifts_example');
        let category = categoryStyle(gift);
        giftCard.innerHTML = `
            <img src="img/${gift.category.toLowerCase()}.png" alt="${gift.category.toLowerCase()}">
            <div class="gift_description">
                <div class="${category}">${gift.category.toUpperCase()}</div>
                <div class="gift_name">${gift.name.toUpperCase()}</div>
            </div>
        `;
        giftCard.addEventListener('click', () => openModal(gift));
        giftsCatalog.appendChild(giftCard);
    });
}

// Modal //
const modalWindow = document.getElementById('modal')
function openModal(gift) {
    const modalGift = document.querySelector(".modal_gift");
    modalGift.innerHTML = '';
    const superpowers = document.querySelector('.superpowers');
    superpowers.innerHTML = '';
    document.querySelector('.modal_img').src=`img/${gift.category.toLowerCase()}.png` 
    document.querySelector('.modal_img').alt=`${gift.category.toLowerCase()}`;
    const modalCategory = document.createElement('div');
    let category = categoryStyle(gift);
    modalCategory.innerHTML = `<div class="${category}">${gift.category.toUpperCase()}</div>`;
    modalGift.prepend(modalCategory);
    const modalName = document.createElement('div');
    modalName.innerHTML= gift.name.toUpperCase();
    modalName.classList.add("modal_name");
    modalGift.appendChild(modalName);
    const modalDescription = document.createElement('div');
    modalDescription.innerHTML= gift.description;
    modalDescription.classList.add("modal_description");
    modalGift.appendChild(modalDescription);
    for (const [key, value] of Object.entries(gift.superpowers)) {
        const superpowerElement = document.createElement('div');
        const keyContent = document.createElement('div');
        keyContent.classList.add("keyContent");
        keyContent.textContent = `${key[0].toUpperCase() + key.slice(1)}`;
        const valueContent = document.createElement('div');
        valueContent.textContent = `${value}`
        superpowerElement.classList.add("superpowerElement");
        superpowerElement.appendChild(keyContent);
        superpowerElement.appendChild(valueContent);
        superpowers.appendChild(superpowerElement);

        const starsNumber = Math.min(Math.floor(value/100), 5);
        const stars = document.createElement('div');
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('div');
            if (i < starsNumber) {
                star.innerHTML  = `<img src="img/snowflake.svg" alt="snowflakecolored">`;
            } else {
                star.innerHTML = `<img src="img/snowflake2.svg" alt="snowflaketransparent">`;
            }
            stars.appendChild(star);
            stars.classList.add("stars");
        }
        superpowerElement.appendChild(stars);
        superpowers.appendChild(superpowerElement);
    }

    modalWindow.classList.add('open');
    document.body.style.overflow = "hidden";
}

const modalBtn = document.getElementById("button_modal");
modalBtn.addEventListener("click", () => {
    modalWindow.classList.remove('open');
    document.body.style.overflow = "";
})

document.querySelector("#modal .modal_box").addEventListener("click", event =>{
    event._isClickWithInModal = true;
})

document.getElementById('modal').addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        event.currentTarget.classList.remove('open');
        document.body.style.overflowY = "";
    }
});
