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
 * @param {number}  x coordinate of soldier where the object will be placed
 * @param {number}  y coordinate of worker where the object will be placed
 * @param {object} game referance to the game object
 * @param {object} enemy referance to the object that soldiers will consider as an enemy
 * @param {number} ix soldier index 
 * @param {object} soldierOwner reference to the object that consideried in the same team
 * @param {object} truck reference to the truck object
 * Game scene.
 */
Winners.entity.Soldier = function (
  x,
  y,
  game,
  enemy,
  ix,
  SoldierOwner,
  truck
) {
  /**
   * Property to determine the shooting distance of the soldier
   * @type {number}
   */
  this.shootDistance = 200;
  /**
   * Property to determine the speed of the soldier
   * @type {number}
   */
  this.moveSpeed = 1;
  /**
   * Property to determine the shooting cooldown of the soldier
   * @type {number}
   */
  this.shootCooldown = 900;
  /**
   * Property to specifiy the last shot time
   * @type {number}
   */
  this.lastShootTime = 0;
  this.game = game;
  this.SoldierOwner = SoldierOwner;
  this.truck = truck;
  this.enemy = enemy;
  /**
   * Property to determine if the soldier is dead or not
   * @type {boolean}
   */
  this.isDead = false;
  /**
   * Property to determine the probability of the soldier to get a power up
   * @type {number}
   */
  this.powerUpProb = 0;
  this.layer = this.game.layer0;

  rune.display.Sprite.call(this, x, y, 32, 32, "soldier");
  this.layer.addChild(this);

  if (enemy === this.game.player) {
    this.texture.replaceColor(
      new rune.color.Color24(102, 102, 102),
      new rune.color.Color24(172, 50, 50)
    );
  } else if (enemy === this.game.player2) {
    this.texture.replaceColor(
      new rune.color.Color24(0, 0, 0),
      new rune.color.Color24(172, 50, 50)
    );
  }
};
/**
 * Executed once after the initialization of the display object container.
 * The method is used to create objects or adjust their properties to be used.
 * @returns {undefined}
 */

Winners.entity.Soldier.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
  this.m_initAnimation();
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------
Winners.entity.Soldier.prototype = Object.create(
  rune.display.Sprite.prototype
);
Winners.entity.Soldier.prototype.constructor = Winners.entity.Soldier;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------
Winners.entity.Soldier.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);
  /**
   * Private reference to the soldier class 
   * @type {object}
   */
  var m_this = this;
 /**
  * Properties to the built in math points, it specifies two points and their X Y coordinates
  * @type {number}
  */
  this.currentPosition = new rune.geom.Point(this.x, this.y);
  this.targetPosition = new rune.geom.Point(
    this.enemy.centerX,
    this.enemy.centerY
  );
  /**
   * Normalized distance "both X and Y axis" between the soldier object and the enemy
   * @type {number}
   */
  this.distanceX = this.targetPosition.x - this.currentPosition.x;
  this.distanceY = this.targetPosition.y - this.currentPosition.y;
  /**
   * Calculate the distance between the two object "enemy and soldier object"
   * @type {number}
   */
  this.distance = this.currentPosition.distance(this.targetPosition);

  if (this.distance <= this.shootDistance && this.distance > 90) {
    if (this.animation) {
      this.animation.gotoAndPlay("idle");
    }
    /**
     * Place holder for the time, it's called through the javascript built in function 
     * @type {number}
     */
    var currentTime = Date.now();
    if (currentTime - this.lastShootTime >= this.shootCooldown) {
      this.shoot();
      this.lastShootTime = currentTime;
    }
  } else {
    this.distanceX /= this.distance;
    this.distanceY /= this.distance;
    this.x += this.distanceX * this.moveSpeed;
    this.y += this.distanceY * this.moveSpeed;
    if (this.animation) {
      this.animation.gotoAndPlay("walk");
    }
  }
  /**
   * Clamp the soldier to stay within the display object container "on both axis".
   * @type {number}
   */
  this.x = rune.util.Math.clamp(this.x, 0, 1280 - this.width);
  this.y = rune.util.Math.clamp(this.y, 0, 720 - this.height);
  /**
   * Speicifies the soldier angle
   * @type {number}
   */
  var angle = Math.atan2(this.distanceY, this.distanceX);
  /**
   * specifies the soldier rotation 
   * @type {number}
   */
  this.rotation = angle * (180 / Math.PI);
  /**
   * Array to hold the objects that soldier cant go through
   * @type {Array}
   */
  var gameObs = [this.game.base, this.game.base2, this.game.Base1shield, this.game.Base2shield];
  for (var i = 0; i < gameObs.length; i++) {
   var gameOb = gameObs[i];
   this.hitTestAndSeparate(gameOb);
  }
  if (this.enemy.hitTest(this)) {
    this.handelKillSoldier();
  }

  this.hitTest(
    this.game.bullets,
    function (soldier, bullet) {
      if (bullet.bulletTarget == soldier.SoldierOwner) {
        this.game.bullets.removeMember(bullet, true);
        // this.game.layer0.removeChild(bullet);
       // bullet.dispose();
        this.handelKillSoldier();
      }
    },
    this
  );
};
/**
 * Method to handle the animation creatation related to the soldier class.
 *
 * @returns {undefined}
 */
Winners.entity.Soldier.prototype.m_initAnimation = function () {
  this.animation.create("shoot", [0, 3], 5, true);
  this.animation.create("idle", [0], 1, true);
  this.animation.create("walk", [0, 1], 5, true);
};

/**
 * Method to handle the shootting of the soldier object
 * @Method
 * @return {undefined}
 */
Winners.entity.Soldier.prototype.shoot = function () {

  if (this.distance <= this.shootDistance) {
    /**
     * property to determine the bullet speed that's generated by soldier object
     * @type {number}
     */
    var bulletSpeed = 0.2;
    /**
     * properties to determine the bullet direction that's generated by soldier object
     * @type {number}
     */
    var bulletDirectionX = this.distanceX / this.distance;
    var bulletDirectionY = this.distanceY / this.distance;

    if (this.animation) {
      this.animation.gotoAndPlay("shoot");
    }

    var bullet = this.game.bullets.create(
      this.centerX,
      this.centerY,
      this,
      this.turret1,
      this.enemy
    );
    /**
     * Adjust the bullet velocity on X and Y axes
     * @type {number}
     */
    bullet.velocity.x = bulletDirectionX * bulletSpeed;
    bullet.velocity.y = bulletDirectionY * bulletSpeed;
    /**
     * Adjust the bullet rotation 
     * @type {number}
     */
    bullet.rotation = Math.atan2(this.distanceY, this.distanceX) * (180 / Math.PI);
  }
};
/**
 * Method to handle the dead soldiers 
 * @method 
 * @returns {undefined}
 */
Winners.entity.Soldier.prototype.handelKillSoldier = function () {
  /**
   * Private reference to the solder class
   * @type {object}
   */
  var m_this = this;
  this.game.layer0.removeChild(this, true);
  this.isDead = true;
  this.powerUpProb = Math.floor(Math.random() * 4);

  if ((this.isDead && this.powerUpProb == 0) || this.powerUpProb == 2) {
    this.game.timers.create({
      duration: 1000,
      onComplete: function () {
        m_this.createPowerups();
      },
    });
  }
};
/**
 * Method to handle the power ups creation 
 * @method
 * @return {undefined}
 */
Winners.entity.Soldier.prototype.createPowerups = function () {
  /**
   * Private reference to the solder class
   * @type {object}
   */
  var m_this = this;
  /**
   * Properties to adjust random values of the power ups positioning on both axes
   * @type {number}
   */
  var ranX = Math.floor(Math.random() * (1160 - 200 + 1)) + 200;
  var ranY = Math.floor(Math.random() * (600 - 200 + 1)) + 200;
  m_this.powerUp = new Winners.entity.Powerup(
    ranX,
    ranY,
    m_this.game,
    m_this.enemy
  );

  m_this.game.camera.addChild(m_this.powerUp);
};
/**
 *This method prepares the soldier object to be removed from the memory
 *
 *@method
 * @returns {undefined}
 */
Winners.entity.Soldier.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);
};
