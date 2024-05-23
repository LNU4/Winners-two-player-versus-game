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

Winners.entity.Soldiers = function (x, y, game, enemy, ix, SoldierOwner, truck) {
 
  this.shootDistance = 200;
  this.moveSpeed = 1;
  this.shootCooldown = 900;
  this.lastShootTime = 0;
  // this.elasticity = 1.0;

  this.game = game;
  
  this.SoldierOwner = SoldierOwner; 
  this.truck = truck;

  this.enemy = enemy;

  //   if (this.enemy === this.game.player) {
  //     this.player = this.game.player;
  //   } else if (this.enemy === this.game.player2) {
  //     this.player = this.game.player2;
  //   }  ** WAIT WITH THIS **

  this.ix = ix;

  this.isDead = false;
  this.powerUpProb = 0;

  this.layer = this.game.layer0;

  rune.display.Sprite.call(this, x, y, 32, 32, "soldier");
  this.layer.addChild(this);
  //change to iniit N.A
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

//----------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.Soldiers.prototype = Object.create(
  rune.display.Sprite.prototype
);
Winners.entity.Soldiers.prototype.constructor = Winners.entity.Soldiers;
//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------
Winners.entity.Soldiers.prototype.shoot = function () {
  
  var currentPosition = new rune.geom.Point(this.centerX, this.centerY);
  var targetPosition = new rune.geom.Point(
    this.enemy.centerX,
    this.enemy.centerY
  );

  var distanceX = targetPosition.x - currentPosition.x;
  var distanceY = targetPosition.y - currentPosition.y;

  var distance = currentPosition.distance(targetPosition);
  if (distance <= this.shootDistance) {
    var bulletSpeed = 0.2;

    var bulletDirectionX = distanceX / distance;
    var bulletDirectionY = distanceY / distance;
    
 /*    this.bullets = new Winners.entity.Bullets(
      this.game,
      this.layer,
      this,
      this.turret1,
      this.enemy
    );
    this.application.scenes.selected.groups.add(this.bullets); */

    this.animation.gotoAndPlay("shoot");
    var bullet = this.game.bullets.create(this.centerX, this.centerY, this, this.turret1, this.enemy);
    bullet.velocity.x = bulletDirectionX * bulletSpeed;
    bullet.velocity.y = bulletDirectionY * bulletSpeed;

    bullet.rotation = Math.atan2(distanceY, distanceX) * (180 / Math.PI);
    

  }
};



Winners.entity.Soldiers.prototype.update = function (step) {
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
  

  if (distance <= this.shootDistance && distance > 90) {
    this.x = this.x;
    this.y = this.y;
    this.animation.gotoAndPlay("idle"); 
    
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
    this.animation.gotoAndPlay("walk"); 
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

  // in order to achieve what we want, we need to rotate the bullet, we need to know the angle between the bullet/player and the target
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2
  var angle = Math.atan2(distanceY, distanceX);

  var rotationCords = angle * (180 / Math.PI);

  this.rotation = rotationCords;

  var directionX = distanceX / distance;
  var directionY = distanceY / distance;

  if (this.shootDistance < distance) {
    currentPosition.x += directionX * this.moveSpeed;
    currentPosition.y += directionY * this.moveSpeed;
  }

  /*
   currentPosition.x = Math.min(
     Math.max(currentPosition.x, 0),
     1280 - this.width
   );
   currentPosition.y = Math.min(
     Math.max(currentPosition.y, 0),
     720 - this.height
   );
 */
  this.x = rune.util.Math.clamp(this.x, 0, 1280 - this.width);
  this.y = rune.util.Math.clamp(this.y, 0, 720 - this.height);

  this.x = currentPosition.x;
  this.y = currentPosition.y;

  var currentTime = Date.now();
  /* if (currentTime - this.lastShootTime >= this.shootCooldown) {
      this.shoot();
      console.log("The shooting worked on line 172")
    this.lastShootTime = currentTime;
  } */

  // if (this.enemy.hitTest(this)) {
  //   this.game.layer0.removeChild(this);
  // }

  if (this.enemy.hitTest(this)) {
    this.handelKillSoldier()
    // this.isDead = true;
    // this.powerUpProb = Math.random() * 5;
    // this.game.layer0.removeChild(this);
    // this.dispose();
  }
  // if (this.isDead == true) {
  //   this.game.timers.create({
  //     duration: 1000,
  //     onComplete: function () {
       
  //       m_this.createPowerups()
        
  //     },
  //   });

  // }

  this.hitTest(this.game.bullets, function(soldier, bullet) {
    if (bullet.bulletTarget == soldier.SoldierOwner) {

console.log(bullet, soldier) 
     this.game.layer0.removeChild(bullet); 
      bullet.dispose();
      this.handelKillSoldier();
    }
/* 
    console.warn(this.enemy.bullets.numMembers);
    this.game.layer0.removeChild(bullet);
    bullet.dispose();  
    this.handelKillSoldier() */
  }, this)

  // if (this.enemy.bullets && this.enemy.bullets.bullet && this.enemy.bullets.bullet.hitTestAndSeparate(this)) {
  //   this.game.layer0.removeChild(this.enemy.bullets.bullet);
  //   this.enemy.bullets.bullet.dispose();  
  //   this.handelKillSoldier()

    //this.enemy.bullets.bullet.hitTestAndSeparate(this);

    // this.isDead = true;
    // this.powerUpProb =  Math.floor(Math.random() * 4);
    // console.log(this.powerUpProb)

    // this.game.layer0.removeChild(this.enemy.bullets.bullet);
    // this.game.layer0.removeChild(this);
    // // this.dispose();
    // //this.enemy.bullets.reset()
    // this.enemy.bullets.bullet.dispose();
 // }
  // if (this.isDead && this.powerUpProb == 0 || this.powerUpProb == 2) {
  //   console.log(this.powerUpProb)
  //   this.game.timers.create({
  //     duration: 1000,
  //     onComplete: function () {
  //       console.log(m_this.powerUpProb)
  //       //** console.group(m_this.enemy) 
  //       m_this.createPowerups()
  //       // m_this.powerUp = new Winners.entity.Powerup(
  //       //   ranX,
  //       //   ranY,
  //       //   m_this.game,
  //       //   m_this.enemy
  //       // );

  //       // this.layer0.addChild(m_this.powerUp);
  //     },
  //   });


  // }
  //   for (var i = 0; i < this.game.truck.soldierArr.length; i++) {
  //     console.log('..-.-.-')
  //    this.hitTestAndSeparate(this.game.truck.soldierArr[i])
  //   }  ||  this.enemy.bullets.bullet && this.enemy.bullets.bullet.hitTest(this)
};
Winners.entity.Soldiers.prototype.handelKillSoldier = function (){
 console.log('handelKillSoldier')

  var m_this = this;
  this.game.layer0.removeChild(this);
  this.isDead = true;
  this.powerUpProb =  Math.floor(Math.random() * 4);
  console.log(this.powerUpProb)
  
  // this.game.layer0.removeChild(this.enemy.bullets.bullet);
  // this.game.layer0.removeChild(this);
  // this.dispose();
  //this.enemy.bullets.reset()
 // this.enemy.bullets.bullet.dispose();
  if (this.isDead && this.powerUpProb == 0 || this.powerUpProb == 2) {
    console.log(this.powerUpProb)
    this.game.timers.create({
      duration: 1000,
      onComplete: function () {
        console.log(m_this.powerUpProb)
        //** console.group(m_this.enemy) 
        m_this.createPowerups()
        // m_this.powerUp = new Winners.entity.Powerup(
        //   ranX,
        //   ranY,
        //   m_this.game,
        //   m_this.enemy
        // );

        // this.layer0.addChild(m_this.powerUp);
      },
    });


  }
}

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

}
/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Soldiers.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);
  //console.log('soldier is disposed')
};

Winners.entity.Soldiers.prototype.init = function () {
  
  rune.display.Sprite.prototype.init.call(this);

  
 
  this.m_initAnimation();
};

Winners.entity.Soldiers.prototype.m_initAnimation = function () {
  this.animation.create("shoot", [0, 3], 5, true);
  this.animation.create("idle", [0], 1, true);
  this.animation.create("walk", [0, 1], 5, true);
  

};