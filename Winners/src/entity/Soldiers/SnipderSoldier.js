function SniperSoldier(x, y, game, enemy) {
    
    Soldiers.call(this, x, y, game, enemy);
    this.shootDistance = 400;
    this.moveSpeed = 0.5;
  }
  
 
  SniperSoldier.prototype = Object.create(Soldiers.prototype);
  SniperSoldier.prototype.constructor = SniperSoldier;
  

  SniperSoldier.prototype.update = function (step) {
    
    Soldiers.prototype.update.call(this, step);
  
  };
  