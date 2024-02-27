export function addToggleFunction() {
    const toggleButton = document.getElementById(`light-mode`);
    toggleButton.addEventListener(`click`, () => {
        console.log(`hello`);
        const body = document.body;
        body.classList.toggle(`light-mode`);
        toggleButton.innerText = body.classList.contains(`light-mode`) ? `Toggle Night Mode` : `Toggle Light Mode`;
    });
}
