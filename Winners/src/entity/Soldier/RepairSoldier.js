//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------
/**
 * Creates a new repair soldier object.
 *
 * @constructor
 * @extends Winners.entity.SoldierUtil
 *
 * @class
 * @classdesc Game scene.
 * @param {number} X coordinates of where the object will be placed on X axis
 * @param {number} Y coordinates of where the object will be placed on Y axis
 * @param {object} game reference to the game object
 * @param {object} player reference to the player object
 */
Winners.entity.Repairsoldier = function (x, y, game, player) {
  if (player === game.player) {
    this.enemy = game.player2;
  } else {
    this.enemy = game.player;
  }

  Winners.entity.SoldierUtil.call(
    this,
    x,
    y,
    game,
    this.enemy,
    "repairsoldier",
    0,
    1,
    0,
    player
  );

  this.player = player;

  // Replace color based on the enemy player
  if (this.enemy === game.player) {
    this.texture.replaceColor(
      new rune.color.Color24(0, 0, 0),
      new rune.color.Color24(0, 150, 230)
    );
  } else {
    this.texture.replaceColor(
      new rune.color.Color24(0, 0, 0),
      new rune.color.Color24(255, 0, 0)
    );
  }

  this.respawn = this.application.sounds.sound.get("soldierSpawn");
  this.respawn.play(true);
  this.flicker.start();
};

Winners.entity.Repairsoldier.prototype = Object.create(
  Winners.entity.SoldierUtil.prototype
);
Winners.entity.Repairsoldier.prototype.constructor = Winners.entity.Repairsoldier;

/**
 * Executed once after the initialization of the displayobject container
 * The method is used to create objects or adjust their properties to be used
 * @returns {undefined}
 */
Winners.entity.Repairsoldier.prototype.init = function () {
  Winners.entity.SoldierUtil.prototype.init.call(this);
  this.initAnimation();
};

/**
 * Method to handle the animation creation related to the repair soldier class.
 *
 * @returns {undefined}
 */
Winners.entity.Repairsoldier.prototype.initAnimation = function () {
  this.animation.create("idle", [0], 1, true);
  this.animation.create("walk", [0, 1], 5, true);
  this.animation.create("dead", [6, 7], 3, false);
};
/*
* Updated within a fixed time interval "loop", where it runs or checks the state of the specified properties.
* @param {number} step - The time step for the update.
* @returns {undefined}
*/
Winners.entity.Repairsoldier.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);

  if (!this.isAlive || this.game.winnerDeclared) {
    return; 
  }

  var targetBase = this.player.playerBase;
  var targetShield = this.player.playerBaseShield;

  if (targetShield || targetBase) {
    var targetX;
    var targetY;

    if (targetShield) {
      targetX = targetShield.centerX;
      targetY = targetShield.centerY;
    } else {
      targetX = targetBase.centerX;
      targetY = targetBase.centerY;
    }

    var currentPosition = new rune.geom.Point(this.x, this.y);
    var targetPosition = new rune.geom.Point(targetX, targetY);
    var distanceX = targetX - this.x;
    var distanceY = targetY - this.y;
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
        this.handleKillSoldier(); 
      }
    },
    this
  );
};

/**
 * Method to handle the repair logic of the base or base shield
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