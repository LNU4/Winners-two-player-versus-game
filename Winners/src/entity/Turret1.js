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
Winners.entity.Turret1 = function (x, y) {
    /**
     * placeholder to refer to the second player
     */
        this.turret1 = null;
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
      this.animation.create("idle", [0], 1, true);
      this.animation.create("walk", [0, 1], 1, true);
    };
    Winners.entity.Turret1.prototype.shoot = function () {
      this.bullets = new Winners.entity.Bullets(this.stage, this, this.turret1);
      this.application.scenes.selected.groups.add(this.bullets);
      this.bullet = this.bullets.create(this.x, this.y);
      
      
    
      this.bullet.velocity.x = this.velocity.x;
      this.bullet.velocity.y = this.velocity.y;
      this.bullet.globalX = this.velocity.x;
      this.bullet.globalX = this.velocity.x;
      this.bullet.rotation = this.rotation - 90;
      
     console.log("test")
    };
    /**
     * ...
     *
     * @returns {undefined}
     * @private
     */

    Winners.entity.Turret1.prototype.m_torretRotation = function () {
      var gamepad = this.gamepads.get(0);
    
      if (gamepad.stickRightLeft) {
        this.rotation -= 5;
      }
      else if (gamepad.stickRightRight) {
        this.rotation += 5;
      }
      else if (gamepad.stickRightUp) {
        this.rotation -= 5;
      }
      else if (gamepad.stickRightDown) {
        this.rotation += 5;
      }


      if ( gamepad.pressed(7)) {
        this.shoot();
      }
     
    };
    
    