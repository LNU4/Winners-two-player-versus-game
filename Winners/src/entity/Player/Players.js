//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @param {number}  x ...
 * @param {number}  y ...
 * @param {object}  game ...
 * @param {string}  spriteName ...
 * @class
 * @classdesc
 *
 *
 */

Winners.entity.Players = function (x, y, game, spriteName) {
  /**
   * Reference to the game object
   * @type {Object}
   */
  this.game = game;
  /**
   * Reference to the initial x and y coordinates of the player
   * @type {number}
   */
  this.initX = x;
  this.initY = y;
  /**
   * Reference to the new created hp object
   * @type {Object}
   */
  this.hp = new Winners.entity.Hps(this);
  this.game.camera.addChild(this.hp);
  /**
   * Reference to the container layer of pleyer object
   * @type {Object}
   */
  this.layer0 = this.game.layer0;
  this.activeBullets = [];
   
  rune.display.Sprite.call(this, x, y, 64, 64, spriteName);
};
//----------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.Players.prototype = Object.create(rune.display.Sprite.prototype);

Winners.entity.Players.prototype.constructor = Winners.entity.Players;

/**
 * Calling this.m_initPhysics() and this.m_initAnimation()
 * @method
 * @returns {undefined}
 */

Winners.entity.Players.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);

  this.m_initPhysics();
  this.m_initAnimation();
};

/**
 * The update method of the player object, exutes its logic per tick
 *
 * @method
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */

Winners.entity.Players.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);

  this.m_updateInput();
  this.updateBullets();
};

/**
 *This method prepares the player object to be removed from the memory by the garbage collector
 *
 *@method
 * @returns {undefined}
 */

Winners.entity.Players.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);
};

Winners.entity.Players.prototype.shoot = function () {
  /**
   * Property that references the bullet object returnd by the bullets.create method of the bullets class
   * @type {Object}
   */
  this.bullet = this.game.bullets.create(
    this.centerX,
    this.centerY,
    this,
    this.turret1,
    this.player
  );

  this.bullet.initX = this.bullet.x;
  this.bullet.initY = this.bullet.y;
  this.bullet.velocity.x = this.velocity.x;
  this.bullet.velocity.y = this.velocity.y;
  this.bullet.globalX = this.velocity.x;
  this.bullet.rotation = this.turret1.rotation - 90;

  this.activeBullets.push(this.bullet);
};
/**
 * Method to adjust the velocity and the rotation of the player object by manipulating inbuilt properties
 *
 * @method
 *
 * @returns {undefined}
 * @private
 */

Winners.entity.Players.prototype.m_initPhysics = function () {
  this.velocity.drag.x = 0.05;
  this.velocity.drag.y = 0.05;
  this.velocity.max.x = 1.8;
  this.velocity.max.y = 1.8;
};

/**
 * Method to calll the inbuilt animation.create method to create animation for the idle and walkin modes
 *
 * @method
 *
 * @returns {undefined}
 * @private
 */

Winners.entity.Players.prototype.m_initAnimation = function () {
  this.animation.create("idle", [0], 1, true);
  this.animation.create("walk", [0, 1], 1, true);
};

Winners.entity.Players.prototype.m_updateInput = function () {
  var gamepad = this.gamepads.get(this.getGamepadIndex());

  if (this.keyboard.pressed(this.getRightKey()) || gamepad.stickLeftRight) {
    this.velocity.x += 0.15;
    this.rotation = 90;
    this.animation.gotoAndPlay("walk");
  }

  if (this.keyboard.pressed(this.getLeftKey()) || gamepad.stickLeftLeft) {
    this.velocity.x -= 0.15;
    this.rotation = -90;
    this.animation.gotoAndPlay("walk");
  }

  if (this.keyboard.pressed(this.getDownKey()) || gamepad.stickLeftDown) {
    this.velocity.y += 0.15;
    this.rotation = 180;
    this.animation.gotoAndPlay("walk");
  }

  if (this.keyboard.pressed(this.getUpKey()) || gamepad.stickLeftUp) {
    this.velocity.y -= 0.15;
    this.rotation = 0;
    this.animation.gotoAndPlay("walk");
  }

  if (gamepad.justPressed(7) || this.keyboard.justPressed(this.getShootKey())) {
    this.shoot();
  }

  if (Math.abs(this.velocity.x) <= 0 && Math.abs(this.velocity.y) <= 0) {
    this.animation.gotoAndPlay("idle");
  }

  if (this.active) {
    this.x = rune.util.Math.clamp(this.x, 0, 1280 - this.width);
    this.y = rune.util.Math.clamp(this.y, 0, 720 - this.height);
  }
};

Winners.entity.Players.prototype.updateBullets = function () {
  for (var i = this.activeBullets.length - 1; i >= 0; i--) {
    var bullet = this.activeBullets[i];
    var pointOne = new rune.geom.Point(bullet.x, bullet.y);
    var pointTwo = new rune.geom.Point(bullet.initX, bullet.initY);
    var distance = pointOne.distance(pointTwo);

    if (distance > 400) {
      this.game.layer0.removeChild(bullet, true);
      this.activeBullets.splice(i, 1);
    }
  }
};

// Winners.entity.Players.prototype.getGamepadIndex = function () {
//   
// };

// Winners.entity.Players.prototype.getRightKey = function () {
//   
// };

// Winners.entity.Players.prototype.getLeftKey = function () {
//   
// };

// Winners.entity.Players.prototype.getDownKey = function () {
//   
// };

// Winners.entity.Players.prototype.getUpKey = function () {
//   
// };

// Winners.entity.Players.prototype.getShootKey = function () {
//   
// };
