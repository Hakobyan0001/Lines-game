let board;
let boardLength = 9;
let randomBallsCount = 3;
const COLORS = ['red', 'green', 'blue'];
let emptyCellsIndices = [];
let selectedBallIndex;
let gamePoint = 0;

// creating board
function createBoard(boardLength) {
    board = new Array(boardLength ** 2).fill(null);
    emptyCellsIndices = board.map((element, index) => index);
    initBoardview();
}

// show board in page
function initBoardview() {
    board.forEach(function (cell, index) {
        const CUBE_ELEMENT = $('<div></div>').attr({
            'class': 'cube',
            'id': index
        }).on("click", () => handelCellClick(index));
        $('#board').append(CUBE_ELEMENT);
        $('#board').css({
            "width": 50 * boardLength,
            "height": 50 * boardLength,
            "grid-template-columns": "repeat(" + boardLength + ", 1fr)"
        });
    })
}

// show balls in page
function updateBoardView() {
    board.forEach(function (ball, index) {
        if (ball) {
            if (ball.isActive === false) {
                $("#" + index).empty();
                const BALL_ELEMENT = $('<div class="ball ' + COLORS[ball.color] + '"></div>')
                $("#" + index).append(BALL_ELEMENT);
            }
            if (ball.isActive === true) {
                $("#" + index).empty();
                const SELECTED_BALL_ELEMENT = $('<div class="selectedBall ' + COLORS[ball.color] + '"></div>')
                $("#" + index).append(SELECTED_BALL_ELEMENT);
            }
        } else {
            $("#" + index).empty();
        }
    })
    $("h2").text("YOUR GAME POINT IS -" + " " + gamePoint);
}

// creating balls and pushing in board
function createRandomBalls(ballsNumber) {
    let i = 0;
    while (i < ballsNumber) {
        const RANDOM_INDEX = getRandomIndex();
        const RANDOM_COLOR = getRandomColor();

        const BALL = {
            color: RANDOM_COLOR,
            isActive: false
        }
        board[emptyCellsIndices[RANDOM_INDEX]] = BALL;
        emptyCellsIndices = emptyCellsIndices.filter(el => el !== emptyCellsIndices[RANDOM_INDEX]);

        i++;
    }
    updateBoardView();
}

// geting random color for ball
function getRandomColor() {
    let ballColor = getRandomNumber(0, COLORS.length - 1);
    return ballColor;
}

// geting random index for ball
function getRandomIndex() {
    const RANDOM_INDEX = getRandomNumber(0, emptyCellsIndices.length - 1);
    return RANDOM_INDEX;
}

// geting a random number among the given numbers
function getRandomNumber(min, max) {
    const RANDOM_NUMBER = Math.floor(Math.random() * (max - min + 1) + min);
    return RANDOM_NUMBER;
}

// checking the clicked cube and perform an action
function handelCellClick(index) {
    const BALL = board[index]
    if (!BALL && selectedBallIndex === undefined) {
        return;
    }
    if (BALL && BALL.isActive === false && selectedBallIndex === undefined) {
        BALL.isActive = true;
        selectedBallIndex = index;
        updateBoardView();
        return;
    }
    if (BALL && BALL.isActive === true && selectedBallIndex === index) {
        disSelectBall(BALL);
        updateBoardView();
        return;
    }
    if (!BALL && (selectedBallIndex || selectedBallIndex === 0)) {
        moveBall(selectedBallIndex, index);
        updateBoardView();
        removeHorizontalBallsLine();
        removeVerticalBallsLine();
        return;
    }
}

// click and disselect ball
function disSelectBall(ball) {
    ball.isActive = false;
    selectedBallIndex = undefined;
}

// moving the ball to the clicked empty cell
function moveBall(selectedBallIndex, clickedCellIndex) {
    board[clickedCellIndex] = board[selectedBallIndex];
    board[selectedBallIndex] = null;
    emptyCellsIndices.push(selectedBallIndex);
    emptyCellsIndices = emptyCellsIndices.filter(el => el !== clickedCellIndex);
    disSelectBall(board[clickedCellIndex]);
    createRandomBalls(randomBallsCount);

}

// removing horizantal same colored balls line
function removeHorizontalBallsLine() {
    const REQUIRED_NUMBER_OF_BALLS = 5;
    let checkedBallsColor = null;
    let ballsCount = 0;
    for (let row = 0; row < boardLength; row++) {
        for (let col = 0; col < boardLength; col++) {
            const BALL = board[row * boardLength + col];
            if (BALL && BALL.color === checkedBallsColor) {
                ballsCount++;
            } else {
                ballsCount = 1;
                checkedBallsColor = BALL ? BALL.color : null;
            }
            if (ballsCount === REQUIRED_NUMBER_OF_BALLS) {
                for (let i = col - ballsCount + 1; i <= col; i++) {
                    let removedBallIndex = row * boardLength + i;
                    emptyCellsIndices.push(removedBallIndex);
                    board[removedBallIndex] = null;
                    gamePoint = gamePoint + 1;
                }
                break;
            }
        }
    }
    updateBoardView();
}

// removing vertical same colored balls line
function removeVerticalBallsLine() {
    const REQUIRED_NUMBER_OF_BALLS = 5;
    let checkedBallsColor = null;
    let ballsCount = 0;
    for (let col = 0; col < boardLength; col++) {
        for (let row = 0; row < boardLength; row++) {
            const BALL = board[col + row * boardLength];
            if (BALL && BALL.color === checkedBallsColor) {
                ballsCount++;
            } else {
                ballsCount = 1;
                checkedBallsColor = BALL ? BALL.color : null;
            }
            if (ballsCount === REQUIRED_NUMBER_OF_BALLS) {
                for (let i = row - ballsCount + 1; i <= row; i++) {
                    let removedBallIndex = col + (i * boardLength);
                    emptyCellsIndices.push(removedBallIndex);
                    board[removedBallIndex] = null;
                    gamePoint = gamePoint + 1;
                }
                break;
            }
        }
    }
    updateBoardView();
}

function removeDiagonalBallsLine() {

}


function startGame() {
    boardLength = prompt("write the number of vertical and horizontal boxes");
    randomBallsCount = prompt("write the number of balls you wanted to add");
    createBoard(boardLength);
    createRandomBalls(randomBallsCount);

}

startGame();
