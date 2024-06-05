
//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------
/**
 * Creates a new object.
 *
 * @constructor
 * @extends Winners.entity.SoldierUtil
 *
 * @class
 * @classdesc Game scene.
 */
Winners.entity.HeavySoldier = function (x, y, game, enemy, SoldierOwner) {
  Winners.entity.SoldierUtil.call(this, x, y, game, enemy, "heavysoldier", 200, 0.8, 320, SoldierOwner);
};

Winners.entity.HeavySoldier.prototype = Object.create(Winners.entity.SoldierUtil.prototype);
Winners.entity.HeavySoldier.prototype.constructor = Winners.entity.HeavySoldier;

/**
 * Method to handle the heavy soldier's shooting logic, timing, rotation, and speed of the bullets.
 * @method
 * @returns {undefined}
 */
Winners.entity.HeavySoldier.prototype.shoot = function () {
  if (this.distance - 40 <= this.shootDistance) {
    var bulletSpeed = 1.5;
    var bulletDirectionX = this.distanceX / this.distance;
    var bulletDirectionY = this.distanceY / this.distance;

    if (this.animation) {
      this.animation.gotoAndPlay("shoot");
    }

    var bullet = this.game.bullets.create(this.centerX, this.centerY, this, this.turret1, this.enemy);
    bullet.velocity.x = bulletDirectionX * bulletSpeed;
    bullet.velocity.y = bulletDirectionY * bulletSpeed;
    bullet.rotation = Math.atan2(this.distanceY, this.distanceX) * (180 / Math.PI);
  }
};