//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 *@param {number}  x ...
 * @param {number}  y ...
 * @param {object}  game ...
 * @class
 * @classdesc
 *
 * Game scene.
 */
Winners.entity.Player = function (x, y, game) {
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
   * Reference to the pleyer's base shield object
   * @type {Object}
   */
  this.playerBaseShield = this.game.Base1shield;
  /**
   * Reference to the base shield object of the pleyer's enemy
   * @type {Object}
   */
  this.enemyBaseShield = this.game.Base2shield;
  /**
   * Reference to the pleyer's base object
   * @type {Object}
   */
  this.playerBase = this.game.base;
  /**
   * Reference to the base object of the pleyer's enemy
   * @type {Object}
   */
  this.enemyBase = this.game.base2;
  /**
   * Reference to the pleyer's turret object
   * @type {Object}
   */
  this.turret1 = this.game.turret1;
  /**
   * Reference to the container layer of pleyer object
   * @type {Object}
   */
  this.layer0 = this.game.layer0;

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

Winners.entity.Player.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Player.prototype.constructor = Winners.entity.Player;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 *
 * Setting the color of plyer and calling this.m_initPhysics() and this.m_initAnimation()
 * @method
 * @returns {undefined}
 */
Winners.entity.Player.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);

  this.texture.replaceColor(
    new rune.color.Color24(69, 40, 60),
    new rune.color.Color24(255, 102, 102)
  );
  this.texture.replaceColor(
    new rune.color.Color24(223, 113, 38),
    new rune.color.Color24(105, 57, 49)
  );
  this.texture.replaceColor(
    new rune.color.Color24(102, 57, 49),
    new rune.color.Color24(172, 50, 50)
  );
  this.m_initPhysics();
  this.m_initAnimation();
};

/**
 * The update method of the player object, exutes its logic per tick
 *
 * @method
 * @param {number} step Fixed time step.
 * @returns {undefined}
 */
Winners.entity.Player.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);

  this.m_updateInput();

  if (this.activeBullets) {
    for (var i = this.activeBullets.length - 1; i >= 0; i--) {
      /**
       * index of the active bullets within the active bullet list
       * @type {number}
       */
      var bullet = this.activeBullets[i];
      /**
       * creates a coordinates point of the current bullet position
       * @type {number}
       */
      var pointOne = new rune.geom.Point(bullet.x, bullet.y);
      /**
       * creates a coordinates point of the current bullet initial position
       * @type {number}
       */
      var pointTwo = new rune.geom.Point(bullet.initX, bullet.initY);
      /**
       * calculates the distance between the current bullet position and the bullet initial position
       * @type {number}
       */
      var distance = pointOne.distance(pointTwo);

      if (distance > 400) {
        this.game.layer0.removeChild(bullet, true);
        this.activeBullets.splice(i, 1);
        this.game.bullets.removeMember(bullet, true);
      }
    }
  }
};

/**
 *This method prepares the player object to be removed from the memory by the garbage collector
 *
 *@method
 * @returns {undefined}
 */
Winners.entity.Player.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);
};

/**
 * Method to create one bullet each time it's called
 * @method
 * @returns {undefined}
 */
Winners.entity.Player.prototype.shoot = function () {
  /**
   * Property that references the bullet object returnd by the bullets.create method of the bullets class
   * @type {Object}
   */
  this.bullet = this.game.bullets.create(
    this.centerX,
    this.centerY,
    this,
    this.turret1,
    this.player2
  );
  if (!this.activeBullets) {
    this.activeBullets = [];
  }
 // this.game.turret1.animation.gotoAndPlay("shot");

  /**
   * specify the initial position of the bullet when generated
   * @type {object}
   * @property {number} x velocity of the bullet
   * @property {number} y velocity of the bullet
   */
  this.bullet.initX = this.bullet.x;
  this.bullet.initY = this.bullet.y;
  /**
   * specify the velocity of the bullet when generated
   * @type {number}
   */
  this.bullet.velocity.x = this.velocity.x;
  this.bullet.velocity.y = this.velocity.y;
  /**
   * specify global velocity of the bullet when generated
   * @type {number}
   */
  this.bullet.globalX = this.velocity.x;

  /**
   * specify the rotation of the bullet when generated
   * @type {number}
   */
  this.bullet.rotation = this.turret1.rotation - 90;
  /***
   * pushes the generated bullets to active bullets array
   * @param {object}
   */
  this.activeBullets.push(this.bullet);
};
//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Method to adjust the velocity and the rotation of the player object by manipulating inbuilt properties
 *
 * @method
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
 * Method to calll the inbuilt animation.create method to create animation for the idle and walking modes
 *
 * @method
 * @returns {undefined}
 * @private
 */
Winners.entity.Player.prototype.m_initAnimation = function () {
  this.animation.create("idle", [0], 1, true);
  this.animation.create("walk", [0, 1], 1, true);
};
/**
 * Method to update the player's velocity and rotation of the player object
 * @method
 * @returns {undefined}
 * @private
 */
Winners.entity.Player.prototype.m_updateInput = function () {
  if (!this.game.playerDead) {
  var gamepad = this.gamepads.get(0);

  if (this.keyboard.pressed("D") || gamepad.stickLeftRight) {
    this.velocity.x += 0.15;

    this.rotation = 90;
    this.animation.gotoAndPlay("walk");
  }

  if (this.keyboard.pressed("A") || gamepad.stickLeftLeft) {
    this.velocity.x -= 0.15;

    this.rotation = -90;

    this.animation.gotoAndPlay("walk");
  }

  if (this.keyboard.pressed("S") || gamepad.stickLeftDown) {
    this.velocity.y += 0.15;
    this.rotation = 180;

    this.animation.gotoAndPlay("walk");
  }

  if (this.keyboard.pressed("W") || gamepad.stickLeftUp) {
    this.velocity.y -= 0.15;

    this.rotation = 0;

    this.animation.gotoAndPlay("walk");
  }

  if (gamepad.justPressed(7) || this.keyboard.justPressed("P")) {
    this.shoot();
  }

  if (
    rune.util.Math.abs(this.velocity.x) <= 0 &&
    rune.util.Math.abs(this.velocity.y) <= 0
  ) {
    this.animation.gotoAndPlay("idle");
  }

  if (this.active) {
    this.x = rune.util.Math.clamp(this.x, 0, 1280 - this.width);
    this.y = rune.util.Math.clamp(this.y, 0, 720 - this.height);
  }
}
};
// Slut m_updateInput
