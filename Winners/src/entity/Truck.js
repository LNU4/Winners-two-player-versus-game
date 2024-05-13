///------------------------------------------------------------------------------
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
//Winners.entity.Truck = function (x, y, player, player2, layer0, game) {
Winners.entity.Truck = function (x, y, game, enemy) {
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  /**
   * Calls the constructor method of the super class.
   */
  this.soldier = null;
  this.game = game;
  rune.display.Sprite.call(this, x, y, 40, 40, "Truck");

  this.enemy = enemy;

  this.layer0 = this.game.layer0;

  if (this.enemy === this.game.player) {
    this.player = this.game.player;
   //this.target1 = this.game.player;
  } else if (this.enemy === this.game.player2) {
    this.player = this.game.player2;
   //this.target2 = this.game.player2;
  }

  this.deadSoldiers = 0; // test
  this.movementspeed = 5;
  this.reachedPlayer = false;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.Truck.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Truck.prototype.constructor = Winners.entity.Truck;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Truck.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);

  this.m_initAnimation();
  this.m_initPhysics();
  this.rotation = 90;
};

Winners.entity.Truck.prototype.m_initAnimation = function () {
  //   this.life.globalX = this.globalX;
  // this.life.globalY = this.globalY;
  this.animation.create("idle", [0], 1, true);
  this.animation.create("walk", [0, 1], 1, true);
};


/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Truck.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);
  /* if (this.game.player2.hitTest(this.soldier))   {
         console.log('HIT')
         this.layer0.removeChild(this.soldier);
     }*/
  if (!this.reachedPlayer && this.player) {
    var distanceX = this.player.x - this.x;
    var distanceY = this.player.y - this.y;

    // Use runes sdk instead N.A
    var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance <= 160) {
      this.reachedPlayer = true;
      this.stopAndSpawnSoldiers();
    } else {
      distanceX /= distance;
      distanceY /= distance;
      this.x += distanceX * this.movementspeed;
      this.y += distanceY * this.movementspeed;
    }
  }
  this.x = rune.util.Math.clamp(this.x, 0, 1280 - this.width);
  this.y = rune.util.Math.clamp(this.y, 0, 720 - this.height);
  if (this.enemy) {
    this.hitTestAndSeparate(this.enemy);
  }
  
//   if (this.game.truck){
//     this.enemyTruck = this.game.truck;
    if (this.player.bullets){
  if (this.player.bullets.bullet){
    if (this.player.bullets.bullet.hitTest(this)){
    console.log('.-.-.-.')
    this.layer0.removeChild(this.player.bullets.bullet)
    this.layer0.removeChild(this)
  }
  }
    //console.log(this.enemyTruck)
  //}
  // if (this.hitTestAndSeparate(this.game.Base2shield)) {
  //   //console.log('.-.-.-.') 
  
    
  // }

}  

//   if (this.enemy === this.game.player) {
//     this.player2.bullets.bullet.hitTestAndSeparate(this.soldier)
//   } 
};

Winners.entity.Truck.prototype.stopAndSpawnSoldiers = function () {

    var m_this = this;
    this.velocity.x = 0;
    var truckX = this.x;
    var truckY = this.y;
    this.soldierArr = [];
    
    for (var i = 0; i < 3; i++) {
      this.soldierix = i;
      var angle = Math.random() * Math.PI * 2;
      var distance = 30;
      var soldierX = truckX + Math.cos(angle) * distance;
      var soldierY = truckY + Math.sin(angle) * distance;
  
      //  this.soldier = new Winners.entity.Soldiers(soldierX, soldierY, this.player2, this.layer0, this.game);
      this.soldier = new Winners.entity.Soldiers(
        soldierX,
        soldierY,
        this.game,
        this.player, this.soldierix
      );
      // this.HeavySoldier = new Winners.entity.HeavySoldier(soldierX, 
      //     soldierY, 
      //     this.game, 
      //     this.player);
  
      // this.layer0.addChild(this.HeavySoldier)
  
      this.soldierArr.push(this.soldier);
    }
this.game.timers.create({ 
    duration: 2000,
    onComplete: function () {
        m_this.game.layer0.removeChild(this); 
        m_this.dispose();
    },
  });

   
    
  };
  

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Truck.prototype.dispose = function () {
    
  rune.display.Sprite.prototype.dispose.call(this);
  
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

Winners.entity.Truck.prototype.m_initPhysics = function () {
  this.velocity.drag.x = 0.05;
  this.velocity.drag.y = 0.05;
  this.velocity.max.x = 1.8;
  this.velocity.max.y = 1.8;
};
