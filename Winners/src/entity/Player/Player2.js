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

//Winners.entity.Player2 = function (x, y, game,container, turret1, player, player2Base, enemy1Base

Winners.entity.Player2 = function (x, y, game) {
  /**
   * placeholder to refer to the second player
   */
  // this.soldierHit = 0;
  this.game = game;
  //this.player = player;
  this.player = this.game.player;
  this.lifeIx = 0;
  this.lives = 3;
  this.livesArr = [];
  this.initX = x;
  this.initY = y;

  // this.playerBase = this.game.base2;
  // this.enemyBase = this.game.base;
  //this.turret1 = turret1;
  this.turret1 = this.game.turret2;
  //this.layer0 = container;
  this.layer0 = this.game.layer0;
  this.playerBase = this.game.base2;
  this.enemyBase = this.game.base;
 

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  /**
   * Calls the constructor method of the super class.
   */
  rune.display.Sprite.call(this, x, y, 64, 64, "resizedtank");
};

//----------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.Player2.prototype = Object.create(rune.display.Sprite.prototype);

Winners.entity.Player2.prototype.constructor = Winners.entity.Player2;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */

Winners.entity.Player2.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
  this.rotation = -90;

  var lifeX = 1230;
  var lifeY = 25;

  for (var i = 0; i < this.lives; i++) {
    var lifeIx = i;

    this.life = new Winners.entity.Life(this, lifeIx, {
      lifeX: lifeX,
      lifeY: lifeY,
    });

    this.livesArr.push(this.life);
  };
  this.texture.replaceColor(
    new rune.color.Color24(32, 32, 52),
    new rune.color.Color24(32, 32, 32)
  );

  this.m_initPhysics();
  this.m_initAnimation();
};
/**
 * ...
 *
 * @returns {undefined}
 */

Winners.entity.Player2.prototype.dispose = function () {
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

Winners.entity.Player2.prototype.m_initPhysics = function () {
  this.velocity.drag.x = 0.05;
  this.velocity.drag.y = 0.05;
  this.velocity.max.x = 1.8;
  this.velocity.max.y = 1.8;
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */

Winners.entity.Player2.prototype.m_initAnimation = function () {
  this.animation.create("idle", [0], 1, true);
  this.animation.create("walk", [0, 1], 1, true);
};

Winners.entity.Player2.prototype.shoot = function () {
  this.bullets = new Winners.entity.Bullets(
    this.game,
    this.layer0,
    this,
    this.turret1,
    this.player
  );
  this.application.scenes.selected.groups.add(this.bullets);
  this.bullet = this.bullets.create(this.centerX, this.centerY);

  this.turret1.shotAnimation();
  this.bullet.velocity.x = this.velocity.x;
  this.bullet.velocity.y = this.velocity.y;
  this.bullet.globalX = this.velocity.x;
  this.bullet.globalX = this.velocity.x;
  this.bullet.rotation = this.turret1.rotation - 90;
};

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */

Winners.entity.Player2.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);
  this.life.globalX = this.globalX;
  this.life.globalY = this.globalY;
  this.playerBaseShield = this.game.Base2shield;
  this.enemyBaseShield = this.game.Base1shield;
  this.hitTestAndSeparate(this.game.base);
  this.hitTestAndSeparate(this.game.base2);
  this.hitTestAndSeparate(this.game.Base1shield);

  //   if (this.game.truck){
  //     this.enemyTruck = this.game.truck;
  //     if (this.bullets){
  //   if (this.bullets.bullet){
  //     if (this.bullets.bullet.hitTest(this.game.truck)){
  //     console.log('.-.-.-.')
  //     this.layer0.removeChild(this.game.truck)
  //   }
  //   }
  //     //console.log(this.enemyTruck)
  //   }
  //   // if (this.hitTestAndSeparate(this.game.Base2shield)) {
  //   //   //console.log('.-.-.-.')

  //   // }

  // }
  this.m_updateInput();
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */

Winners.entity.Player2.prototype.m_updateInput = function () {
  var gamepad = this.gamepads.get(1);

  if (this.keyboard.pressed("RIGHT") || gamepad.stickLeftRight) {
    this.velocity.x += 0.15;

    this.rotation = 90;
    this.animation.gotoAndPlay("walk");
  }

  if (this.keyboard.pressed("LEFT") || gamepad.stickLeftLeft) {
    this.velocity.x -= 0.15;

    this.rotation = -90;

    this.animation.gotoAndPlay("walk");
  }

  if (this.keyboard.pressed("DOWN") || gamepad.stickLeftDown) {
    this.velocity.y += 0.15;
    this.rotation = 180;

    this.animation.gotoAndPlay("walk");
  }

  if (this.keyboard.pressed("UP") || gamepad.stickLeftUp) {
    this.velocity.y -= 0.15;

    this.rotation = 0;

    this.animation.gotoAndPlay("walk");
  }

  if (gamepad.justPressed(7) || this.keyboard.justPressed("M")) {
    this.shoot();
    //console.log("shot")
  }

  if (
    rune.util.Math.abs(this.velocity.x) <= 0 &&
    rune.util.Math.abs(this.velocity.y) <= 0
  ) {
    this.animation.gotoAndPlay("idle");
  }
  /*
  this.debug = true;
  var minX = 0;
  var minY = 0;
  var maxX = 1280 - this.width;
  var maxY = 720 - this.height;

  this.x = Math.min(Math.max(this.x, minX), maxX);
  this.y = Math.min(Math.max(this.y, minY), maxY);
  */
  // way easier alternative

  this.x = rune.util.Math.clamp(this.x, 0, 1280 - this.width);
  this.y = rune.util.Math.clamp(this.y, 0, 720 - this.height);
};
