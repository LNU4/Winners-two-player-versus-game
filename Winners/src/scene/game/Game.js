//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * Game scene.
 */
Winners.scene.Game = function() {
    
    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------
    
    /**
     * ...
     *
     * @type {Winners.scene.Player}
     * @type {Winners.scene.Player2}
     */
    //this.player = null;
   // this.player2 = null;
  
    //--------------------------------------------------------------------------    
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Calls the constructor method of the super class.
     */
    rune.scene.Scene.call(this);
    console.log(this.application);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.scene.Game.prototype = Object.create(rune.scene.Scene.prototype);
Winners.scene.Game.prototype.constructor = Winners.scene.Game;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
Winners.scene.Game.prototype.init = function() {
    rune.scene.Scene.prototype.init.call(this);

    this.bg = new rune.display.Graphic(0,0,1280,720,"background");
    this.layer0 = new rune.display.DisplayObjectContainer(0,0, 1280, 720);
    this.layer1 = new rune.display.DisplayObjectContainer(0,0, 1280, 720);
    this.layer2 = new rune.display.DisplayObjectContainer(0,0, 1280, 720);
    
    
    this.stage.addChild(this.layer0);
    this.stage.addChild(this.layer1);
    this.stage.addChild(this.layer2); 
    
   

    this.turret1 = new Winners.entity.Turret1(70, 345.5);
    this.layer2.addChild(this.turret1);

    this.turret2 = new Winners.entity.Turret2(1150, 345.5, this.layer0, this.player);


    this.base = new Winners.entity.Base(10, 345.5);
    this.base2 = new Winners.entity.Base2(1220, 345.5);

    this.player = new Winners.entity.Player(80, 345.5, this.turret1, this.layer0, this.base, this.base2); 
    this.player2 = new Winners.entity.Player2(1140, 345.5, this.layer0, this.turret2, this.player, this.base2, this.base);
    this.player.player2 = this.player2;
   
   // this.Soldiers = new Winners.entity.Soldiers(350, 360, this.player2, this.layer0, this);


    this.base = new Winners.entity.Base(10, 359.5);
    this.base2 = new Winners.entity.Base2(1240, 359.5);


    var camera = this.cameras.getCameraAt(0);
    //camera.addChild(smth);

   //this.truck = null;
    this.timers.create({
        duration: 4000,
        onComplete: function(){

            this.createTruck();
            // this.pb = new rune.ui.Progressbar (100, 25, "#ffff00", "#ff00ff");
            // this.layer0.addChild(this.pb);
            // this.pb.m_x = 1100;
            // this.pb.m_y = 600;
           
            // var randomY = Math.random() * 720; 
            //  this.truck = new Winners.entity.Truck(-100, randomY,this.player, this.player2, this.layer0, this)
            // this.stage.addChild(this.truck)
            


       //     console.log(this.stage.numChildren);
         //   console.log('.-.-.')
       }
    });

    // var timeInMs = 2000;
   
    // var timer = new rune.timer.TimerOptions({duration: timeInMs});
    

    // timer.onComplete = function (){
    //     console.log('.-.-.')
    // }


    this.Base1shield = new Winners.entity.Base1shield(5, 344.5); 
    this.Base2shield = new Winners.entity.Base2shield(1210, 344.5);


  //  this.hp2 = new Winners.entity.Hps(300, 300);
   // this.player2.hp = this.hp2;
    
   // console.log(this.hp2)
   // this.layer0.addChild(this.hp2);

    this.layer0.addChild(this.bg);
    this.layer0.addChild(this.player);
    this.layer0.addChild(this.player2);
    this.layer0.addChild(this.base);
    this.layer0.addChild(this.base2);
   // this.layer0.addChild(this.Soldiers);
    this.layer2.addChild(this.turret2);
    this.layer0.addChild(this.Base1shield);
    this.layer0.addChild(this.Base2shield);


};
Winners.scene.Game.prototype.createTruck = function (){

    var randomY = Math.random() * 720; 
    this.truck = new Winners.entity.Truck(-100, randomY,this.player, this.player2, this.layer0, this)
   this.stage.addChild(this.truck)
   if (this.player2.hitTest(this.truck.soldier)){
    console.log(this.player2.soldierHit)
    this.player2.soldierHit ++
    console.log(this.player2.soldierHit)
}
}
/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.scene.Game.prototype.update = function(step) {
    var self = this;
    rune.scene.Scene.prototype.update.call(this, step);
    this.m_updateInput(step);

    this.turret1.x = this.player.x; 
    this.turret1.y = this.player.y;

    this.turret2.x = this.player2.x; 
    this.turret2.y = this.player2.y;
    this.timers.create({
            duration: 4000,
            onComplete: function(){
    // if (this.truck.soldier.isDead){
    //    // this.truck.deadSoldiers; 
    //    // console.log(this)
    // }
}});

    // this.timers.create({
    //     duration: 15000,
    //     onComplete: function(){

    //     //this.soldierHit();
    //     this.truck.soldierArr.forEach(function (soldierElem){

    //         if (self.player2.hitTest(self.truck.soldier)){
    //             console.log(self.player2.soldierHit)
               
    //          ++self.player2.soldierHit 

    //           console.log(self.player2.soldierHit)

    //           return self.player2.soldierHit
             
    //         }
    //     } 
            
    //     );
            // if (this.player2.hitTest(this.truck.soldier)){
            //     console.log(this.player2.soldierHit)
               
            //  ++this.player2.soldierHit 

            //   console.log(this.player2.soldierHit)

            //   return this.player2.soldierHit
             
            // }
           
    //    }
    // });
   //console.log(this.player2.soldierHit)
 

   
    
};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
Winners.scene.Game.prototype.dispose = function() {
    rune.scene.Scene.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.scene.Game.prototype.m_updateInput = function(step) {
    if (this.keyboard.justPressed("SPACE")) {

        this.application.scenes.load([new Winners.scene.Menu()]);
    }

    if (this.player2.hitTestAndSeparate(this.player) && this.player.hitTestAndSeparate(this.player2)){
       // var effect = new Winners.entity.Effect(this.player.globalX, this.player.globalY);
        //this.stage.addChild(effect);
        //this.player2.elasticity = 0,25;
        // console.log('hit');
        //this.player.debug();
       }
    
    //    else if (this.Soldiers.hitTestAndSeparate(this.player2)) {
    //     this.layer0.removeChild(this.Soldiers)
       
    //    }
    
}; 