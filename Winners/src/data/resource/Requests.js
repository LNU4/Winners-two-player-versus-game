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

  this.add("heart", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABQElEQVQ4T6VSO1LCQBjOcgLGBlrwAGSEnlgg6anoUsMNxMBChBtgnc6KPmjB0oMTDiC00DiewJhvYWOyuwzMuM2+/v1e/xLjn4OI95PRqP5DCL0NQwtnW9OkPdcdYj32vEE5DCnWn6bJclFEH/v9JfYcAI/v5nN2s99n9Lw7Dn/U8H0+i/FVLBofzaYFEA7w0u1GtSBQzMRs/CxWpdytbNvoTKeEA7y2WpGuCEwYsrKTFaM9mx0B4FGWqVBKB7CHjBKAahBQHZMOCMrWtv0HgKJnz1s8+L51iRn3b47Dnlz3HutMG0ubDdNlkQZFsLtKhXcgA3CtijS7AoD/kD8cmK6lKEbrvguFhF0BwAFAdFZk6cJWkkHaJwKNVViiK0g9Zk+CS9dqAeQ8ZN9XAaAIXxwzvuy59p69EHlgFi3TgfwCtjeWETGY8G4AAAAASUVORK5CYIIA");
    this.add("100hp", "./../asset/png/100hp.png");
	this.add("background", "./../asset/png/background.png");
	this.add("resizedtank", "./../asset/png/resizedtank.png");
	this.add("star", "./../asset/png/star.png");
	this.add("tank-frames-raw", "./../asset/png/tank-frames-raw.png");
	this.add("tank-reworked", "./../asset/png/tank-reworked.png");
	this.add("torret", "./../asset/png/torret.png");
	this.add("turret-remake", "./../asset/png/turret-remake.png");
	this.add("winner-mainchar", "./../asset/png/winner-mainchar.png");
	this.add("winners-bg", "./../asset/png/winners-bg.png");

};