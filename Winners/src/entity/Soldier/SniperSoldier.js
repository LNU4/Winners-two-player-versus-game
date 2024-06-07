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
 * @param {number} X coordinates of where the object will be placed on X axis
 * @param {number} Y coordinates of where the object will be placed on Y axis
 * @param {object} game reference to the game object
 * @param {object} enemy reference to the enemy object
 * @param {number} SoldierOwner reference to the player object that has the same team
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
     /**
     * speicifes the bullet speed
     * @type {number}
     */
    var bulletSpeed = 8;
    /**
     * specifes the bullet direction on X and Y axes
     * @type {number}
     */
    var bulletDirectionX = this.distanceX / this.distance;
    var bulletDirectionY = this.distanceY / this.distance;
  

    var bullet = this.game.bullets.create(this.centerX, this.centerY, this, this.turret1, this.enemy);
    /**
     * specifies the bullet velocity on x and y axes
     * @type {number}
     */
    bullet.velocity.x = bulletDirectionX * bulletSpeed;
    bullet.velocity.y = bulletDirectionY * bulletSpeed;
    /**
     * specifies the rotation of the bullet
     * @type {number}
     */
    bullet.rotation = Math.atan2(this.distanceY, this.distanceX) * (180 / Math.PI);
  }
};