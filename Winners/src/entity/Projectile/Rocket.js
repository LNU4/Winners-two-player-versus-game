Winners.entity.Rocket = function (
  game,
  layer0,
  bulletOwner,
  bulletTarget,
  bullets,
  x,
  y
) {

  this.game = game;
  this.damage = 50;

  /**
   * Referance to the display object container
   * @type {object}
   */

  this.layer0 = layer0;
  this.bulletOwner = bulletOwner;
  this.bulletTarget = bulletTarget;
  this.bullets = bullets;
  this.soundEffect = this.application.sounds.sound.get("rocketSound");
  this.soundEffect.play(true);

  rune.display.Sprite.call(this, x, y, 16, 16, "rocket");

  this.m_speed = 0.0002;

};

Winners.entity.Rocket.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Rocket.prototype.constructor = Winners.entity.Rocket;

Winners.entity.Rocket.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
  this.m_initAnimation();
};

Winners.entity.Rocket.prototype.m_initAnimation = function () {
  this.animation.create("active", [0, 1, 2, 3], 5, true);
  this.animation.gotoAndPlay("active");
};

Winners.entity.Rocket.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);

  /**
   * Referance to the rocket class
   * @type {object}
   */
  var m_this = this;
  
  this.animation.gotoAndPlay("walk");

 


  if (this.hitTest(this.bulletTarget)) {
    this.layer0.removeChild(this, true);
  
    this.game.bullets.bullet.handelHp(this.damage, this.bulletTarget, this.bulletOwner);
  }
};

Winners.entity.Rocket.prototype.dispose = function () {
  rune.display.DisplayObject.prototype.dispose.call(this);
};
