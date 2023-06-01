let board;
const BOARD_LENGTH = 9;
const RANDOM_BALLS_COUNT = 3;
const COLORS = ['red', 'green', 'blue'];
let emptyCellsIndices = [];
let selectedBallIndex;


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
        console.log("EMPTY CELLS INDICES", emptyCellsIndices);

        i++;
    }
    updateBoardView();
}

function getRandomNumber(limit) {
    let ballsNumber = Math.floor(Math.random() * limit);
    return ballsNumber;
}

function getRandomColor() {
    let ballColor = getRandomNumber(0, COLORS.length - 1);
    return ballColor;
}

function getRandomIndex() {
    const RANDOM_INDEX = getRandomNumber(0, emptyCellsIndices.length - 1);
    return RANDOM_INDEX;
}

function getRandomNumber(min, max) {
    const RANDOM_NUMBER = Math.floor(Math.random() * (max - min + 1) + min);
    return RANDOM_NUMBER;
}

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

    console.log(clickedCellIndex, selectedBallIndex)
    emptyCellsIndices.push(selectedBallIndex);
    emptyCellsIndices = emptyCellsIndices.filter(el => el !== clickedCellIndex);
    console.log("EMPTY CELLS INDICES", emptyCellsIndices);
    disSelectBall(board[clickedCellIndex]);
    createRandomBalls(RANDOM_BALLS_COUNT);

}
function removeBall() {
}

function startGame() {


    createBoard(BOARD_LENGTH);
    createRandomBalls(RANDOM_BALLS_COUNT);
    // selectBall();
    // removeBall();
    // addBall(color, index);
}


startGame();
