const board = $('#board');
const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
const cubes = $('.cube');

for (let i = 0; i < 81; i++) {
  const cube = $('<div></div>').addClass('cube');
  board.append(cube);
  cubes.push(cube);
}

let indices = [];
while (indices.length < 3) {
  let index = Math.floor(Math.random() * 81);
  if (!indices.includes(index)) {
    indices.push(index);
  }
}

cubes.each(function(index) {
    if (indices.includes(index)) {
        const ballColor = colors[Math.floor(Math.random() * colors.length)];
        $(this).append('<div class="ball ' + ballColor + '"></div>');
    }
});

