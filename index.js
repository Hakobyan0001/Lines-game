let board;
const COLORS = ['red', 'green', 'blue'];
let emptyCellsIndices = [];
// sarqel select functiony guyn poxel sexmelu jamanak
// texapoxel ayl vandak gndaky

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
            if (ball['isActive'] === false) {
                const BALL_ELEMENT = $('<div class="ball ' + COLORS[ball.color] + '"></div>')
                $("#" + index).append(BALL_ELEMENT);
            }
            if (ball['isActive'] === true) {
                $("#" + index).empty();
                const SELECTED_BALL_ELEMENT = $('<div class="selectedBall ' + COLORS[ball.color] + '"></div>')
                $("#" + index).append(SELECTED_BALL_ELEMENT);
            }
        }
    })

}

// creating balls and pushing in board
function createRandomBalls(ballsNumber) {
    let i = 0;
    while (i < ballsNumber) {
        const RANDOM_INDEX = getRandomIndex();
        const RANDOM_COLOR = getRandomColor();
        //poxeci let vor karanam meji arjeqnery poxem
        let ball = {
            color: RANDOM_COLOR,
            isActive: false
        }
        board[RANDOM_INDEX] = ball
        emptyCellsIndices = emptyCellsIndices.filter(el => el !== RANDOM_INDEX);
        i++;
    }
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

function selectBall() {
    let selectedBall = [];
    board.forEach(function (ball, index) {
        $("#" + index).on('click', function () {

            if (ball && selectedBall.length < 1) {
                ball['isActive'] = true;
                selectedBall.push(ball);
                updateBoardView();

            }
        })


    })
}

function removeBall() {
}

function moveBall(index) {

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
    selectBall();
    // removeBall();
    // addBall(color, index);

    // disSelectBall(color, index);
}







startGame();
