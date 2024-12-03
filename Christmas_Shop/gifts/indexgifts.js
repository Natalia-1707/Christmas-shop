// burger //
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("burger").addEventListener("click", function() {
        document.querySelector(".header").classList.toggle("open");
        document.body.classList.toggle("no_scroll");
    })
    document.querySelectorAll(".link_nav").forEach(function(link) {
        link.addEventListener("click", function() {
             document.querySelector(".header").classList.remove("open");
             document.body.classList.remove("no_scroll");
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
    let shuffledGifts = shuffleArray(giftsData);
    shuffledGifts.forEach(gift => {
        const giftCard = document.createElement('div');
        giftCard.classList.add('gift');
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
        giftCard.addEventListener('click', () => openModal(gift));
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
        giftCard.addEventListener('click', () => openModal(gift));
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
        giftCard.addEventListener('click', () => openModal(gift));
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
topBtn.addEventListener("click", () => {
    window.scrollTo(0, 0);
})

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
                star.innerHTML  = `<img src="img/snowflake.svg" width="16" height="16" alt="snowflakecolored">`;
            } else {
                star.innerHTML = `<img src="img/snowflake2.svg" width="16" height="16" alt="snowflaketransparent">`;
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

document.getElementById('modal').addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        event.currentTarget.classList.remove('open');
        document.body.style.overflowY = "";
    }
});