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
 *
 * @param {number} X coordinates of where the object will be placed on X axis
 * @param {number} Y coordinates of where the object will be placed on Y axis
 * @param {object} game reference to the game object
 * @param {object} enemy reference to the enemy object
 * @param {number} SoldierOwner reference to the player object that has the same team
 */
Winners.entity.Rocketsoldier = function (x, y, game, enemy, SoldierOwner) {
  Winners.entity.SoldierUtil.call(
    this,
    x,
    y,
    game,
    enemy,
    "rocketsoldier",
    200,
    0.8,
    2420,
    SoldierOwner
  );
};

Winners.entity.Rocketsoldier.prototype = Object.create(
  Winners.entity.SoldierUtil.prototype
);
Winners.entity.Rocketsoldier.prototype.constructor =
  Winners.entity.Rocketsoldier;

/**
 * Method to handle the rocket soldier's shooting logic, timing, rotation, and speed of the rockets.
 * @method
 * @returns {undefined}
 */
Winners.entity.Rocketsoldier.prototype.shoot = function () {
  if (this.distance - 48 <= this.shootDistance) {
    var rocketSpeed = 6;
    // specifes the rocket direction on X and Y axes
    var rocketDirectionX = this.distanceX / this.distance;
    var rocketDirectionY = this.distanceY / this.distance;

    var rocket = new Winners.entity.Rocket(
      this.game,
      this,
      this.enemy,
      this.bullets,
      this.centerX,
      this.centerY
    );
    this.layer.addChild(rocket);
    //specifies the rocket velocity on x and y axes
    rocket.velocity.x = rocketDirectionX * rocketSpeed;
    rocket.velocity.y = rocketDirectionY * rocketSpeed;
    //specifies the rotation of the rocket
    rocket.rotation =
      Math.atan2(this.distanceY, this.distanceX) * (180 / Math.PI);
  }
};
