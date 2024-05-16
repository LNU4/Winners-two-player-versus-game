//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.DisplayObject
 *
 * @param {number} x ...
 * @param {number} y ...
 *
 * @class
 * @classdesc
 * 
 * Represents a bullet.
 */
Winners.entity.Bullet = function(game,layer0, bulletOwner, bulletTarget, bullets ,x, y) {

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * The amount of damage the bullet causes.
     *
     * @type {number}
     * @default 20
     */

   
    this.damage = 5.0;

    this.game = game;
    console.log(this.game)
   
    this.layer0 = layer0;

    this.bulletOwner = bulletOwner;
    this.bulletTarget = bulletTarget;

    this.baseOwner = this.bulletOwner.playerBase;
    this.bullets = bullets;    

    this.baseTarget = this.bulletTarget.enemyBase; 
    this.respawn = this.bullets.application.sounds.sound.get("respwan1");
  

    // this.baseOwner = baseOwner;
    // this.baseTarget = baseTarget; 
    
    //this.baseTarget.debug = true;
  
 

    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------

    /**
     * The speed of the bullet.
     *
     * @type {number}
     * @protected
     */
    this.m_speed = 1;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.display.DisplayObject.call(this, x, y, 6, 6);
    this.backgroundColor = "#FFA500";
    this.movable = true;
   
};

//------------------------------------------------------------------------------
//  Inheritance
//------------------------------------------------------------------------------

Winners.entity.Bullet.prototype = Object.create(rune.display.DisplayObject.prototype);
Winners.entity.Bullet.prototype.constructor = Winners.entity.Bullet;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/** 
 * @inheritDoc
 */
Winners.entity.Bullet.prototype.update = function(step) {
    rune.display.DisplayObject.prototype.update.call(this, step);
    if (this.game.Player1isDefeated || this.game.Player2isDefeated) {
       this.bulletTarget.lifeIx = 0; 
    };
    console.log(this.damage);
   
    if(this.hitTest(this.bulletTarget)){

       
        this.layer0.removeChild(this);




        var actualLife = this.bulletTarget.livesArr[this.bulletTarget.lifeIx];
       
        var actualLifeHpOb = actualLife.hp;

        

        actualLife.value -= this.damage;

        
        if ( this.bulletTarget.lifeIx === 2 && actualLife.value <= 0){
           console.log('rip');
           this.bulletTarget.parent.removeChild(this.bulletTarget.livesArr[2])
         this.bulletTarget.parent.removeChild(actualLifeHpOb);
        //this.bulletOwner.parent.removeChild(this.bulletTarget);
          
       // console.log(this.game.Player1isDefeated); 
        if (this.bulletTarget === this.game.player) {
          //  this.handePlayerDead = true;
            this.game.handePlayerDead("player1");
        } else if (this.bulletTarget === this.game.player2) {
           // this.Player2isDefeated = true; 
            this.game.handePlayerDead("player2");
        }
            // this.application.scenes.load([new Winners.scene.Menu()]);

            // Add a transparent scene or pause the game then add text feedback to ensure that a specific player has won the match. N.A 
        } else if (actualLife.value <= 0){
       
            
            //console.log(this.bulletTarget.parent.removeChild(actualLifeHpOb))
           this.bulletTarget.flicker.start(); 
           
            this.bulletTarget.x = this.bulletTarget.initX;
           
            this.bulletTarget.y = this.bulletTarget.initY;
          
          this.bulletTarget.parent.removeChild(actualLifeHpOb)



          
            this.bulletTarget.parent.removeChild(this.bulletTarget.livesArr[this.bulletTarget.lifeIx])

           

            this.bulletTarget.lifeIx ++
          

            this.bulletTarget.livesArr[this.bulletTarget.lifeIx].hp = new Winners.entity.Hps(this.bulletTarget.livesArr[this.bulletTarget.lifeIx], this.stage, this.bulletTarget);

            this.bulletTarget.parent.addChildAt( this.bulletTarget.livesArr[this.bulletTarget.lifeIx].hp, 2)
            this.respawn.play(true);
         // this.respawn(actualLifeHpOb)
           
        } else if (actualLife.value == 80){
            rune.display.DisplayObject.call(actualLifeHpOb, this.bulletTarget.x, this.bulletTarget.y, 20, 10);
            actualLifeHpOb.backgroundColor = "#3dfc03"
        }
        else if (actualLife.value == 60){
            
            rune.display.DisplayObject.call(actualLifeHpOb, this.bulletTarget.x, this.bulletTarget.y, 15, 10);
            actualLifeHpOb.backgroundColor = "#c2fc03"
        }
        else if (actualLife.value == 40){

            rune.display.DisplayObject.call(actualLifeHpOb, this.bulletTarget.x, this.bulletTarget.y, 10, 10);
            actualLifeHpOb.backgroundColor = "#fcad03"
        }
        else if (actualLife.value == 20){
            rune.display.DisplayObject.call(actualLifeHpOb, this.bulletTarget.x, this.bulletTarget.y, 5, 10);
            actualLifeHpOb.backgroundColor = "#fc0303"
        }


       
    }
  
    if (this.bulletTarget.playerBaseShield) {
        if (this.hitTest(this.bulletTarget.playerBaseShield)){
            console.log('.-.-.-')
    
            this.layer0.removeChild(this);
            console.log(this.bulletTarget.playerBaseShield)
    
            this.bulletTarget.playerBaseShield.hpValue -= 200;
            console.log(this.bulletTarget.playerBaseShield.hpValue)
        } else if (this.bulletTarget.playerBaseShield.hpValue == 0){
           // this.bulletTarget.playerBaseShield.dispose();
          //  rune.display.Sprite.prototype.dispose.call(this.bulletTarget.playerBaseShield);
         
           this.layer0.removeChild(this.bulletTarget.playerBaseShield, true);
           this.bulletTarget.playerBaseShield = null; 
           //this.bulletTarget.playerBaseShield = null;
           // console.log('cant dispose')
           
          // this.bulletTarget.playerBaseShield.dispose();
         
            
        } /*else if (this.bulletTarget.playerBaseShield.hpValue <= -1000){
            // **** SILVER TAPE ***
            this.layer0.removeChild(this.baseTarget)
          
             
             
         }
         */ 
    }
 
    // if (this.hitTest(this.baseTarget)){  ***
    //     console.log(this.baseTarget)
    //     this.layer0.removeChild(this);
    //     this.baseTarget.HPValue -= 200;
    //     console.log(this.baseTarget.HPValue)
    //     console.log(this.bulletTarget)

    // } else if (this.baseTarget.HPValue <= 0){
        
    //     this.layer0.removeChild(this.baseTarget)
        

    // } ***


 if  (this.bulletOwner.enemyBase) {
 console.log(',.,.,.,')
    if (this.bulletOwner.bullets.bullet.hitTestAndSeparate(this.bulletOwner.enemyBase)){
        console.log(this.bulletOwner.enemyBase)
        this.layer0.removeChild(this);
       // baseTarget console.log(this.bulletTarget.parent.numChildren)
       this.bulletOwner.enemyBase.HPValue -= 200;
       console.log(this.bulletOwner.enemyBase.HPValue)

        //console.log(this.baseTarget.HPValue)
    } else if (this.bulletOwner.enemyBase.HPValue == 0){
        //console.log(this.bulletTarget.parent.numChildren)
        this.layer0.removeChild(this.bulletOwner.enemyBase)
       // console.log('done, powerUp')

    }
} else {
    // console.log( 'soldeirs dont have to shoot the enemyBase that is why they dont have - enemyBase- as a proprety' )
} 

    // if (this.hitTest(this.baseTarget)){
    //     this.layer0.removeChild(this);
    //    // baseTarget console.log(this.bulletTarget.parent.numChildren)
    //     this.baseTarget.HPValue -= 200;
    //     //console.log(this.baseTarget.HPValue)
    // } else if (this.baseTarget.HPValue <= 0){
    //     //console.log(this.bulletTarget.parent.numChildren)
    //     this.layer0.removeChild(this.baseTarget)
    //    // console.log('done, powerUp')

    // }



    if (this.game.truck) {
      
        // if ( this.bulletOwner.bullets.bullet.hitTest(this.game.truck)){
        //     console.log(' hit truck') 
        //     this.layer0.removeChild(this.game.truck);
        // }
        if (this.game.truck.soldier){
           
          // console.log( ".-. ",this.bulletOwner, "-.- ", this.bulletTarget, '...', this.game.truck.soldier.enemy)
        if (this.game.truck.soldier.enemy == this.bulletOwner){
         //console.log(this.game.truck.soldier.enemy)
         for (var i = 0; i < 3; i++ ){
            if ( this.bulletOwner.bullets.bullet.hitTest(this.game.truck.soldierArr[i])) {

                 this.game.layer0.removeChild(this);
                  this.game.layer0.removeChild(this.game.truck.soldierArr[i])
                  this.game.truck.soldierArr[i].createPowerups();
                  this.game.truck.soldierArr[i].dispose()
                    console.log('soldier', i, 'is removed')
            }

         }
            // if ( this.bulletOwner.bullets.bullet.hitTest(this.game.truck.soldierArr[0])  ) {
             
            //      this.game.layer0.removeChild(this);
            //      this.game.layer0.removeChild(this.game.truck.soldierArr[0])
            //      this.game.truck.soldierArr[0].createPowerups();
            //      this.game.truck.soldierArr[0].dispose()
            // } else if (this.bulletOwner.bullets.bullet.hitTest(this.game.truck.soldierArr[1])){
            //     this.game.layer0.removeChild(this);
            //     this.game.layer0.removeChild(this.game.truck.soldierArr[1])
            //     this.game.truck.soldierArr[1].createPowerups();

            // } else if (this.bulletOwner.bullets.bullet.hitTest(this.game.truck.soldierArr[2])){
            //     this.game.layer0.removeChild(this);
            //     this.game.layer0.removeChild(this.game.truck.soldierArr[2])
            //     this.game.truck.soldierArr[2].createPowerups();
            // }
       
            
             }

   /* if (this.game.truck) {
      
        // if ( this.bulletOwner.bullets.bullet.hitTest(this.game.truck)){
        //     console.log(' hit truck') 
        //     this.layer0.removeChild(this.game.truck);
        // }
        if (this.game.truck.soldier){
           
          // console.log( ".-. ",this.bulletOwner, "-.- ", this.bulletTarget, '...', this.game.truck.soldier.enemy)
        if (this.game.truck.soldier.enemy == this.bulletOwner){
         //console.log(this.game.truck.soldier.enemy)
            if ( this.bulletOwner.bullets.bullet.hitTest(this.game.truck.soldierArr[0])  ) {
             
                 this.game.layer0.removeChild(this);
                 this.game.layer0.removeChild(this.game.truck.soldierArr[0])
                 this.game.truck.soldierArr[0].createPowerups();
                 this.game.truck.soldierArr[0].dispose()
            } else if (this.bulletOwner.bullets.bullet.hitTest(this.game.truck.soldierArr[1])){
                this.game.layer0.removeChild(this);
                this.game.layer0.removeChild(this.game.truck.soldierArr[1])
                this.game.truck.soldierArr[1].createPowerups();

            } else if (this.bulletOwner.bullets.bullet.hitTest(this.game.truck.soldierArr[2])){
                this.game.layer0.removeChild(this);
                this.game.layer0.removeChild(this.game.truck.soldierArr[2])
                this.game.truck.soldierArr[2].createPowerups();
            }
       
            
             }*/

    } 
    

}
if (this.game.truck2) {

    // if ( this.bulletOwner.bullets.bullet.hitTest(this.game.truck2)){
    //     console.log(' hit truck') 
    //     this.layer0.removeChild(this.game.truck2);
    // }
      
    if (this.game.truck2.soldier){
       
      // console.log( ".-. ",this.bulletOwner, "-.- ", this.bulletTarget, '...', this.game.truck2.soldier.enemy)
    if (this.game.truck2.soldier.enemy == this.bulletOwner){
     //console.log(this.game.truck2.soldier.enemy)

     for (var i = 0; i < 3; i++ ){
        if ( this.bulletOwner.bullets.bullet.hitTest(this.game.truck2.soldierArr[i])) {

             this.game.layer0.removeChild(this);
              this.game.layer0.removeChild(this.game.truck2.soldierArr[i])
              this.game.truck2.soldierArr[i].createPowerups();
              this.game.truck2.soldierArr[i].dispose()
                console.log('soldier', i, 'is removed')
        }

     }
       /* if ( this.bulletOwner.bullets.bullet.hitTest(this.game.truck2.soldierArr[0])  ) {
         
             this.game.layer0.removeChild(this);
             this.game.layer0.removeChild(this.game.truck2.soldierArr[0])
             this.game.truck2.soldierArr[0].createPowerups();

        } else if (this.bulletOwner.bullets.bullet.hitTest(this.game.truck2.soldierArr[1])){
            this.game.layer0.removeChild(this);
            this.game.layer0.removeChild(this.game.truck2.soldierArr[1])
            this.game.truck2.soldierArr[1].createPowerups();
        } else if (this.bulletOwner.bullets.bullet.hitTest(this.game.truck2.soldierArr[2])){
            this.game.layer0.removeChild(this);
            this.game.layer0.removeChild(this.game.truck2.soldierArr[2])
            this.game.truck2.soldierArr[2].createPowerups();
        }*/
   
        
         }

} 
// else {
//     return 
// }

}
//  else {
//     return 
// }
    // if (this.game.truck.soldier.enemy === this.bulletTarget){

    //     console.log(this.game.truck.soldier.enemy)
    // }
    this.m_updateMotion(step);
  

};


Winners.entity.Bullet.prototype.respawn = function(actualLifeHpOb) {
 console.log(this)
    this.layer0.removeChild(actualLifeHpOb)

    this.layer0.removeChild(this.bulletTarget.livesArr[this.bulletTarget.lifeIx])

           

    this.bulletTarget.lifeIx ++
  

    this.bulletTarget.livesArr[this.bulletTarget.lifeIx].hp = new Winners.entity.Hps(this.bulletTarget.livesArr[this.bulletTarget.lifeIx], this.stage, this.bulletTarget);

    this.bulletTarget.parent.addChildAt( this.bulletTarget.livesArr[this.bulletTarget.lifeIx].hp, 2)
   this.bulletTarget.parent.removeChild(this.bulletTarget)
    this.game.timers.create({
        duration: 3000,
        onComplete: function (){
            this.layer0.addChild(target)
            target.flicker.start();
            target.x  = this.bulletTarget.initX;
            target.y =  this.bulletTarget.initY;
           
        }
    })

     // this.bulletTarget.x = this.bulletTarget.initX;
           
            // this.bulletTarget.y = this.bulletTarget.initY;
  


};
//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Calculates movement.
 *
 * @param {number} step ...
 *
 * @return {undefined}
 * @private
 */
 Winners.entity.Bullet.prototype.m_updateMotion = function(step) {
    this.velocity.x += Math.cos(rune.util.Math.degreesToRadians(this.rotation)) * this.m_speed;
    this.velocity.y += Math.sin(rune.util.Math.degreesToRadians(this.rotation)) * this.m_speed;


};

