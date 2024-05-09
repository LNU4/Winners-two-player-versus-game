function HeavySoldier(x, y, game, enemy) {
   
    Soldiers.call(this, x, y, game, enemy);
    this.shootDistance = 150;
    this.moveSpeed = 0.3;
  }
  
 
  HeavySoldier.prototype = Object.create(Soldiers.prototype);
  HeavySoldier.prototype.constructor = HeavySoldier;
  
  
  HeavySoldier.prototype.update = function (step) {
   
    Soldiers.prototype.update.call(this, step);
   
  };
  