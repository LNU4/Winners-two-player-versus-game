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
Winners.entity.Soldiers = function (
  x,
  y,
  game,
  enemy,
  ix,
  SoldierOwner,
  truck
) {
  this.shootDistance = 200;
  this.moveSpeed = 1;
  this.shootCooldown = 900;
  this.lastShootTime = 0;
  this.game = game;
  this.SoldierOwner = SoldierOwner;
  this.truck = truck;
  this.enemy = enemy;
  this.isDead = false;
  this.powerUpProb = 0;
  this.layer = this.game.layer0;

  rune.display.Sprite.call(this, x, y, 32, 32, "soldier");
  this.layer.addChild(this);

  if (enemy === this.game.player) {
    this.texture.replaceColor(
      new rune.color.Color24(0, 0, 0),
      new rune.color.Color24(172, 50, 50)
    );
  } else if (enemy === this.game.player2) {
    this.texture.replaceColor(
      new rune.color.Color24(0, 0, 0),
      new rune.color.Color24(32, 32, 32)
    );
  }
};

Winners.entity.Soldiers.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
  this.m_initAnimation();
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------
Winners.entity.Soldiers.prototype = Object.create(
  rune.display.Sprite.prototype
);
Winners.entity.Soldiers.prototype.constructor = Winners.entity.Soldiers;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------
Winners.entity.Soldiers.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);
  var m_this = this;

  this.currentPosition = new rune.geom.Point(this.x, this.y);
  this.targetPosition = new rune.geom.Point(
    this.enemy.centerX,
    this.enemy.centerY
  );

  this.distanceX = this.targetPosition.x - this.currentPosition.x;
  this.distanceY = this.targetPosition.y - this.currentPosition.y;
  this.distance = this.currentPosition.distance(this.targetPosition);

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
    this.handelKillSoldier();
  }

  this.hitTest(
    this.game.bullets,
    function (soldier, bullet) {
      if (bullet.bulletTarget == soldier.SoldierOwner) {
        this.game.layer0.removeChild(bullet);
        bullet.dispose();
        this.handelKillSoldier();
      }
    },
    this
  );
};

Winners.entity.Soldiers.prototype.m_initAnimation = function () {
  this.animation.create("shoot", [0, 3], 5, true);
  this.animation.create("idle", [0], 1, true);
  this.animation.create("walk", [0, 1], 5, true);
};

Winners.entity.Soldiers.prototype.shoot = function () {

  if (this.distance <= this.shootDistance) {
    var bulletSpeed = 0.2;
    var bulletDirectionX = this.distanceX / this.distance;
    var bulletDirectionY = this.distanceY / this.distance;

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
    bullet.rotation = Math.atan2(this.distanceY, this.distanceX) * (180 / Math.PI);
  }
};

Winners.entity.Soldiers.prototype.handelKillSoldier = function () {
  var m_this = this;
  this.game.layer0.removeChild(this);
  this.isDead = true;
  this.powerUpProb = Math.floor(Math.random() * 4);

  if ((this.isDead && this.powerUpProb == 0) || this.powerUpProb == 2) {
    this.game.timers.create({
      duration: 1000,
      onComplete: function () {
        m_this.createPowerups();
      },
    });
  }
};

Winners.entity.Soldiers.prototype.createPowerups = function () {
  var m_this = this;
  var ranX = Math.floor(Math.random() * (1160 - 120 + 1)) + 120;
  var ranY = Math.floor(Math.random() * (600 - 120 + 1)) + 120;
  m_this.powerUp = new Winners.entity.Powerup(
    ranX,
    ranY,
    m_this.game,
    m_this.enemy
  );

  m_this.game.camera.addChild(m_this.powerUp);
};

Winners.entity.Soldiers.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);
};
