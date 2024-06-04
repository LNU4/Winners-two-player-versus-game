//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new instance of the Main class.
 *
 * @constructor
 * 
 * @class
 * @classdesc
 * 
 * Entry point class.
 */
Winners.system.Main = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend (Rune) Application.
     */
    rune.system.Application.call(this, {
        developer: "se.lnu",
        app: "Winners",
        build: "1.0.0",
        scene: Winners.scene.Menu,
        resources: Winners.data.Requests,
        useGamepads:true,
        useKeyboard:true,
        framerate: 30,
        debug: true,
        screenResolutionX: 1280, 
        screenResolutionY: 720
    });
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.system.Main.prototype = Object.create(rune.system.Application.prototype);
Winners.system.Main.prototype.constructor = Winners.system.Main;