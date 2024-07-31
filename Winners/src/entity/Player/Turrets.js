//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.Sprite
 * 
 * @param {number} x coordinates of where the object will be placed on x axis
 * @param {number} y coordinates of where the object will be placed on y axis
 * @param {object} game the game object
 *
 * @class
 * @classdesc
 *
 * 
 */ 
Winners.entity.Turrets = function (x, y, game) {
 
    /**
     * Reference to the game class
     * @type {object}
     */
    this.game = game;
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
  
    rune.display.Sprite.call(this, x, y, 64, 64, "turret-remake");
  };
  
  //----------------------------------------------------------------------------
  // Inheritance
  //------------------------------------------------------------------------------
  
  Winners.entity.Turrets.prototype = Object.create(rune.display.Sprite.prototype);
  Winners.entity.Turrets.prototype.constructor = Winners.entity.Turrets;
  
  //------------------------------------------------------------------------------
  // Override public prototype methods
  //------------------------------------------------------------------------------
  
  /**
   * initialize a turret with the proper color and invoke this.m_initAnimation();
   *
   * @returns {undefined}
   */
  Winners.entity.Turrets.prototype.init = function (color, rotation) {
    rune.display.Sprite.prototype.init.call(this);
  
    this.texture.replaceColor(
      new rune.color.Color24(143, 86, 59),
      color
    );
    this.rotation = rotation;
    this.m_initAnimation();
  };
  
  /**
   * The update method of the turret object, exutes its logic per tick
   *
   * @param {number} step Fixed time step.
   *
   * @returns {undefined}
   */
  Winners.entity.Turrets.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);
    this.m_torretRotation();
  };
  
  /**
   * 
   *  Method to call the inbuilt animation.create method to create animation for idle, shot and done  modes
   * @returns {undefined}
   * @private
   */
  Winners.entity.Turrets.prototype.m_initAnimation = function () {
    this.animation = new rune.animation.Animation();
    this.animation.create("idle", [0], 1, true);
    this.animation.create("shot", [0, 2, 2, 2, 2, 2, 0], 10, false);
    this.animation.create("done", [6, 7, 8, 9, 10, 11], 5, true);
    this.animation.create("dead", [12, 13, 14, 15, 16], 5, true);
  };
  
  /**
   * 
   * Method that handles the turret rotation
   * @returns {undefined}
   * @private
   */
  Winners.entity.Turrets.prototype.m_torretRotation = function (gamepadIndex) {
    // properties to specify the gamepad as a controller
  
    var gamepad = this.gamepads.get(gamepadIndex);
  
    if (gamepad.stickRightLeft || this.keyboard.pressed("J")) {
      
     
     
          // specify on how many degrees to rotate for time the gamepad input is pressed
  
      this.rotation -= 5;
    } else if (gamepad.stickRightRight || this.keyboard.pressed("L")) {
     
     

        this.rotation += 5;
    
   
    
    }
  };
  
  /**
   * This method prepares the turret object to be removed from the memory by the garbage collector
   *
   * @returns {undefined}
   */
  Winners.entity.Turrets.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
  };
  