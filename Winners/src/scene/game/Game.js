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
    this.player = null;
    this.player2 = null;
  
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
    this.bg = new rune.display.Graphic(0,0,1280,720,"winners-bg");
    this.player = new Winners.entity.Player(70, 359.5);
    this.player2 = new Winners.entity.Player2(1150, 359.5, this.stage, this.player);
    this.player.player2 = this.player2;
    this.base = new Winners.entity.Base(10, 359.5);
    this.base2 = new Winners.entity.Base2(1220, 359.5);
    //this.hp2 = new Winners.entity.Hps(300, 300);
   // this.player2.hp = this.hp2;
    //console.log(this.hp2)
    
    this.stage.addChild(this.bg);
    this.stage.addChild(this.player);
    this.stage.addChild(this.player2);
    this.stage.addChild(this.base);
    this.stage.addChild(this.base2);
    //this.stage.addChild(this.hp2);

    var camera = this.cameras.getCameraAt(0);
    //camera.addChild(smth);

    this.timers.create({
        duration: 3000,
        onComplete: function(){
            console.log('.-.-.')
        }
    });

    // var timeInMs = 2000;
   
    // var timer = new rune.timer.TimerOptions({duration: timeInMs});
    

    // timer.onComplete = function (){
    //     console.log('.-.-.')
    // }
};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.scene.Game.prototype.update = function(step) {
    rune.scene.Scene.prototype.update.call(this, step);
    this.m_updateInput(step);

    
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

    
}; 