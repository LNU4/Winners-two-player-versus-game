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
	this.add("body", "./../asset/png/body.png");
	this.add("credits", "./../asset/png/credits.png");
	this.add("head", "./../asset/png/head.png");
	this.add("heavysoldier", "./../asset/png/heavysoldier.png");
	this.add("howtoplay-old", "./../asset/png/howtoplay-old.png");
	this.add("howtoplay", "./../asset/png/howtoplay.png");
	this.add("leg", "./../asset/png/leg.png");
	this.add("mainbackground", "./../asset/png/mainbackground.png");
	this.add("New Piskel-4", "./../asset/png/New Piskel-4.png");
	this.add("plate", "./../asset/png/plate.png");
	this.add("powerUp", "./../asset/png/powerUp.png");
	this.add("repairsoldier", "./../asset/png/repairsoldier.png");
	this.add("resizedtank", "./../asset/png/resizedtank.png");
	this.add("rocket", "./../asset/png/rocket.png");
	this.add("rocketsoldier", "./../asset/png/rocketsoldier.png");
	this.add("smokedturret", "./../asset/png/smokedturret.png");
	this.add("snipersoldier", "./../asset/png/snipersoldier.png");
	this.add("soldier", "./../asset/png/soldier.png");
	this.add("spark", "./../asset/png/spark.png");
	this.add("star", "./../asset/png/star.png");
	this.add("tank-reworked", "./../asset/png/tank-reworked.png");
	this.add("Truck", "./../asset/png/Truck.png");
	this.add("turret-remake", "./../asset/png/turret-remake.png");
	this.add("tyre", "./../asset/png/tyre.png");
	this.add("unfilledStar", "./../asset/png/unfilledStar.png");
	this.add("burn", "./../asset/wav/burn.wav");
	this.add("caliber-rifle-shot-with-shell-ping", "./../asset/wav/caliber-rifle-shot-with-shell-ping.mp3");
	this.add("epic-cinematic-sounds-war", "./../asset/wav/epic-cinematic-sounds-war.mp3");
	this.add("explosion", "./../asset/wav/explosion.wav");
	this.add("powerupSound", "./../asset/wav/powerupSound.wav");
	this.add("respwan1", "./../asset/wav/respwan1.wav");
	this.add("rhythm-of-war-main", "./../asset/wav/rhythm-of-war-main.mp3");
	this.add("rocketSound", "./../asset/wav/rocketSound.wav");
	this.add("soldierSpawn", "./../asset/wav/soldierSpawn.wav");
	this.add("switch", "./../asset/wav/switch.wav");
};