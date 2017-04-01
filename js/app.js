//CREATE INSTANCE OF GAME
var Game = function() {
    this.gameEnd = false;
};

//NEW ENEMY CLASS
var Enemy = function(x,y) {
    this.sprite = 'images/enemy-zombie.png';
    this.x = x;
    this.y = y;
    this.multiplier = Math.floor((Math.random() * 4) + 1);
};
 
//UPDATE ENEMY POSITION
Enemy.prototype.update = function(dt) {
    
    //GAMESPEED CHECK
    this.x = this.x + 101 * dt * this.multiplier;
 
    //ENEMY COLLISION
    if (this.y == player.y && (this.x > player.x - 20 && this.x < player.x + 20)) {
        player.reset();
//        console.log('enemy collision');
        
        //TRIGGER -1 LIFE
        player.lives--;
        
        //WRITE PLAYER LIVES BACK OUT TO INDEX FILE
        document.getElementsByClassName('lives')[0].innerHTML = 'Lives: ' + player.lives;
        
        //GAMEOVER CONDITION
         if (player.lives === 0) {
//            console.log("GAME END"); 
            game.gameEnd = "true";
         }
    };
    
    //RESET THE ZOMBIE POSITION
    if(this.x > 680){
        this.x = -8680;
//        console.log("reset enemy");
    }
};
 
//RENDERS ENEMY ON SCREEN
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
 

//NEW PLAYER CLASS
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.lives = 3;
    this.score = 0;
};

//HANDLES DIRECTION INPUT
Player.prototype.handleInput = function(dir) {
 //PLAYER MOVEMENT & RESTRICTIONS
    if (dir == 'up' && this.y >= 18) {
        this.y = this.y - 80;
//        console.log("up");
 
    } else if (dir == 'down' && this.y < 380) {
        this.y = this.y + 80;
//        console.log("down");
 
    } else if (dir == 'left' && this.x >= 80) {
        this.x = this.x - 101;
//        console.log("left");
 
    } else if (dir == 'right' && this.x < 504) {
        this.x = this.x + 101;
//        console.log("right");
    };
 
};

//RESETS PLAYER LOCATION 
Player.prototype.reset = function() {
    this.x = 305;
    this.y = 380;
};

//UPDATES PLAYER LOCATION
Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
    
    //SCORING FUNCTION
    if(this.y <= 40){
        player.score = player.score + 50;
        document.getElementsByClassName('score')[0].innerHTML = 'Score: ' + player.score;
//        console.log("score");
        player.reset();
    }
       
};

//RENDERS PLAYER ON SCREEN 
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
 
//PLACES ALL ENEMY ZOMBIES IN AN ARRAY
var allEnemies = [];

//CREATE DENOTE THREE POSSIBLE LINES FOR ENEMIES
var enemyRow = [220, 140, 60];

//CREATE LOCATIONS FOR ENEMIES
for (var i = 0; i < 100; i++) {
    //DETERMINES X POSITION
    var x = Math.floor((Math.random() * - 8000) + 1);
    //DETERMINES Y LANE
    var y = enemyRow[Math.floor((Math.random() * 3))];
    enemy = new Enemy(x, y);
//    console.log(enemy);
    
    //PUSH ENEMIES TO ARRAY
    allEnemies.push(enemy);
};
 
//CREATE PLAYER OBJECT
player = new Player(305, 380);

game = new Game();
 
//BROWSWER LISTENING FOR KEY PRESSES INCLUDING WASD
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        65: 'left',
        38: 'up',
        87: 'up',
        39: 'right',
        68: 'right',
        40: 'down',
        83: 'down'
    };
 
    player.handleInput(allowedKeys[e.keyCode]);
});