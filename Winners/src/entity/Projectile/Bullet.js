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

  this.damage = 5;

  /**
   * Property calling the builtin method for reading audio files
   * @type {media.Sound}
   */
  this.respawn = this.bullets.application.sounds.sound.get("respwan1");
  this.burn = this.bullets.application.sounds.sound.get("burn");
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
    if (this.bulletTarget == this.game.player || this.game.player2) {
    this.bulletTarget.sparkEmitter.centerX = this.bulletTarget.centerX; 
    this.bulletTarget.sparkEmitter.centerY = this.bulletTarget.centerY;
    this.bulletTarget.sparkEmitter.emit(1);
  }
    this.game.bullets.removeMember(this, true);
    this.handelHp(this.damage, this.bulletTarget, this.bulletOwner);
  }
  if (this.bulletTarget.playerBaseShield) {
    if (this.hitTestAndSeparate(this.bulletTarget.playerBaseShield)) {
      this.game.bullets.removeMember(this, true);

      this.bulletTarget.playerBaseShield.hpValue -= 25;

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
      this.game.bullets.removeMember(this, true);

      this.bulletTarget.playerBase.HPValue -= 50;

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
 *
 * @param {number} damage specifies the damage to be applied on the other objects
 * @param {object} bulletTarget reference to the bulletTarget object
 * @param {object} target reference to the bulletOwner object
 * @method
 */

Winners.entity.Bullet.prototype.handelHp = function (
  damage,
  bulletTarget,
  bulletOwner
) {
 
  this.HpOb = this.bulletTarget.hp;

  this.HpOb.value -= damage;
  if (bulletTarget.active) {
    if (this.HpOb.value <= 0) {
      bulletTarget.active = false;
      this.HpOb.value = 0;

      if (bulletTarget == this.game.player) {
        this.handleDeadPlayer("player1");
      } else if (bulletTarget == this.game.player2) {
        this.handleDeadPlayer("player2");
      }
      this.respawnPlayer(bulletTarget, bulletOwner);
    } else {
      this.updateHp();
    }
  }
};

/**
 * handles the respawn logic for players
 * @method
 * @param {object} bulletTarget reference to the bullet target object
 * @param {object} bulletTarget reference to the bullet owner object
 */

Winners.entity.Bullet.prototype.respawnPlayer = function (
  bulletTarget,
  bulletOwner
) {
  var m_this = this;

  this.game.timers.create({
    duration: 1500,
    scope: this,
    onComplete: function () {
        
      this.bulletTarget.destructionEmitter.centerX = this.bulletTarget.centerX; 
      this.bulletTarget.destructionEmitter.centerY = this.bulletTarget.centerY;
      this.bulletTarget.destructionEmitter.emit(1);
   
      if (bulletTarget == this.game.player) {
        this.game.turret1.animation.gotoAndPlay("idle");
        
      } else if (bulletTarget == this.game.player2) {
        this.game.turret2.animation.gotoAndPlay("idle");
      }

      bulletTarget.x = Math.random() * (2000 + -2000) + -2000;

      bulletTarget.y = Math.random() * (2000 + 1000) + 1000;
    },
  });

  this.game.timers.create({
    duration: 4000,
    scope: this,
    onComplete: function () {
      
      bulletTarget.active = true;
      bulletTarget.x = bulletTarget.initX;
      bulletTarget.y = bulletTarget.initY;

      m_this.layer0.addChild(bulletTarget);
      m_this.game.layer2.addChild(bulletTarget.turret1);
      bulletTarget.flicker.start();

      m_this.game.camera.addChild(m_this.HpOb);
      m_this.HpOb.value = 100;
      rune.display.DisplayObject.call(
        m_this.HpOb,
        bulletTarget.x,
        bulletTarget.y,
        25,
        10
      );
      m_this.HpOb.backgroundColor = "#03fc24";

      m_this.respawn.play(true);
    },
  });
};

/**
 * handles the hp visualization on the player object
 * @method
 */

Winners.entity.Bullet.prototype.updateHp = function () {
  var hp = this.HpOb.value;
  var HpObj = this.HpOb;

  if (hp > 80) {
    HpObj.backgroundColor = "#03fc24";
    HpObj.width = 25;
  } else if (hp > 60) {
    HpObj.backgroundColor = "#3dfc03";
    HpObj.width = 20;
  } else if (hp > 40) {
    HpObj.backgroundColor = "#c2fc03";
    HpObj.width = 15;
  } else if (hp > 20) {
    HpObj.backgroundColor = "#fcad03";
    HpObj.width = 10;
  } else if (hp > 0) {
    HpObj.backgroundColor = "#fc0303";
    HpObj.width = 5;
  } else {
    HpObj.width = 0;
  }
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

/***
 * Method that handles the animation calls for player objects once they die
 * @method
 * @param {sting} playerDead pass the dead player string name
 */

Winners.entity.Bullet.prototype.handleDeadPlayer = function (playerDead) {
  this.burn.play(true);
  if (playerDead == "player1") {
    this.game.turret1.animation.gotoAndPlay("done");
  } else if (playerDead == "player2") {
    this.game.turret2.animation.gotoAndPlay("done");
  }
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
