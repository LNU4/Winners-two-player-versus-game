//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @class
 * @classdesc
 *
 * Game scene.
 */
/**
 *
 */
Winners.entity.HeavySoldier = function (x, y, game, enemy) {
  this.game = game;
  //this.enemy = this.game.player2;
  this.enemy = enemy;
  
  this.layer = this.game.layer0;
  this.shootDistance = 200;   
  this.moveSpeed = 0.8;      
  this.shootCooldown = 320;
  this.lastShootTime = 0;
  
  rune.display.Sprite.call(this, x, y, 32, 32, "heavysoldier");
};




Winners.entity.HeavySoldier.prototype = Object.create(
  rune.display.Sprite.prototype
);
Winners.entity.HeavySoldier.prototype.constructor = Winners.entity.HeavySoldier;
Winners.entity.HeavySoldier.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);

  var m_this = this;
  var distanceX = this.enemy.x - this.x;
  var distanceY = this.enemy.y - this.y;
  var distance = rune.util.Math.distance(
    this.enemy.x,
    this.enemy.y,
    this.x,
    this.y
  );
  if (this.enemy.hitTest(this)) {
   // this.isDead = true;
   // this.powerUpProb = Math.random() * 5;
    this.game.layer0.removeChild(this);
    this.dispose();
  }
 /*  if (this.isDead == true) {
    var ranX = Math.floor(Math.random() * (1160 - 120 + 1)) + 120;
    var ranY = Math.floor(Math.random() * (600 - 120 + 1)) + 120;
    this.game.timers.create({
      duration: 1000,
      onComplete: function () {
        this.powerUp = new Winners.entity.Powerup(
          ranX,
          ranY,
          m_this.game,
          m_this.player
        );

        this.layer0.addChild(this.powerUp);
      },
    });
  } */

  if (distance <= this.shootDistance && distance > 0) {
    this.x = this.x;
    this.y = this.y;

    var currentTime = Date.now();
    if (currentTime - this.lastShootTime >= this.shootCooldown) {
     // this.shoot();

      this.lastShootTime = currentTime;
    }
  } else {
    distanceX /= distance;
    distanceY /= distance;
    this.x += distanceX * this.moveSpeed;
    this.y += distanceY * this.moveSpeed;
  }

  this.x = rune.util.Math.clamp(this.x, 0, 1280 - this.width);
  this.y = rune.util.Math.clamp(this.y, 0, 720 - this.height);

  var currentPosition = new rune.geom.Point(this.x, this.y);
  var targetPosition = new rune.geom.Point(
    this.enemy.centerX,
    this.enemy.centerY
  );
  var distanceX = targetPosition.x - currentPosition.x;
  var distanceY = targetPosition.y - currentPosition.y;
  var distance = currentPosition.distance(targetPosition);

  // in order to achieve what we want, we need to rotate the bullet, we need to know the angle between the bullet/player and the target
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2
  var angle = Math.atan2(distanceY, distanceX);

  var rotationCords = angle * (180 / Math.PI);

  this.rotation = rotationCords;

  var directionX = distanceX / distance;
  var directionY = distanceY / distance;

  if (this.shootDistance < distance) {
    currentPosition.x += directionX * this.moveSpeed;
    currentPosition.y += directionY * this.moveSpeed;
  }

 /*
  currentPosition.x = Math.min(
    Math.max(currentPosition.x, 0),
    1280 - this.width
  );
  currentPosition.y = Math.min(
    Math.max(currentPosition.y, 0),
    720 - this.height
  );
*/
this.x = rune.util.Math.clamp(this.x, 0, 1280 - this.width);
this.y = rune.util.Math.clamp(this.y, 0, 720 - this.height);
  /*
  this.x = currentPosition.x;
  this.y = currentPosition.y;
  */
  if (this.enemy.hitTest(this)) {
    this.game.layer0.removeChild(this);
  }


  if (this.enemy.bullets){
    console.log(this.enemy)
    if (this.enemy.bullets.bullet){
      if (this.enemy.bullets.bullet.hitTest(this)){
      console.log('.-.-.-.')
      this.layer.removeChild(this.enemy.bullets.bullet)
      this.layer.removeChild(this)
      this.dispose()
    }
    }
  }  
};

Winners.entity.HeavySoldier.prototype.shoot = function () {
  var currentPosition = new rune.geom.Point(this.centerX, this.centerY);
  var targetPosition = new rune.geom.Point(
    this.enemy.centerX,
    this.enemy.centerY
  );

  var distanceX = targetPosition.x - currentPosition.x;
  var distanceY = targetPosition.y - currentPosition.y;
  var distance = currentPosition.distance(targetPosition);

  if (distance <= this.shootDistance) {
    var bulletSpeed = 1.5;   
    var bulletDirectionX = distanceX / distance;
    var bulletDirectionY = distanceY / distance;

    this.bullets = new Winners.entity.Bullets(
      this.game,
      this.layer,
      this,
      this.turret1,
      this.enemy
    );
    this.application.scenes.selected.groups.add(this.bullets);

    var bullet = this.bullets.create(this.centerX, this.centerY);
    bullet.velocity.x = bulletDirectionX * bulletSpeed;
    bullet.velocity.y = bulletDirectionY * bulletSpeed;

    bullet.rotation = Math.atan2(distanceY, distanceX) * (180 / Math.PI);
  }
};

Winners.entity.HeavySoldier.prototype.dispose = function () {
    
  rune.display.Sprite.prototype.dispose.call(this);

  
};
