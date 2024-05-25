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
 */
Winners.entity.Rocketsoldier = function (x, y, game, enemy) {
  this.game = game;
  this.layer = this.game.layer0;
  this.shootDistance = 200;
  this.moveSpeed = 0.8;
  this.shootCooldown = 2420;
  this.lastShootTime = 0;

  rune.display.Sprite.call(this, x, y, 32, 32, "rocketsoldier");

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

Winners.entity.Rocketsoldier.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Rocketsoldier.prototype.constructor = Winners.entity.Rocketsoldier;

/**
 * Executed once after the initialization of the display object container.
 * The method is used to create objects or adjust their properties to be used.
 * @returns {undefined}
 */
Winners.entity.Rocketsoldier.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
  this.m_initAnimation();
};

/**
 * Method to handle the animation creation related to the rocket soldier class.
 *
 * @returns {undefined}
 */
Winners.entity.Rocketsoldier.prototype.m_initAnimation = function () {
  this.animation.create("shoot", [0, 1, 2, 3], 5, false);
  this.animation.create("idle", [0], 1, true);
  this.animation.create("walk", [0, 1], 5, true);
};

/**
 * Updated within a fixed time interval "loop", where it runs or checks the state of the specified properties.
 * @param {number} step - The time step for the update.
 * @returns {undefined}
 */
Winners.entity.Rocketsoldier.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);

  this.currentPosition = new rune.geom.Point(this.centerX, this.centerY);
  this.targetPosition = new rune.geom.Point(this.enemy.centerX, this.enemy.centerY);

  this.distanceX = this.enemy.x - this.x;
  this.distanceY = this.enemy.y - this.y;
  this.distance = this.currentPosition.distance(this.targetPosition);

  if (this.enemy.hitTest(this)) {
    this.game.layer0.removeChild(this);
    this.dispose();
    return;
  }

  if (this.distance <= this.shootDistance && this.distance > 90) {
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

  if (this.enemy.hitTest(this)) {
    this.game.layer0.removeChild(this);
  }

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
 * Method to handle the rocket soldier's shooting logic, timing, rotation, and speed of the rockets.
 * @method
 * @returns {undefined}
 */
Winners.entity.Rocketsoldier.prototype.shoot = function () {

  if (this.distance - 48 <= this.shootDistance) {
    var rocketSpeed = 6;
    var rocketDirectionX = this.distanceX / this.distance;
    var rocketDirectionY = this.distanceY / this.distance;

    var rocket = new Winners.entity.Rocket(this.game, this.layer, this, this.enemy, this.bullets, this.centerX, this.centerY);
    this.layer.addChild(rocket);

    rocket.velocity.x = rocketDirectionX * rocketSpeed;
    rocket.velocity.y = rocketDirectionY * rocketSpeed;

    rocket.rotation = Math.atan2(this.distanceY, this.distanceX) * (180 / Math.PI);

    if (this.animation) {
      this.animation.gotoAndPlay("shoot");
    }
  }
};

/**
 * Disposes of the rocket soldier.
 * @returns {undefined}
 */
Winners.entity.Rocketsoldier.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);
};
