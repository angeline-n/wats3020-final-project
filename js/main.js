let game;
let character;
let winner;
let neutral;
let badTile1, badTile2, badTile3;
let badTiles;


// Avatar Creation and Customization
class Character{
  constructor(){
    this.avatar = document.querySelector('select[name="character"]');
    this.avatarChosen = document.querySelector('#avatar-chosen');
    this.expression = document.querySelector('#expression');
    this.characterName = document.querySelector('input[name="character-name"]');
    this.name = 'Mr. Fluffles'; 
    this.characterMaker = document.querySelector('#character-maker');
    this.goal = null;
    this.lives = 3; 
  }
  setAvatar(){
    this.name = this.characterName.value;
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
class Tile{
  constructor(){
    this.name = character.name;
    this.goal = character.goal;
    this.message = game.message;
    this.avatarContainer = game.avatarContainer;
  }
}
class BadTile extends Tile{
  displayMessage(){
    character.lives--;
    this.avatarContainer.innerHTML = `<div class="${character.avatar.value}"></div><div class="sad"></div>`
    this.message.innerHTML = `<p>${this.name} found a trap!</p><p>Lives remaining: ${character.lives}</p>`;
  }
}
class NeutralTile extends Tile{
  displayMessage(){
    this.avatarContainer.innerHTML = `<div class="${character.avatar.value}"></div><div class="neutral"></div>`
    this.message.innerHTML = `<p>${this.name} found nothing.</p><p>Lives remaining: ${character.lives}</p>`;
  }
}
class WinningTile extends Tile{
  displayMessage(){
    this.avatarContainer.innerHTML = `<div class="${character.avatar.value}"></div><div class="happy"></div>`
    this.message.innerHTML = `<p>${this.name} found the ${this.goal}!</p>`;
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
    this.avatarContainer = document.querySelector('#avatar-container');
    this.gameContainer = document.querySelector('#game-container');
    this.message = document.querySelector('#message');
    this.gameplay = document.querySelector('#gameplay');
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
    this.placeWinningTile();
    this.placeBadTiles();
    this.placeNeutralTiles();
    this.setUpTileListeners();
  }
  placeWinningTile(){
    character.setGoal();
    winner = new WinningTile;
    let x = Math.floor(Math.random() * Math.floor(3));
    let y = Math.floor(Math.random() * Math.floor(3));
    this.gameState[x][y] = winner;
  }
  placeBadTiles(){
  badTile1 = new BadTile;
  badTile2 = new BadTile;
  badTile3 = new BadTile;
  badTiles = [badTile1, badTile2, badTile3];
    for(let i = 0; i < 3; i++){
      let x = Math.floor(Math.random() * Math.floor(3));
      let y = Math.floor(Math.random() * Math.floor(3));
      if(this.gameState[x][y] === null){
        this.gameState[x][y] = badTiles[i];
      }
      else{
        i--;
      }
    }
  }
  placeNeutralTiles(){
    neutral = new NeutralTile;
    for(let x = 0; x <3; x++){
      for(let y = 0; y < 3; y++){
        if(this.gameState[x][y] === null){
          this.gameState[x][y] = neutral;
        }
      }
    }
  }
  start(){
    this.gameboard.setAttribute('class', 'col-lg-6 col-xs');
    this.setUpBoard();
    this.gameplay.setAttribute('class', '');
    this.avatarContainer.innerHTML = `<div class="${character.avatar.value}"></div><div class="neutral"></div>`;
  }
} //end class FarmGame

// Create Character
document.addEventListener('DOMContentLoaded', function(event){
  listenReplayNew();
  listenReplaySame();
  let landing = document.querySelector('#landing');
  let startButton = document.querySelector('#start-button');
  startButton.addEventListener('click', function(event){
    character = new Character();
    applyEventListeners();
    landing.setAttribute('class','hidden');
    character.characterMaker.setAttribute('class','row');
    character.avatarChosen.setAttribute('class','puppy');
    character.expression.setAttribute('class','neutral');
  });
});

// Play Game
let playGame = document.querySelector('#play-game');
playGame.addEventListener('click', function(event){
  character.characterMaker.setAttribute('class','hidden');
  game = new FarmGame();
  game.start();
});
function handleMove(event){
  let tile_x = event.target.dataset.x;
  let tile_y = event.target.dataset.y; 
  if(game.gameState[tile_x][tile_y] === 'checked'){
    alert(`Error: ${character.name} already checked that spot. Please pick another tile.`)
  } else {
      validMove = true;
      if(game.gameState[tile_x][tile_y] === winner){
        winner.displayMessage();
        game.winScreen.setAttribute('class','shown');
        game.gameContainer.setAttribute('class','row spaced');
      }else if (game.gameState[tile_x][tile_y] === badTile1 || game.gameState[tile_x][tile_y] === badTile2 || game.gameState[tile_x][tile_y] === badTile3){
        currentBadTile = game.gameState[tile_x][tile_y];
        currentBadTile.displayMessage();
        checkEndConditions();
      }else{
        game.gameState[tile_x][tile_y].displayMessage();
      }
      game.gameState[tile_x][tile_y] = 'checked';
      event.target.setAttribute('class', 'tile fas fa-times');
  }
}
function checkEndConditions(){
  if (character.lives === 0){
    game.loseScreen.setAttribute('class','shown');
    game.gameContainer.setAttribute('class','row spaced');
  } else{
    return;
  }
}

// Update Character Avatar
function applyEventListeners(){
  let inputs = document.querySelectorAll('input, select, textarea');
  for (input of inputs){
      input.addEventListener('change', function(event){
          character.setAvatar();
      })
  }
}
// Replay
function listenReplaySame(){
  let inputs = document.querySelectorAll('.replay-same');
  for (input of inputs){
    input.addEventListener('click', function(event){
      game.winScreen.setAttribute('class','hidden');
      game.loseScreen.setAttribute('class','hidden');
      game.gameContainer.setAttribute('class','row');
      game.message.innerHTML = `<p>Select a tile.</p>`;
      character.lives = 3;
      game = new FarmGame;
      game.start();
    })
  }
}
function listenReplayNew(){
  let inputs = document.querySelectorAll('.replay-new');
  for (input of inputs){
    input.addEventListener('click', function(event){
      game.winScreen.setAttribute('class','hidden');
      game.loseScreen.setAttribute('class','hidden');
      game.gameboard.setAttribute('class','col hidden');
      game.message.innerHTML = `<p>Select a tile.</p>`;
      game.gameplay.setAttribute('class', 'col hidden');
      character = new Character;
      game.gameContainer.setAttribute('class','row');
      character.characterMaker.setAttribute('class','row');
    })
  }
}