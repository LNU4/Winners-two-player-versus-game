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
Winners.entity.Player = function (x, y) {
/**
 * placeholder to refer to the second player
 */
    this.player2 = null;
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------
   
  /**
   * Calls the constructor method of the super class.
   */
  rune.display.Sprite.call(this, x, y, 32, 32, "tank-reworked");

 
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.Player.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Player.prototype.constructor = Winners.entity.Player;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Player.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);

  this.turret = new rune.display.Sprite(0, 0, 32, 32, "torret");



  this.addChild(this.turret);

  this.m_initPhysics();
  this.m_initAnimation();
};

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Player.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);
  this.m_updateInput();
  this.m_torretRotation();
};

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Player.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
Winners.entity.Player.prototype.m_initPhysics = function () {
  this.velocity.drag.x = 0.05;
  this.velocity.drag.y = 0.05;
  this.velocity.max.x = 1.8;
  this.velocity.max.y = 1.8;

  this.rotation = 90;
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
Winners.entity.Player.prototype.m_initAnimation = function () {
  this.animation.create("idle", [0], 1, true);
  this.animation.create("walk", [0, 1], 1, true);
};
Winners.entity.Player.prototype.shoot = function () {
  var bullets = new Winners.entity.Bullets(this.stage, this, this.player2);
  this.application.scenes.selected.groups.add(bullets);
  var bullet = bullets.create(this.centerX, this.centerY);
  
  bullet.velocity.x = this.velocity.x;
  bullet.velocity.y = this.velocity.y;
  bullet.globalX = this.velocity.x;
  bullet.globalX = this.velocity.x;
  bullet.rotation = this.turret.rotation;
  
 
};
/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
Winners.entity.Player.prototype.m_updateInput = function () {
  var gamepad = this.gamepads.get(0);

  if (this.keyboard.pressed("D") || gamepad.stickLeftRight) {
    this.velocity.x += 0.15;
    //this.flippedX = false;

   
    this.rotation = 90;
    this.animation.gotoAndPlay("walk");
  }

  if (this.keyboard.pressed("A") || gamepad.stickLeftLeft) {
    this.velocity.x -= 0.15;
    //this.flippedX = true;
    this.rotation = -90;
   
    this.animation.gotoAndPlay("walk");
  }

  if (this.keyboard.pressed("S") || gamepad.stickLeftDown) {
    this.velocity.y += 0.15;
    this.rotation = 180;
    //this.flippedY = false;
   
    this.animation.gotoAndPlay("walk");
  }

  if (this.keyboard.pressed("W") || gamepad.stickLeftUp) {
    this.velocity.y -= 0.15;
    //this.flippedY = true;
    this.rotation = 0;
   
    this.animation.gotoAndPlay("walk");
  }

  if ( gamepad.pressed(7)) {
    this.shoot();
  }
  if (this.keyboard.pressed("Q")) {
    this.shoot()
 }
  if (
    rune.util.Math.abs(this.velocity.x) <= 0 &&
    rune.util.Math.abs(this.velocity.y) <= 0
  ) {
    this.animation.gotoAndPlay("idle");
  }
  this.debug = true;
  var minX = 0;
  var minY = 0;
  var maxX = 1280 - this.width;
  var maxY = 720 - this.height;

  this.x = Math.min(Math.max(this.x, minX), maxX);
  this.y = Math.min(Math.max(this.y, minY), maxY);
};

Winners.entity.Player.prototype.m_torretRotation = function () {
  var gamepad = this.gamepads.get(0);

  if (gamepad.stickRightLeft) {
    this.turret.rotation -= 5;
  }
  else if (gamepad.stickRightRight) {
    this.turret.rotation += 5;
  }
};
