const board = $('#board');
const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
const cubes = $('.cube');
let indices = [];

for (let i = 0; i < 81; i++) {
  const cube = $('<div></div>').addClass('cube');
  board.append(cube);
  cubes.push(cube);
}

function addBalls() {
  const newIndices = [];
  while (newIndices.length < 3) {
    let index = Math.floor(Math.random() * 81);
    if (!indices.includes(index) && !newIndices.includes(index)) {
      newIndices.push(index);
    }
  }

  cubes.each(function (index) {
    if (newIndices.includes(index)) {
      const ballColor = colors[Math.floor(Math.random() * colors.length)];
      $(this).append('<div class="ball ' + ballColor + '"></div>');
    }
  });
  indices = indices.concat(newIndices);
}
addBalls();
setInterval(addBalls, 2000);
