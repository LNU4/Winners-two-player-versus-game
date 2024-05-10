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
 // Winners.entity.Soldiers.call(this, x, y, game, enemy);

  this.game = game;
  this.enemy = enemy;
 this.shootDistance = 100; 
  this.moveSpeed = 0.2; 
  console.log(this)

  rune.display.Sprite.call(this, x, y, 32, 32, "heavysoldier.png");

  
};



Winners.entity.HeavySoldier.prototype = Object.create(
  rune.display.Sprite.prototype
);
Winners.entity.HeavySoldier.prototype.constructor = Winners.entity.HeavySoldier;

Winners.entity.HeavySoldier.prototype.shoot = function () {
  console.log('havy is shooting')
  var currentPosition = new rune.geom.Point(this.centerX, this.centerY);
  var targetPosition = new rune.geom.Point(
    this.targetPlayer.centerX,
    this.targetPlayer.centerY
  );

  var distanceX = targetPosition.x - currentPosition.x;
  var distanceY = targetPosition.y - currentPosition.y;

  var distance = currentPosition.distance(targetPosition);
  if (distance <= this.shootDistance) {
    var bulletSpeed = 1;

    var bulletDirectionX = distanceX / distance;
    var bulletDirectionY = distanceY / distance;

    this.bullets = new Winners.entity.Bullets(
      this.layer,
      this,
      this.turret1,
      this.targetPlayer,
      this.baseOwner,
      this.baseTarget
    );
    this.application.scenes.selected.groups.add(this.bullets);

    var bullet = this.bullets.create(this.centerX, this.centerY);
    bullet.velocity.x = bulletDirectionX * bulletSpeed;
    bullet.velocity.y = bulletDirectionY * bulletSpeed;

    bullet.rotation = Math.atan2(distanceY, distanceX) * (180 / Math.PI);
  }
};
