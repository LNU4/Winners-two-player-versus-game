Winners.entity.Repairsoldier = function (x, y, game, enemy, ix) {
    this.moveSpeed = 2;

    this.game = game;

    this.enemy = enemy;

    if (this.enemy === this.game.player) {
        this.player = this.game.player2;
    } else if (this.enemy === this.game.player2) {
        this.player = this.game.player;
    };

    this.ix = ix;

    this.isDead = false;
   // this.powerUpProb = 0;

    this.layer = this.game.layer0;
 console.log('repair')
    rune.display.Sprite.call(this, x, y, 32, 32, "soldiers");
    this.layer.addChild(this);
};

Winners.entity.Repairsoldier.prototype = Object.create(
    rune.display.Sprite.prototype
);
Winners.entity.Repairsoldier.prototype.constructor = Winners.entity.Repairsoldier;

Winners.entity.Repairsoldier.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);


    var targetX = this.player.x;
    var targetY = this.player.y;

    var currentPosition = new rune.geom.Point(this.x, this.y);
    var targetPosition = new rune.geom.Point(
        this.player.centerX,
        this.player.centerY
    );

    var distanceX = targetX - this.x;
    var distanceY = targetY - this.y;
    var distance = currentPosition.distance(targetPosition);

    //console.log(distance)
    if (distance > 64) {

        var directionX = distanceX / distance;
        var directionY = distanceY / distance;


        this.x += directionX * this.moveSpeed;
        this.y += directionY * this.moveSpeed;


        this.rotation = Math.atan2(directionY, directionX) * (180 / Math.PI);
    } else if (distance <= 64) {
        this.moveSpeed = 0; 
        this.repair(); 
    }


    this.x = rune.util.Math.clamp(this.x, 0, 1280 - this.width);
    this.y = rune.util.Math.clamp(this.y, 0, 720 - this.height);
};

Winners.entity.Repairsoldier.prototype.repair = function () {
 
  if (this.player && !this.player.isDead) {
   
    var playerBullets = this.player.bullets;
    
 
    if (playerBullets) {
        
        var healAmount = 10; 
        playerBullets.hp += healAmount;
        //check further N.A
        console.log("healed with dog", healAmount, "HP");
    }
}
}