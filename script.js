/* =========================================================
   SPECIAL GIFT WEBSITE
   Main JavaScript
========================================================= */

"use strict";


/* =========================================================
   DOM ELEMENTS
========================================================= */

const loader = document.getElementById("loader");

const enterButton = document.getElementById("enterButton");

const envelope = document.getElementById("envelope");
const envelopeWrapper = document.querySelector(".envelope-wrapper");

const teddyButton = document.getElementById("teddyButton");
const teddyReveal = document.getElementById("teddyReveal");

const backgroundMusic = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
const playPauseButton = document.getElementById("playPauseButton");

const progressBar = document.getElementById("progressBar");
const currentTimeElement = document.getElementById("currentTime");
const durationElement = document.getElementById("duration");

const memoryVideo = document.getElementById("memoryVideo");
const videoFallback = document.getElementById("videoFallback");


/* =========================================================
   PAGE LOADING
========================================================= */

window.addEventListener("load", function () {

    setTimeout(function () {

        if (loader) {
            loader.classList.add("hidden");
        }

    }, 900);

});


/* =========================================================
   ENTER BUTTON
========================================================= */

if (enterButton) {

    enterButton.addEventListener("click", function () {

        const letterSection = document.getElementById("letterSection");

        if (letterSection) {

            letterSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}


/* =========================================================
   ENVELOPE
========================================================= */

if (envelope) {

    envelope.addEventListener("click", function () {

        const isOpened = envelope.classList.contains("opened");

        if (!isOpened) {

            envelope.classList.add("opened");

            if (envelopeWrapper) {
                envelopeWrapper.classList.add("opened");
            }

            /*
             * After opening the letter, gently move the
             * page toward the letter.
             */

            setTimeout(function () {

                envelope.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 700);

        }

    });

}


/* =========================================================
   TEDDY REVEAL
========================================================= */

if (teddyButton && teddyReveal) {

    teddyButton.addEventListener("click", function () {

        teddyReveal.classList.add("show");

        teddyButton.style.opacity = "0";
        teddyButton.style.pointerEvents = "none";

        setTimeout(function () {

            teddyReveal.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 400);

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                /*
                 * Once visible, we don't need to observe
                 * the element anymore.
                 */

                revealObserver.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    }
);


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});


/* =========================================================
   MUSIC PLAYER
========================================================= */

function formatTime(seconds) {

    if (!Number.isFinite(seconds) || seconds < 0) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = Math.floor(seconds % 60);

    return (
        minutes +
        ":" +
        remainingSeconds.toString().padStart(2, "0")
    );

}


/* ---------------------------------------------------------
   Update music UI
--------------------------------------------------------- */

function updateMusicUI() {

    if (!backgroundMusic) {
        return;
    }

    const duration = backgroundMusic.duration;

    const currentTime = backgroundMusic.currentTime;

    if (Number.isFinite(duration) && duration > 0) {

        progressBar.value =
            (currentTime / duration) * 100;

        durationElement.textContent =
            formatTime(duration);

    } else {

        progressBar.value = 0;

        durationElement.textContent = "0:00";

    }

    currentTimeElement.textContent =
        formatTime(currentTime);


    const isPlaying =
        !backgroundMusic.paused &&
        !backgroundMusic.ended;

    if (isPlaying) {

        playPauseButton.textContent = "❚❚";

        musicToggle.classList.add("playing");

        musicToggle.setAttribute(
            "aria-label",
            "Pause music"
        );

    } else {

        playPauseButton.textContent = "▶";

        musicToggle.classList.remove("playing");

        musicToggle.setAttribute(
            "aria-label",
            "Play music"
        );

    }

}


/* ---------------------------------------------------------
   Play / Pause
--------------------------------------------------------- */

async function toggleMusic() {

    if (!backgroundMusic) {
        return;
    }

    try {

        if (backgroundMusic.paused) {

            await backgroundMusic.play();

        } else {

            backgroundMusic.pause();

        }

    } catch (error) {

        /*
         * Browsers can block audio until the user interacts
         * with the page. The music button itself is a user
         * interaction, so this normally succeeds.
         */

        console.warn(
            "Music could not be started:",
            error
        );

    }

    updateMusicUI();

}


if (musicToggle) {

    musicToggle.addEventListener(
        "click",
        toggleMusic
    );

}


if (playPauseButton) {

    playPauseButton.addEventListener(
        "click",
        toggleMusic
    );

}


/* ---------------------------------------------------------
   Music events
--------------------------------------------------------- */

if (backgroundMusic) {

    backgroundMusic.addEventListener(
        "loadedmetadata",
        updateMusicUI
    );

    backgroundMusic.addEventListener(
        "timeupdate",
        updateMusicUI
    );

    backgroundMusic.addEventListener(
        "play",
        updateMusicUI
    );

    backgroundMusic.addEventListener(
        "pause",
        updateMusicUI
    );

    backgroundMusic.addEventListener(
        "ended",
        updateMusicUI
    );

}


/* ---------------------------------------------------------
   Music progress bar
--------------------------------------------------------- */

if (progressBar) {

    progressBar.addEventListener(
        "input",
        function () {

            if (
                backgroundMusic &&
                Number.isFinite(backgroundMusic.duration) &&
                backgroundMusic.duration > 0
            ) {

                backgroundMusic.currentTime =
                    (progressBar.value / 100) *
                    backgroundMusic.duration;

            }

        }
    );

}


/* =========================================================
   VIDEO ERROR HANDLING
========================================================= */

if (memoryVideo) {

    memoryVideo.addEventListener(
        "error",
        function () {

            if (videoFallback) {
                videoFallback.style.display = "flex";
            }

        }
    );

    memoryVideo.addEventListener(
        "loadeddata",
        function () {

            if (videoFallback) {
                videoFallback.style.display = "none";
            }

        }
    );

}


/* =========================================================
   SMOOTH SECTION NAVIGATION
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(
    function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    link.getAttribute("href");

                const target =
                    document.querySelector(targetId);

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }
);


/* =========================================================
   IMAGE ERROR LOGGING
========================================================= */

document.querySelectorAll("img").forEach(
    function (image) {

        image.addEventListener(
            "error",
            function () {

                /*
                 * We intentionally don't break the page
                 * when a personal image hasn't been added yet.
                 */

                console.warn(
                    "Image could not be loaded:",
                    image.src
                );

            }
        );

    }
);


/* =========================================================
   KEYBOARD ACCESSIBILITY
========================================================= */

if (envelope) {

    envelope.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                envelope.click();

            }

        }
    );

}


/* =========================================================
   INITIAL UI STATE
========================================================= */

updateMusicUI();