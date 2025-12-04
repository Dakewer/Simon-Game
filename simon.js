const simonButtons = document.getElementsByClassName("tile");
const startButton = document.getElementById("start");

class Simon {
    constructor() {
        this.round = 0;
        this.totalRounds = 1000000;
        this.userPosition = 0;
        this.sequence = [];
        this.speed = 1000;
        this.blockedButtons = true;
        this.buttons = Array.from(simonButtons);
        this.display = startButton;
    }

    init() {
        this.display.onclick = () => this.startGame();

        // Activar los botones
        this.buttons.forEach((btn, index) => {
            btn.onclick = () => this.buttonClick(index);
        });
    }

    startGame() {
        this.display.disabled = true;
        this.round = 0;
        this.userPosition = 0;
        this.speed = 1000;
        this.sequence = this.createSequence();
        this.showSequence();
    }

    createSequence() {
        return Array.from({ length: this.totalRounds }, () => this.getRandomColor());
    }

    getRandomColor() {
        return Math.floor(Math.random() * 4);
    }

    buttonClick(value) {
        if (!this.blockedButtons) {
            this.validateChosenColor(value);
        }
    }

    validateChosenColor(value) {
        // Si el jugador acierta el color correcto
        if (this.sequence[this.userPosition] === value) {

            this.userPosition++;

            // Fin de la ronda
            if (this.userPosition > this.round) {
                this.round++;
                this.speed /= 1.02;
                this.isGameOver();
            }

        } else {
            this.gameLost();
        }
    }

    isGameOver() {
        if (this.round === this.totalRounds) {
            this.gameWon();
        } else {
            this.userPosition = 0;
            this.showSequence();
        }
    }

    showSequence() {
        this.blockedButtons = true;
        // Pone la secuencia hasta el inicio para que se repita
        let sequenceIndex = 0;

        let timer = setInterval(() => {
            const button = this.buttons[this.sequence[sequenceIndex]];

            this.toggleButtonStyle(button);
            setTimeout(() => this.toggleButtonStyle(button), this.speed / 2);

            sequenceIndex++;

            // Cuando ya se mostraron todos los colores de la ronda
            // le regresamos la interacción a los botones
            if (sequenceIndex > this.round) {
                clearInterval(timer);

                setTimeout(() => {
                    this.blockedButtons = false;
                }, this.speed);
            }

        }, this.speed);
    }

    toggleButtonStyle(button) {
        button.classList.toggle("active");
    }

    gameLost() {
        alert("¡Fallaste! Intenta de nuevo.");
        this.display.disabled = false;
        this.blockedButtons = true;
    }

    gameWon() {
        alert("¡Ganaste el juego!");
        this.display.disabled = false;
        this.blockedButtons = true;
    }
}

const simon = new Simon();
simon.init();
