let game;
let character;
let validMove = null;



// Avatar Creation and Customization

class Character{
  constructor(){
    this.avatar = document.querySelector('select[name="character"]');
    this.avatarChosen = document.querySelector('#avatar-chosen');
    this.expression = document.querySelector('#expression');
    this.name = document.querySelector('input[name="character-name"]');
    this.characterMaker = document.querySelector('#character-maker');
    this.goal = null;
    this.lives = 3; 
  }

  setAvatar(){
    if(this.avatar.value === 'puppy'){
      this.avatarChosen.setAttribute('class','puppy');
      this.expression.setAttribute('class', 'neutral');
    } else{
      this.avatarChosen.setAttribute('class','bunny');
      this.expression.setAttribute('class','neutral');
    }
  }

  setGoal(){
    if(this.avatar.value === 'puppy'){
      this.goal = 'bone';
    } else{
      this.goal = 'carrot';
    }
  }
  
} // end class Character




// Tile Types

class BadTile{
  constructor(){
    this.name = character.name;
    this.message = document.querySelector('#message');
  }

  message(){
    this.message.innerHTML = `${this.name} found a trap!`;
    this.lives--;
    checkEndConditions();
  }
}

class WinningTile{
  constructor(){
    this.name = character.name;
    this.goal = character.goal;
    this.message = document.querySelector('#message')
  }

  message(){
    this.message.innerHTML = `${this.name} found the ${this.goal}!`;
  }
}

// Game 
class FarmGame{
  constructor(){
    this.character = character;

    this.startPrompt = document.querySelector('#start-prompt');
    this.movePrompt = document.querySelector('#move-prompt');
    this.gameboard = document.querySelector('#gameboard');
    this.winScreen = document.querySelector('#win-screen');
    this.loseScreen = document.querySelector('#lose-screen');


    this.gameState = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
  }

  // sets up event listeners for tiles
  setUpTileListeners(){
    let tileElements = document.querySelectorAll('.tile');
    for(let tile of tileElements){
      tile.addEventListener('click', handleMove);
    }
  }

  setUpBoard(){
    this.gameboard.innerHTML = '';
    for (let i = 0; i < 3; i++){
      let newRow = document.createElement('div');
      newRow.setAttribute('class', 'row');
      for (let j = 0; j < 3; j++){
        let newCol = document.createElement('div');
        newCol.setAttribute('class', 'col-xs-3');
        let newTile = document.createElement('span');
        newTile.setAttribute('class', 'tile');
        newTile.setAttribute('data-x', i);
        newTile.setAttribute('data-y', j);
        newCol.appendChild(newTile);
        newRow.appendChild(newCol);
      }
      this.gameboard.appendChild(newRow);
    }
    this.setUpTileListeners();
  }

  start(){
    this.setUpBoard();
  }
} //end class FarmGame


// Create Character
document.addEventListener('DOMContentLoaded', function(event){
  let startButton = document.querySelector('#start-button');
  startButton.addEventListener('click', function(event){
    character = new Character();
    applyEventListeners();
    startButton.setAttribute('class','hidden');
    character.characterMaker.setAttribute('class','');
    character.avatarChosen.setAttribute('class','puppy');
    character.expression.setAttribute('class','neutral');

  });
});

// Play Game
let playGame = document.querySelector('#play-game');
playGame.addEventListener('click', function(event){
  game = new FarmGame();
  game.start();
});

// Update Character Avatar
function applyEventListeners(){
  let inputs = document.querySelectorAll('input, select, textarea');
  for (input of inputs){
      input.addEventListener("change", function(event){
          character.setAvatar();
      })
  }
}


 