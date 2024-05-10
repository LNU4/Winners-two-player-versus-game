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
Winners.entity.PowerupCounter = function(game, ix, powerupCords ) {


    this.game = game;
    this.ix = ix;
    this.x = 0;
    this.y = 0;

    this.powerupCords = powerupCords;

     if (this.ix === 0){
       
        this.x =  powerupCords.puX;
        this.y = powerupCords.puY;
        console.log(this.x)
       
     }
     else if (this.ix === 1){
       
        this.x = powerupCords.puX + 15;
        this.y =  powerupCords.puY;
       
     }
     else if (this.ix === 2){
       
        this.x = powerupCords.puX + 30;
        this.y =  powerupCords.puY;
       
     }
     
   
    // this.arrayIx = 0;
    

    
 // console.log(this.powerupArray[0])


// console.log(this.game.powerupsArr.indexOf(this))
// console.log(this.game.powerupsArr.length);
// console.log(this.game.powerupsArr[1])
//     if (this === this.game.powerupsArr[0]){
//      this.x = x;
//      this.y = y;
//      console.log(this.game.powerupsArr[0])
//     } else if(this === this.game.powerupsArr[1]){
//         this.x = x + 15;
//         this.y = y;
//         console.log(this.game.powerupsArr[1])
//     }  else if(this === this.game.powerupsArr[2]){
//         this.x = x + 30;
//         this.y = y;
//         console.log(this.game.powerupsArr[2])

//     }
    // console.log(this.game.layer0.numChildren)
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    //console.log(this.parentOb.powerupsArr)
   
   
    /**
     * Calls the constructor method of the super class.
     */
    // rune.display.Sprite.call(this, this.powerUpx,  this.powerUpy, 16, 16, "star" );


    rune.display.Sprite.call(this, this.x, this.y ,16, 16, "star" );
    
   
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.PowerupCounter.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.PowerupCounter.prototype.constructor = Winners.entity.PowerupCounter;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.PowerupCounter.prototype.init = function() {
    rune.display.Sprite.prototype.init.call(this);
    
   
   
};

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.PowerupCounter.prototype.update = function(step) {
    rune.display.Sprite.prototype.update.call(this, step);

// this.powerupArray[this.powerupIx]

//     if ( this.powerupIx === 0){
//    console.log(this.powerupArray[this.powerupIx])
//         //this.powerupArray[this.powerupIx]
//      this.powerUpx =  this.powerupArray[this.powerupIx].puX;
//      this.powerUpy =  this.powerupArray[this.powerupIx].puY;
//     // rune.display.Sprite.call(this, this.powerUpx,  this.powerUpy, 16, 16, "star" );
//        // rune.display.Sprite.call(this, this.powerupArray[0].puX,  this.powerupArray[0].puY, 16, 16, "star" );
//     } else if (this.powerupArray[1]){
//        // console.log( this.powerupArray[0].puX)
     
//         this.powerUpx =  this.powerupArray[1].puX + 15;
//         this.powerUpy =  this.powerupArray[1].puY;
        
//         // rune.display.Sprite.call(this, this.powerupArray[0].puX + 15,  this.powerupArray[0].puY, 16, 16, "star" );
//      } 
     
//      rune.display.Sprite.call(this, this.powerUpx,  this.powerUpy, 16, 16, "star" );
//     //  if (this.powerupArray[2]){
//     //    // console.log( this.powerupArray[0].puX)
//     //    rune.display.Sprite.call(this, this.powerUpx,  this.powerUpy, 16, 16, "star" );
//     //     this.powerUpx = this.powerupArray[0].puX + 30;
//     //     this.powerUpy = this.powerupArray[0].puY;
//     //   //  rune.display.Sprite.call(this, this.powerUpx,  this.powerUpy, 16, 16, "star" );
//     // }
//      rune.display.Sprite.call(this, this.powerUpx,  this.powerUpy, 16, 16, "star" );

   
    // this.hitTestAndSeparate(this.game.player2)
    // this.hitTestAndSeparate(this.game.player)
    // if (this.hitTestAndSeparate(this.game.player2)) {
    //     this.velocity.x = 0;
    //     this.velocity.y = 0;
    //     console.log('.-.-.-.') 
    //    return;
      
        
    //   }
    // this.hitTestAndSeparate()
    
};

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.PowerupCounter.prototype.dispose = function() {
    console.log('PowerupCounter is disposed')
    rune.display.Sprite.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------
