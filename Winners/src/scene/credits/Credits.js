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
Winners.scene.Credits = function () {
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  /**
   * Calls the constructor method of the super class.
   */
  rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.scene.Credits.prototype = Object.create(rune.scene.Scene.prototype);
Winners.scene.Credits.prototype.constructor = Winners.scene.Credits;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated.
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
Winners.scene.Credits.prototype.init = function () {
  rune.scene.Scene.prototype.init.call(this);
  /**
   * initialize a new menu and add it to the scene
   */
  this.menu = new rune.ui.VTMenu({ resource: "New Piskel-4" });
  this.bg = new rune.display.Graphic(0, 0, 1280, 720, "credits");
  this.stage.addChild(this.bg);
 
  /**
   * Menu configuration, alternatives 
   */
  this.menu.add("back to main menu");
  this.menu.scaleX = 2;
  this.menu.scaleY = 2;
  this.menu.center = this.application.screen.center;
  this.stage.addChild(this.menu);
  this.selected = 0;
};

/**
 * This method is automatically executed once per "tick". The method is used for
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.scene.Credits.prototype.update = function (step) {
  rune.scene.Scene.prototype.update.call(this, step);
  var gamepad = this.gamepads.get(0);
  
   
  if (this.keyboard.justPressed("UP")) {
    this.menu.up();
    this.selected = (this.selected - 1 + 1) % 1;
  } else if (this.keyboard.justPressed("DOWN")) {
    this.menu.down();
    this.selected = (this.selected + 1 + 1) % 1;
  }

  if (this.keyboard.justPressed("SPACE")|| gamepad.justPressed("0") ) {
    switch (this.selected) {
      case 0:
        this.menu.select();
        this.timers.create({
          duration: 2000,
          onComplete: function () {
            this.application.scenes.load([new Winners.scene.Menu()]);
          },
        });
        break;
      default:
        break;
    }
  }
};

/**
 * This method is automatically called once just before the scene ends. Use
 * the method to reset references and remove objects that no longer need to
 * exist when the scene is destroyed. The process is performed in order to
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
Winners.scene.Credits.prototype.dispose = function () {
  rune.scene.Scene.prototype.dispose.call(this);
};
