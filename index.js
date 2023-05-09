// const board = $('#board');
// const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
// const cubes = $('.cube');
// let indices = [];

// for (let i = 0; i < 81; i++) {
//   const cube = $('<div></div>').addClass('cube');
//   board.append(cube);
//   cubes.push(cube);
// }

// function addRandomBalls() {
//   const newIndices = [];
//   while (newIndices.length < 3) {
//     let index = Math.floor(Math.random() * 81);
//     if (!indices.includes(index) && !newIndices.includes(index)) {
//       newIndices.push(index);
//     }
//   }
//   cubes.each(function (index) {
//     if (newIndices.includes(index)) {
//       const ballColor = colors[Math.floor(Math.random() * colors.length)];
//       $(this).append('<div class="ball ' + ballColor + '"></div>');
//     }
//   });
//   indices = indices.concat(newIndices);
// }

// function moveClickedBall() {
//   let selectedBall = null;
//   cubes.each(function (index) {
//     $(this).on('click', function () {
//       const ball = $(this).find('.ball');
//       if (selectedBall && !ball.length) {
//         $(this).append(selectedBall);
//         selectedBall = null;
//       }
//       else if (ball.length && !selectedBall) {
//         selectedBall = ball.detach();
//       }
//     });
//   });
// }

// addRandomBalls();
// moveClickedBall();

// l - board length
let board = [];
const COLORS = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
let indices = [];
const BALLS_INDICES = [];
let balls = [];

// creating board
function createBoard(boardLength) {
    for (let i = 0; i < boardLength ** 2; i++) {
        const CUBES = 0;
        board.push(CUBES);
        indices.push(i);
        updateBoard();
    }
    renderBoard();

}

function updateBoard() {
    board.forEach(function () {
        const CUBE = $('<div></div>').addClass('cube');
        let index = board.indexOf(indices);
        board.splice(index, 1, CUBE);
    })
}
function renderBoard() {
    $("#board").append(board);
}


// creating and adding balls
function addRandomBalls(ballsNumber, index, color) {

    while (BALLS_INDICES.length < ballsNumber) {
        let randomIndex = getRandomIndex(index);
        if (!BALLS_INDICES.includes(randomIndex)) {
            BALLS_INDICES.push(randomIndex);
        }
    }
    console.log(BALLS_INDICES)
    $(board).each(function (index) {
        if (BALLS_INDICES.includes(index)) {
            console.log(index);
            let addColor = getRandomColor(color);
            console.log(addColor);
            // cant add ball
            balls.push($(this).addClass("ball"));
            board.splice(index, 1, balls);
        }
    });

}

function getRandomNumber(limit) {
    let ballsNumber = Math.floor(Math.random() * limit);
    return ballsNumber;
}

function getRandomColor(randomColorCount) {
    let ballColor = COLORS[Math.floor(Math.random() * randomColorCount)];
    return ballColor;
}

function getRandomIndex(number) {
    let index = Math.floor(Math.random() * (number ** 2));
    return index;
}

function renderBall(ball, index) {
    $("board").append("ball");
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
    const RANDOM_COLORS_COUNT = 6;

    createBoard(BOARD_LENGTH);
    addRandomBalls(RANDOM_BALLS_COUNT, BOARD_LENGTH, RANDOM_COLORS_COUNT);
    // addBall(color, index);
    // removeBall(index);
    // selectBall(color, index);
    // disSelectBall(color, index);

}







startGame();