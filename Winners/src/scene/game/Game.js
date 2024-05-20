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
  this.player1isDead = false;
  this.player2isDead = false;
  /**
   * ...
   *
   * @type {Winners.scene.Player}
   * @type {Winners.scene.Player2}
   */
  //this.player = null;
  // this.player2 = null;

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  /**
   * Calls the constructor method of the super class.
   */
  rune.scene.Scene.call(this);
  console.log("Starting Round " + this.currentRound);
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

  this.stage.addChild(this.layer0);
  this.stage.addChild(this.layer1);
  this.stage.addChild(this.layer2);

  
  this.Base1shield = new Winners.entity.Base1shield(5, 344.5, this);
  this.Base2shield = new Winners.entity.Base2shield(1210, 344.5, this);
  this.base = new Winners.entity.Base(10, 360, this);
  this.base2 = new Winners.entity.Base2(1235, 360, this);

  this.turret1 = new Winners.entity.Turret1(70, 360, this);
  

  this.turret2 = new Winners.entity.Turret2(1150, 360, this);

  // this.powerupCounter = new  Winners.entity.PowerupCounter (this, this.powerupIx);

  this.player = new Winners.entity.Player(80, 345, this);

  //this.player2 = new Winners.entity.Player2(1140, 345.5, this ,this.layer0, this.turret2, this.player, this.base2, this.base);
  this.player2 = new Winners.entity.Player2(1140, 345, this);
  this.player.player2 = this.player2;

 

  //this.player = new Winners.entity.Player(80, 345.5 ,this.turret1, this.layer0, this.base, this.base2);
  this.player = new Winners.entity.Player(80, 345, this);

  //this.player2 = new Winners.entity.Player2(1140, 345.5, this ,this.layer0, this.turret2, this.player, this.base2, this.base);
  this.player2 = new Winners.entity.Player2(1140, 345, this);
  this.player.player2 = this.player2;

  // this.base = new Winners.entity.Base(10, 360, this);
  // this.base2 = new Winners.entity.Base2(1235, 360, this);
  this.player.powerupsArray = [];
  this.player2.powerupsArray = [];
  this.player.powerupIx = 0;
  this.player2.powerupIx = 0;

  // this.Soldiers = new Winners.entity.Soldiers(350, 360, this.player2, this.layer0, this)
  //this.heavysoldiers = new Winners.entity.HeavySoldier(350, 360, this, this.player2);
  //this.snipersoldiers = new Winners.entity.SniperSodier(10, 10, this, this.player2);
  //this.rocketsoldier = new Winners.entity.Rocketsoldier(500, 500, this, this.player2);
  //this.repairsoldier = new Winners.entity.Repairsoldier(700, 700, this, this.player2);

  //this.base = new Winners.entity.Base(10, 359.5);
  //this.base2 = new Winners.entity.Base2(1240, 359.5);

  this.camera = this.cameras.getCameraAt(0);
  //camera.addChild(smth);

  
  this.timers.create({
   duration: 4000,
   onComplete: function () {
    this.createTruck();
   }, 
  });

  // var timeInMs = 2000;

  // var timer = new rune.timer.TimerOptions({duration: timeInMs});

  // timer.onComplete = function (){
  //     console.log('.-.-.')
  // }

  //  this.hp2 = new Winners.entity.Hps(300, 300);
  // this.player2.hp = this.hp2;

  // console.log(this.hp2)
  // this.layer0.addChild(this.hp2);

  this.layer0.addChild(this.bg);
  this.layer0.addChild(this.player);
  this.layer0.addChild(this.player2);
  this.layer0.addChild(this.base);
  this.layer0.addChild(this.base2);

  //this.layer0.addChild(this.powerupCounter)
  // this.layer0.addChild(this.Soldiers);

  //this.layer0.addChild(this.heavysoldiers);
  //this.layer0.addChild(this.snipersoldiers);
  //this.layer0.addChild(this.rocketsoldier);
  //this.layer0.addChild(this.repairsoldier);
  this.layer2.addChild(this.turret1);
  this.layer2.addChild(this.turret2);
  this.layer0.addChild(this.Base1shield);
  this.layer0.addChild(this.Base2shield);
};
Winners.scene.Game.prototype.createTruck = function () {
  var randomY = Math.random() * 720;
  var randomY2 = Math.random() * 720;
  // this.truck = new Winners.entity.Truck(-100, randomY,this.player, this.player2, this.layer0, this)
  this.truck = new Winners.entity.Truck(-100, randomY, this, this.player2);
  this.truck2 = new Winners.entity.Truck(1300, randomY2, this, this.player);
  //   this.player.truck = new Winners.entity.Truck(-100, randomY, this, this.player2);
  //   this.player2.truck2 = new Winners.entity.Truck(1300, randomY, this, this.player);
  this.layer0.addChild(this.truck);
  this.layer0.addChild(this.truck2);
  if (this.player2.hitTest(this.truck.soldier)) {
    console.log(this.player2.soldierHit);
    this.player2.soldierHit++;
    console.log(this.player2.soldierHit);
  }

  //  this.timers.create({
  //  duration: 20000,
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
  this.timers.create({
    //delete if not used N.A
    duration: 4000,
    onComplete: function () {},
  });

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
  /*  if (this.keyboard.justPressed("SPACE")) {
    this.application.scenes.load([new Winners.scene.Menu()]);
  }
 */
  if (
    this.player2.hitTestAndSeparate(this.player) &&
    this.player.hitTestAndSeparate(this.player2)
  ) {
  }

  //   if (this.truck.enemy === this.player) {
  //     this.player2.bullets.bullet.hitTestAndSeparate(this.truck.soldier)
  //   }
  //   else if (this.enemy === this.game.player2) {
  //     this.player = this.game.player2;
  //   }
  /* if (this.Player1isDefeated || this.Player2isDefeated) {
    this.handleGameOver();} */
};

Winners.scene.Game.prototype.handleGameOver = function () {
  /*
  if (this.Player1isDefeated) {
    this.showGameOverScreen("Player 2");
  } else if (this.Player2isDefeated) {
    this.showGameOverScreen("Player 1");
  }
  */
  console.log("handelGamwover");
  if (this.Player1isDefeated) {
    //console.log("Player 1 is defeated");
    this.roundWinners.push("Player2");
  } else if (this.Player2isDefeated) {
    // console.log("Player 2 is defeated");

    this.roundWinners.push("Player1");
  }
  // console.log(
  //   "current round: ",
  //   this.currentRound,
  //   "Max rounds: ",
  //   this.maxRounds
  // );
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

  // var resultMsg = "Match Over! Player 1 Wins: " + player1Wins + "Player 2 Wins: " + player2Wins;
  var resultMsg = "Match Over! ";
  if (player1Wins > player2Wins) {
    resultMsg += "Player 1 Won";
  } else if (player2Wins > player1Wins) {
    resultMsg += "Player 2 Won";
  } else {
    resultMsg += "error";
  }
  var text = new rune.text.BitmapField(resultMsg);

  //text.autoSize = true;
  //text.x = this.application.screen.center.x;
  //text.y = this.application.screen.center.y;
  text.center = this.application.screen.center;
  text.scaleX = 2;
  text.scaleY = 2;

  //console.log(text);
  //console.log("text to stage");

  this.cameras.getCameraAt(0).addChild(text);

  this.timers.create({
    duration: 8000,
    onComplete: function () {
      this.application.scenes.load([new Winners.scene.Menu()]);
    },
  });
};

Winners.scene.Game.prototype.handeBasedefeated = function (playerDeafeted) {
 
  if (playerDeafeted === "Base1") {
    this.Player1isDefeated = true;
    this.handleGameOver();
  } else if (playerDeafeted === "Base2") {
    this.Player2isDefeated = true;
    this.handleGameOver();
  }

  /*   if (this.Player1isDefeated || this.Player2isDefeated) {
    this.handleGameOver();}; */
};

Winners.scene.Game.prototype.handlePlayerDead = function (playerDead) {
 
  if (playerDead === "Player1") {
    this.player1isDead = true;
    this.removeTurret(this.turret1);
   // this.respawnPlayer(this.player, this.turret1);
  } else if (playerDead === "Player2") {
    this.player2isDead = true; 
    this.removeTurret(this.turret2);
   // this.respawnPlayer(this.player2, this.turret2);

  }

  /*   if (this.Player1isDefeated || this.Player2isDefeated) {
    this.handleGameOver();}; */
};

Winners.scene.Game.prototype.removeTurret = function (turret) {
  if (turret && turret.parent) {
    turret.parent.removeChild(turret);
  };
};

/* Winners.scene.Game.prototype.respawnPlayer = function (player, turret) {
  this.layer0.removeChild(player);
  this.layer2.removeChild(turret);

  this.timers.create({
    duration: 4000,
    onComplete: function () {
      player.x = player.initX;
      player.y = player.initY;
      turret.x = player.x;
      turret.y = player.y;

      this.layer0.addChild(player);
      this.layer2.addChild(turret);

      player.flicker.start();
      //this.respawn.play(true);
    }
  });
}; */

/* Do not delete this N.A */
//why player respawn in bullets Oo it should be handled in game and adjusted accordingly "this is my opnion only N.A" Above logic to handle respawn in game.js rather than bullet.js, if u want to try it, make sure to activite the call 
// in handle player dead