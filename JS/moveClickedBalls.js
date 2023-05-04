function moveClickedBall() {
    let selectedBall;
    cubes.each(function () {
        $(this).on('click', function () {
            const ball = $(this).find('.ball');
            if (selectedBall && !ball.length) {
                $(this).append(selectedBall);
                selectedBall = null;
            }
            else if (ball.length && !selectedBall) {
                selectedBall = ball.detach();
            }
        });
    });
}

moveClickedBall();