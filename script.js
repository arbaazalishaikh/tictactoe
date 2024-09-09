const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const gameBtn = document.querySelector(".btn");


let currenPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function gameInit() {
    currenPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    gameBtn.classList.remove("active");

    // boxes ko UI pr empty krna bhi padega
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        // initialize box with css properties
        box.classList = `box box${index + 1}`;
    })
    gameInfo.innerText = `Current Player - ${currenPlayer}`;
}
gameInit();

function swapTurn() {
    if (currenPlayer === "X") {
        currenPlayer = "O";
    }
    else {
        currenPlayer = "X";
    }

    // UI pr update karo current player ko
    gameInfo.innerText = `Current Player - ${currenPlayer}`;
}


function checkGameOver() {
    // gameBtn.classList.add("active");
    let answer = "";

    winningPositions.forEach((position) => {
        // all 3 boxes should be empty and exactly same in value
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            // check if winner is X
            if (gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "O";

            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    })

    // it means we have a winner
    if (answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        return;
    }

    //lets check whether game is tie or not
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillCount++;
        }
    })
    // board is filled , game it tie
    if (fillCount === 9) {
        gameInfo.innerText = "Game Tied!";
    }
}
function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currenPlayer;
        gameGrid[index] = currenPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap
        swapTurn();
        // game over
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    })
})

gameBtn.addEventListener('click', gameInit);