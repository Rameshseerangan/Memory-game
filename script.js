document.addEventListener('DOMContentLoaded', () => {
    const cardsArray = [
        { name: 'A', img: 'A' },
        { name: 'B', img: 'B' },
        { name: 'C', img: 'C' },
        { name: 'D', img: 'D' },
        { name: 'E', img: 'E' },
        { name: 'F', img: 'F' },
        { name: 'G', img: 'G' },
        { name: 'H', img: 'H' },
        { name: 'A', img: 'A' },
        { name: 'B', img: 'B' },
        { name: 'C', img: 'C' },
        { name: 'D', img: 'D' },
        { name: 'E', img: 'E' },
        { name: 'F', img: 'F' },
        { name: 'G', img: 'G' },
        { name: 'H', img: 'H' }
    ];

    const gameBoard = document.getElementById('gameBoard');
    const restartBtn = document.getElementById('restartBtn');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchesFound = 0;

    // Shuffle cards
    function shuffleCards() {
        cardsArray.sort(() => 0.5 - Math.random());
    }

    // Create cards
    function createBoard() {
        shuffleCards();
        gameBoard.innerHTML = '';
        cardsArray.forEach((card) => {
            // Create card container
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.name = card.name;

            // Create front face
            const frontFace = document.createElement('div');
            frontFace.classList.add('front');
            frontFace.textContent = card.img;

            // Create back face
            const backFace = document.createElement('div');
            backFace.classList.add('back');

            // Append faces to card
            cardElement.appendChild(frontFace);
            cardElement.appendChild(backFace);

            // Add event listener for card flip
            cardElement.addEventListener('click', flipCard);

            // Append card to game board
            gameBoard.appendChild(cardElement);
        });
    }

    // Flip card
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');

        if (!hasFlippedCard) {
            // First card flipped
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        // Second card flipped
        secondCard = this;
        checkForMatch();
    }

    // Check if cards match
    function checkForMatch() {
        let isMatch = firstCard.dataset.name === secondCard.dataset.name;

        if (isMatch) {
            handleMatch();
        } else {
            unflipCards();
        }
    }

    // Handle matched cards
    function handleMatch() {
        alert('Awesome!');
        disableCards();
    }

    // Disable cards (matched)
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
        matchesFound += 1;

        if (matchesFound === cardsArray.length / 2) {
            setTimeout(() => alert('Congratulations! You found all matches!'), 500);
        }
    }

    // Unflip cards (not matched)
    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');

            resetBoard();
        }, 1000);
    }

    // Reset board state
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    // Restart game
    function restartGame() {
        matchesFound = 0;
        createBoard();
    }

    restartBtn.addEventListener('click', restartGame);

    // Initialize game
    createBoard();
});
