 let gameboard = (function() {

    //HTML elements
    const statusDiv = document.querySelector('.status');
    const resetDiv = document.querySelector('.reset');
    const squareDivs = document.querySelectorAll('.square')


    //Game Variables
    let gameIsLive = true;
    let xIsNext = true;


    //Functions
    const handleWin = (letter) => {
        gameIsLive = false;
        if (letter === 'x') {
            statusDiv.innerHTML = `<span>X wins!</span>`;
        } else {
            statusDiv.innerHTML = `<span>O wins!</span>`;
        }
    };

    const checkGameStatus = () => {
        const topLeft = squareDivs[0].classList[1];
        const top = squareDivs[1].classList[1];
        const topRight = squareDivs[2].classList[1];
        const middleLeft = squareDivs[3].classList[1];
        const middle = squareDivs[4].classList[1];
        const middleRight = squareDivs[5].classList[1];
        const bottomLeft = squareDivs[6].classList[1];
        const bottom = squareDivs[7].classList[1];
        const bottomRight = squareDivs[8].classList[1];

        if (topLeft && topLeft === top && topLeft === topRight) {
            handleWin(topLeft);
            squareDivs[0].classList.add('won');
            squareDivs[1].classList.add('won');
            squareDivs[2].classList.add('won');
        } else if (middleLeft && middleLeft === middle && middleLeft === middleRight) {
            handleWin(middleLeft);
            squareDivs[3].classList.add('won');
            squareDivs[4].classList.add('won');
            squareDivs[5].classList.add('won');
        } else if (bottomLeft && bottomLeft === bottom && bottomLeft === bottomRight) {
            handleWin(bottomLeft);
            squareDivs[6].classList.add('won');
            squareDivs[7].classList.add('won');
            squareDivs[8].classList.add('won');
        } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
            handleWin(topLeft);
            squareDivs[0].classList.add('won');
            squareDivs[3].classList.add('won');
            squareDivs[6].classList.add('won');
        } else if (top && top === middle && top === bottom) {
            handleWin(top);
            squareDivs[1].classList.add('won');
            squareDivs[4].classList.add('won');
            squareDivs[7].classList.add('won');
        } else if (topRight && topRight === middleRight && topRight === bottomRight) {
            handleWin(topRight);
            squareDivs[2].classList.add('won');
            squareDivs[5].classList.add('won');
            squareDivs[8].classList.add('won');
        } else if (topLeft && topLeft === middle && topLeft === bottomRight) {
            handleWin(topLeft);
            squareDivs[0].classList.add('won');
            squareDivs[4].classList.add('won');
            squareDivs[8].classList.add('won');
        } else if (topRight && topRight === middle && topRight === bottomLeft) {
            handleWin(topRight);
            squareDivs[2].classList.add('won');
            squareDivs[4].classList.add('won');
            squareDivs[6].classList.add('won');
        } else if (topLeft && top && topRight && middleLeft && middle && middleRight && bottomLeft && bottom && bottomRight) {
            gameIsLive = false;
            statusDiv.innerHTML = 'It\'s a tie!';
        } else {
            xIsNext = !xIsNext;
            if (xIsNext) {
                statusDiv.innerHTML = `Turn: X`;
            } else {
                statusDiv.innerHTML = `Turn: O`;
            }
        }
    };


    //Event Handlers
    const handleReset = (e) => {
        xIsNext = true;
        statusDiv.innerHTML = `Turn: X`;
        for (const squareDiv of squareDivs) {
            squareDiv.classList.remove('x');
            squareDiv.classList.remove('o');
            squareDiv.classList.remove('won');
        }
        gameIsLive = true;
    };

    const handleSquareClick = (e) => {
        const classList = e.target.classList;
        
        if (!gameIsLive || classList[1] === 'x' || classList[1] === 'o') {
            return;
        }

        if (xIsNext) {
            classList.add('x');
            checkGameStatus();
        } else {
            classList.add('o');
            checkGameStatus();
        }
    };

    //Event Listeners
    resetDiv.addEventListener('click', handleReset);
    
    for (const squareDiv of squareDivs) {
        squareDiv.addEventListener('click', handleSquareClick)
    };

    return {
        handleReset: handleReset(),
        handleSquareClick: handleSquareClick(),
    };
 })();

 gameboard.handleSquareClick();
 gameboard.handleReset();