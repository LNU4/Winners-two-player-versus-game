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
Winners.entity.Rocketsoldier = function (x, y, game, enemy) {
  this.game = game;

  this.layer = this.game.layer0;
  this.shootDistance = 200;
  this.moveSpeed = 0.8;
  this.shootCooldown = 2420;
  this.lastShootTime = 0;

  rune.display.Sprite.call(this, x, y, 32, 32, "rocketsoldier");

  if (enemy === this.game.player) {
    this.enemy = this.game.player;
    this.SoldierOwner = this.game.player2;
    this.texture.replaceColor(
      new rune.color.Color24(0, 0, 0),
      new rune.color.Color24(172, 50, 50)
    );
  } else if (enemy === this.game.player2) {
    this.enemy = this.game.player2;
    this.SoldierOwner = this.game.player;
    this.texture.replaceColor(
      new rune.color.Color24(0, 0, 0),
      new rune.color.Color24(32, 32, 32)
    );
  }
};

Winners.entity.Rocketsoldier.prototype = Object.create(
  rune.display.Sprite.prototype
);
Winners.entity.Rocketsoldier.prototype.constructor =
  Winners.entity.Rocketsoldier;

/**
 * Excuted once after the initialization of the displayobject container
 * The method is used to create objects or adjust their properties to be used
 * @returns {undefined}
 */

Winners.entity.Rocketsoldier.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);

  this.m_initAnimation();
};
/**
 * Method to handle the animation creatation related to the sniper soldier class.
 *
 * @returns {undefined}
 */

Winners.entity.Rocketsoldier.prototype.m_initAnimation = function () {
  this.animation.create("shoot", [0, 1, 2, 3], 5, false);
  this.animation.create("idle", [0], 1, true);
  this.animation.create("walk", [0, 1], 5, true);
};
/**
 * Updated within a fixed time interval "loop", where it runs or checks of the state of the specified properties
 * @param {step}
 * @returns {undefined}
 */

Winners.entity.Rocketsoldier.prototype.update = function (step) {
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
  if (this.enemy.hitTest(this)) {
    this.game.layer0.removeChild(this);
    this.dispose();
  }

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
     * placeholder of the time, to later be used in time equation for shoot cooldown
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
     * if the distance "both X and Y" is higher than the shoot distance, move towards the enemy with the spcified movement speed
     * @type {number}
     */
    distanceX /= distance;
    distanceY /= distance;
    this.x += distanceX * this.moveSpeed;
    this.y += distanceY * this.moveSpeed;

    if (this.animation) {
      this.animation.gotoAndPlay("walk");
    }
  }
  /**
   * Clamp the soldier to stay within the display object container "covers both axis".
   * @type {number}
   */
  this.x = rune.util.Math.clamp(this.x, 0, 1280 - this.width);
  this.y = rune.util.Math.clamp(this.y, 0, 720 - this.height);
  /**
   * Specifies a point of the objects position on both axes.
   * @type {object}
   */
/*   var currentPosition = new rune.geom.Point(this.x, this.y);
 */  /**
   * Specifies a point of the enemy objects position
   * @type {object}
   */
 /*  var targetPosition = new rune.geom.Point(
    this.enemy.centerX,
    this.enemy.centerY
  ); */
  /**
   * Normalized distance "both X and Y axis" between the soldier object and the enemy
   * @type {number}
   */
  //var distanceX = targetPosition.x - currentPosition.x;
  //var distanceY = targetPosition.y - currentPosition.y;
 // var distance = currentPosition.distance(targetPosition);
   /**
   * Speicifies the soldier angle
   * @type {number}
   */
  var angle = Math.atan2(distanceY, distanceX);
  /**
   * Speicifies the soldier angle "rotation"
   * @type {number}
   */
  var rotationCords = angle * (180 / Math.PI);
  /**
   * Place holder for the rotation coordinates
   * @type {number}
   */
  this.rotation = rotationCords;

  /* var directionX = distanceX / distance;
  var directionY = distanceY / distance; */
 /*  if (this.shootDistance < distance) {
    currentPosition.x += directionX * this.moveSpeed;
    currentPosition.y += directionY * this.moveSpeed;
  } */

  if (this.enemy.hitTest(this)) {
    this.game.layer0.removeChild(this);
  }

  this.hitTest(
    this.game.bullets,
    function (soldier, bullet) {
      if (bullet.bulletTarget == soldier.SoldierOwner) {
        this.game.layer0.removeChild(bullet);
        bullet.dispose();
        this.game.layer0.removeChild(soldier);
      }
    },
    this
  );
};

Winners.entity.Rocketsoldier.prototype.shoot = function () {
  var currentPosition = new rune.geom.Point(this.centerX, this.centerY);
  var targetPosition = new rune.geom.Point(
    this.enemy.centerX,
    this.enemy.centerY
  );

  var distanceX = targetPosition.x - currentPosition.x;
  var distanceY = targetPosition.y - currentPosition.y;
  var distance = currentPosition.distance(targetPosition);

  if (distance - 48 <= this.shootDistance) {
    /**
     * Property to determine the bullet speed
     * @type {number}
     */
    var rocketSpeed = 6;
    var rocketDirectionX = distanceX / distance;
    var rocketDirectionY = distanceY / distance;

    var rocket = new Winners.entity.Rocket(
      this.game,
      this.layer,
      this,
      this.enemy,
      this.bullets,
      this.centerX,
      this.centerY
    );
    this.layer.addChild(rocket);

    rocket.velocity.x = rocketDirectionX * rocketSpeed;
    rocket.velocity.y = rocketDirectionY * rocketSpeed;
     /**
     * Determine the direction of the bullet
     * @type {number}
     */
    rocket.rotation = Math.atan2(distanceY, distanceX) * (180 / Math.PI);

    if (this.animation) {
      this.animation.gotoAndPlay("shoot");
    }
  }
};

Winners.entity.Rocketsoldier.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);
};
