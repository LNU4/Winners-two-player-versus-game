Winners.entity.HeavySoldier = function (x, y, game, enemy) {
  Winners.entity.Soldiers.call(this, x, y, game, enemy);

  this.shootDistance = 100; 
  this.moveSpeed = 0.2; 
};

Winners.entity.HeavySoldier.prototype = Object.create(Winners.entity.Soldiers.prototype);
Winners.entity.HeavySoldier.prototype.constructor = Winners.entity.HeavySoldier;

Winners.entity.HeavySoldier.prototype.shoot = function () {
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

    this.bullets = new Winners.entity.Bullets(
      this.layer,
      this,
      this.turret1,
      this.targetPlayer,
      this.baseOwner,
      this.baseTarget
    );
    this.application.scenes.selected.groups.add(this.bullets);

    var bullet = this.bullets.create(this.centerX, this.centerY);
    bullet.velocity.x = bulletDirectionX * bulletSpeed;
    bullet.velocity.y = bulletDirectionY * bulletSpeed;

    bullet.rotation = Math.atan2(distanceY, distanceX) * (180 / Math.PI);
  }
};
