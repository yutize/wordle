import { checkWordPositions } from "./wordle.js";
import { addToggleFunction } from "./toggle-dark-mode.js";

const wordleGrid = document.getElementById(`wordle-grid`);

let currentAttempt = 0;
let currentRow = 0;
let currentColumn = 0;
let currentGuess = "";
let word = ``;

async function getRandomWord() {
    const response = await fetch(`https://it3049c-hangman.fly.dev`);
    const result = await response.json();
    return result.word;
}
(async () => {
    word = await getRandomWord();
    console.log(word);
})();
console.log(word, `test`);

const gameConfig = {
    rows: 5,
    cols: 5,
    word: `HELLO`
};

console.log(gameConfig.word);
                                                                                                                                                                                                                         

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
    console.log(`Adding letter ${letter} to row ${row}, col ${col}`);
    const cell = document.getElementById(`${row}-${col}`);
    console.log(cell);
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
        console.log(currentAttempt, `one`);
            // revealAttemptResult();
            if (currentAttempt >= 5) {
                endGame();
            }

            if (currentColumn !== 4) {
                console.log(`You did not provide 5 characters`);
            } else {
                
            }
            if (await isWordValid(currentGuess)) {
                console.log(`You guessed a correct word!`);
                currentColumn = 0;
            currentRow++;
                return;
            }
            if (! await isWordValid(currentGuess)) {
                console.log(`You guessed an invalid word!`);
                console.log(currentAttempt, `two`);
                currentColumn = 0;
                currentAttempt++;
                currentGuess = "";
                return;
            }

    }

    if (event.key === `Backspace` && currentColumn > 0) {
        console.log(currentColumn);
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
            console.log(`test`, currentColumn);
        }
        console.log(`test2`, currentColumn);
    }
});

/* function revealAttemptResult() {
    const result = checkWord(word, currentGuess);
    for (let i = 0; i < result.length; i++) {
        const cell = document.getElementById(`cell-${currentAttempt}-${i}`);
        if (cell) {
            cell.classList.add(result[i]);
        }
    }
} */

createGameGrid();






































addToggleFunction();

function updateAttemptGrid() {
    const results = checkWordPositions(gameState.currentGuess, gameConfig.word);
    results.forEach((result, index) => {
        const cell = document.getElementById(`${gameState.currentAttempt}-${index}`);
        cell.classList.add(result);
    });
}

async function isWordValid(word) {
    console.log(word);

    if (word === `hello`) {
        return true;
    }
    //const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then((response) => response.json());
    //return Array.isArray(response) && response.length > 0;
}
