Winners.entity.Soldiers = function(x, y, targetPlayer, container) {
    this.targetPlayer = targetPlayer;
    this.shootDistance = 200; 
    this.moveSpeed = 1.0; 
    this.shootCooldown = 1000; 
    this.lastShootTime = 0;

   
    rune.display.Sprite.call(this, x, y, 32, 32, "soldiers");

    container.addChild(this);
};


Winners.entity.Soldiers.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Soldiers.prototype.constructor = Winners.entity.Soldiers;


Winners.entity.Soldiers.prototype.update = function(step) {
    rune.display.Sprite.prototype.update.call(this, step);


    var dx = this.targetPlayer.x - this.x;
    var dy = this.targetPlayer.y - this.y;
    var distance = Math.sqrt(dx * dx + dy * dy);


    dx /= distance;
    dy /= distance;

    this.x += dx * this.moveSpeed;
    this.y += dy * this.moveSpeed;

    if (distance <= this.shootDistance) {

        var currentTime = Date.now();
        if (currentTime - this.lastShootTime >= this.shootCooldown) {
            this.shoot(); 
            
            this.lastShootTime = currentTime; 
        }
    }
};


Winners.entity.Soldiers.prototype.shoot = function() {
    // Calculate start position and velocity
    var startX = this.x;
    var startY = this.y;
    var dx = this.targetPlayer.x - startX;
    var dy = this.targetPlayer.y - startY;
    var distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 0) {
        var bulletSpeed = 5;
        var vx = (dx / distance) * bulletSpeed;
        var vy = (dy / distance) * bulletSpeed;
        
        
        var bullet = new Winners.entity.Bullet(this.container, this, this.targetPlayer, startX, startY);
        
        
        bullet.velocity.x = vx;
        bullet.velocity.y = vy;
        
       
        this.parent.addChild(bullet);
    }
};







