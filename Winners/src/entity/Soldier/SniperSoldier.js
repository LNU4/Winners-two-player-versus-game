//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new sniper soldier object.
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @class
 * @classdesc Game scene.
 */
Winners.entity.SniperSodier = function (x, y, game, enemy) {
  this.game = game;
  this.layer = this.game.layer0;
  this.shootDistance = 1000;
  this.moveSpeed = 1.5;
  this.shootCooldown = 920;
  this.lastShootTime = 0;

  rune.display.Sprite.call(this, x, y, 32, 32, "snipersoldier");

  if (enemy === this.game.player) {
    this.enemy = this.game.player;
    this.SoldierOwner = this.game.player2;
    this.texture.replaceColor(new rune.color.Color24(0, 0, 0), new rune.color.Color24(172, 50, 50));
  } else if (enemy === this.game.player2) {
    this.enemy = this.game.player2;
    this.SoldierOwner = this.game.player;
    this.texture.replaceColor(new rune.color.Color24(0, 0, 0), new rune.color.Color24(32, 32, 32));
  }
};

Winners.entity.SniperSodier.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.SniperSodier.prototype.constructor = Winners.entity.SniperSodier;

/**
 * Executed once after the initialization of the display object container.
 * The method is used to create objects or adjust their properties to be used.
 * @returns {undefined}
 */
Winners.entity.SniperSodier.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
  this.m_initAnimation();
};

/**
 * Method to handle the animation creation related to the sniper soldier class.
 *
 * @returns {undefined}
 */
Winners.entity.SniperSodier.prototype.m_initAnimation = function () {
  this.animation.create("shoot", [0, 3], 5, true);
  this.animation.create("idle", [0], 1, true);
  this.animation.create("walk", [0, 1], 5, true);
};

/**
 * Updated within a fixed time interval "loop", where it runs or checks the state of the specified properties.
 * @param {number} step - The time step for the update.
 * @returns {undefined}
 */
Winners.entity.SniperSodier.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);

  this.currentPosition = new rune.geom.Point(this.x, this.y);
  this.targetPosition = new rune.geom.Point(this.enemy.centerX, this.enemy.centerY);

  this.distanceX = this.targetPosition.x - this.currentPosition.x;
  this.distanceY = this.targetPosition.y - this.currentPosition.y;
  this.distance = this.currentPosition.distance(this.targetPosition);

  if (this.enemy.hitTest(this)) {
    this.game.layer0.removeChild(this);
    this.dispose();
    return;
  }

  if (this.distance <= this.shootDistance && this.distance > 0) {
    if (this.animation) {
      this.animation.gotoAndPlay("idle");
    }
    var currentTime = Date.now();
    if (currentTime - this.lastShootTime >= this.shootCooldown) {
      this.shoot();
      this.lastShootTime = currentTime;
    }
  } else {
    this.distanceX /= this.distance;
    this.distanceY /= this.distance;
    this.x += this.distanceX * this.moveSpeed;
    this.y += this.distanceY * this.moveSpeed;
    if (this.animation) {
      this.animation.gotoAndPlay("walk");
    }
  }

  this.x = rune.util.Math.clamp(this.x, 0, 1280 - this.width);
  this.y = rune.util.Math.clamp(this.y, 0, 720 - this.height);

  var angle = Math.atan2(this.distanceY, this.distanceX);
  this.rotation = angle * (180 / Math.PI);

  this.hitTest(
    this.game.bullets,
    function (soldier, bullet) {
      if (bullet.bulletTarget === soldier.SoldierOwner) {
        this.game.layer0.removeChild(bullet);
        bullet.dispose();
        this.game.layer0.removeChild(soldier);
      }
    },
    this
  );
};

/**
 * Method to handle the sniper soldier's shooting logic, timing, rotation, and speed of the bullets.
 * @method
 * @returns {undefined}
 */
Winners.entity.SniperSodier.prototype.shoot = function () {

  if (this.distance - 30 <= this.shootDistance) {
    var bulletSpeed = 8;
    var bulletDirectionX = this.distanceX / this.distance;
    var bulletDirectionY = this.distanceY / this.distance;
    if (this.animation) {
      this.animation.gotoAndPlay("shoot");
    }

    var bullet = this.game.bullets.create(this.centerX, this.centerY, this, this.turret1, this.enemy);
    bullet.velocity.x = bulletDirectionX * bulletSpeed;
    bullet.velocity.y = bulletDirectionY * bulletSpeed;
    bullet.rotation = Math.atan2(this.distanceY, this.distanceX) * (180 / Math.PI);
  }
};

/**
 * Disposes of the sniper soldier.
 * @returns {undefined}
 */
Winners.entity.SniperSodier.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);
};
