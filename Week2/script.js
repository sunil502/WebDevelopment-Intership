// ==================================================
// DIGITAL CLOCK
// ==================================================

function updateClock() {

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Add 0 before single digit numbers
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    document.getElementById("clock").textContent =
        `${hours}:${minutes}:${seconds}`;


    // Display Date

    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    document.getElementById("date").textContent =
        now.toLocaleDateString("en-IN", dateOptions);
}


// Run clock every 1 second

setInterval(updateClock, 1000);

// Run immediately

updateClock();


// ==================================================
// COUNTDOWN TIMER
// ==================================================

function updateCountdown() {

    const now = new Date();

    // Next New Year
    const currentYear = now.getFullYear();

    const newYear = new Date(
        currentYear + 1,
        0,
        1,
        0,
        0,
        0
    );


    // Difference in milliseconds

    const difference = newYear - now;


    // Convert milliseconds

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );


    // Display values

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}


// Update countdown every second

setInterval(updateCountdown, 1000);

// Run immediately

updateCountdown();


// ==================================================
// INTERACTIVE IMAGE GALLERY
// ==================================================

const galleryImages =
    document.querySelectorAll(".gallery-item img");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightbox-image");

const closeButton =
    document.getElementById("close");

const nextButton =
    document.getElementById("next");

const prevButton =
    document.getElementById("prev");


let currentIndex = 0;


// Open Lightbox

galleryImages.forEach((image, index) => {

    image.addEventListener("click", function () {

        currentIndex = index;

        lightboxImage.src = image.src;

        lightbox.style.display = "flex";

    });

});


// Close Lightbox

closeButton.addEventListener("click", function () {

    lightbox.style.display = "none";

});


// Next Image

nextButton.addEventListener("click", function () {

    currentIndex++;

    if (currentIndex >= galleryImages.length) {

        currentIndex = 0;

    }

    lightboxImage.src =
        galleryImages[currentIndex].src;

});


// Previous Image

prevButton.addEventListener("click", function () {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = galleryImages.length - 1;

    }

    lightboxImage.src =
        galleryImages[currentIndex].src;

});


// Click outside image to close

lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {

        lightbox.style.display = "none";

    }

});


// Keyboard Controls

document.addEventListener("keydown", function (event) {

    if (lightbox.style.display === "flex") {

        if (event.key === "Escape") {

            lightbox.style.display = "none";

        }

        if (event.key === "ArrowRight") {

            nextButton.click();

        }

        if (event.key === "ArrowLeft") {

            prevButton.click();

        }

    }

});