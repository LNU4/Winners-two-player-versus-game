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
Winners.entity.Player = function (x, y, turret1, container) {
/**
 * placeholder to refer to the second player
 */

    this.player2 = null;
    this.lifeIx = 0;
    this.lives = 3;
    this.livesArr = [];
    

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------
   
  /**
   * Calls the constructor method of the super class.
   */
  rune.display.Sprite.call(this, x, y, 64, 64, "resizedtank");
  this.turret1 = turret1;
  this.layer1 = container;
 
};

//----------------------------------------------------------------------------
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
   console.log(this.parent)
  rune.display.Sprite.prototype.init.call(this);

 // this.turret = new rune.display.Sprite(0, 0, 64, 64, "turret-remake");
 
 console.log(this.turret1); 

 // this.addChild(this.turret);

  for (var i = 0; i<this.lives; i++){
   var lifeIx = i;
    this.life = new Winners.entity.Life(this, lifeIx );
   // this.life.hp = new Winners.entity.Hps(this.life, this.parent, this)
    this.livesArr.push(this.life);
  }

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
  this.life.globalX = this.globalX;
  this.life.globalY = this.globalY;
  this.m_updateInput();
 // this.m_torretRotation();
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
    this.life.globalX = this.globalX;
  this.life.globalY = this.globalY;
  this.animation.create("idle", [0], 1, true);
  this.animation.create("walk", [0, 1], 1, true);
};


Winners.entity.Player.prototype.shoot = function () {
  this.bullets = new Winners.entity.Bullets(this.layer1, this, this.turret1);
  this.application.scenes.selected.groups.add(this.bullets);
  this.bullet = this.bullets.create(this.centerX, this.centerY);
  
  

  console.log(this.turret1);
  this.bullet.velocity.x = this.velocity.x;
  this.bullet.velocity.y = this.velocity.y;
  this.bullet.globalX = this.velocity.x;
  this.bullet.globalX = this.velocity.x;
  this.bullet.rotation = this.turret1.rotation - 90;

  

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

  if ( gamepad.pressed(7) || this.keyboard.pressed("P")) {
    this.shoot();
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
  console.log("test")
  this.x = Math.min(Math.max(this.x, minX), maxX);
  this.y = Math.min(Math.max(this.y, minY), maxY);
};
/*
Winners.entity.Player.prototype.m_torretRotation = function () {
  var gamepad = this.gamepads.get(0);
  this.turret.rotation = 0; 

  if (gamepad.stickRightLeft ) {
    this.turret.rotation -= 5;
  }
  else if (gamepad.stickRightRight) {
    this.turret.rotation += 5; 
  }
  
};
*/