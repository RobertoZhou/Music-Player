const songName = window.document.getElementById("song-name");
const bandName = window.document.getElementById("band-name");
const song = window.document.getElementById("audio");
const cover = window.document.getElementById("cover");
const play = window.document.getElementById("play");
const next = window.document.getElementById("next");
const previous = window.document.getElementById("previous");
const currentProgress = window.document.getElementById("current-progress");
const progressContainer = window.document.getElementById("progress-container");


const scarboroughFair = {
    songName : "Scarborough Fair",
    artist : "Aurora",
    file : "Aurora - Scarborough Fair"
}

const youAreTheReason = {
    songName : "You Are The Reason",
    artist : "Calum Scott",
    file : "Calum Scott - You Are The Reason",
}

const loveMeLikeYouDo = {
    songName : "Love Me Like You Do",
    artist : "Ellie Goulding",
    file : "Ellie Goulding - Love Me Like You Do",
}

const minefields = {
    songName : "Minefields",
    artist : "Faouzia & John Legend",
    file : "Faouzia & John Legend - Minefields",
}

const allOfMe = {
    songName : "All of Me",
    artist : "John Legend",
    file : "John Legend - All of Me",
}

const someoneYouLoved = {
    songName : "Someone You Loved",
    artist : "Lewis Capaldi",
    file : "Lewis Capaldi - Someone You Loved",
}


let isPlaying = false;
const playlist = [scarboroughFair, youAreTheReason, loveMeLikeYouDo, minefields, allOfMe, someoneYouLoved]

let index = 0;

function playSong() {
    play.querySelector(".bi").classList.replace("bi-play-circle-fill", "bi-pause-circle-fill");
    song.play();
    isPlaying = true;
}

function pauseSong() {
    play.querySelector(".bi").classList.replace("bi-pause-circle-fill", "bi-play-circle-fill");
    song.pause();
    isPlaying = false;
}

function playPauseDecider() {
    if(isPlaying === true) {
        pauseSong();
    } else {
        playSong();
    }
}

function initializeSong() {
    cover.src = `images/${playlist[index].file}.jpg`;
    song.src = `songs/${playlist[index].file}.mp3`;
    songName.innerHTML = playlist[index].songName;
    bandName.innerHTML = playlist[index].artist;
}

function previousSong() {
    if(index === 0) {
        index = (playlist.length) - 1;
    } else {
        index -= 1;
    }
    initializeSong();
    playSong();
}

function nextSong() {
    if(index === (playlist.length) - 1) {
        index = 0;
    } else {
        index += 1;
    }
    initializeSong();
    playSong();
}

// Função que carrega a barra de progresso da música
function upadateProgressBar() {
    const barWidth = (song.currentTime / song.duration) * 100;
    currentProgress.style.setProperty("--progress", `${barWidth}%`);
}

// Função que pula a barra de progresso da música
function jumpTo(event) {
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpTime = (clickPosition / width) * song.duration
    song.currentTime = jumpTime;
}

initializeSong();

play.addEventListener("click", playPauseDecider);
previous.addEventListener("click", previousSong);
next.addEventListener("click", nextSong);
song.addEventListener("timeupdate", upadateProgressBar);
progressContainer.addEventListener("click", jumpTo);