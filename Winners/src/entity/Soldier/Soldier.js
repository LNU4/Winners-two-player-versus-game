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
 * (x, y, game, enemy, SoldierOwner, truck) 
 * 
 * 
 */
Winners.entity.Soldier = function (x, y,  truck) {
/**
 * 
 * reference to the truck object thet generates the soldier objecft
 * @type {object}
 */
  this.truck = truck;
  /**
   * reference to the game object
   * @type {object}
   */
  this.game = this.truck.game;
  /**
   * the enemy player
   * @type {object}
   * 
   */
  this.enemy = this.truck.enemy;
  /**
   * the owner player
   * @type {object}
   */
  this.SoldierOwner = this.truck.player;

  Winners.entity.SoldierUtil.call(
    this,
    x,
    y,
    this.game,
    this.enemy,
    "soldier",
    200,
    1,
    900,
    this.SoldierOwner
  );
 
};

Winners.entity.Soldier.prototype = Object.create(
  Winners.entity.SoldierUtil.prototype
);
Winners.entity.Soldier.prototype.constructor = Winners.entity.Soldier;

/**
 * Method to handle the soldier's shooting logic, timing, rotation, and speed of the bullets.
 * @method
 * @returns {undefined}
 */
Winners.entity.Soldier.prototype.shoot = function () {
  if (this.distance <= this.shootDistance) {
     //speicifes the bullet speed
     
    var bulletSpeed = 0.2;
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
