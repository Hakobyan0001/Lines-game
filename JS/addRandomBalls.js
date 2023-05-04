const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
let indices = [];

function addRandomBalls() {
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

addRandomBalls();