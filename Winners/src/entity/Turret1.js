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
Winners.entity.Turret1 = function (x, y, game) {
    /**
     * placeholder to refer to the second player
     */
        this.turret1 = null;
        this.game = game;
      //--------------------------------------------------------------------------
      // Super call
      //--------------------------------------------------------------------------
       
      /**
       * Calls the constructor method of the super class.
       */
      rune.display.Sprite.call(this, x, y, 64, 64, "turret-remake");
    
     
    };
    
    //----------------------------------------------------------------------------
    // Inheritance
    //------------------------------------------------------------------------------
    
    Winners.entity.Turret1.prototype = Object.create(rune.display.Sprite.prototype);
    Winners.entity.Turret1.prototype.constructor = Winners.entity.Turret1;
    
    //------------------------------------------------------------------------------
    // Override public prototype methods (ENGINE)
    //------------------------------------------------------------------------------
    
    /**
     * ...
     *
     * @returns {undefined}
     */
    Winners.entity.Turret1.prototype.init = function () {
      rune.display.Sprite.prototype.init.call(this);
    
     // this.turret = new rune.display.Sprite(0, 0, 64, 64, "turret-remake");
    
    
     
      //this.addChild(this.turret);
    
      this.m_initPhysics();
      this.m_initAnimation();
    };
    
    /**
     * ...
     *
     * @param {number} step Fixed time step.
     *
     * @returns {undefined}
     */
    Winners.entity.Turret1.prototype.update = function (step) {
      rune.display.Sprite.prototype.update.call(this, step);
      //this.m_updateInput();
      this.m_torretRotation();
      
    };
    
    /**
     * ...
     *
     * @returns {undefined}
     */
    Winners.entity.Turret1.prototype.dispose = function () {
      rune.display.Sprite.prototype.dispose.call(this);
    };

    Winners.entity.Turret1.prototype.shotAnimation = function () {
      this.animation.gotoAndPlay("shot");
      
    };
    
    //------------------------------------------------------------------------------
    // Private prototype methods
    //------------------------------------------------------------------------------
    
    /**
     * ...
     *
     * @returns {undefined}
     * @private
     */
    Winners.entity.Turret1.prototype.m_initPhysics = function () {

      this.rotation = 90;
    };
    
    /**
     * ...
     *
     * @returns {undefined}
     * @private
     */
    
    Winners.entity.Turret1.prototype.m_initAnimation = function () {
      this.animation = new rune.animation.Animation();
      this.animation.create("shot", [0, 2], 2, true);
      
  };
  
  

    /**
     * ...
     *
     * @returns {undefined}
     * @private
     */

    Winners.entity.Turret1.prototype.m_torretRotation = function () {
      var gamepad = this.gamepads.get(0);
    
      if (gamepad.stickRightLeft || this.keyboard.pressed("J")) {
        this.rotation -= 5;
      }
      else if (gamepad.stickRightRight || this.keyboard.pressed("L")) {
        this.rotation += 5;
      }
      else if (gamepad.stickRightUp) {
        this.rotation -= 5;
      }
      else if (gamepad.stickRightDown) {
        this.rotation += 5;
      }

      /*
      if ( gamepad.pressed(7)) {
        this.shoot();
      }
     */
    };
    
   