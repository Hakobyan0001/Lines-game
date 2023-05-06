const board = $('#board');
const cubes = $('.cube');

function createBoard() {
    for (let i = 0; i < square(9); i++) {
        const cube = $('<div></div>').addClass('cube');
        board.append(cube);
        cubes.push(cube);
    }
}
createBoard();