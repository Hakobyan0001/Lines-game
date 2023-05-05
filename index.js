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
const COLORS = ["red", "green", "blue"];






function createBoard(length) {
    fillBoard(length);

}

function addRandomBalls(number, color = "red",) {
    getRandomNumber(number);
    getRandomColor(color);
    getRandomIndex();
}

function getRandomNumber(limit) {

}

function getRandomColor(limit) {

}

function getRandomIndex() {

}

function addBall(color = "red", index) {
    getRandomColor(color);
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

function updateBoard() {

}


function startGame() {
    const BOARD_LENGTH = 9;
    const RANDOM_BALLS_COUNT = 3;


    createBoard(BOARD_LENGTH);
    addRandomBalls(RANDOM_BALLS_COUNT);
    addBall(color, index);
    removeBall(index);
    selectBall(color, index);
    disSelectBall(color, index);

}








startGame();