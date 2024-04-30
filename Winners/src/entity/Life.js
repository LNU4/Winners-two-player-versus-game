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
        // console.log(this.player)
        this.ix = ix;
        // console.log(this.ix)
        // this.value = 100
        this.x = 0;
        this.y = 0;
        this.value = 0;
        //this.hp = null; 
    //*** */
        //  this.hp = new Winners.entity.Hps(this, this.player.parent, this.player)
        // console.log(this.player.parent.numChildren)
        // this.player.parent.addChildAt(/*this.hp,*/ 2);
       /*** */
        //  console.log(this.player.numChildren)
        //  console.log(this.player.parent.numChildren)
       
     
         

      //--------------------------------------------------------------------------
      // Super call
      //--------------------------------------------------------------------------
       
      /**
       * Calls the constructor method of the super class.
       */
      rune.display.Sprite.call(this,this.x, this.y, 16,16, "heart");
    //  console.log(this.ix)
     this.player.parent.addChild(this)
    //  console.log( 'player x',this.player.centerX,'player  Gx',this.player.globalX, )
    //  console.log('life x', this.globalX)

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
            // console.log('YOUR INDEX IS 0')
            // this.globalX = this.player.globalX;
            // this.globalY = this.player.globalY;
            this.x = 5;
            this.y = 25;
            
         }
         else if (this.ix === 1){
            this.value = 100
            // console.log('YOUR INDEX IS 1')
            // this.globalX = this.player.globalX;
            // this.globalY = this.player.globalY;
            this.x = 20;
            this.y = 25;
         }
         else if (this.ix === 2){
            this.value = 100
            // this.globalX = this.player.globalX;
            // this.globalY = this.player.globalY;
            // console.log('YOUR INDEX IS 3')
            this.x = 35;
            this.y = 25;
            
         }
         //console.log(this.player.livesArr)
        // console.log(this.x, this.y)
         
     
    };

Winners.entity.Life.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Life.prototype.constructor = Winners.entity.Life;

Winners.entity.Life.prototype.init = function () {
    // if (){
    //     console.log('...')
    // }
}

Winners.entity.Life.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);
};
