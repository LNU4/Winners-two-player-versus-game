function Soldiers(x, y, game, enemy) {
  this.shootDistance = 200;
  this.moveSpeed = 1;
  this.shootCooldown = 900;
  this.lastShootTime = 0;
  this.play = game;
  this.enemy = enemy;
  this.targetPlayer = enemy;
  this.isDead = false;
  this.powerUpProb = 0;
  this.layer = this.play.layer0;

 
  rune.display.Sprite.call(this, x, y, 32, 32, "soldiers");
  this.layer.addChild(this);
}


Soldiers.prototype = Object.create(rune.display.Sprite.prototype);
Soldiers.prototype.constructor = Soldiers;


Soldiers.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);

  var distanceX = this.targetPlayer.x - this.x;
  var distanceY = this.targetPlayer.y - this.y;
  var distance = rune.util.Math.distance(
    this.targetPlayer.x,
    this.targetPlayer.y,
    this.x,
    this.y
  );

  if (this.enemy.hitTest(this)) {
    this.isDead = true;
    this.play.layer0.removeChild(this);
    this.dispose();
  }

  if (this.isDead) {
    var ranX = Math.floor(Math.random() * (1160 - 120 + 1)) + 120;
    var ranY = Math.floor(Math.random() * (600 - 120 + 1)) + 120;
    this.play.timers.create({
      duration: 1000,
      onComplete: function () {
        var powerUp = new Winners.entity.Powerup(ranX, ranY);
        this.layer.addChild(powerUp);
      },
    });
    return;
  }

  if (distance <= this.shootDistance && distance > 90) {
    this.shoot();
  } else {
    distanceX /= distance;
    distanceY /= distance;
    this.x += distanceX * this.moveSpeed;
    this.y += distanceY * this.moveSpeed;
  }

  this.x = rune.util.Math.clamp(this.x, 0, 1280 - this.width);
  this.y = rune.util.Math.clamp(this.y, 0, 720 - this.height);

  var angle = Math.atan2(distanceY, distanceX);
  this.rotation = angle * (180 / Math.PI);
};


Soldiers.prototype.shoot = function () {
  var currentPosition = new rune.geom.Point(this.centerX, this.centerY);
  var targetPosition = new rune.geom.Point(
    this.targetPlayer.centerX,
    this.targetPlayer.centerY
  );

  var distanceX = targetPosition.x - currentPosition.x;
  var distanceY = targetPosition.y - currentPosition.y;
  var distance = currentPosition.distance(targetPosition);

  if (distance <= this.shootDistance) {
    var bulletSpeed = 1;
    var bulletDirectionX = distanceX / distance;
    var bulletDirectionY = distanceY / distance;
    var bullet = new Winners.entity.Bullets(this.layer, this, this.targetPlayer);
    this.layer.application.scenes.selected.groups.add(bullet);
    bullet.velocity.x = bulletDirectionX * bulletSpeed;
    bullet.velocity.y = bulletDirectionY * bulletSpeed;
    bullet.rotation = Math.atan2(distanceY, distanceX) * (180 / Math.PI);
  }
};
