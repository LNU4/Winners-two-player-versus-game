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
Winners.scene.Game = function (maxRounds, currentRound, roundWinners) {
  //--------------------------------------------------------------------------
  // Public properties
  //--------------------------------------------------------------------------
  this.maxRounds = maxRounds;

  this.currentRound = currentRound;
  this.roundWinners = roundWinners || [];
  this.Player1isDefeated = false;
  this.Player2isDefeated = false;
  /**
   * ...
   *
   * @type {Winners.scene.Player}
   * @type {Winners.scene.Player2}
   */

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

  this.bg = new rune.display.Graphic(0, 0, 1280, 720, "background");
  this.layer0 = new rune.display.DisplayObjectContainer(0, 0, 1280, 720);
  this.layer1 = new rune.display.DisplayObjectContainer(0, 0, 1280, 720);
  this.layer2 = new rune.display.DisplayObjectContainer(0, 0, 1280, 720);

  this.bullets = this.groups.add(new Winners.entity.Bullets(this));

  this.stage.addChild(this.layer0);
  this.stage.addChild(this.layer1);
  this.stage.addChild(this.layer2);

  this.Base1shield = new Winners.entity.Base1shield(5, 330.5, this);
  this.Base2shield = new Winners.entity.Base2shield(1160, 330.5, this);
  this.base = new Winners.entity.Base(10, 360, this);
  this.base2 = new Winners.entity.Base2(1210, 360, this);

  this.turret1 = new Winners.entity.Turret1(70, 360, this);

  this.turret2 = new Winners.entity.Turret2(1150, 360, this);

  this.camera = this.cameras.getCameraAt(0);
  //camera.addChild(smth);

  this.player = new Winners.entity.Player(140, 360, this);
  this.player2 = new Winners.entity.Player2(1090, 360, this);
  this.player.player2 = this.player2;
 // this.rocketsoldier = new Winners.entity.Rocketsoldier(500, 500, this, this.player2);
 // this.snipersoldiers = new Winners.entity.SniperSodier(10, 10, this, this.player2);
  //  this.repairsoldier = new Winners.entity.Repairsoldier(700, 700, this, this.player2);
//  this.heavysoldiers = new Winners.entity.HeavySoldier(350, 360, this, this.player2);
  this.player.powerupsArray = [];
  this.player2.powerupsArray = [];
  this.player.powerupIx = 0;
  this.player2.powerupIx = 0;

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
  this.layer2.addChild(this.turret1);
  this.layer2.addChild(this.turret2);
  this.layer0.addChild(this.Base1shield);
  this.layer0.addChild(this.Base2shield);
  
  
};
Winners.scene.Game.prototype.createTruck = function () {
  var randomY = Math.random() * (720 - 500) + 500;
  var randomY2 = Math.random() * (250 - 0) + 0;
  var Ycord = Math.random() < 0.5 ? randomY : randomY2;
  var Ycord2 = Math.random() < 0.5 ? randomY : randomY2;

  this.truck = new Winners.entity.Truck(
    -100,
    Ycord,
    this,
    this.player2,
    this.player
  );
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
    
  }

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
  var self = this;
  rune.scene.Scene.prototype.update.call(this, step);
  this.m_updateInput(step);

  this.turret1.x = this.player.x;
  this.turret1.y = this.player.y;

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

Winners.scene.Game.prototype.handleGameOver = function () {
 
  if (this.Player1isDefeated) {
    this.roundWinners.push("Player2");
  } else if (this.Player2isDefeated) {
    this.roundWinners.push("Player1");
  }

  if (this.currentRound < this.maxRounds) {
    this.currentRound++;
    var resultMsg =
      "Round won by " + this.roundWinners[this.roundWinners.length - 1];
    var text = new rune.text.BitmapField(resultMsg);

    text.center = this.application.screen.center;
    text.scaleX = 2;
    text.scaleY = 2;

    this.cameras.getCameraAt(0).addChild(text);

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

Winners.scene.Game.prototype.showMatchResult = function () {
  var player1Wins = 0;
  var player2Wins = 0;

  for (var i = 0; i < this.roundWinners.length; i++) {
    if (this.roundWinners[i] === "Player1") {
      player1Wins++;
    } else if (this.roundWinners[i] === "Player2") {
      player2Wins++;
    }
  }

  var resultMsg = "Match Over! ";
  if (player1Wins > player2Wins) {
    resultMsg += "Player 1 Won";
  } else if (player2Wins > player1Wins) {
    resultMsg += "Player 2 Won";
  } else {
    resultMsg += "It's a tie!";
  }
  var text = new rune.text.BitmapField(resultMsg);

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

Winners.scene.Game.prototype.handlePlayerDefeat = function (playerDeafeted) {
  if (playerDeafeted === "player1") {
    this.Player1isDefeated = true;
    this.handleGameOver();
  } else if (playerDeafeted === "player2") {
    this.Player2isDefeated = true;
    this.handleGameOver();
  }
};

