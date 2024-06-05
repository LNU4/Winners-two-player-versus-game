//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------
/**
 * Creates a new rocket soldier object.
 *
 * @constructor
 * @extends Winners.entity.SoldierUtil
 *
 * @class
 * @classdesc Game scene.
 */
Winners.entity.Rocketsoldier = function (x, y, game, enemy, SoldierOwner) {
  Winners.entity.SoldierUtil.call(this, x, y, game, enemy, "rocketsoldier", 200, 0.8, 2420, SoldierOwner);
};

Winners.entity.Rocketsoldier.prototype = Object.create(Winners.entity.SoldierUtil.prototype);
Winners.entity.Rocketsoldier.prototype.constructor = Winners.entity.Rocketsoldier;

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

