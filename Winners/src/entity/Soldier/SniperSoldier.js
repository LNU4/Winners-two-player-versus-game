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
    this.texture.replaceColor(
      new rune.color.Color24(0, 0, 0),
      new rune.color.Color24(172, 50, 50)
    );
  } else if (enemy === this.game.player2) {
    this.enemy = this.game.player2;
    this.SoldierOwner = this.game.player;
    this.texture.replaceColor(
      new rune.color.Color24(0, 0, 0),
      new rune.color.Color24(32, 32, 32)
    );
  }
};

Winners.entity.SniperSodier.prototype = Object.create(
  rune.display.Sprite.prototype
);
Winners.entity.SniperSodier.prototype.constructor = Winners.entity.SniperSodier;
Winners.entity.SniperSodier.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);

  var m_this = this;
  var distanceX = this.enemy.x - this.x;
  var distanceY = this.enemy.y - this.y;
  var distance = rune.util.Math.distance(
    this.enemy.x,
    this.enemy.y,
    this.x,
    this.y
  );
  if (this.enemy.hitTest(this)) {
    this.game.layer0.removeChild(this);
    this.dispose();
  }

  if (distance <= this.shootDistance && distance > 0) {
    this.x = this.x;
    this.y = this.y;
    if (this.animation) {
      this.animation.gotoAndPlay("idle");
    }
    var currentTime = Date.now();
    if (currentTime - this.lastShootTime >= this.shootCooldown) {
      this.shoot();

      this.lastShootTime = currentTime;
    }
  } else {
    distanceX /= distance;
    distanceY /= distance;
    this.x += distanceX * this.moveSpeed;
    this.y += distanceY * this.moveSpeed;
    if (this.animation) {
      this.animation.gotoAndPlay("walk");
    }
  }

  this.x = rune.util.Math.clamp(this.x, 0, 1280 - this.width);
  this.y = rune.util.Math.clamp(this.y, 0, 720 - this.height);

  var currentPosition = new rune.geom.Point(this.x, this.y);
  var targetPosition = new rune.geom.Point(
    this.enemy.centerX,
    this.enemy.centerY
  );
  var distanceX = targetPosition.x - currentPosition.x;
  var distanceY = targetPosition.y - currentPosition.y;
  var distance = currentPosition.distance(targetPosition);

  var angle = Math.atan2(distanceY, distanceX);

  var rotationCords = angle * (180 / Math.PI);

  this.rotation = rotationCords;

  var directionX = distanceX / distance;
  var directionY = distanceY / distance;

  if (this.shootDistance < distance) {
    currentPosition.x += directionX * this.moveSpeed;
    currentPosition.y += directionY * this.moveSpeed;
  }

  this.x = rune.util.Math.clamp(this.x, 0, 1280 - this.width);
  this.y = rune.util.Math.clamp(this.y, 0, 720 - this.height);

  if (this.enemy.hitTest(this)) {
    this.game.layer0.removeChild(this);
  }

  this.hitTest(
    this.game.bullets,
    function (soldier, bullet) {
      if (bullet.bulletTarget == soldier.SoldierOwner) {
      

        this.game.layer0.removeChild(bullet);
        bullet.dispose();
        this.game.layer0.removeChild(soldier);
        //  this.handelKillSoldier();
      }
    },
    this
  );
};

Winners.entity.SniperSodier.prototype.shoot = function () {
  var currentPosition = new rune.geom.Point(this.centerX, this.centerY);

  var targetPosition = new rune.geom.Point(
    this.enemy.centerX,
    this.enemy.centerY
  );

  var distanceX = targetPosition.x - currentPosition.x;
  var distanceY = targetPosition.y - currentPosition.y;
  var distance = currentPosition.distance(targetPosition);

  if (distance - 30 <= this.shootDistance) {
    var bulletSpeed = 8;
    var bulletDirectionX = distanceX / distance;
    var bulletDirectionY = distanceY / distance;
    if (this.animation) {
      this.animation.gotoAndPlay("shoot");
    }

    var bullet = this.game.bullets.create(
      this.centerX,
      this.centerY,
      this,
      this.turret1,
      this.enemy
    );
    bullet.velocity.x = bulletDirectionX * bulletSpeed;
    bullet.velocity.y = bulletDirectionY * bulletSpeed;

    bullet.rotation = Math.atan2(distanceY, distanceX) * (180 / Math.PI);
  }
};

Winners.entity.SniperSodier.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);
};
Winners.entity.SniperSodier.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);

  this.m_initAnimation();
};
Winners.entity.SniperSodier.prototype.m_initAnimation = function () {
  this.animation.create("shoot", [0, 3], 5, true);
  this.animation.create("idle", [0], 1, true);
  this.animation.create("walk", [0, 1], 5, true);
};
