let board;
const COLORS = ['red', 'green', 'blue'];
let emptyCelssIndices = [];
let emptyCells = [];
// filter, map imanal inca anum
// randomi harcy lucel, 
// creating board
function createBoard(boardLength) {
    board = new Array(boardLength ** 2).fill(null);
    emptyCelssIndices = board.map((element, index) => index);
    initBoardview();
}

// show board in page
function initBoardview() {
    //array
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
            emptyCelssIndices.splice(index, 1);
        }

    })
    console.log(emptyCelssIndices);

}

// creating balls and pushing in board
function createRandomBalls(ballsNumber) {
    let i = 0;
    while (i < ballsNumber) {


        const RANDOM_INDEX = getRandomIndex();
        const RANDOM_COLOR = COLORS[getRandomColor()];
        const BALL = {
            color: RANDOM_COLOR,
            isActive: false
        }
        board[RANDOM_INDEX] = BALL
        i++;
    }
}

function getRandomNumber(limit) {
    let ballsNumber = Math.floor(Math.random() * limit);
    return ballsNumber;
}

function getRandomColor() {
    let ballColor = getRandomNumber(COLORS.indexOf('red'), COLORS.length - 1);
    return ballColor;
}

function getRandomIndex() {
    emptyCells = emptyCelssIndices.filter(cell => cell)
    // console.log(emptyCells);
    const RANDOM_INDEX = getRandomNumber(emptyCells[0], emptyCells.length - 1);
    return RANDOM_INDEX;
}

function getRandomNumber(from, to) {
    let min = Math.ceil(from);
    let max = Math.floor(to);
    return Math.floor(Math.random() * (max - min + 1) + min);;
}

function renderBall(ball, index) {
    // $("board").append("ball");
}



function removeBall(index) {

}

function moveBall(index) {

}

// function selectBall() {
//     let selectedBall;
//     $("#board").on('click', function (ball, index) {
//         const BALL = $("#" + index).find('.ball');
//         debugger;
//         if (selectedBall && !BALL.length) {
//             $(this).append(selectedBall);
//             selectedBall = null;
//         }
//         else if (BALL.length && !selectedBall) {
//             selectedBall = BALL.detach();
//         }

//     });
// }

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
    // selectBall();
    // disSelectBall(color, index);
}







startGame();
