let board;
const COLORS = ["red", "green", "blue"];
let boardLength;
let ballsCount;
let currentBoardLength;
let currentBallsCount;
let emptyCellsIndices = [];
let selectedBallIndex;
let gamePoint = 0;
const REQUIRED_NUMBER_OF_BALLS = 5;

// creating board
function createBoard() {
  board = new Array(boardLength ** 2).fill(null);
  emptyCellsIndices = board.map((element, index) => index);
}

// show board in page
function initBoardview() {
  board.forEach(function (cell, index) {
    const CUBE_ELEMENT = $("<div></div>")
      .attr({
        class: "cube",
        id: index,
      })
      .on("click", () => handelCellClick(index));
    $("#board").append(CUBE_ELEMENT);
    $("#board").css({
      width: 50 * boardLength,
      height: 50 * boardLength,
      "grid-template-columns": "repeat(" + boardLength + ", 1fr)",
    });
  });
}

function deleteCells() {
  $("#board").empty();
}

// creating balls and pushing in board
function createRandomBalls() {
  let i = 0;
  while (i < ballsCount) {
    const RANDOM_INDEX = getRandomIndex();
    const RANDOM_COLOR = getRandomColor();
    const BALL = {
      color: RANDOM_COLOR,
      isActive: false,
    };
    board[emptyCellsIndices[RANDOM_INDEX]] = BALL;
    emptyCellsIndices = emptyCellsIndices.filter(
      (el) => el !== emptyCellsIndices[RANDOM_INDEX]
    );

    i++;
  }
  updateBoardView();
}

// show balls in page
function updateBoardView() {
  board.forEach(function (ball, index) {
    if (ball) {
      if (ball.isActive === false) {
        $("#" + index).empty();
        const BALL_ELEMENT = $(
          '<div class="ball ' + COLORS[ball.color] + '"></div>'
        );
        $("#" + index).append(BALL_ELEMENT);
      }
      if (ball.isActive === true) {
        $("#" + index).empty();
        const SELECTED_BALL_ELEMENT = $(
          '<div class="selectedBall ' + COLORS[ball.color] + '"></div>'
        );
        $("#" + index).append(SELECTED_BALL_ELEMENT);
      }
    } else {
      $("#" + index).empty();
    }
  });
  $("h2").text("YOUR GAME POINT IS -" + " " + gamePoint);
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
  const BALL = board[index];

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
    removeHorizontalBallsLine();
    removeVerticalBallsLine();
    removeDiagonalBallsLine1();
    removeDiagonalBallsLine2();
    if (board.every((element) => element)) {
      setTimeout(gameOver, 500);
      setTimeout(restartGame, 1000);
    }
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
  emptyCellsIndices = emptyCellsIndices.filter((el) => el !== clickedCellIndex);
  disSelectBall(board[clickedCellIndex]);
  createRandomBalls(COLORS.length - 1);
  updateBoardView();
}

// removing horizantal same colored balls line
function removeHorizontalBallsLine() {
  for (let row = 0; row < boardLength; row++) {
    let checkedBallsColor = null;
    let ballsCount = 0;

    for (let col = 0; col < boardLength; col++) {
      const BALL = board[row * boardLength + col];

      if (BALL && BALL.color === checkedBallsColor) {
        ballsCount++;
      } else {
        ballsCount = 1;
        checkedBallsColor = BALL ? BALL.color : null;
      }
      if (ballsCount === REQUIRED_NUMBER_OF_BALLS) {
        deleteBalls(row, col - ballsCount + 1, row, col);
        break;
      }
    }
  }
}

// removing vertical same colored balls line
function removeVerticalBallsLine() {
  for (let col = 0; col < boardLength; col++) {
    let checkedBallsColor = null;
    let ballsCount = 0;

    for (let row = 0; row < boardLength; row++) {
      const BALL = board[col + row * boardLength];

      if (BALL && BALL.color === checkedBallsColor) {
        ballsCount++;
      } else {
        ballsCount = 1;
        checkedBallsColor = BALL ? BALL.color : null;
      }
      if (ballsCount === REQUIRED_NUMBER_OF_BALLS) {
        deleteBalls(row - ballsCount + 1, col, row, col);
        break;
      }
    }
  }
}

// delete balls from removing horizontal or vertical lines
function deleteBalls(fromRow, fromCol, toRow, toCol) {
  for (row = fromRow; row <= toRow; row++) {
    for (col = fromCol; col <= toCol; col++) {
      let removedBallIndex = row * boardLength + col;
      emptyCellsIndices.push(removedBallIndex);
      board[removedBallIndex] = null;
      gamePoint = gamePoint + 1;
    }
  }
  updateBoardView();
}

// remove diagonal from top left to right bottom
function removeDiagonalBallsLine1() {
  for (let row = 0; row <= boardLength - REQUIRED_NUMBER_OF_BALLS; row++) {
    for (let col = 0; col <= boardLength - REQUIRED_NUMBER_OF_BALLS; col++) {
      let ballsCount = 1;
      let checkedBallsColor = null;

      for (let angle = 0; angle < REQUIRED_NUMBER_OF_BALLS; angle++) {
        const BALL = board[(row + angle) * boardLength + (col + angle)];

        if (BALL && BALL.color === checkedBallsColor) {
          ballsCount++;
        } else {
          ballsCount = 1;
          checkedBallsColor = BALL ? BALL.color : null;
        }

        if (ballsCount === REQUIRED_NUMBER_OF_BALLS) {
          for (let angle = 0; angle < REQUIRED_NUMBER_OF_BALLS; angle++) {
            let removedBallIndex = (row + angle) * boardLength + (col + angle);
            emptyCellsIndices.push(removedBallIndex);
            board[removedBallIndex] = null;
            gamePoint++;
          }
          updateBoardView();
          return;
        }
      }
    }
  }
}

// remove diagonal from bottom left to top right
function removeDiagonalBallsLine2() {
  for (let row = boardLength - 1; row >= REQUIRED_NUMBER_OF_BALLS - 1; row--) {
    for (let col = 0; col <= boardLength - REQUIRED_NUMBER_OF_BALLS; col++) {
      let ballsCount = 1;
      let checkedBallsColor = null;

      for (let angle = 0; angle < REQUIRED_NUMBER_OF_BALLS; angle++) {
        const BALL = board[(row - angle) * boardLength + (col + angle)];

        if (BALL && BALL.color === checkedBallsColor) {
          ballsCount++;
        } else {
          ballsCount = 1;
          checkedBallsColor = BALL ? BALL.color : null;
        }

        if (ballsCount === REQUIRED_NUMBER_OF_BALLS) {
          for (let angle = 0; angle < REQUIRED_NUMBER_OF_BALLS; angle++) {
            let removedBallIndex = (row - angle) * boardLength + (col + angle);
            emptyCellsIndices.push(removedBallIndex);
            board[removedBallIndex] = null;
            gamePoint++;
          }
          updateBoardView();
          return;
        }
      }
    }
  }
}

// request about board size and balls number
function inputBoardSizeAndBallsNumber() {
  let inputForm = document.getElementById("inputForm");
  inputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    boardLength = parseInt(document.getElementById("boardLength").value);
    ballsCount = parseInt(document.getElementById("ballsCount").value);
    if (isNaN(boardLength) || isNaN(ballsCount)) {
      alert("Please enter valid numbers for board length and balls count.");
      return;
    }
    if (board === undefined) {
      startGame();
    } else if (
      currentBoardLength != boardLength ||
      currentBallsCount != ballsCount
    ) {
      refreshGame();
    } else {
      restartGame();
    }
  });
}

// say game over if user lose
function gameOver() {
  alert("GAME OVER"), 1000;
}

//refresh game board
function refreshGame() {
  currentBoardLength = boardLength;
  currentBallsCount = ballsCount;
  deleteCells();
  createBoard();
  initBoardview();
  createRandomBalls();
}
// restarting game after lose
function restartGame() {
  board = board.fill(null);
  emptyCellsIndices = board.map((element, index) => index);
  gamePoint = 0;
  createRandomBalls();
  updateBoardView();
}
// function for start game
function startGame() {
  currentBoardLength = boardLength;
  currentBallsCount = ballsCount;
  createBoard();
  initBoardview();
  createRandomBalls();
}

inputBoardSizeAndBallsNumber();
