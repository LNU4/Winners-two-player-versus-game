//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * Creates a new Requests object.
 * 
 * @constructor
 * @extends rune.resource.Requests
 * 
 * @class
 * @classdesc
 * 
 * This class includes (bakes) resource files used by the application. A 
 * resource file is made available by reference (URI) or base64-encoded string. 
 * Tip: Use Rune-tools to easily bake resource files into this class.
 */
Winners.data.Requests = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend rune.resource.Requests
     */
    rune.resource.Requests.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.data.Requests.prototype = Object.create(rune.resource.Requests.prototype);
Winners.data.Requests.prototype.constructor = Winners.data.Requests;

//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
Winners.data.Requests.prototype.m_construct = function() {
    rune.resource.Requests.prototype.m_construct.call(this);
    this.add("background", "./../asset/png/background.png");
	this.add("base", "./../asset/png/base.png");
	this.add("Baseprotection", "./../asset/png/Baseprotection.png");
	this.add("credits", "./../asset/png/credits.png");
	this.add("heart", "./../asset/png/heart.png");
	this.add("heavysoldier", "./../asset/png/heavysoldier.png");
	this.add("howtoplay", "./../asset/png/howtoplay.png");
	this.add("mainbackground", "./../asset/png/mainbackground.png");
	this.add("New Piskel-4", "./../asset/png/New Piskel-4.png");
	this.add("powerUp", "./../asset/png/powerUp.png");
	this.add("repairsoldier", "./../asset/png/repairsoldier.png");
	this.add("resizedtank", "./../asset/png/resizedtank.png");
	this.add("rocket", "./../asset/png/rocket.png");
	this.add("rocketsoldier", "./../asset/png/rocketsoldier.png");
	this.add("snipersoldier", "./../asset/png/snipersoldier.png");
	this.add("soldier", "./../asset/png/soldier.png");
	this.add("star", "./../asset/png/star.png");
	this.add("tank-reworked", "./../asset/png/tank-reworked.png");
	this.add("Truck", "./../asset/png/Truck.png");
	this.add("turret-remake", "./../asset/png/turret-remake.png");
	this.add("chaos", "./../asset/wav/chaos.mp3");
	this.add("fire1", "./../asset/wav/fire1.wav");
	this.add("powerupSound", "./../asset/wav/powerupSound.wav");
	this.add("respwan1", "./../asset/wav/respwan1.wav");
};