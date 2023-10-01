const fileInput = document.getElementById("file");
const orderInput = document.getElementById("order");

let order = 0;

let data;

let flashCardData;
let flashCardElement;

fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
        document.getElementById("start").classList.add("hidden");
        order = orderInput.checked ? 1 : 0;
        data = reader.result;
        displayFlashCard();
    };
});

function getRandomPick() {
    const words = JSON.parse(data);
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function createFlashCard(word) {
    const flashCard = document.createElement("div");
    flashCard.classList.add("flash-card");
    const flashCardContent = document.createElement("span");
    flashCardContent.classList.add("flash-card__content");
    flashCardContent.innerText = word;
    flashCard.appendChild(flashCardContent);
    return flashCard;
}

function displayFlashCard() {
    flashCardData = getRandomPick();
    flashCardElement = createFlashCard(flashCardData[0 + order]);
    document.body.appendChild(flashCardElement);
    flashCardElement.addEventListener("click", () => {
        if (flashCardElement.classList.contains("flash-card--flipped")) {
            flashCardElement.remove();
            displayFlashCard();
            return;
        }
        flashCardElement.children[0].innerText = flashCardData[1 - order];
        flashCardElement.classList.add("flash-card--flipped");
    });
}