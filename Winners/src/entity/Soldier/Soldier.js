
//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------
/**
 * Creates a new object.
 *
 * @constructor
 * @extends Winners.entity.SoldierUtil
 *
 * @class
 * @classdesc Game scene.
 */
Winners.entity.Soldier = function (x, y, game, enemy, i, SoldierOwner, truck) {
  Winners.entity.SoldierUtil.call(this, x, y, game, enemy, "soldier", 200, 1, 900, SoldierOwner);
  this.truck = truck;
};

Winners.entity.Soldier.prototype = Object.create(Winners.entity.SoldierUtil.prototype);
Winners.entity.Soldier.prototype.constructor = Winners.entity.Soldiers;


/*
  this.hitTest(
    this.game.bullets,
    function (soldier, bullet) {
      if (bullet.bulletTarget == soldier.SoldierOwner) {
        this.game.bullets.removeMember(bullet, true);
    
        this.handelKillSoldier();
      }
    },
    this
  );
};
*/

/**
 * Method to handle the soldier's shooting logic, timing, rotation, and speed of the bullets.
 * @method
 * @returns {undefined}
 */
Winners.entity.Soldier.prototype.shoot = function () {
  if (this.distance <= this.shootDistance) {
    var bulletSpeed = 0.2;
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