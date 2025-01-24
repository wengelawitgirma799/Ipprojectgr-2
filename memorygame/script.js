// JavaScript for the Memory Game
import Controller from "./js/controller.js";

const selectCellsNumber = document.querySelector('.select-cells-number');

// Initialize the game with the default value
let game = new Controller(parseInt(selectCellsNumber.value));

const timerContent = <span>00</span>min <span>00</span>sec;
let prevGame;

// Listen for changes in the dropdown to reset the game
selectCellsNumber.addEventListener('change', (e) => {
    document.querySelector('.playground').innerHTML = ''; 

    // Ensure the current game timer stops and resets
    if (game) {
        game.stopTime();
        game.elements.timer.innerHTML = timerContent;
    }

    // Stop and reset the previous game timer if it exists
    if (prevGame) {
        prevGame.stopTime();
        prevGame.elements.timer.innerHTML = timerContent;
    }

    // Parse the number of cards from the dropdown
    const cardsNumber = parseInt(e.target.value); // Ensure the value is parsed as an integer
    game = new Controller(cardsNumber); // Create a new game instance

    prevGame = game; // Keep reference to the previous game instance
});
