///------------------------------------------------------------------------------
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
Winners.entity.Truck = function (x, y, game, enemy, owner) {
  /**
   * reference to the game class
   * @type {object}
   */
  this.game = game;

  /**
   * reference to the display object container
   * @type {object}
   */
  this.layer0 = this.game.layer0;
  /**
   * Property that limits the value of the hit points for Truck
   * @type {number}
   */
  this.hp = 200;

  /**
   * Properity to state the movement speed of the truck object
   * @type {number}
   */
  this.movementspeed = 5;
  /**
   * Properity to state if the truck has reached the player
   * @type {boolean}
   */
  this.reachedPlayer = false;

  /**
   * An array to hold the soldiers
   *
   * @type {Array}
   */

  this.soldierArr = [];

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  /**
   * Calls the constructor method of the super class.
   */
  rune.display.Sprite.call(this, x, y, 40, 40, "Truck");

  if (enemy === this.game.player) {
    /**
     * Reference to the player object as the enemy object
     * @type {object}
     */
    this.enemy = this.game.player;
    this.player = this.game.player2;
    this.texture.replaceColor(
      new rune.color.Color24(82, 75, 36),
      new rune.color.Color24(255, 0, 0)
    );
  } else if (enemy === this.game.player2) {
    this.enemy = this.game.player2;
    this.player = this.game.player;
    this.texture.replaceColor(
      new rune.color.Color24(82, 75, 36),
      new rune.color.Color24(0, 150, 230)
    );
  }
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.Truck.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Truck.prototype.constructor = Winners.entity.Truck;

//------------------------------------------------------------------------------
// Override public prototype methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Truck.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);

  this.m_initAnimation();
  this.m_initPhysics();
  /**
   * Properity to speicify the rotation of the object
   * @type {number}
   */
  this.rotation = 90;
};
/**
 * Method to handle the animation creatation related to the truck class.
 *
 * @returns {undefined}
 */
Winners.entity.Truck.prototype.m_initAnimation = function () {
  this.animation.create("idle", [0], 1, true);
  this.animation.create("walk", [0, 1], 1, true);
};

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Truck.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);

  if (!this.reachedPlayer && this.enemy) {
    /**
     * Normalized distance "both X and Y axis" between the soldier object and the enemy
     */
    var distanceX = this.enemy.x - this.x;
    var distanceY = this.enemy.y - this.y;
    /* Calculate the distance between the two object "truck and enemy player object" */
    var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance <= 160) {
      this.reachedPlayer = true;
      this.stopAndSpawnSoldiers();
    } else {
      /**
       * Move the truck towards the enemy player object
       */
      distanceX /= distance;
      distanceY /= distance;
      this.x += distanceX * this.movementspeed;
      this.y += distanceY * this.movementspeed;
    }
  }
  /**
   * Clamp the soldier to stay within the display object container "on both axis".
   * @type {number}
   */
  this.x = rune.util.Math.clamp(this.x, 0, 1280 - this.width);
  this.y = rune.util.Math.clamp(this.y, 0, 720 - this.height);
  if (this.enemy && this.player) {
    this.hitTestAndSeparate(this.enemy);
    this.hitTestAndSeparate(this.player);
  }
  if (this.game.bullets) {
    this.hitTest(
      this.game.bullets,
      function (truck, bullet) {
        truck.hp -= 20;

        if (bullet.bulletTarget === truck.player) {
          this.game.bullets.removeMember(bullet, true);
          truck.hp -= 20;
          if (truck.hp == 0) {
            this.game.layer0.removeChild(truck, true);
          }
        }
      },
      this
    );
  }
};
/**
 * Method to handle the truck stop and create soldiers
 * @method
 */
Winners.entity.Truck.prototype.stopAndSpawnSoldiers = function () {
  /**
   * Reference to the truck
   * @type {Object}
   */
  var m_this = this;
  /**
   * Stops the movement of the truck on both axis
   * @type {number}
   */
  var truckX = this.x;
  var truckY = this.y;

  for (var i = 0; i < 4; i++) {
    /**
     * index the soldier that specified in the loop
     * @type {number}
     */

    this.soldierix = i;
    /**
     * spcifies the angle of the soldier upon drop
     * @type {number}
     */
    var angle = Math.random() * Math.PI * 2;
    /**
     * spcifies the the drop distance of the soldiers and the angle
     * @type {number}
     */
    var distance = 30;
    var soldierX = truckX + Math.cos(angle) * distance;
    var soldierY = truckY + Math.sin(angle) * distance;

    this.soldier = new Winners.entity.Soldier(
      soldierX,
      soldierY,
      this.game,
      this.enemy,
      i,
      this.player,
      this
    );

    this.soldierArr.push(this.soldier);
  }
  this.game.timers.create({
    duration: 2000,
    onComplete: function () {
      if (m_this) {
        this.layer0.removeChild(m_this, true);
      }
    },
  });
};

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Truck.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------
/**
 * Method to handle the physics applied on the truck object
 * @method
 */
Winners.entity.Truck.prototype.m_initPhysics = function () {
  /**
   * Drag physics applied on the truck object
   * @type {number}
   */
  this.velocity.drag.x = 0.05;
  this.velocity.drag.y = 0.05;
  /**
   * Max velocity applied on the truck object
   * @type {number}
   */
  this.velocity.max.x = 1.8;
  this.velocity.max.y = 1.8;
};
