const fileInput = document.getElementById("file");
const orderInput = document.getElementById("order");

let order = 0;

let data;

let flashCardData;
let flashCardElement;

const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("q");
if (query) {
    const request = new XMLHttpRequest();
    request.open("GET", `content/examples/${query}.json`);
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            document.getElementById("start").classList.add("hidden");
            order = orderInput.checked ? 1 : 0;
            data = request.response;
            try {
                displayFlashCard();
            } catch (e) {
                alert("Invalid file format!");
                window.location.reload();
            }
        } else {
            alert("Invalid file!");
        }
    };
}

fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
        document.getElementById("start").classList.add("hidden");
        order = orderInput.checked ? 1 : 0;
        data = reader.result;
        try {
            displayFlashCard();
        } catch (e) {
            alert("Invalid file format!");
            window.location.reload();
        }
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