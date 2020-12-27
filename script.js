const x_Mark = 'x';
const o_Mark = 'o';
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], 
    [2, 4, 6]
]

let circleMark;
let cellList = document.querySelectorAll(".cell");
let board = document.querySelector(".board");
let finalMessage = document.querySelector(".message");
let endScreen = document.querySelector(".screen");
let restartButton = document.querySelector(".restart");
let startButton = document.querySelector(".start");
let startButtonDiv = document.querySelector(".start-button");
let inputScreen = document.querySelector(".input-screen");
let okButton = document.querySelector(".ok-button");
let playerOneName = document.querySelector("#player-one-name");
let playerTwoName = document.querySelector("#player-two-name");
let markSelected = document.getElementsByName('mark');
let player2form = document.querySelector(".player-2-form");
let player1Name = document.querySelector(".player-1-name");
let player1Mark = document.querySelector(".player-1-mark");
let player2Name = document.querySelector(".player-2-name");
let player2Mark = document.querySelector(".player-2-mark");
let ok2Button = document.querySelector(".ok2-button");
let player1Score = document.querySelector(".player-1-score");
let player2Score = document.querySelector(".player-2-score");
let endTheGame = document.querySelector(".end-game");
let startScreen = document.querySelector(".start-button");


startButton.addEventListener('click', addDetails);

function addDetails() {
    inputScreen.classList.add("show");
    startScreen.classList.add("hide");

}

okButton.addEventListener('click', player1);

function player1() {

    for(var j=0; j<2; j++) {
        if(j==0) {
            player1Name.innerText = playerOneName.value;
            for(var i=0; i<markSelected.length; i++) {
                if(markSelected[i].checked) {
                    player1Mark.innerText=markSelected[i].value;
                }
            } inputScreen.classList.remove("show");
        } else {
            player2form.classList.add("show");
            ok2Button.addEventListener('click', () => {
            player2Name.innerText = playerTwoName.value;
            if(player1Mark.innerText==x_Mark) {
                player2Mark.innerText=o_Mark
            } else {
                player2Mark.innerText=x_Mark;
            }   
            player2form.classList.remove("show");
            startButtonDiv.classList.add("hide");
        });  
        }
    }
}

    
startGame();

restartButton.addEventListener('click', startGame);

function startGame() {

    circleMark = false;
    cellList.forEach( cell => {
        cell.classList.remove(x_Mark);
        cell.classList.remove(o_Mark);
        /*cell.removeEventListener('click', addMark);*/
        cell.addEventListener('click', addMark, { once: true });
    });
    markHover();
    endScreen.classList.remove("show");
}

function addMark(event) {
       
    let currentMark = circleMark ? o_Mark : x_Mark;
    
    //place mark function call
    placeMark(event.target, currentMark);

    //check for win
    if(checkWin(currentMark)) {
        endGame(false);

    } else if(isDraw()) {
    
        //check for draw
        endGame(true);

    } else {
    
    //switch turns function call
    switchTurn();

    //set hover marks
    markHover();    
    }  
}

//place mark function definition
function placeMark(event, currentMark) {
    event.classList.add(currentMark);
}

//switch turn function definition
function switchTurn() {
        circleMark = !circleMark;
}

//function to display the hover marks
function markHover() {
    board.classList.remove(x_Mark);
    board.classList.remove(o_Mark);
    if(circleMark) {
        board.classList.add(o_Mark);
    } else {
        board.classList.add(x_Mark);
    }
}

//function to check whether any winning combinations have been met
function checkWin(currentMark) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellList[index].classList.contains(currentMark);
        });
    });
}


//function to check if all cells have been marked
function isDraw() {
    return [...cellList].every(cell => {
        return cell.classList.contains(x_Mark) || cell.classList.contains(o_Mark);
    })
}

//function to assign the screen a message according to outcome
function endGame(draw) {
    if(draw) {
        finalMessage.innerText = "Its a Draw!";
    } else {
        let winner = circleMark ? "O" : "X";
        var p1=parseFloat(player1Score.innerText);
        var p2=parseFloat(player2Score.innerText);
        if(player1Mark.innerText=="x") {
            if(circleMark) {
            player2Score.innerText=p2+1;
        } else {
            player1Score.innerText=p1+1;
        }
        } else {
            if(circleMark) {
            player1Score.innerText=p1+1;
        } else {
            player2Score.innerText=p2+1;
        }
        }
        finalMessage.innerText = winner+" "+'wins';
    }
    endScreen.classList.add("show");
}

endTheGame.addEventListener('click', () => {
    player1Score.innerText = '0';
    player2Score.innerText = '0';
    player1Name.innerText = '';
    player1Mark.innerText = '';
    player2Name.innerText = '';
    player2Mark.innerText = '';
    playerOneName.value = '';
    playerTwoName.value = '';
    startScreen.classList.remove("hide");
    startGame();
});