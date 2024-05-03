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
    this.add("100hp", "./../asset/png/100hp.png");
	this.add("background", "./../asset/png/background.png");
	this.add("base", "./../asset/png/base.png");
	this.add("Baseprotection", "./../asset/png/Baseprotection.png");
	this.add("heart", "./../asset/png/heart.png");
	this.add("resizedtank", "./../asset/png/resizedtank.png");
	this.add("soldiers", "./../asset/png/soldiers.png");
	this.add("star", "./../asset/png/star.png");
	this.add("tank-frames-raw", "./../asset/png/tank-frames-raw.png");
	this.add("tank-reworked", "./../asset/png/tank-reworked.png");
	this.add("torret", "./../asset/png/torret.png");
	this.add("Truck", "./../asset/png/Truck.png");
	this.add("turret-remake", "./../asset/png/turret-remake.png");
	this.add("winner-mainchar", "./../asset/png/winner-mainchar.png");
	this.add("winners-bg", "./../asset/png/winners-bg.png");
};