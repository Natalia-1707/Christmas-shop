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
    document.querySelector(".non_interactive").addEventListener("click", function(event) {
        event.preventDefault();
        document.querySelector(".header").classList.remove("open");
    })
})

// Category switching //
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

window.addEventListener('load', function() {
    randomGifts();
    all.classList.add("active");
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function randomGifts() {
    giftsCatalog.innerHTML = '';
    let shuffledGifts = shuffleArray(giftsData);
    shuffledGifts.forEach(gift => {
        const giftCard = document.createElement('div');
        giftCard.classList.add('gift');
        let categoryStyle = '';
        if (gift.category === "For Health") {
            categoryStyle = "gift_health";
        } else if (gift.category === "For Work") {
            categoryStyle = "gift_work";
        } else if (gift.category === "For Harmony") {
            categoryStyle = "gift_harmony";
        }
        giftCard.innerHTML = `
            <img src="img/${gift.category.toLowerCase()}.png" alt="${gift.category.toLowerCase()}">
            <div class="gift_description">
                <div class="${categoryStyle}">${gift.category.toUpperCase()}</div>
                <div class="gift_name">${gift.name.toUpperCase()}</div>
            </div>
        `;
        giftsCatalog.appendChild(giftCard);
    });
}

const all = document.getElementById("all");
const work = document.getElementById("work_filter");
const health = document.getElementById("health_filter");
const harmony = document.getElementById("harmony_filter");

all.addEventListener("click", () => {
    all.classList.add("active");
    work.classList.remove("active");
    harmony.classList.remove("active");
    health.classList.remove("active");
    randomGifts();
})
work.addEventListener("click", () => {
    work.classList.add("active");
    harmony.classList.remove("active");
    health.classList.remove("active");
    all.classList.remove("active");
    giftsCatalog.innerHTML = '';
    let shuffledGifts = shuffleArray(giftsData);
    let filteredGifts = shuffledGifts.filter(gift => gift.category === "For Work");
    filteredGifts.forEach(gift => {
        const giftCard = document.createElement('div');
        giftCard.classList.add('gift');
        giftCard.innerHTML = `
            <img src="img/${gift.category.toLowerCase()}.png" alt="${gift.category.toLowerCase()}">
            <div class="gift_description">
                <div class="gift_work">${gift.category.toUpperCase()}</div>
                <div class="gift_name">${gift.name.toUpperCase()}</div>
            </div>
        `;
        giftsCatalog.appendChild(giftCard);
    });
})

health.addEventListener("click", () => {
    work.classList.remove("active");
    harmony.classList.remove("active");
    health.classList.add("active");
    all.classList.remove("active");
    giftsCatalog.innerHTML = '';
    let shuffledGifts = shuffleArray(giftsData);
    let filteredGifts = shuffledGifts.filter(gift => gift.category === "For Health");
    filteredGifts.forEach(gift => {
        const giftCard = document.createElement('div');
        giftCard.classList.add('gift');
        giftCard.innerHTML = `
            <img src="img/${gift.category.toLowerCase()}.png" alt="${gift.category.toLowerCase()}">
            <div class="gift_description">
                <div class="gift_health">${gift.category.toUpperCase()}</div>
                <div class="gift_name">${gift.name.toUpperCase()}</div>
            </div>
        `;
        giftsCatalog.appendChild(giftCard);
    });
})

harmony.addEventListener("click", () => {
    work.classList.remove("active");
    harmony.classList.add("active");
    health.classList.remove("active");
    all.classList.remove("active");
    giftsCatalog.innerHTML = '';
    let shuffledGifts = shuffleArray(giftsData);
    let filteredGifts = shuffledGifts.filter(gift => gift.category === "For Harmony");
    filteredGifts.forEach(gift => {
        const giftCard = document.createElement('div');
        giftCard.classList.add('gift');
        giftCard.innerHTML = `
            <img src="img/${gift.category.toLowerCase()}.png" alt="${gift.category.toLowerCase()}">
            <div class="gift_description">
                <div class="gift_harmony">${gift.category.toUpperCase()}</div>
                <div class="gift_name">${gift.name.toUpperCase()}</div>
            </div>
        `;
        giftsCatalog.appendChild(giftCard);
    });
})

// Scroll-to-Top //
const topBtn = document.getElementById("top");
function topBtnDisplayed() {
    const width = window.innerWidth;
    if (width <= 768 && window.scrollY >= 300) {
        topBtn.style.display = 'flex';
    } else {
        topBtn.style.display = 'none';
    }
}
document.addEventListener("DOMContentLoaded", function() {
    topBtnDisplayed();
});
window.addEventListener("resize", function() {
    topBtnDisplayed();
});
window.addEventListener("scroll", function() {
    topBtnDisplayed();
});