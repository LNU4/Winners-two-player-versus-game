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
Winners.entity.Life = function (player, ix, cordOb) {
  /**
   *
   */
      this.player = player;

      this.ix = ix;
      this.cordOb = cordOb;
      
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
  
   this.player.parent.addChild(this)

   /**
    * ****** THESE LINES SJOULD BE MOVED INTO init() ******
    */


       if (this.ix === 0){
          this.value = 100
         
        // this.hp = new rune.ui.Progressbar(16, 16, "#ffff00", "#ff00ff"); 
       // this.hp = new Winners.entity.Hps(this, this.player.parent, this.player)
      this.hp = new  Winners.entity.Hps(this, this.player.parent, this.player);
      // console.log(this.player.parent.numChildren)
   
    //   this.hp.m_x = this.player.x;
    //   this.hp.m_y = this.player.y;

     //this.player.parent.addChild(this.hp);
    //console.log(this.player.parent.numChildren)
     //  this.player.parent.addChildAt(this.hp, 2);
     /*** */
 
          this.x = cordOb.lifeX;
          this.y = cordOb.lifeY;
          
       }
       else if (this.ix === 1){
          this.value = 100
          this.x = cordOb.lifeX + 15;
          this.y = cordOb.lifeY;
         
       }
       else if (this.ix === 2){
          this.value = 100
          this.x = cordOb.lifeX + 30;
          this.y = cordOb.lifeY;
         
       }
       
     
       
   
  };

Winners.entity.Life.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Life.prototype.constructor = Winners.entity.Life;

Winners.entity.Life.prototype.init = function () {

}
Winners.entity.Life.prototype.update = function (step) {
 rune.display.Sprite.prototype.update.call(this, step);
 //this.hp.m_x = this.player.x;
 // this.hp.m_y = this.player.y;

};
Winners.entity.Life.prototype.dispose = function () {
rune.display.Sprite.prototype.dispose.call(this);
};
