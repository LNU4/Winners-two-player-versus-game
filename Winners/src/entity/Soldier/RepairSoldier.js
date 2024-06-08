//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new rocket soldier object.
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @class
 * @classdesc Game scene.
 * @param {number} X coordinates of where the object will be placed on X axis
 * @param {number} Y coordinates of where the object will be placed on Y axis
 * @param {object} game reference to the game object
 * @param {object} player reference to the player object
 */
Winners.entity.Repairsoldier = function (x, y, game, player) {
  /**
   * Property to determine the speed of the soldier
   * @type {number}
   */
  this.moveSpeed = 1;
  this.game = game;
  /**
   * Boolean to determine if the soldier is dead
   * @type {boolean}
   */
  this.isDead = false;

  /**
   * placeholder to the display object container
   * @type {object}
   */
  this.layer = game.layer0;

  rune.display.Sprite.call(this, x, y, 32, 32, "soldier");
  this.layer.addChild(this);
  /**
   * if statement to check the player thats passed to this class
   */
  var playerColor;
  if (player === game.player2) {
    this.player = game.player2;
    this.enemy = this.game.player;
    playerColor = new rune.color.Color24(32, 32, 32);
  } else {
    this.player = game.player;
    this.enemy = this.game.player2;
    playerColor = new rune.color.Color24(172, 50, 50);
  }

  this.texture.replaceColor(new rune.color.Color24(0, 0, 0), playerColor);
};
/**
 * Innheritance of the sprite class
 */
Winners.entity.Repairsoldier.prototype = Object.create(
  rune.display.Sprite.prototype
);
Winners.entity.Repairsoldier.prototype.constructor =
  Winners.entity.Repairsoldier;

/**
 * Excuted once after the initialization of the displayobject container
 * The method is used to create objects or adjust their properties to be used
 * @returns {undefined}
 */
Winners.entity.Repairsoldier.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
  this.initAnimation();
};
/**
 * Method to handle the animation creatation related to the sniper soldier class.
 *
 * @returns {undefined}
 */
Winners.entity.Repairsoldier.prototype.initAnimation = function () {
  this.animation.create("idle", [0], 1, true);
  this.animation.create("walk", [0, 1], 5, true);
};

/**
 * Updated within a fixed time interval "loop", where it runs or checks the state of the specified properties.
 * @param {number} step - The time step for the update.
 * @returns {undefined}
 */
Winners.entity.Repairsoldier.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);
  /**
   * Placeholder to specify the players base object
   * @type {Object}
   */
  var targetBase = this.player.playerBase;
  /**
   * laceholder to specify the players baseshield object
   * @type {Object}
   */
  var targetShield = this.player.playerBaseShield;

  if (targetShield || targetBase) {
    /**
     * placeholder to specify the x and y coordinates
     */
    var targetX;
    var targetY;

    if (targetShield) {
      targetX = targetShield.centerX;
      targetY = targetShield.centerY;
    } else {
      targetX = targetBase.centerX;
      targetY = targetBase.centerY;
    }
    /***
     * postion points to determin both the current position and target position and their respective Y and X coordinates
     * @type {number};
     */
    var currentPosition = new rune.geom.Point(this.x, this.y);
    var targetPosition = new rune.geom.Point(targetX, targetY);
    /**
     * Normalize the distance between the objects position and the target position
     * @type {number};
     */
    var distanceX = targetX - this.x;
    var distanceY = targetY - this.y;
    /**
     * specify the distance between the objects position and the target position
     * @type {number}
     */
    var distance = currentPosition.distance(targetPosition);

    if (distance > 15) {
      var directionX = distanceX / distance;
      var directionY = distanceY / distance;

      this.x += directionX * this.moveSpeed;
      this.y += directionY * this.moveSpeed;
      this.animation.gotoAndPlay("walk");
      this.rotation = Math.atan2(directionY, directionX) * (180 / Math.PI);
    } else {
      this.repair();
    }
    /**
     * clmap the soldier within the display object container
     */
    this.x = rune.util.Math.clamp(this.x, 0, 1280 - this.width);
    this.y = rune.util.Math.clamp(this.y, 0, 720 - this.height);
  } else {
    this.isDead = true;
    this.layer.removeChild(this, true);
  }

  if (this.enemy.hitTest(this)) {
    this.game.layer0.removeChild(this, true);
  }

  this.hitTest(
    this.game.bullets,
    function (soldier, bullet) {
      if (bullet.bulletTarget == soldier.player) {
        this.game.bullets.removeMember(bullet, true);
        this.game.layer0.removeChild(this, true);
        // this.handelKillSoldier();
      }
    },
    this
  );
};
/**
 * Method to handle the repair logic of the base respece baseshield
 * @method
 */
Winners.entity.Repairsoldier.prototype.repair = function () {
  if (
    this.player.playerBaseShield &&
    this.player.playerBaseShield.hpValue < 1000
  ) {
    this.player.playerBaseShield.hpValue = 1000;
    this.player.playerBaseShield.animation.gotoAndStop("0");
  } else if (this.player.playerBase && this.player.playerBase.HPValue < 1000) {
    this.player.playerBase.HPValue = 1000;
    this.player.playerBase.animation.gotoAndStop("0");
  }
  this.game.layer0.removeChild(this, true);
};
