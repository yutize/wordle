import { addToggleFunction } from "./toggle-dark-mode.js";

const wordleGrid = document.getElementById(`wordle-grid`);

let currentRow = 0;
let currentColumn = 0;
let currentGuess = "";

const gameConfig = {
    rows: 5,
    cols: 5,
    word: ``
};

async function getRandomWord() {
    const response = await fetch(`https://it3049c-hangman.fly.dev`);
    const result = await response.json();
    return result.word;
}
(async function fetchRandomWord() {
    let word = await getRandomWord();
    gameConfig.word = word;
    console.log(word);
})();
                                                                                                                                                                                                                         

function addCellToGrid(row, col) {
    const cell = document.createElement(`div`);
    cell.classList.add(`letter`);
    cell.id = `${row}-${col}`;
    wordleGrid.appendChild(cell);
}

function createGameGrid() {
    for (let row = 0; row < gameConfig.rows; row++) {
        for( let col = 0; col < gameConfig.cols; col++) {
            addCellToGrid(row, col)
        }
    }
}

function addLetterToBox(letter, row, col) {
    const cell = document.getElementById(`${row}-${col}`);
    if (cell) {
        cell.innerText = letter.toUpperCase();
    } else {
        console.log(`Cell not found: ${row}-${col}`);
    }
}

function isLetter(letter) {
    return letter.length === 1 && letter.match(/[a-z]/i);
}

document.addEventListener(`keydown`, async(event) => {
    if (event.key == `Enter`) {
        console.log(gameConfig.word);
        console.log(currentGuess);

        if (currentColumn === gameConfig.word.length) 
        {
            revealResult()
            currentRow++;
            currentColumn = 0;
            currentGuess = ``;
        } 
        
    }

    if (event.key === `Backspace` && currentColumn > 0) {
            currentColumn--;
            addLetterToBox(``,currentRow ,currentColumn);
            currentGuess = currentGuess.slice(currentColumn, -1);
    }

    if (isLetter(event.key)) {
    
        if (currentColumn !== 5) {
            addLetterToBox(
                event.key, 
                currentRow,
                currentColumn
            );
            currentColumn++;
            currentGuess += event.key;
        }
    }
});
export function revealResult() {
    const result = checkWord(gameConfig.word, currentGuess);
    for (let i = 0; i < result.length; i++) {
        const cell = document.getElementById(`${currentRow}-${i}`);
        if (cell) {
            cell.classList.add(result[i]);
        }
    }
}

function checkWord(word, guess) {


    const result = [];
    const minLength = Math.min(word.length, guess.length);
    for (let i = 0; i < minLength; i++) {
        if (word[i] === guess[i]) {
            result.push('correct');
        } else if (word.includes(guess[i]) && word.indexOf(guess[i]) !== i) {
            result.push('misplaced');
        } else {
            result.push('incorrect');
        }
    }
    return result;
}

createGameGrid();
addToggleFunction();
