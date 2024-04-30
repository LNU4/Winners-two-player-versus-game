/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @class
 * @classdesc
 *
 *
 */
Winners.entity.Life = function (player, ix) {
    /**
     *
     */
        this.player = player;

        this.ix = ix;

        // console.log(this.ix)
        // this.value = 100
        this.x = 0;
        this.y = 0;
        this.value = 0;
        //this.hp = null; 

    //*** */

         

      //--------------------------------------------------------------------------
      // Super call
      //--------------------------------------------------------------------------
       
      /**
       * Calls the constructor method of the super class.
       */
      rune.display.Sprite.call(this,this.x, this.y, 16,16, "heart");
    //  console.log(this.ix)
     this.player.parent.addChild(this)
  
     /**
      * ****** THESE LINES SJOULD BE MOVED INTO init() ******
      */

    // console.log(this.player.parent)
         if (this.ix === 0){
            this.value = 100
             this.hp = new Winners.entity.Hps(this, this.player.parent, this.player)
        // console.log(this.player.parent.numChildren)
         this.player.parent.addChildAt(this.hp, 2);
       /*** */
   
            this.x = 5;
            this.y = 25;
            
         }
         else if (this.ix === 1){
            this.value = 100
    
            this.x = 20;
            this.y = 25;
         }
         else if (this.ix === 2){
            this.value = 100
            
            this.x = 35;
            this.y = 25;
            
         }
       
         
     
    };

Winners.entity.Life.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Life.prototype.constructor = Winners.entity.Life;

Winners.entity.Life.prototype.init = function () {

}

Winners.entity.Life.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);
};
