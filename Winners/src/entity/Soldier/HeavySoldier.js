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
 * @param {number} X coordinates of where the object will be placed on X axis
 * @param {number} Y coordinates of where the object will be placed on Y axis
 * @param {object} game reference to the game object
 * @param {object} enemy reference to the enemy object
 * @param {number} SoldierOwner reference to the player object that has the same team
 */
Winners.entity.HeavySoldier = function (x, y, game, enemy, SoldierOwner) {
  Winners.entity.SoldierUtil.call(
    this,
    x,
    y,
    game,
    enemy,
    "heavysoldier",
    200,
    0.8,
    320,
    SoldierOwner
  );
};

Winners.entity.HeavySoldier.prototype = Object.create(
  Winners.entity.SoldierUtil.prototype
);
Winners.entity.HeavySoldier.prototype.constructor = Winners.entity.HeavySoldier;

/**
 * Method to handle the heavy soldier's shooting logic, timing, rotation, and speed of the bullets.
 * @method
 * @returns {undefined}
 */
Winners.entity.HeavySoldier.prototype.shoot = function () {
  if (this.distance - 40 <= this.shootDistance) {
     //speicifes the bullet speed
    
    var bulletSpeed = 1.5;
   //specifes the bullet direction on X and Y axes
    var bulletDirectionX = this.distanceX / this.distance;
    var bulletDirectionY = this.distanceY / this.distance;

    var bullet = this.game.bullets.create(
      this.centerX,
      this.centerY,
      this,
      this.turret1,
      this.enemy
    );
     //specifies the bullet velocity on x and y axes
     
    bullet.velocity.x = bulletDirectionX * bulletSpeed;
    bullet.velocity.y = bulletDirectionY * bulletSpeed;
    //specifies the rotation of the bullet
    bullet.rotation =
      Math.atan2(this.distanceY, this.distanceX) * (180 / Math.PI);
  }
};
