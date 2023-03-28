

const allcards = document.querySelectorAll('.one_card');
const cards = document.getElementsByClassName('one_card')

let moves = 0;
let cardFlipped = false;
let lockBoard = false;
let firstCard, secondCard;

function cardFlip() {
  if(lockBoard) return;
  if(this === firstCard) return;
  
  this.classList.toggle('flipped')

  if (!cardFlipped) {
    cardFlipped = true;
    firstCard = this;
  }else{
    secondCard = this;
    check();
    move();
  }
}

function move(){
  moves = moves + 1;
  console.log(moves)
  document.getElementById('counter').innerHTML = moves;
}




function check(){
  if(firstCard.dataset.name === secondCard.dataset.name){
    disable();
  } else {
    unflip();
  }
}

function disable(){
  firstCard.removeEventListener('click', cardFlip);
  secondCard.removeEventListener('click', cardFlip);
  reset();
}

function unflip(){
  lockBoard = true
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    lockBoard = false;
    reset();
  }, 500);
}

function reset(){
  [cardFlipped, lockBoard] = [false, false]
  [firstCard, secondCard] = [null, null]
}

(function everyDayShuffling(){
    allcards.forEach(onecard => {
      let randomNmbr = Math.floor(Math.random() * 12);
      onecard.style.order = randomNmbr;
    });
})();



function newgame(){
  for(let i=0; i < 12; i++){
    if(cards[i].classList.contains('flipped') === true){
      cards[i].classList.remove('flipped')
    };
    allcards.forEach(onecard => {
      let randomNmbr = Math.floor(Math.random() * 12);
      onecard.style.order = randomNmbr;
    });
    allcards.forEach(onecard => onecard.addEventListener('click', cardFlip))
  }
  moves = 0;
  document.getElementById('counter').innerHTML = moves;
}

allcards.forEach(onecard => onecard.addEventListener('click', cardFlip))

