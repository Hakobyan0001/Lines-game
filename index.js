let board;
const COLORS = ['red', 'green', 'blue'];
let emptyCellsIndices = [];
let selectedBall = [];

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
        })
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
        board[RANDOM_INDEX] = BALL
        emptyCellsIndices = emptyCellsIndices.filter(el => el !== RANDOM_INDEX);
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

function getRandomNumber(from, to) {
    let min = Math.ceil(from);
    let max = Math.floor(to);
    return Math.floor(Math.random() * (max - min + 1) + min);;
}

// click and select ball
function selectBall() {
    board.forEach(function (ball, index) {
        $("#" + index).on('click', function () {
            if (ball && selectedBall.length < 1) {
                ball.isActive = true;
                selectedBall.push(ball);
                moveBall(ball, index);
            } else if (ball && ball.isActive && selectedBall.length === 1) {
                disSelectBall(ball);
            }
            updateBoardView();
        })
    })
}

// click and disselect ball
function disSelectBall(ball) {
    ball.isActive = false;
    selectedBall.splice(0, 1);

}

// moving the ball to the clicked empty cell
function moveBall(clickedBall, clickedBallIndex) {
    board.forEach(function (ball, index) {
        $("#" + index).on('click', function () {
            if (!ball) {
                board[index] = clickedBall;
                board[clickedBallIndex] = null;
                disSelectBall(clickedBall);
                console.log(board);
            }
            updateBoardView();

        })
    })
}
function removeBall() {
}

function startGame() {
    const BOARD_LENGTH = 9;
    const RANDOM_BALLS_COUNT = 3;

    createBoard(BOARD_LENGTH);
    createRandomBalls(RANDOM_BALLS_COUNT);
    selectBall();
    // removeBall();
    // addBall(color, index);
}


startGame();
