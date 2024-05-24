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

Winners.entity.Soldiers = function (
  x,
  y,
  game,
  enemy,
  ix,
  SoldierOwner,
  truck
) {
  /**
   * defines the shooting distance between the soldier unit and the player
   * @type {number}
   */
  this.shootDistance = 200;
  /**
   * defines the movement speed of the soldier unit
   * @type {number}
   */
  this.moveSpeed = 1;
  /**
   * defines the cooldown of the shooting of the soldier unit
   * @type {number}
   */
  this.shootCooldown = 900;
  /**
   * defines the last shooting time of the soldier unit
   * @type {number}
   */
  this.lastShootTime = 0;
  /**
   * Referance to the game class
   * @type {object}
   */
  this.game = game;
  /**
   * reference to the soldier owner "defines the player that not the aim of the AI soldiers"
   * @type {object}
   */
  this.SoldierOwner = SoldierOwner;
  /**
   * reference to the truck "personalcarrier" class
   * @type {object}
   */
  this.truck = truck;
  /**
   * reference to the enemy "defines the player that is the aim of the AI"
   * @type {object}
   */
  this.enemy = enemy;

  /**
   * Checks if the soldier is dead
   * @type {boolean}
   */
  this.isDead = false;
  /**
   * Counter for the powerup probability
   * @type {number}
   */
  this.powerUpProb = 0;
  /**
   * Reference to the display object container
   * @type {object}
   */
  this.layer = this.game.layer0;

  rune.display.Sprite.call(this, x, y, 32, 32, "soldier");
  this.layer.addChild(this);

  if (enemy === this.game.player) {
    /**
     * Change the texture color based on the enemy object. It calls replace color in runes SDK
     * @type {number}
     */
    this.texture.replaceColor(
      new rune.color.Color24(0, 0, 0),
      new rune.color.Color24(172, 50, 50)
    );
  } else if (enemy === this.game.player2) {
    this.texture.replaceColor(
      new rune.color.Color24(0, 0, 0),
      new rune.color.Color24(32, 32, 32)
    );
  }
};

/**
 *
 * @returns {undefined}
 */
Winners.entity.Soldiers.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);

  this.m_initAnimation();
};

//----------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.Soldiers.prototype = Object.create(
  rune.display.Sprite.prototype
);
Winners.entity.Soldiers.prototype.constructor = Winners.entity.Soldiers;
//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------
/**
 * This method is automatically executed once after the scene is instantiated.
 * The method is used to create objects to be used within the scene.
 * @param {step}
 * @returns {undefined}
 */
Winners.entity.Soldiers.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);
  /**
   * Referance to the soldier class
   * @type {object}
   */
  var m_this = this;
  /**
   * Normalized distance "both X and Y axis" between the soldier object and the enemy
   * @type {number}
   */
  var distanceX = this.enemy.x - this.x;
  var distanceY = this.enemy.y - this.y;
  /**
   * Calculate the distance between the two object "enemy and soldier object"
   * @type {number}
   */
  var distance = rune.util.Math.distance(
    this.enemy.x,
    this.enemy.y,
    this.x,
    this.y
  );

  if (distance <= this.shootDistance && distance > 90) {
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
       * specifiy the last shot time, in order to adjust a cooldown
       * @type {number}
       */
      this.lastShootTime = currentTime;
    }
  } else {
    distanceX /= distance;
    distanceY /= distance;
    this.x += distanceX * this.moveSpeed;
    this.y += distanceY * this.moveSpeed;
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
  //lookg through for possible redudance code N.A
  var currentPosition = new rune.geom.Point(this.x, this.y);
  var targetPosition = new rune.geom.Point(
    this.enemy.centerX,
    this.enemy.centerY
  );
  var distanceX = targetPosition.x - currentPosition.x;
  var distanceY = targetPosition.y - currentPosition.y;
  var distance = currentPosition.distance(targetPosition);

  var angle = Math.atan2(distanceY, distanceX);
  /**
   * Speicifies the soldier angle "rotation"
   * @type {number}
   */
  var rotationCords = angle * (180 / Math.PI);
  /**
   * Place holder for the rotation coordinates
   */
  this.rotation = rotationCords;

  var directionX = distanceX / distance;
  var directionY = distanceY / distance;

  if (this.shootDistance < distance) {
    currentPosition.x += directionX * this.moveSpeed;
    currentPosition.y += directionY * this.moveSpeed;
  }

  /**
   * Stop the soldier upon reaching the coordinates
   * @type {number}
   */
  this.x = currentPosition.x;
  this.y = currentPosition.y;

  var currentTime = Date.now();

  if (this.enemy.hitTest(this)) {
    this.handelKillSoldier();
  }

  this.hitTest(
    this.game.bullets,
    function (soldier, bullet) {
      if (bullet.bulletTarget == soldier.SoldierOwner) {
        this.game.layer0.removeChild(bullet);
        bullet.dispose();
        this.handelKillSoldier();
      }
    },
    this
  );
};
/**
 * 
 */
Winners.entity.Soldiers.prototype.m_initAnimation = function () {
  this.animation.create("shoot", [0, 3], 5, true);
  this.animation.create("idle", [0], 1, true);
  this.animation.create("walk", [0, 1], 5, true);
};
/**
 * Method to handle the soldier shooting logic, timing, rotation and speed of the bullets
 * @method
 * @returns {undefined}
 */
Winners.entity.Soldiers.prototype.shoot = function () {
  /**
   * Specifies a point of the objects position
   * @type {object}
   */
  var currentPosition = new rune.geom.Point(this.centerX, this.centerY);
  /**
   * Specifies a point of the enemy objects position
   * @type {object}
   */
  var targetPosition = new rune.geom.Point(
    this.enemy.centerX,
    this.enemy.centerY
  );
  /**
   * Normalizes the distance on both axis "x" and "y",
   * @type {number}
   */
  var distanceX = targetPosition.x - currentPosition.x;
  var distanceY = targetPosition.y - currentPosition.y;
  /**
   * Calculates the distance between the objects position and the target position
   * @type {number}
   */
  var distance = currentPosition.distance(targetPosition);

  if (distance <= this.shootDistance) {
    /**
     * Defines the speed of the bullet
     * @type {number}
     */
    var bulletSpeed = 0.2;
    /**
     * specifies the bullets directions on both y and x axis
     * @type {number}
     */
    var bulletDirectionX = distanceX / distance;
    var bulletDirectionY = distanceY / distance;

    if (this.animation) {
      this.animation.gotoAndPlay("shoot");
    }
    /**
     * Creates a new bullet object
     * @type {object}
     */
    var bullet = this.game.bullets.create(
      this.centerX,
      this.centerY,
      this,
      this.turret1,
      this.enemy
    );
    /**
     * Defines the movement of the bullet based on the speed of the and the direction of both axis
     * @type {number}
     */
    bullet.velocity.x = bulletDirectionX * bulletSpeed;
    bullet.velocity.y = bulletDirectionY * bulletSpeed;
    /**
     * Defines the rotation of the bullet based on the distance between the objects position and the target position
     * @type {number}
     */
    bullet.rotation = Math.atan2(distanceY, distanceX) * (180 / Math.PI);
  }
};

/**
 * Handles the death of the soldier, removes the object from the displayobject container and call createpowerup method
 * @method
 */
Winners.entity.Soldiers.prototype.handelKillSoldier = function () {
  var m_this = this;
  this.game.layer0.removeChild(this);
  /**
   * Toggles is dead to adjust the timer of the powerups
   * @type {boolean}
   */
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
 * Method to create powerups on the specified area, handles the spawn placement on random spots within the specified area
 * @method
 */
Winners.entity.Soldiers.prototype.createPowerups = function () {
  var m_this = this;
  /**
   * specifies random power up spawn postion within a certain area of the map
   */
  var ranX = Math.floor(Math.random() * (1160 - 120 + 1)) + 120;
  var ranY = Math.floor(Math.random() * (600 - 120 + 1)) + 120;
  m_this.powerUp = new Winners.entity.Powerup(
    ranX,
    ranY,
    m_this.game,
    m_this.enemy
  );

  m_this.game.camera.addChild(m_this.powerUp);
};
/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Soldiers.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);
};
