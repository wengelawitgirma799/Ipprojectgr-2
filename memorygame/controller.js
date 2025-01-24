import Elements from "./elements.js";

class Controller {
    constructor(cardsNumber) {
        this.elements = new Elements(cardsNumber);

        // Validate initialization
        if (!this.elements.cards) {
            console.error("Cards could not be initialized.");
            return;
        }

        this.prevCard = null; // Initialize the previous card
        this.startClock = true; // Control when the clock starts
        this.time = null; // Timer reference
        this.clickCard(); // Attach click handlers
    }

    clickCard() {
        const { attempts, cards } = this.elements;

        cards.forEach((card) => {
            card.addEventListener("click", () => {
                if (this.startClock) this.setTime(); // Start timer on first click
                attempts.click++;
                card.classList.add("change");

                if (attempts.click === 2) {
                    cards.forEach((card) => {
                        card.classList.add("pause");
                        setTimeout(() => {
                            card.classList.remove("pause");
                        }, 1000);
                    });

                    // Check for a match
                    if (this.prevCard.dataset.index === card.dataset.index) {
                        attempts.correct++;
                        card.classList.add("stop");
                        this.prevCard.classList.add("stop");
                    } else {
                        attempts.wrong++;
                        setTimeout(() => {
                            card.classList.remove("change");
                            this.prevCard.classList.remove("change");
                        }, 1000);
                    }

                    attempts.click = 0; // Reset click count
                    this.endGame(attempts); // Check if the game has ended
                    console.log(attempts.correct, attempts.wrong);
                } else {
                    this.prevCard = card; // Set the current card as the previous card
                }

                this.startClock = false; // Ensure clock doesn't restart
            });
        });
    }

    endGame({ correct }) {
        const {
            cardsNumber,
            modal,
            modalBtn,
            wrong,
            attempts,
            timer,
            modalTime,
        } = this.elements;

        if (correct === cardsNumber / 2) {
            console.log("You Won");
            this.startClock = true;
            this.stopTime();

            const timerClone = timer.cloneNode(true);
            modalTime.append(timerClone);
            modal.style.cssText = "visibility: visible; opacity: 1;";
            wrong.textContent = attempts.wrong;

            modalBtn.onclick = () => location.reload(); // Restart game
        } else {
            console.log("Not Yet");
        }
    }

    setTime() {
        let int = 1;
        const { timer } = this.elements;

        this.time = setInterval(() => {
            const seconds = int % 60;
            timer.children[1].innerHTML =
                seconds > 9 ? seconds : `0${seconds}`;
            const minutes = Math.floor(int / 60);
            timer.children[0].innerHTML =
                minutes > 9 ? minutes : `0${minutes}`;
            int++;
        }, 1000);
    }

    stopTime() {
        clearInterval(this.time);
    }
}

export default Controller;
