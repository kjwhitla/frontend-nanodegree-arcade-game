// Enemies our player must avoid
var Enemy = function(x,y) {

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = (this.x + 1) * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x, y) {
    
    this.x = x;
    this.y = y;
   
    this.sprite = 'images/char-boy.png';
    this.reset = function() {
    	this.x = x;
    	this.y = y;
    };
};
 
 Player.prototype.update = function(dt) {
 };
 
 Player.prototype.render = function() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
 };
 
 Player.prototype.handleInput = function(direction) {
 	if (direction === 'left' && this.x > 0) {
     	this.x += -101;
     }
     if (direction === 'right' && this.x < 404) {
     	this.x += 101;
     }
     if (direction === 'down' && this.y < 400) {
     	this.y += 83;
     }
     if (direction === 'up' && this.y >= 68) {
        this.y += -83;
     } 
     if (this.y < 68) {
     	this.reset();
     }
 };

var allEnemies = [
    new Enemy(0, 53, 300), 
    new Enemy(300, 135, 250), 
    new Enemy(200, 220, 200)
];
// Place the player object in a variable called player

var player = new Player(202, 400);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
