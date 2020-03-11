//The cards with all the numbers in arrays
let card = document.querySelectorAll('.card');
let cardNumber = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let number = document.querySelectorAll('.number');

//Moves
let counter = document.getElementById('counter');
moves = 0;

//Count of matching pair
let countMatch = [];

//The first and second card choises
let hasFlippedCard = false;
let firstCard;
let secondCard;

//Lock the card in place
let lockBoard = false;

//Popup
let popup = document.getElementById('congratulations');


//Shuffles the numbers on the card
function shuffleCard() {
    for (let i = cardNumber.length-1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1)); 
		let itemAtIndex = cardNumber[randomIndex]; 
		cardNumber[randomIndex] = cardNumber[i]; 
		cardNumber[i] = itemAtIndex;
    }
    return cardNumber;
}

//Assign a number to a card
assignNumber();
function assignNumber() {
    shuffleCard();
    for (i = 0; i < cardNumber.length; i++) {
        number[i].innerHTML = cardNumber[i];
        card[i].setAttribute('data-number', cardNumber[i]);
    }
    return cardNumber;
}

//Flip the card when pressed on
card.forEach(card => card.addEventListener('click', flipCards));

function flipCards(event) {
    //Move counter
    moves++;
    counter.innerHTML = 'Moves: ' + moves;

    //Comparing the cards
    if (!firstCard || !secondCard) {
        event.target.classList.toggle('card-front');
        if (lockBoard) return;
        
        //Hinder dubble click on card
        if (this === firstCard) return; 
        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }
        secondCard = this;
        checkForMatch();
    }
}

//Check for match on flipped cards
function checkForMatch() {
    if (firstCard.dataset.number === secondCard.dataset.number) {

        //Count all the matchig pairs
        countMatch++;

        //Congratulations popup when game has been won
        if (countMatch === 8) {
            showPopup();
        }
        disableFlippedCards();
        return;
    };
    unFlipCards()
}

//Disable cards if match = true
function disableFlippedCards() {
    firstCard.removeEventListener('click', flipCards);
    secondCard.removeEventListener('click', flipCards);
    resetBoard();
}

//Let cards show for a few seconds before flipping back when match = false
function unFlipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('card-front');
      secondCard.classList.remove('card-front');
      resetBoard();
    }, 1200);
}

//Reset the varable that holds the cards when clicked on
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false,false];
    [firstCard, secondCard] = [null, null];
}

//Flipp back all the cards
function flippBackCards() {
    moves = 0;
    counter.innerHTML = 'Moves: ' + moves;
    for ( i = 0; i < card.length; i++) {
        card[i].classList.remove('card-front');
    }
}

//To remove the popup from the page
 function showPopup() {
    popup.classList.toggle('hide');
    document.getElementById('try-again-button').addEventListener('click', function() {
        popup.classList.toggle('hide');
        restartGame();
    });
}

//Pressing the button to restart the game
document.getElementById('new-game-button').addEventListener('click', restartGame);

function restartGame() {
    flippBackCards();
    assignNumber();
    flipCards();
}