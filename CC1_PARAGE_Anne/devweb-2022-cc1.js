"use strict";

const $startBtn = document.getElementById("start-btn");
const $guessBtn = document.getElementById("guess-btn");
const $cowBtn = document.getElementById("cow-btn");
const $output = document.getElementById("output");
const $numUsr = document.getElementById("num-usr");
const $maxUsr = document.getElementById("max-usr");

let secretNumber = 0;
let nbGuesses = 0;
let maxGuesses = 0;

function launchGame(_evt) {
  const maxValue = parseInt($maxUsr.value);
  secretNumber = Math.floor(Math.random() * parseInt(maxValue)) + 1;
  maxGuesses = Math.ceil(Math.log(maxValue)) + 1;
  //question 1
  //récupère la valeur rentrée par l'utilisateur
  if (isNaN(maxValue) || maxValue <= 0) {
    $output.innerHTML = "Veuillez saisir un nombre supérieur à 0"; // si le nombre est inférieur ou égale a 0
    return;
  }
  nbGuesses = 0;
  $output.textContent = `Partie Lancée, trouver le nombre en au plus ${maxGuesses} coups`;
  $guessBtn.disabled = false;

  // question 2
  $guessBtn.addEventListener("click", function () {
    const numUsrValue = parseInt($numUsr.value);
    nbGuesses++;
    if (isNaN(numUsrValue) || numUsrValue <= 0) {
      $output.innerHTML = "Veuillez saisir un nombre supérieur à 0";
      return;
    }

    if (numUsrValue > maxValue) {
      $output.innerHTML += `${numUsrValue} est supérieur a ${maxValue}. Veuillez saisir un nombre inférieur ou égal a ${maxValue}`;
    } else if (numUsrValue === secretNumber) {
      $output.innerHTML = `Bravo, vous avez trouvé le nombre en ${nbGuesses} coups`;
      $guessBtn.disabled = true;
      console.log(secretNumber);
    } else if (numUsrValue < secretNumber) {
      $output.innerHTML += `<br> ${numUsrValue} est trop petit. Continuez à essayer. (Tentative ${nbGuesses} sur ${maxGuesses})`;
      console.log(nbGuesses);
    } else {
      $output.innerHTML += `<br> ${numUsrValue} est trop grand. Continuez à essayer. (Tentative ${nbGuesses} sur ${maxGuesses})`;
      console.log(nbGuesses);
    }

    if (nbGuesses >= maxGuesses) {
      $output.innerHTML = `Perdu, vous avez atteint le nombre maximum de coups (${maxGuesses}). Le nombre secret était ${secretNumber}.`;
      $guessBtn.disabled = true;
    }
  });

  // question 3
  $numUsr.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      $guessBtn.click();
    }
  });
}

$startBtn.addEventListener("click", launchGame);

function addCow(evt) {
  console.debug(evt.x, evt.y);
  const Imagevache = document.createElement("img");
  Imagevache.src = "https://upload.wikimedia.org/wikipedia/commons/3/30/Cowicon.svg";
  Imagevache.classList.add("cow");

  Imagevache.style.left = (evt.x - 30)+ window.scrollX + "px"; 
  Imagevache.style.top = (evt.y - 30)+window.scrollY + "px"; 

  const rotation = Math.random() * 360;
  Imagevache.style.transform = `rotate(${rotation}deg)`;

  document.body.appendChild(Image);
}

function toggleCow(_evt) {
  if (document.onmousedown instanceof Function) {
    document.onmousedown = null;
  } else {
    document.onmousedown = addCow;
  }
}
$cowBtn.addEventListener("click", toggleCow);
