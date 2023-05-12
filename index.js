let board;
const COLORS = ['red', 'green', 'blue'];
const BALLS_INDICES = [];

// creating board
function createBoard(boardLength) {
    board = new Array(boardLength ** 2).fill(null);
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
            const BALL_ELEMENT = $('<div class="ball ' + ball.color + '"></div>')
            $("#" + index).append(BALL_ELEMENT);

        }
    })

}

// creating balls and pushing in board
function createRandomBalls(ballsNumber) {
    while (BALLS_INDICES.length < ballsNumber) {
        let randomIndex = getRandomIndex();
        if (!BALLS_INDICES.includes(randomIndex)) {
            BALLS_INDICES.push(randomIndex);
        }
    }
    $(board).each(function (index) {
        if (BALLS_INDICES.includes(index)) {
            const ADD_COLOR = getRandomColor();
            let ball = {
                color: ADD_COLOR,
                isActive: false
            }
            board[index] = ball
        }
    });

}
function getRandomNumber(limit) {
    let ballsNumber = Math.floor(Math.random() * limit);
    return ballsNumber;
}

function getRandomColor() {
    let ballColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    return ballColor;
}

function getRandomIndex() {
    let index = Math.floor(Math.random() * board.length);
    return index;
}

function renderBall(ball, index) {
    // $("board").append("ball");
}



function removeBall(index) {

}

function moveBall(index) {

}

function selectBall(color, index) {

}

function disSelectBall(index) {

}

function fillBoard(boardLength) {

}


function startGame() {
    const BOARD_LENGTH = 9;
    const RANDOM_BALLS_COUNT = 3;

    createBoard(BOARD_LENGTH);
    createRandomBalls(RANDOM_BALLS_COUNT);
    updateBoardView();
    // addBall(color, index);
    // removeBall(index);
    // selectBall(color, index);
    // disSelectBall(color, index);
}







startGame();
