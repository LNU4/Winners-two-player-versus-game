//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.DisplayObject
 *
 * @param {number} x ...
 * @param {number} y ...
 * @param {object} layer0 the container layer of the bullet objects
 * @param {object} game reference to the game object
 * @param {object} bulletOwner reference to the object that generated the bullets object
 * @param {object} bulletTarget reference to the enemy of the object that generated bullets object
 * @param {object} bullets the bullets object that instantiates the bullet objects
 * @class
 * @classdesc
 *
 * Represents a bullet.
 */
Winners.entity.Bullet = function (
  game,
  layer0,
  bulletOwner,
  bulletTarget,
  bullets,
  x,
  y
) {
  //--------------------------------------------------------------------------
  // Public properties
  //--------------------------------------------------------------------------
  this.game = game;
  this.bulletOwner = bulletOwner;
  this.bulletTarget = bulletTarget;
  this.bullets = bullets;
  this.layer0 = layer0;
   /**
   * The amount of damage the bullet causes.
   *
   * @type {number}
   * @default 20
   */

   this.damage = 5.0;
    
  /**
   * Property calling the inbullet method for reading audio files
   * @type {media.Sound}
   */
  this.respawn = this.bullets.application.sounds.sound.get("respwan1");
 //--------------------------------------------------------------------------
  // Protected properties
  //------------------------------------------------------------------------
  /**
   * The speed of the bullet.
   *
   * @type {number}
   * @protected
   */
  this.m_speed = 0.8;

 

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  /**
   * ...
   */
  rune.display.DisplayObject.call(this, x, y, 6, 6);
  /**
   * Property setting the color of the bullet
   * @type {string}
   */
  this.backgroundColor = "#FF00FF";
  /**
   * Property enabling the bullet to move
   * @type {boolean}
   */
  this.movable = true;
};

//------------------------------------------------------------------------------
//  Inheritance
//------------------------------------------------------------------------------

Winners.entity.Bullet.prototype = Object.create(
  rune.display.DisplayObject.prototype
);
Winners.entity.Bullet.prototype.constructor = Winners.entity.Bullet;

//------------------------------------------------------------------------------
// Override public prototype methods 
//------------------------------------------------------------------------------

/**
 * The update method of the bullets object, exutes its logic per tick
 * It manipulates the hp values of the players, their bases, their baseShieldes, removes the bullet aafter it collides with an enemy or the objects belongen to an enemy, carys out the respawn process based on wheather a player has been killed aka has 0 in hp 
 * 
 * @method
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Bullet.prototype.update = function (step) {
  rune.display.DisplayObject.prototype.update.call(this, step);
  var m_this = this;

  if (this.hitTest(this.bulletTarget)) {
    this.layer0.removeChild(this);

    this.HpOb = this.bulletTarget.hp;
    this.HpOb.value -= this.damage;

    if (this.HpOb.value == 80) {
      rune.display.DisplayObject.call(
        this.HpOb,
        this.bulletTarget.x,
        this.bulletTarget.y,
        20,
        10
      );
      this.HpOb.backgroundColor = "#3dfc03";
    } else if (this.HpOb.value == 60) {
      rune.display.DisplayObject.call(
        this.HpOb,
        this.bulletTarget.x,
        this.bulletTarget.y,
        15,
        10
      );
      this.HpOb.backgroundColor = "#c2fc03";
    } else if (this.HpOb.value == 40) {
      rune.display.DisplayObject.call(
        this.HpOb,
        this.bulletTarget.x,
        this.bulletTarget.y,
        10,
        10
      );
      this.HpOb.backgroundColor = "#fcad03";
    } else if (this.HpOb.value == 20) {
      rune.display.DisplayObject.call(
        this.HpOb,
        this.bulletTarget.x,
        this.bulletTarget.y,
        5,
        10
      );
      this.HpOb.backgroundColor = "#fc0303";
    } else if (this.HpOb.value == 0) {
      this.bulletTarget.active = false;
      // this.bulletTarget.x = -1000;
      // this.bulletTarget.y = 1000;
    
this.bulletTarget.x = Math.random() * (2000 + (-2000)) + (-2000);


this.bulletTarget.y = Math.random() * (1000 + (-1000)) + (-1000);


      // this.bulletTarget.x = Math.random() * (2000 - -2000) + -2000;
      // this.bulletTarget.y = Math.random() * (1000 - -1000) + -1000;
      this.game.timers.create({
        duration: 4000,
        scope: this,
        onComplete: function () {
          this.bulletTarget.active = true;
          m_this.bulletTarget.x = m_this.bulletTarget.initX;
          m_this.bulletTarget.y = m_this.bulletTarget.initY;

          m_this.layer0.addChild(m_this.bulletTarget);
          m_this.game.layer2.addChild(m_this.bulletTarget.turret1);
          m_this.bulletTarget.flicker.start();

          m_this.game.camera.addChild(m_this.HpOb);
          m_this.HpOb.value = 100;
          rune.display.DisplayObject.call(
            m_this.HpOb,
            m_this.bulletTarget.x,
            m_this.bulletTarget.y,
            25,
            10
          );
          m_this.HpOb.backgroundColor = "#03fc24";

          m_this.respawn.play(true);
        },
      });
    }
  }

  if (this.bulletTarget.playerBaseShield) {
    if (this.hitTestAndSeparate(this.bulletTarget.playerBaseShield)) {
      this.layer0.removeChild(this, true);
      this.dispose();

      this.bulletTarget.playerBaseShield.hpValue -= 200;
     
      if (this.bulletTarget.playerBaseShield.hpValue == 800) {
        this.bulletTarget.playerBaseShield.animation.gotoAndStop("1");
      } else if (this.bulletTarget.playerBaseShield.hpValue == 600) {
        this.bulletTarget.playerBaseShield.animation.gotoAndStop("2");
      } else if (this.bulletTarget.playerBaseShield.hpValue == 400) {
        this.bulletTarget.playerBaseShield.animation.gotoAndStop("3");
      } else if (this.bulletTarget.playerBaseShield.hpValue == 200) {
        this.bulletTarget.playerBaseShield.animation.gotoAndStop("4");

      } else if (this.bulletTarget.playerBaseShield.hpValue == 0) {
        this.hitTestAndSeparate(this.bulletTarget.playerBaseShield);

        this.layer0.removeChild(this.bulletTarget.playerBaseShield, true);
        this.bulletTarget.playerBaseShield = null;
      }
    }
  }

  if (this.bulletTarget.playerBase) {
    if (this.hitTestAndSeparate(this.bulletTarget.playerBase)) {
      this.layer0.removeChild(this, true);
      this.dispose();

      this.bulletTarget.playerBase.HPValue -= 200;
    
      if (this.bulletTarget.playerBase.HPValue == 800) {
        this.bulletTarget.playerBase.animation.gotoAndStop("1");
      } else if (this.bulletTarget.playerBase.HPValue == 600) {
        this.bulletTarget.playerBase.animation.gotoAndStop("2");
      } else if (this.bulletTarget.playerBase.HPValue == 400) {
        this.bulletTarget.playerBase.animation.gotoAndStop("3");
      } else if (this.bulletTarget.playerBase.HPValue == 200) {
        this.bulletTarget.playerBase.animation.gotoAndStop("4");

      } else if (this.bulletTarget.playerBase.HPValue == 0) {
      this.hitTestAndSeparate(this.bulletTarget.playerBase);

      this.layer0.removeChild(this.bulletTarget.playerBase, true);
      this.bulletTarget.playerBase = null;

      if (this.bulletTarget === this.game.player) {
        this.game.handlePlayerDefeat("player1");
      } else if (this.bulletTarget === this.game.player2) {
        this.game.handlePlayerDefeat("player2");
      }
    }
  }
} 

  this.m_updateMotion(step);
};

/**
 *This method prepares the object to be removed from the memory by the garbage collector
 *
 *@method
 * @returns {undefined}
 */
Winners.entity.Bullet.prototype.dispose = function () {
  rune.display.DisplayObject.prototype.dispose.call(this);
};


//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Calculates movement.
 *
 * @param {number} step ...
 *
 * @return {undefined}
 * @private
 */
Winners.entity.Bullet.prototype.m_updateMotion = function (step) {
  this.velocity.x +=
    Math.cos(rune.util.Math.degreesToRadians(this.rotation)) * this.m_speed;
  this.velocity.y +=
    Math.sin(rune.util.Math.degreesToRadians(this.rotation)) * this.m_speed;
};


