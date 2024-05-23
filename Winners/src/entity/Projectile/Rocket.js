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
  this.damage = 20;
  this.layer0 = layer0;
  this.bulletOwner = bulletOwner;
  this.bulletTarget = bulletTarget;
  this.bullets = bullets;

  rune.display.Sprite.call(this, x, y, 16, 16, "rocket");

  this.m_speed = 0.0002;

  this.respawn = this.application.sounds.sound.get("respwan1");
};

Winners.entity.Rocket.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Rocket.prototype.constructor = Winners.entity.Rocket;

Winners.entity.Rocket.prototype.init = function () {
  console.warn("init !!!!!!!!!");
    rune.display.Sprite.prototype.init.call(this);
    this.m_initAnimation();
};

Winners.entity.Rocket.prototype.m_initAnimation = function () {
  console.log("animation");
  this.animation.create("active", [0, 1, 2 ,3], 5, true);
  this.animation.gotoAndPlay("active");
};

//Winners.entity.Rocket.prototype = Object.create(rune.display.Sprite.prototype);
//.entity.Rocket.prototype.constructor = Winners.entity.Rocket;

Winners.entity.Rocket.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);
  var m_this = this;
  /*  if (this.game.Player1isDefeated || this.game.Player2isDefeated) {
        this.bulletTarget.lifeIx = 0;
    }; */
  this.animation.gotoAndPlay("walk");

  this.x +=
    Math.cos(rune.util.Math.degreesToRadians(this.rotation)) * this.m_speed;
  this.y +=
    Math.sin(rune.util.Math.degreesToRadians(this.rotation)) * this.m_speed;

  if (this.hitTest(this.bulletTarget)) {
    this.layer0.removeChild(this);

    this.HpOb = this.bulletTarget.hp;
    this.HpOb.value -= this.damage;

    if (this.HpOb.value == 80) {
      rune.display.DisplayObject.call(
        this.HpOb,
        this.bulletTarget.x,
        this.bulletTarget.y,
        20,
        10
      );
      this.HpOb.backgroundColor = "#3dfc03";
    } else if (this.HpOb.value == 60) {
      rune.display.DisplayObject.call(
        this.HpOb,
        this.bulletTarget.x,
        this.bulletTarget.y,
        15,
        10
      );
      this.HpOb.backgroundColor = "#c2fc03";
    } else if (this.HpOb.value == 40) {
      rune.display.DisplayObject.call(
        this.HpOb,
        this.bulletTarget.x,
        this.bulletTarget.y,
        10,
        10
      );
      this.HpOb.backgroundColor = "#fcad03";
    } else if (this.HpOb.value == 20) {
      rune.display.DisplayObject.call(
        this.HpOb,
        this.bulletTarget.x,
        this.bulletTarget.y,
        5,
        10
      );
      this.HpOb.backgroundColor = "#fc0303";
    } else if (this.HpOb.value <= 0) {
      this.bulletTarget.active = false;
      this.bulletTarget.x = -1000;
      this.bulletTarget.y = 1000;
      this.game.timers.create({
        duration: 4000,
        scope: this,
        onComplete: function () {
          this.bulletTarget.active = true;
          m_this.bulletTarget.x = m_this.bulletTarget.initX;
          m_this.bulletTarget.y = m_this.bulletTarget.initY;

          m_this.layer0.addChild(m_this.bulletTarget);
          m_this.game.layer2.addChild(m_this.bulletTarget.turret1);
          m_this.bulletTarget.flicker.start();

          m_this.game.camera.addChild(m_this.HpOb);
          m_this.HpOb.value = 100;
          rune.display.DisplayObject.call(
            m_this.HpOb,
            m_this.bulletTarget.x,
            m_this.bulletTarget.y,
            25,
            10
          );
          m_this.HpOb.backgroundColor = "#03fc24";

          m_this.respawn.play(true);
        },
      });
    }
  }
};

Winners.entity.Rocket.prototype.respawn = function (HpOb) {
  console.log(this);
  this.layer0.removeChild(HpOb);

  this.layer0.removeChild(this.bulletTarget.livesArr[this.bulletTarget.lifeIx]);

  this.bulletTarget.lifeIx++;

  this.bulletTarget.livesArr[this.bulletTarget.lifeIx].hp =
    new Winners.entity.Hps(
      this.bulletTarget.livesArr[this.bulletTarget.lifeIx],
      this.stage,
      this.bulletTarget
    );

  this.bulletTarget.parent.addChildAt(
    this.bulletTarget.livesArr[this.bulletTarget.lifeIx].hp,
    2
  );
  this.bulletTarget.parent.removeChild(this.bulletTarget);
  this.game.timers.create({
    duration: 3000,
    onComplete: function () {
      this.layer0.addChild(target);
      target.flicker.start();
      target.x = this.bulletTarget.initX;
      target.y = this.bulletTarget.initY;
    },
  });
};

Winners.entity.Rocket.prototype.dispose = function () {
    rune.display.DisplayObject.prototype.dispose.call(this);
    console.log("Bullet is disposed");
  };
/*


Winners.entity.Rocket.prototype.dispose = function() {
  
};





Winners.entity.Rocket.prototype.launch = function() {
   
   
};
*/
