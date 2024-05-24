Winners.entity.Repairsoldier = function (x, y, game, enemy, ix) {
  this.moveSpeed = 2;

  this.game = game;

  this.enemy = enemy;

  if (this.enemy === this.game.player) {
    this.player = this.game.player2;
  } else if (this.enemy === this.game.player2) {
    this.player = this.game.player;
  }

  this.ix = ix;

  this.isDead = false; //Check if used N.A

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

Winners.entity.Repairsoldier.prototype = Object.create(
  rune.display.Sprite.prototype
);
Winners.entity.Repairsoldier.prototype.constructor =
  Winners.entity.Repairsoldier;

Winners.entity.Repairsoldier.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);

  var targetX = this.player.x;
  var targetY = this.player.y;

  var currentPosition = new rune.geom.Point(this.x, this.y);
  var targetPosition = new rune.geom.Point(
    this.player.centerX,
    this.player.centerY
  );

  var distanceX = targetX - this.x;
  var distanceY = targetY - this.y;
  if (this.animation) {
    this.animation.gotoAndPlay("idle");
  }
  var distance = currentPosition.distance(targetPosition);

  if (distance > 64) {
    var directionX = distanceX / distance;
    var directionY = distanceY / distance;

    this.x += directionX * this.moveSpeed;
    this.y += directionY * this.moveSpeed;
    if (this.animation) {
      this.animation.gotoAndPlay("walk");
    }
    this.rotation = Math.atan2(directionY, directionX) * (180 / Math.PI);
  } else if (distance <= 64) {
    this.moveSpeed = 0;
    this.repair();
  }

  this.x = rune.util.Math.clamp(this.x, 0, 1280 - this.width);
  this.y = rune.util.Math.clamp(this.y, 0, 720 - this.height);
};

Winners.entity.Repairsoldier.prototype.repair = function () {
  if (this.player && !this.player.isDead) {
    var playerBullets = this.player.bullets;

    if (playerBullets) {
      var healAmount = 10;
      playerBullets.hp += healAmount;
      
    
    }
  }
};

Winners.entity.Repairsoldier.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);

  this.m_initAnimation();
};

Winners.entity.Repairsoldier.prototype.m_initAnimation = function () {
  this.animation.create("idle", [0], 1, true);
  this.animation.create("walk", [0, 1], 5, true);
};
