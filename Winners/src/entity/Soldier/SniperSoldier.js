//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------
/**
 * Creates a new sniper soldier object.
 *
 * @constructor
 * @extends Winners.entity.SoldierUtil
 *
 * @class
 * @classdesc Game scene.
 */
Winners.entity.SniperSodier = function (x, y, game, enemy, SoldierOwner) {
  Winners.entity.SoldierUtil.call(this, x, y, game, enemy, "snipersoldier", 1000, 1.5, 920, SoldierOwner);
};

Winners.entity.SniperSodier.prototype = Object.create(Winners.entity.SoldierUtil.prototype);
Winners.entity.SniperSodier.prototype.constructor = Winners.entity.SniperSodier;

/**
 * Method to handle the sniper soldier's shooting logic, timing, rotation, and speed of the bullets.
 * @method
 * @returns {undefined}
 */
Winners.entity.SniperSodier.prototype.shoot = function () {
  if (this.distance - 30 <= this.shootDistance) {
    var bulletSpeed = 8;
    var bulletDirectionX = this.distanceX / this.distance;
    var bulletDirectionY = this.distanceY / this.distance;
  

    var bullet = this.game.bullets.create(this.centerX, this.centerY, this, this.turret1, this.enemy);
    bullet.velocity.x = bulletDirectionX * bulletSpeed;
    bullet.velocity.y = bulletDirectionY * bulletSpeed;
    bullet.rotation = Math.atan2(this.distanceY, this.distanceX) * (180 / Math.PI);
  }
};