const simonButtons = document.getElementsByClassName("tile");
const startButton = document.getElementById("start");

class Simon {
    constructor(simonButton, startButton) {
        this.round = 0;
        this.totalRounds = 1000000;
        this.userPosition = 0;
        this.sequence = [];
        this.speed = 1000;
        this.blockedButtons = true;
        this.buttons = Array.from(simonButtons);
        this.display = startButton;
    }

    //Funciones
    init(){
        this.display.onclick = () => this.startGame();
    }

    startGame(){
        this.display.disabled = true;
        this.updateRound(0);
        this.userPosition = 0;
        this.sequence = this.createSequence();
        this.showSequence();
    }

    updateRound(value){
        this.round = value;
    }

    createSequence(){
        return Array.from({length: this.totalRounds}, () => this.getRandomColor());
    }

    getRandomColor(){
        return Math.floor(Math.random() * 4);
    }

    buttonClick(value){
        !this.blockedButtons && this.validateChosenColor(value);
    }

    validateChosenColor(value){
        if(this.sequence[this.userPosition] === value){
            //Ver si se agrega sonido o no
            if(this.round === this.userPosition){
                this.updateRound(this.round + 1);
                this.speed /= 1.02;
                this.isGameOver();
            }
        } else{
            this.gameLost();
        }
    }

    isGameOver(){
        if(this.round === this.totalRounds){
            this.gameWon();
        } else{
            this.userPosition = 0;
            this.showSequence();
        }
    }

    showSequence(){
        this.blockedButtons = true;
        let sequenceIndex = 0;
        let timer = setInterval(() => {
            const button = this.buttons[this.sequence[sequenceIndex]];
            // En caso de usar sonido aquí se debe reproducir el sonido del botón en el que esté actualmente
            this.toggleButtonStyle(button)
            setTimeout(() => this.toggleButtonStyle(button), this.speed / 2)
            sequenceIndex ++;
            if(sequenceIndex > this.round){
                this.blockedButtons = false;
                clearInterval(timer);
            }
        }, this.speed);
    }

    toggleButtonStyle(button){
        button.classList.toggle('active');
    }

    gameLost(){
        this.display.disabled = false;
        this.blockedButtons = true;
    }

    gameWon(){
        this.display.disabled = false;
        this.blockedButtons = true;
    }
}



const simon = new Simon(simonButtons, startButton);
simon.init();