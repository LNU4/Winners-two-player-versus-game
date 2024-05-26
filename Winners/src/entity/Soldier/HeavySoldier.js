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

  this.layer = this.game.layer0;
  this.shootDistance = 200;
  this.moveSpeed = 0.8;
  this.shootCooldown = 320;
  this.lastShootTime = 0;

  if (enemy === this.game.player) {
    this.enemy = this.game.player;
    this.SoldierOwner = this.game.player2;
  } else if (enemy === this.game.player2) {
    this.enemy = this.game.player2;
    this.SoldierOwner = this.game.player;
  }

  rune.display.Sprite.call(this, x, y, 32, 32, "heavysoldier");
};

Winners.entity.HeavySoldier.prototype = Object.create(
  rune.display.Sprite.prototype
);
Winners.entity.HeavySoldier.prototype.constructor = Winners.entity.HeavySoldier;

/**
 * Excuted once after the initialization of the displayobject container
 * The method is used to create objects or adjust their properties to be used
 * @returns {undefined}
 */

Winners.entity.HeavySoldier.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);

  this.m_initAnimation();
};
/**
 * Method to handle the animation creatation related to the sniper soldier class.
 *
 * @returns {undefined}
 */
Winners.entity.HeavySoldier.prototype.m_initAnimation = function () {
  this.animation.create("idle", [0], 1, true);
  this.animation.create("walk", [0, 1], 5, true);
  this.animation.create("shoot", [0, 1], 5, true);
};
/**
 * Updated within a fixed time interval "loop", where it runs or checks of the state of the specified properties
 * @param {step}
 * @returns {undefined}
 */
Winners.entity.HeavySoldier.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);

  this.currentPosition = new rune.geom.Point(this.centerX, this.centerY);
  this.targetPosition = new rune.geom.Point(
    this.enemy.centerX,
    this.enemy.centerY
  );

  /**
   * Referance to the soldier class
   * @type {object}
   */
  var m_this = this;
  /**
   * Normalized distance "both X and Y axis" between the soldier object and the enemy
   * @type {number}
   */
  this.distanceX = this.enemy.x - this.x;
  this.distanceY = this.enemy.y - this.y;
  /**
   * Calculate the distance between the two object "enemy and soldier object"
   * @type {number}
   */
  this.distance = this.currentPosition.distance(this.targetPosition);
  if (this.enemy.hitTest(this)) {
    this.game.layer0.removeChild(this, true);
    // this.dispose();
  }

  if (this.distance <= this.shootDistance) {
    /**
     * if the distance is lower than the shoot distance, stop the movement
     * @type {number}
     */
    this.x = this.x;
    this.y = this.y;
    if (this.animation) {
      this.animation.gotoAndPlay("idle");
    }
    /**
     * placeholder of the time, to later be used in time equation for cooldown
     * @type {number}
     */
    var currentTime = Date.now();
    if (currentTime - this.lastShootTime >= this.shootCooldown) {
      this.shoot();
      /**
       * speicify the last shot time
       * @type {number}
       */
      this.lastShootTime = currentTime;
    }
  } else {
    /**
     * if the distance is higher than the shoot distance, move towards the enemy with the spcified movement speed
     * @type {number}
     */
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
  this.angle = Math.atan2(this.distanceY, this.distanceX);
  /**
   * Speicifies the soldier angle "rotation"
   * @type {number}
   */
  this.rotationCords = this.angle * (180 / Math.PI);
  /**
   * Place holder for the rotation coordinates
   * @type {number}
   */
  this.rotation = this.rotationCords;

  this.directionX = this.distanceX / this.distance;
  this.directionY = this.distanceY / this.distance;

  if (this.shootDistance < this.distance) {
    this.currentPosition.x += this.directionX * this.moveSpeed;
    this.currentPosition.y += this.directionY * this.moveSpeed;
  }
  
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
    this.game.layer0.removeChild(this, true);
  }

  this.hitTest(
    this.game.bullets,
    function (soldier, bullet) {
      if (bullet.bulletTarget == soldier.SoldierOwner) {
        this.game.bullets.removeMember(bullet, true);
        // this.game.layer0.removeChild(bullet);
        // bullet.dispose();
        this.game.layer0.removeChild(soldier, true);
      }
    },
    this
  );
};
/**
 * Method to handle the heavy soldier's shooting logic, timing, rotation, and speed of the bullets.
 * @method
 * @returns {undefined}
 */
Winners.entity.HeavySoldier.prototype.shoot = function () {

  if (this.distance - 40 <= this.shootDistance) {
    /**
     * Property to determine the bullet speed
     * @type {number}
     */
    var bulletSpeed = 1.5;
     /**
     * properties to determine the bullet direction that's generated by soldier object
     * @type {number}
     */
    this.bulletDirectionX = this.distanceX / this.distance;
    this.bulletDirectionY = this.distanceY / this.distance;
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
    bullet.velocity.x = this.bulletDirectionX * bulletSpeed;
    bullet.velocity.y = this.bulletDirectionY * bulletSpeed;
    /**
     * Determine the direction of the bullet
     * @type {number}
     */
    bullet.rotation = Math.atan2(this.distanceY, this.distanceX) * (180 / Math.PI);
  }
};
/**
 *This method prepares the heavy soldier object to be removed from the memory
 *
 *@method
 * @returns {undefined}
 */
Winners.entity.HeavySoldier.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);
};
