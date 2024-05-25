//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @param {object} game ...
 *
 * @class
 * @classdesc
 *
 * Represents a handler for bullets.
 */
Winners.entity.Bullets = function (game) {
  //--------------------------------------------------------------------------
  // Public properties
  //--------------------------------------------------------------------------

  /**
   * Maximum number of bullets that can exist simultaneously.
   *
   * @type {number}
   * @default 4
   */
  this.maxNumBullets = 4;
 /**
  * Property efering to thre game object
  * @type {object}
  */
  this.game = game;
  /**
   * property refering to the container layer of the object
   * @type {object}
   */
  this.container = this.game.layer0;
  /**
   * Property calling the builtin method for reading audio files
   * @type {media.Sound}
   */
  this.fire = this.application.sounds.sound.get("fire1");

  //--------------------------------------------------------------------------
  // Private properties
  //--------------------------------------------------------------------------

  /**
   * Sound for when a new bullet is created.
   *
   * @type {rune.media.Sound}
   * @private
   */

  //--------------------------------------------------------------------------
  //  Constructor call
  //--------------------------------------------------------------------------

  /**
   *  ...
   */
  rune.display.DisplayGroup.call(this, game.layer0);
};

//------------------------------------------------------------------------------
//  Inheritance
//------------------------------------------------------------------------------

Winners.entity.Bullets.prototype = Object.create(
  rune.display.DisplayGroup.prototype
);
Winners.entity.Bullets.prototype.constructor = Winners.entity.Bullets;

//------------------------------------------------------------------------------
// Public prototype methods
//------------------------------------------------------------------------------

/**
 * Creates a new bullet at a specific position.
 * @method
 * @param {number} [x=0] ...
 * @param {number} [y=0] ...
 *@param {object} owner reference to the object that generated the bullets object
 *@param {object} turret reference to the turret object that belonges to the object that generated the bullets object
 *@param {object} enemy reference to the enemy of the object that generated bullets object
 * @return {undefined}
 */
Winners.entity.Bullets.prototype.create = function (
  x,
  y,
  owner,
  turret,
  enemy
) {

  this.owner = owner;
  this.turret = turret;
  this.enemy = enemy;

  if (this.numMemebers == this.maxNumBullets) {
    this.removeChild(this.getChildAt(0));
  }
/**
 * Property containing a reference to the instance of the bullet object
 * @type {object}
 */
  this.bullet = new Winners.entity.Bullet(
    this.game,
    this.container,
    this.owner,
    this.enemy,
    this
  );
  /**
   * Proprties to specify the x & y coords of the bullet object
   * @type {number}
   */
  this.bullet.x = (x || 0) - (this.bullet.width >> 1);
  this.bullet.y = (y || 0) - (this.bullet.height >> 1);

  this.addMember(this.bullet);
  this.fire.play(true);

  return this.bullet;
};

/**
 * The update method of the bullets object, exutes its logic per tick
 *
 * @method
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Bullets.prototype.update = function (step) {

};

/**
 * Resets all bullets.
 *
 * @return {undefined}
 */
Winners.entity.Bullets.prototype.reset = function () {
  this.removeChildren();

};

