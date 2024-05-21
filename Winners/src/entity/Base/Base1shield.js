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
Winners.entity.Base1shield = function(x, y, game) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    this.game  = game;
    this.hpValue = 1000;
    /**
     * Calls the constructor method of the super class.
     */
    rune.display.Sprite.call(this, x, y, 64, 64, "Baseprotection");
   
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.Base1shield.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Base1shield.prototype.constructor = Winners.entity.Base1shield;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Base1shield.prototype.init = function() {
    rune.display.Sprite.prototype.init.call(this);
    this.immovable = true
    this.rotation = (-90); 
    this.texture.replaceColor (
        new rune.color.Color24(86, 85, 88),
        new rune.color.Color24(172, 50, 50)
    );

    // this.animation.create("0", [0], 1, true);
    // this.animation.create("1", [1], 1, true);
    // this.animation.create("2", [2], 1, true);
    // this.animation.create("3", [3], 1, true);
    // this.animation.create("4", [4], 1, true);

    // this.animation.gotoAndStop("4");
};

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Base1shield.prototype.update = function(step) {
    rune.display.Sprite.prototype.update.call(this, step);
    this.hitTestAndSeparate(this.game.player2);
    this.hitTestAndSeparate(this.game.player);
};

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Base1shield.prototype.dispose = function() {
    rune.display.Sprite.prototype.dispose.call(this);
    console.log('player1 baseShild is disposed')
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------



