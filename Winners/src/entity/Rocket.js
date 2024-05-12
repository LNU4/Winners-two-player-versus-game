Winners.entity.Rocket = function(game, layer0, bulletOwner, bulletTarget, bullets, x, y) {
    this.game = game;
    this.damage = 20;
    this.layer0 = layer0;
    this.bulletOwner = bulletOwner;
    this.bulletTarget = bulletTarget;
    this.bullets = bullets;

    rune.display.Sprite.call(this, x, y, 16, 16, "100hp");

    this.m_speed = 6;

   

    
    //this.Nasseryelling = this.application.sounds.sound.get("rocket");
};

Winners.entity.Rocket.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Rocket.prototype.constructor = Winners.entity.Rocket;

Winners.entity.Rocket.prototype.update = function(step) {
    rune.display.Sprite.prototype.update.call(this, step);

    
    this.x += Math.cos(rune.util.Math.degreesToRadians(this.rotation)) * this.m_speed;
    this.y += Math.sin(rune.util.Math.degreesToRadians(this.rotation)) * this.m_speed;

    
    if (this.hitTest(this.bulletTarget)) {
        this.layer0.removeChild(this);




        var actualLife = this.bulletTarget.livesArr[this.bulletTarget.lifeIx];
       
        var actualLifeHpOb = actualLife.hp;

        

        actualLife.value -= this.damage;

        
        if ( this.bulletTarget.lifeIx === 2 && actualLife.value <= 0){
           
         this.bulletTarget.parent.removeChild(this.bulletTarget.livesArr[2]);

         this.bulletTarget.parent.removeChild(actualLifeHpOb);
        //this.bulletOwner.parent.removeChild(this.bulletTarget);
            
           
           //  console.log('GAME OVER')
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
            
        
           
        } else if (actualLife.value == 80){
            rune.display.DisplayObject.call(actualLifeHpOb, this.bulletTarget.x, this.bulletTarget.y, 20, 10);
            actualLifeHpOb.backgroundColor = "#0000FF"
        }
        else if (actualLife.value == 60){
            
            rune.display.DisplayObject.call(actualLifeHpOb, this.bulletTarget.x, this.bulletTarget.y, 15, 10);
            actualLifeHpOb.backgroundColor = "#800080"
        }
        else if (actualLife.value == 40){

            rune.display.DisplayObject.call(actualLifeHpOb, this.bulletTarget.x, this.bulletTarget.y, 10, 10);
            actualLifeHpOb.backgroundColor = "#FFA500"
        }
        else if (actualLife.value == 20){
            rune.display.DisplayObject.call(actualLifeHpOb, this.bulletTarget.x, this.bulletTarget.y, 5, 10);
            actualLifeHpOb.backgroundColor = "#FF0000"
        }


    }
};
/*
Winners.entity.Rocket.prototype.init = function() {
   
    this.initAnimation();
};

Winners.entity.Rocket.prototype.dispose = function() {
  
};

Winners.entity.Rocket.prototype.initAnimation = function() {
    
    
};

Winners.entity.Rocket.prototype.updateAnimation = function(step) {
  
    
};

Winners.entity.Rocket.prototype.launch = function() {
   
   
};
*/

