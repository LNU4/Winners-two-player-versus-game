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
Winners.scene.Menu = function () {
 
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

Winners.scene.Menu.prototype = Object.create(rune.scene.Scene.prototype);
Winners.scene.Menu.prototype.constructor = Winners.scene.Menu;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated.
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
Winners.scene.Menu.prototype.init = function () {
  rune.scene.Scene.prototype.init.call(this);

  this.menu = new rune.ui.VTMenu({ resource: "New Piskel-4" });
  this.bg = new rune.display.Sprite(0, 0, 1280, 720, "mainbackground");
  this.stage.addChild(this.bg);
  var text = new rune.text.BitmapField("winners", "New Piskel-4");
  text.autoSize = true;
  text.scaleX = 6;
  text.scaleY = 6;
  text.x = 500;
  text.y = 160;

  this.stage.addChild(text);

  this.menu.add("one round");

  this.menu.add("two rounds");
  this.menu.add("how to play");
  this.menu.add("credits");
  this.menu.add("quit");
  this.menu.scaleX = 2;
  this.menu.scaleY = 2;
  this.menu.center = this.application.screen.center;
  this.stage.addChild(this.menu);
  this.selected = 0;
  /**
   * Property calling the builtin method for reading audio files
   * @type {media.Sound}
   */
  //this.backgroundMusic = this.application.sounds.sound.get("epic-cinematic-sounds-war");
  this.backgroundMusic = this.application.sounds.master.get("epic-cinematic-sounds-war");
 this.backgroundMusic.play(true);
  this.backgroundMusic.loop = true;
  this.switchEffect = this.application.sounds.sound.get("switch");
  

  this.m_initAnimation();
};

/**
 * Method for creating animations with the inbuilt create method. The method is used to create the animation, it´s frames and frames per second. Lastly it set to loop bolean.
 * @returns {undefined}
 */
Winners.scene.Menu.prototype.m_initAnimation = function () {
  this.bg.animation.create(
    "animation",
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    4,
    true
  );
};
/**
 * This method is automatically executed once per "tick". The method is used for
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.scene.Menu.prototype.update = function (step) {
  rune.scene.Scene.prototype.update.call(this, step);
  /**
   * Referance to the gamepad connected to the application. In this case it´s the first gamepad connected to the application.
   */
  var gamepad = this.gamepads.get(0);

  if (this.keyboard.justPressed("UP") || gamepad.stickLeftJustUp) {
    this.switchEffect.play(true);

    this.menu.up();
    this.selected = (this.selected - 1 + 5) % 5;
  } else if (this.keyboard.justPressed("DOWN") || gamepad.stickLeftJustDown) {
    this.switchEffect.play(true);

    this.menu.down();
    this.selected = (this.selected + 1) % 5;
  }

  if (this.keyboard.justPressed("SPACE") || gamepad.justPressed("0")) {
    switch (this.selected) {
      case 0:
        this.menu.select();
        this.timers.create({
          duration: 2000,
          onComplete: function () {
            this.application.scenes.load([new Winners.scene.Game(1, 1, [])]);
          },
        });
        break;
      case 1:
        this.menu.select();
        this.timers.create({
          duration: 2000,
          onComplete: function () {
            this.backgroundMusic.stop(true);
            this.application.scenes.load([new Winners.scene.Game(2, 1, [])]);
          },
        });
        break;
      case 2:
        this.menu.select();
        this.timers.create({
          duration: 2000,
          onComplete: function () {
            this.application.scenes.load([new Winners.scene.Howtoplay()]);
          },
        });
        break;
      case 3:
        this.menu.select();
        this.timers.create({
          duration: 2000,
          onComplete: function () {
            this.application.scenes.load([new Winners.scene.Credits()]);
          },
        });
        break;
      case 4:
        this.menu.select();
        this.timers.create({
          duration: 2000,
          onComplete: function () {
            this.application.stop();
          },
        });
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
Winners.scene.Menu.prototype.dispose = function () {
  rune.scene.Scene.prototype.dispose.call(this);
};
