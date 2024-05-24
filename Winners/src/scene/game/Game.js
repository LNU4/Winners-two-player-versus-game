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
 * @param {number} maxRounds ...
 * @param {number} currentRoundNumber ...
 * @param {string} roundWinners ..
 * 
 * Game scene.
 */
Winners.scene.Game = function (maxRounds, currentRound, roundWinners) {
  //--------------------------------------------------------------------------
  // Public properties
  //--------------------------------------------------------------------------
  /**
   * Index of the max amount of rounds per match
   * 
   * @type {number} 
   */
  
  this.maxRounds = maxRounds;

  /**
   * The number identifying the current round
   * 
   * @type {number} 
   */
  this.currentRound = currentRound;
  /**
   * The winners of the current round
   * 
   * @type {array} 
   */
  this.roundWinners = roundWinners || [];
  /**
   *...
   * Boolean to check if player 1 is defeated
   * @type {boolean}
   */
  this.Player1isDefeated = false;
  /**
   *...
   * Boolean to check if player 2 is defeated
   * @type {boolean}
   */
  this.Player2isDefeated = false;
  
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

Winners.scene.Game.prototype = Object.create(rune.scene.Scene.prototype);
Winners.scene.Game.prototype.constructor = Winners.scene.Game;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated.
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
Winners.scene.Game.prototype.init = function () {
  rune.scene.Scene.prototype.init.call(this);
 /**
  * A property to store the background image
  * @type {Object}
  */
  this.bg = new rune.display.Graphic(0, 0, 1280, 720, "background");
  /**
   * A property to define a container to store certain objects
   * @type {Object}
   */
  this.layer0 = new rune.display.DisplayObjectContainer(0, 0, 1280, 720);
  /**
   * A property to define a container to store certain objects
   * @type {Object}
   */
  this.layer2 = new rune.display.DisplayObjectContainer(0, 0, 1280, 720);
  /**
   * A property to define a container to store certain objects
   * @type {Object}
   */
 this.layer1 = new rune.display.DisplayObjectContainer(0, 0, 1280, 720);

 /**
  * Reference to a DisplayGroup containing all the bullets
  * @type {Object}
  */
  this.bullets = this.groups.add(new Winners.entity.Bullets(this));

  this.stage.addChild(this.layer0);
  this.stage.addChild(this.layer1);
   this.stage.addChild(this.layer2);

 /**
  * The baseShioled to protect the base for player 
  * @type {Object}
  */
  this.Base1shield = new Winners.entity.Base1shield(5, 330.5, this);
  /**
  * The baseShioled to protect the base for player2 
  * @type {Object}
  */
  this.Base2shield = new Winners.entity.Base2shield(1160, 330.5, this);
  /**
  * The base for player 
  * @type {Object}
  */
  this.base = new Winners.entity.Base(10, 360, this);
  /**
  * The base for player2 
  * @type {Object}
  */
  this.base2 = new Winners.entity.Base2(1210, 360, this);
  /**
  * The turret for player 
  * @type {Object}
  */
  this.turret1 = new Winners.entity.Turret1(70, 360, this);
  /**
  * The turret for player2 
  * @type {Object}
  */
  this.turret2 = new Winners.entity.Turret2(1150, 360, this);
  /**
  * The camera object for Game 
  * @type {Object}
  */
  this.camera = this.cameras.getCameraAt(0);
  //camera.addChild(smth);
  /**
   * Property to store the player object
   * @type {Object}
   */
  this.player = new Winners.entity.Player(140, 360, this);
  /**
   * Property to store the player2 object
   * @type {Object}
   */
  this.player2 = new Winners.entity.Player2(1090, 360, this);
  /**
   * Property used as a placeholder for the player2 object for player
   * @type {Object}
   */
  this.player.player2 = this.player2;
 // this.rocketsoldier = new Winners.entity.Rocketsoldier(500, 500, this, this.player2);
 // this.snipersoldiers = new Winners.entity.SniperSodier(10, 10, this, this.player2);
  //  this.repairsoldier = new Winners.entity.Repairsoldier(700, 700, this, this.player2);

  //this.heavysoldiers = new Winners.entity.HeavySoldier(350, 360, this, this.player2);
  /**
   * Property to create an empty array to look after the powerups for player
   * @type {Array}
   */

  this.player.powerupsArray = [];
  /**
   * Property to create an empty array to look after the powerups for player2
   * @type {Array}
   */
  this.player2.powerupsArray = [];
  /**
   * Property used as a counter of the elements in this.player.powerupsArray
   * @type {number}
   */
  this.player.powerupIx = 0;
  /**
   * Property used as a counter  of the elements in this.player2.powerupsArray
   * @type {number}
   */
  this.player2.powerupIx = 0;

  /**
   * Inbuilt functionality to start a timer to create a personal carrier "Truck"
   * @type {Method}
   */

  this.timers.create({
    duration: 4000,
    onComplete: function () {
      this.createTruck();
    },
  });

  this.layer0.addChild(this.bg);
  this.layer0.addChild(this.player);
  this.layer0.addChild(this.player2);
  this.layer0.addChild(this.base);
  this.layer0.addChild(this.base2);

  //this.layer0.addChild(this.heavysoldiers);
  // this.layer0.addChild(this.snipersoldiers);
  //this.layer0.addChild(this.rocketsoldier);
  //this.layer0.addChild(this.repairsoldier);
  this.layer1.addChild(this.turret1);
  this.layer1.addChild(this.turret2);
  this.layer0.addChild(this.Base1shield);
  this.layer0.addChild(this.Base2shield);
  
  
};
/**
 * Meathod to intialize a truck with certain coordinates and is called after certain amount of time
 * @method
 *
 */
Winners.scene.Game.prototype.createTruck = function () {
  /**
   * Random coordinates for the truck spawn point
   * @type {number}
   */
  var randomY = Math.random() * (720 - 500) + 500;
  /**
   * Random coordinates for the truck spawn point
   * @type {number}
   */
  var randomY2 = Math.random() * (250 - 0) + 0;
  /**
   * Random coordinates for the truck spawn point among the randomY coordinates and  randomY2 coordinates
   * @type {number}
   */
  var Ycord = Math.random() < 0.5 ? randomY : randomY2;
  /**
   * Random coordinates for the truck spawn point among the randomY coordinates and  randomY2 coordinates
   * @type {number}
   */
  var Ycord2 = Math.random() < 0.5 ? randomY : randomY2;
  /**
   * Initializes the truck object with the given coordinates, belongs to player1
   * @type {Object}
   */
  this.truck = new Winners.entity.Truck(
    -100,
    Ycord,
    this,
    this.player2,
    this.player
  );
  /**
   * Initializes the truck2 object with the given coordinates, belongs to player2
   * @type {Object}
   */
  this.truck2 = new Winners.entity.Truck(
    1300,
    Ycord2,
    this,
    this.player,
    this.player2
  );
  
  this.layer0.addChild(this.truck);
  this.layer0.addChild(this.truck2);
  if (this.player2.hitTest(this.truck.soldier)) {
   
    this.player2.soldierHit++;
    
  };

  //  this.timers.create({
  //  duration: 2000,
  //   onComplete: function () {
  //    this.createTruck();
  //  },
  //  });
};
/**
 * This method is automatically executed once per "tick". The method is used for
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.scene.Game.prototype.update = function (step) {
  /**
   * Reference to the the current game class
   * @type {Object}
   */
  var self = this;
  /**
   * Super call to call the super class update method
   * @type {Method}
   */
  rune.scene.Scene.prototype.update.call(this, step);
  /**
   * Call to update input method
   * @param {number} step Fixed time step.
   * @type {Method}
   */
  this.m_updateInput(step);
  /**
   * Attach turret1 to the player1 coodinates on both axes Y and X 
   * @type {number}
   */
  this.turret1.x = this.player.x;
  this.turret1.y = this.player.y;
  /**
   * Attach turret2 to the player2 coodinates on both axes Y and X
   * @type {number}
   */
  this.turret2.x = this.player2.x;
  this.turret2.y = this.player2.y;

  if (this.truck && this.truck2) {
    this.truck.hitTestAndSeparate(this.truck2);
  };
  
};

/**
 * This method is automatically called once just before the scene ends. Use
 * the method to reset references and remove objects that no longer need to
 * exist when the scene is destroyed. The process is performed in order to
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
Winners.scene.Game.prototype.dispose = function () {
  rune.scene.Scene.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.scene.Game.prototype.m_updateInput = function (step) {
  if (
    this.player2.hitTestAndSeparate(this.player) &&
    this.player.hitTestAndSeparate(this.player2)
  ) {
  }
};
/**
 * Method to handle game over, sends the winner of the round in an array to which later gets sent to next round
 * @method
 * 
 */
Winners.scene.Game.prototype.handleGameOver = function () {
 
  if (this.Player1isDefeated) {
    this.roundWinners.push("Player2");
  } else if (this.Player2isDefeated) {
    this.roundWinners.push("Player1");
  }

  if (this.currentRound < this.maxRounds) {
    /**
     * Round counter property
     * @type {number}
     */
    this.currentRound++;
    /**
     * Shows text with the result of the round 
     * @type {string}
     */
    var resultMsg =
      "Round won by " + this.roundWinners[this.roundWinners.length - 1];
    /**
     * Creates a text object with the result of the round
     * @type {Object}
     */
    var text = new rune.text.BitmapField(resultMsg);
    /**
     * Center the text on the screen
     * @type {number}
     */
    text.center = this.application.screen.center;
    /**
     * Scales the text on X and Y axis
     * @type {number}
     */
    text.scaleX = 2;
    text.scaleY = 2;
    
    this.cameras.getCameraAt(0).addChild(text);
    /**
     * waits for 5 seconds before loading the next round
     */
    this.timers.create({
      duration: 5000,
      onComplete: function () {
        this.application.scenes.load([
          new Winners.scene.Game(
            this.maxRounds,
            this.currentRound,
            this.roundWinners
          ),
        ]);
      },
    });
  } else {
   
    this.showMatchResult();
  }
};
/**
 * Method to show the result of the match
 * @method 
 */
Winners.scene.Game.prototype.showMatchResult = function () {
  /**
   * Properties to hold the amount of winners of each player
   * @type {number}
   */
  var player1Wins = 0;
  var player2Wins = 0;

  for (var i = 0; i < this.roundWinners.length; i++) {
    if (this.roundWinners[i] === "Player1") {
      player1Wins++;
    } else if (this.roundWinners[i] === "Player2") {
      player2Wins++;
    }
  }
/**
 * updates the result message based on the match winner
 * @type {string}
 */
  var resultMsg = "Match Over! ";
  if (player1Wins > player2Wins) {
    resultMsg += "Player 1 Won";
  } else if (player2Wins > player1Wins) {
    resultMsg += "Player 2 Won";
  } else {
    resultMsg += "It's a tie!";
  }
  var text = new rune.text.BitmapField(resultMsg);
  /**
   * Center the text on the screen and scale it accordingly
   */
  text.center = this.application.screen.center;
  text.scaleX = 2;
  text.scaleY = 2;

  this.cameras.getCameraAt(0).addChild(text);

  this.timers.create({
    duration: 8000,
    onComplete: function () {
      this.application.scenes.load([new Winners.scene.Menu()]);
    },
  });
};
/**
 * Method to handle the deafted player
 * @param {string} playerDeafeted 
 */
Winners.scene.Game.prototype.handlePlayerDefeat = function (playerDeafeted) {
  if (playerDeafeted === "player1") {
    this.Player1isDefeated = true;
    this.handleGameOver();
  } else if (playerDeafeted === "player2") {
    this.Player2isDefeated = true;
    this.handleGameOver();
  }
};

