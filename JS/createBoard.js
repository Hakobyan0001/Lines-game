const board = $('#board');
const cubes = $('.cube');

function createBoard() {
    for (let i = 0; i < 81; i++) {
        const cube = $('<div></div>').addClass('cube');
        board.append(cube);
        cubes.push(cube);
    }
}
createBoard();