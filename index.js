const board = document.querySelector('#board');
        
for (let i = 0; i < 81; i++) {
    const cube = document.createElement('div');
    cube.classList.add('cube');
    board.appendChild(cube);
}