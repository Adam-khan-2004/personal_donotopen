/* =========================================================
   SPECIAL GIFT WEBSITE
   Romantic Edition
   GitHub Pages Friendly
========================================================= */

"use strict";


/* =========================================================
   DOM ELEMENTS
========================================================= */

const loader =
    document.getElementById("loader");

const enterButton =
    document.getElementById("enterButton");

const envelope =
    document.getElementById("envelope");

const envelopeWrapper =
    document.querySelector(".envelope-wrapper");

const teddyButton =
    document.getElementById("teddyButton");

const teddyReveal =
    document.getElementById("teddyReveal");

const backgroundMusic =
    document.getElementById("backgroundMusic");

const musicToggle =
    document.getElementById("musicToggle");

const playPauseButton =
    document.getElementById("playPauseButton");

const progressBar =
    document.getElementById("progressBar");

const currentTimeElement =
    document.getElementById("currentTime");

const durationElement =
    document.getElementById("duration");

const memoryVideo =
    document.getElementById("memoryVideo");

const videoFallback =
    document.getElementById("videoFallback");


/* =========================================================
   PAGE LOADING
========================================================= */

window.addEventListener(
    "load",
    function () {

        setTimeout(
            function () {

                if (loader) {

                    loader.classList.add(
                        "hidden"
                    );

                }

            },
            900
        );

    }
);


/* =========================================================
   START MUSIC
========================================================= */

/*
    Modern browsers commonly block sound that starts
    without user interaction.

    Our Enter button is an intentional user interaction,
    so it is the ideal moment to start the song.
*/

async function startMusic() {

    if (!backgroundMusic) {
        return;
    }


    try {

        backgroundMusic.volume = 0.45;

        await backgroundMusic.play();

        updateMusicUI();

    } catch (error) {

        console.warn(
            "Music could not start:",
            error
        );

    }

}


/* =========================================================
   ENTER BUTTON
========================================================= */

if (enterButton) {

    enterButton.addEventListener(
        "click",
        function () {

            /*
                Start the song from the opening interaction.
            */

            startMusic();


            /*
                Move to the letter section.
            */

            const letterSection =
                document.getElementById(
                    "letterSection"
                );


            if (letterSection) {

                letterSection.scrollIntoView(
                    {
                        behavior: "smooth"
                    }
                );

            }

        }
    );

}


/* =========================================================
   ENVELOPE
========================================================= */

if (envelope) {

    envelope.addEventListener(
        "click",
        function () {

            const isOpened =
                envelope.classList.contains(
                    "opened"
                );


            if (!isOpened) {

                envelope.classList.add(
                    "opened"
                );


                if (envelopeWrapper) {

                    envelopeWrapper.classList.add(
                        "opened"
                    );

                }


                /*
                    Gently center the opened letter.
                */

                setTimeout(
                    function () {

                        envelope.scrollIntoView(
                            {
                                behavior: "smooth",
                                block: "center"
                            }
                        );

                    },
                    700
                );

            }

        }
    );

}


/* =========================================================
   TEDDY REVEAL
========================================================= */

if (
    teddyButton &&
    teddyReveal
) {

    teddyButton.addEventListener(
        "click",
        function () {

            teddyReveal.classList.add(
                "show"
            );


            teddyButton.style.opacity =
                "0";

            teddyButton.style.pointerEvents =
                "none";


            setTimeout(
                function () {

                    teddyReveal.scrollIntoView(
                        {
                            behavior: "smooth",
                            block: "center"
                        }
                    );

                },
                400
            );

        }
    );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if (
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );


                            /*
                                Stop observing after
                                the animation has happened.
                            */

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -40px 0px"
            }
        );


    revealElements.forEach(
        function (element) {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    /*
        Fallback for older browsers.
    */

    revealElements.forEach(
        function (element) {

            element.classList.add(
                "visible"
            );

        }
    );

}


/* =========================================================
   MUSIC PLAYER
========================================================= */

function formatTime(seconds) {

    if (
        !Number.isFinite(seconds) ||
        seconds < 0
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    const remainingSeconds =
        Math.floor(
            seconds % 60
        );


    return (
        minutes +
        ":" +
        remainingSeconds
            .toString()
            .padStart(2, "0")
    );

}


/* =========================================================
   MUSIC UI
========================================================= */

function updateMusicUI() {

    if (!backgroundMusic) {
        return;
    }


    const duration =
        backgroundMusic.duration;


    const currentTime =
        backgroundMusic.currentTime;


    /*
        Update duration.
    */

    if (
        durationElement &&
        Number.isFinite(duration) &&
        duration > 0
    ) {

        durationElement.textContent =
            formatTime(duration);

    } else if (durationElement) {

        durationElement.textContent =
            "0:00";

    }


    /*
        Update current position.
    */

    if (currentTimeElement) {

        currentTimeElement.textContent =
            formatTime(
                currentTime
            );

    }


    /*
        Update progress slider.
    */

    if (progressBar) {

        if (
            Number.isFinite(duration) &&
            duration > 0
        ) {

            progressBar.value =
                (
                    currentTime /
                    duration
                ) * 100;

        } else {

            progressBar.value = 0;

        }

    }


    /*
        Determine playing state.
    */

    const isPlaying =
        !backgroundMusic.paused &&
        !backgroundMusic.ended;


    if (isPlaying) {

        if (playPauseButton) {

            playPauseButton.textContent =
                "❚❚";

            playPauseButton.setAttribute(
                "aria-label",
                "Pause music"
            );

        }


        if (musicToggle) {

            musicToggle.classList.add(
                "playing"
            );

            musicToggle.setAttribute(
                "aria-label",
                "Pause music"
            );

        }

    } else {

        if (playPauseButton) {

            playPauseButton.textContent =
                "▶";

            playPauseButton.setAttribute(
                "aria-label",
                "Play music"
            );

        }


        if (musicToggle) {

            musicToggle.classList.remove(
                "playing"
            );

            musicToggle.setAttribute(
                "aria-label",
                "Play music"
            );

        }

    }

}


/* =========================================================
   TOGGLE MUSIC
========================================================= */

async function toggleMusic() {

    if (!backgroundMusic) {
        return;
    }


    try {

        if (
            backgroundMusic.paused
        ) {

            backgroundMusic.volume =
                0.45;

            await backgroundMusic.play();

        } else {

            backgroundMusic.pause();

        }

    } catch (error) {

        console.warn(
            "Music could not be toggled:",
            error
        );

    }


    updateMusicUI();

}


/* =========================================================
   FLOATING MUSIC BUTTON
========================================================= */

if (musicToggle) {

    musicToggle.addEventListener(
        "click",
        toggleMusic
    );

}


/* =========================================================
   MAIN MUSIC PLAYER BUTTON
========================================================= */

if (playPauseButton) {

    playPauseButton.addEventListener(
        "click",
        toggleMusic
    );

}


/* =========================================================
   MUSIC EVENTS
========================================================= */

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


    backgroundMusic.addEventListener(
        "error",
        function () {

            console.warn(
                "Could not load assets/music/song.mp3"
            );

        }
    );

}


/* =========================================================
   MUSIC PROGRESS BAR
========================================================= */

if (progressBar) {

    progressBar.addEventListener(
        "input",
        function () {

            if (
                backgroundMusic &&
                Number.isFinite(
                    backgroundMusic.duration
                ) &&
                backgroundMusic.duration > 0
            ) {

                backgroundMusic.currentTime =
                    (
                        Number(
                            progressBar.value
                        ) / 100
                    ) *
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

                videoFallback.style.display =
                    "flex";

            }

        }
    );


    memoryVideo.addEventListener(
        "loadeddata",
        function () {

            if (videoFallback) {

                videoFallback.style.display =
                    "none";

            }

        }
    );

}


/* =========================================================
   IMAGE ERROR INFORMATION
========================================================= */

document
    .querySelectorAll("img")
    .forEach(
        function (image) {

            image.addEventListener(
                "error",
                function () {

                    console.warn(
                        "Image could not be loaded:",
                        image.src
                    );

                }
            );

        }
    );


/* =========================================================
   KEYBOARD SUPPORT FOR ENVELOPE
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
   INITIAL UI
========================================================= */

updateMusicUI();
