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
Winners.entity.Rocket = function (
  game,
  layer0,
  bulletOwner,
  bulletTarget,
  bullets,
  x,
  y
) {
  /**
   * Referance to game class
   * @type {object}
   */
  this.game = game;
  /**
   * Property speficies the damage
   * @type {number}
   */
  this.damage = 20;
  /**
   * Referance to the display object container 
   * @type {object}
   */
  this.layer0 = layer0;
  /**
   * reference to the rocket onwer "the object who created the rocket"
   * @type {object}
   */
  this.bulletOwner = bulletOwner;
  /**
   * reference to the target "the object who is the target of the rocket"
   * @type {object}
   */
  this.bulletTarget = bulletTarget;
  /**
   * Reference to bullets
   * @type {object}
   */
  this.bullets = bullets;

  rune.display.Sprite.call(this, x, y, 16, 16, "rocket");
  /**
   * property that determines the speed of the rocket
   */
  this.m_speed = 1;
  /**
   * Referance to get the respawn sound effect
   * @type {object}
   */
  this.respawn = this.application.sounds.sound.get("respwan1");
};

Winners.entity.Rocket.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Rocket.prototype.constructor = Winners.entity.Rocket;
/**
 * Excuted once after the initialization of the displayobject container
 * The method is used to create objects or adjust their properties to be used
 * @returns {undefined}
 */
Winners.entity.Rocket.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
  this.m_initAnimation();
};
/**
 * Method to handle the animation creatation related to the sniper soldier class.
 *
 * @returns {undefined}
 */
Winners.entity.Rocket.prototype.m_initAnimation = function () {
  this.animation.create("active", [0, 1, 2, 3], 5, true);
  this.animation.gotoAndPlay("active");
};
/**
 * Updated within a fixed time interval "loop", where it runs or checks of the state of the specified properties
 * @param {step}
 * @returns {undefined}
 */

Winners.entity.Rocket.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);
   /**
   * Referance to the rocket class
   * @type {object}
   */
  var m_this = this;

  this.animation.gotoAndPlay("walk");
  /**
   * Specifies the direction of the rocket, the rotation and the speed
   * @type {number}
   */
  this.x +=
    Math.cos(rune.util.Math.degreesToRadians(this.rotation)) * this.m_speed;
  this.y +=
    Math.sin(rune.util.Math.degreesToRadians(this.rotation)) * this.m_speed;

  if (this.hitTest(this.bulletTarget)) {
    this.layer0.removeChild(this);
    /**
     * reference to the hp object of the bullet target
     * @type {object}
     */
    this.HpOb = this.bulletTarget.hp;
    /**
     * propertey that spcifies the value of the hp object subtracted by the damage
     */
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
    } else if (this.HpOb.value <= 0) {
      this.bulletTarget.active = false;
      this.bulletTarget.x = -1000;
      this.bulletTarget.y = 1000;
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
};
/**
 * Method that handles player respawn when HP reaches 0
 * @param {HpOb} 
 */
Winners.entity.Rocket.prototype.respawn = function (HpOb) {

  this.layer0.removeChild(HpOb);

  this.bulletTarget.parent.removeChild(this.bulletTarget);
  this.game.timers.create({
    duration: 3000,
    onComplete: function () {
      this.layer0.addChild(target);
      target.flicker.start();
      target.x = this.bulletTarget.initX;
      target.y = this.bulletTarget.initY;
    },
  });
};

Winners.entity.Rocket.prototype.dispose = function () {
  rune.display.DisplayObject.prototype.dispose.call(this);
 
};
