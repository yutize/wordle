export function checkWordPositions(userGuess, wordToBeGuessed) {
    return userGuess.split('').map((letter, index) => {
        if (letter === wordToBeGuessed[index]) {
            return `Letter ${letter} is in the correct position`;
        } else if (wordToBeGuessed.includes(letter)) {
            return `Letter ${letter} is not in the correct position but in the word`;
        } else {
            return `Letter ${letter} is not in the correct position`;
        }
    });
}
