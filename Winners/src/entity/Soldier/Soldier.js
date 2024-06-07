
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
 * 
 * @param {number} X coordinates of where the object will be placed on X axis
 * @param {number} Y coordinates of where the object will be placed on Y axis
 * @param {object} game reference to the game object
 * @param {object} enemy reference to the enemy object
 * @param {number} i referance to the index of the soldier in the array
 * @param {number} SoldierOwner reference to the player object that has the same team
 * @param {object} truck reference to the truck object
 */
Winners.entity.Soldier = function (x, y, game, enemy, i, SoldierOwner, truck) {
  Winners.entity.SoldierUtil.call(this, x, y, game, enemy, "soldier", 200, 1, 900, SoldierOwner);
  this.truck = truck;
};

Winners.entity.Soldier.prototype = Object.create(Winners.entity.SoldierUtil.prototype);
Winners.entity.Soldier.prototype.constructor = Winners.entity.Soldier;




/**
 * Method to handle the soldier's shooting logic, timing, rotation, and speed of the bullets.
 * @method
 * @returns {undefined}
 */
Winners.entity.Soldier.prototype.shoot = function () {
  if (this.distance <= this.shootDistance) {
    /**
     * speicifes the bullet speed
     * @type {number}
     */
    var bulletSpeed = 0.2;
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