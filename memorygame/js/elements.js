class Elements {
    constructor(cardsNumber) {
        if (!Number.isInteger(cardsNumber) || cardsNumber <= 0) {
            console.error("cardsNumber must be a positive integer.");
            return;
        }

        this.cardsNumber = cardsNumber;
        this.playground = document.querySelector(".playground");

        if (!this.playground) {
            console.error('Element with class "playground" not found.');
            return;
        }

        this.cardsIndex = [];
        this.doubleIndex();
        this.createCard();

        this.cards = document.querySelectorAll(".card"); // Initialize cards
        this.attempts = {
            correct: 0,
            wrong: 0,
            click: 0,
        };
        this.modal = document.querySelector(".modal");
        this.modalBtn = document.querySelector(".modal-btn");
        this.wrong = document.querySelector(".wrong");
        this.restartBtn = document.querySelector(".restart-btn");
        this.timer = document.querySelector(".timer");
        this.modalTime = document.querySelector(".modal-time");

        this.restartGame();
    }

    shuffleIndexes(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    doubleIndex() {
        const half = this.cardsNumber / 2;
        for (let i = 1; i <= this.cardsNumber; i++) {
            if (i <= half) {
                this.cardsIndex.push(i);
            } else {
                this.cardsIndex.push(i - half);
            }
        }
        console.log("Cards Index:", this.cardsIndex);
    }

    createCard() {
        console.log("Cards Number:", this.cardsNumber);

        // Set grid layout
        this.playground.style.gridTemplateRows = `repeat(${Math.sqrt(
            this.cardsNumber
        )}, 1fr)`;
        this.playground.style.gridTemplateColumns = `repeat(${Math.sqrt(
            this.cardsNumber
        )}, 1fr)`;

        // Shuffle and create cards
        this.shuffleIndexes(this.cardsIndex).forEach((index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.setAttribute("data-index", index);

            const img = document.createElement("img");
            img.onerror = () => {
                console.error(`Image for index ${index} is missing.`);
            };
            img.src = `img/icon-${index}.png`;
            card.append(img);
            this.playground.append(card);
        });

        this.cards = document.querySelectorAll(".card"); // Update cards
    }

    restartGame() {
        this.restartBtn.onclick = () => {
            this.modal.style.cssText =
                "visibility: visible; opacity: 1; transition: opacity .5s;";
            const modalContent = this.modal.firstElementChild;
            modalContent.innerHTML = `
                <h2 class='modal-text'>Do you want to quit the game?</h2>
                <div>
                    <button class='btn yes-btn'>Yes</button>
                    <button class='btn cancel-btn'>Cancel</button>
                </div>
            `;
            modalContent.querySelector(".cancel-btn").onclick = () => {
                this.modal.style.cssText =
                    "visibility: hidden; opacity: 0; transition: opacity .5s;";
            };
            modalContent.querySelector(".yes-btn").onclick = () => {
                location.reload();
            };
        };
    }
}

export default Elements;