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
Winners.entity.Truck = function(x, y, player2, layer0) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Calls the constructor method of the super class.
     */
    rune.display.Sprite.call(this, x, y, 40, 40, "Truck");
    this.player = player2;
    this.layer0 = layer0;
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
Winners.entity.Truck.prototype.init = function() {
    rune.display.Sprite.prototype.init.call(this);

    this.m_initAnimation();
    this.m_initPhysics();
    
   
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
Winners.entity.Truck.prototype.update = function(step) {
    rune.display.Sprite.prototype.update.call(this, step);
    //this.flippedX = true;
   /* this.velocity.x += 0.15;
    this.animation.gotoAndPlay("walk");
    //console.log(this.globalX)
    if (this.globalX >= 907.5){
       // console.log(this.globalX)
        this.velocity.x = 0;
        this.animation.gotoAndPlay("idle");

   
    }

    */ 
   
    if (!this.reachedPlayer) {
        
        var dx = this.player.x - this.x;
        var dy = this.player.y - this.y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        dx /= distance;
        dy /= distance;

        this.x += dx * this.movementspeed;
        this.y += dy * this.movementspeed;

        var radius = 20;
        if (
            Math.abs(this.x - this.player.x) <= radius &&
            Math.abs(this.y - this.player.y) <= radius
        ) {
            this.reachedPlayer = true;
            this.stopAndSpawnSoldiers();
        }
    } 
    
};
Winners.entity.Truck.prototype.stopAndSpawnSoldiers = function() {
    
    this.velocity.x = 0;

 
    for (var i = 0; i < 3; i++) {
        var angle = Math.random() * Math.PI * 2;
        var distance = 20;
        var soldierX = this.player.x + Math.cos(angle) * distance;
        var soldierY = this.player.y + Math.sin(angle) * distance;
        var soldier = new Winners.entity.Soldiers(soldierX, soldierY, this.player, this.layer0);
    }
};
/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Truck.prototype.dispose = function() {
    rune.display.Sprite.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

Winners.entity.Truck.prototype.m_initPhysics = function() {
    this.velocity.drag.x = 0.05;
    this.velocity.drag.y = 0.05;
    this.velocity.max.x = 1.8;
    this.velocity.max.y = 1.8;
  

}

