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
let board = getBoard();
const COLORS = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
const CUBES = [];
let indices = [];





function createBoard(length) {
    renderBoard(length);
}

function renderBoard(boardLength) {
    for (let i = 0; i < boardLength ** 2; i++) {
        const cube = $('<div></div>').addClass('cube');
        board.append(cube);
        CUBES.push(cube);
    }
}

function getBoard() {
    const takeBoard = $("#board").each(function (currentValue, index) {
        if (!currentValue) {
            return;
        }
        renderBall(currentValue, index);
    })
    return takeBoard;

}

function addRandomBalls(ballsNumber, index, color) {
    const NEW_INDICES = [];
    while (NEW_INDICES.length < ballsNumber) {
        let a = getRandomIndex(index);
        if (!indices.includes(a) && !NEW_INDICES.includes(a)) {
            NEW_INDICES.push(a);
        }
    }
    CUBES.forEach(function (index) {
        if (NEW_INDICES.includes(index)) {
            let addColor = getRandomColor(color);
            console.log(addColor);
            $(this).append('<div class="ball ' + addColor + '"></div>');
        }
    });
    indices = indices.concat(NEW_INDICES);
}

function getRandomNumber(limit) {
    let ballsNumber = Math.floor(Math.random() * limit);
    return ballsNumber;
}

function getRandomColor(RANDOM_COLORS_COUNT) {
    let ballColor = COLORS[Math.floor(Math.random() * RANDOM_COLORS_COUNT)];
    console.log(ballColor);
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
    const RANDOM_COLORS_COUNT = 7;

    createBoard(BOARD_LENGTH);
    //addRandomBalls(RANDOM_BALLS_COUNT, BOARD_LENGTH, RANDOM_COLORS_COUNT);
    // addBall(color, index);
    // removeBall(index);
    // selectBall(color, index);
    // disSelectBall(color, index);

}







startGame();