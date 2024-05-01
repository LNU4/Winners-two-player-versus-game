Winners.entity.Soldiers = function(x, y, targetPlayer, layer) {
    this.targetPlayer = targetPlayer;
    this.shootDistance = 200; 
    this.moveSpeed = 1.0; 
    this.shootCooldown = 1000; 
    this.lastShootTime = 0;

    this.layer = layer;

    rune.display.Sprite.call(this, x, y, 32, 32, "soldiers");
    this.layer.addChild(this);
    
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
    this.debug = true;
    var minX = 0;
    var minY = 0;
    var maxX = 1280 - this.width;
    var maxY = 720 - this.height;
  
    this.x = Math.min(Math.max(this.x, minX), maxX);
    this.y = Math.min(Math.max(this.y, minY), maxY);
};


Winners.entity.Soldiers.prototype.shoot = function() {
    /*
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
    */ 
    this.bullets = new Winners.entity.Bullets(this.layer, this, this.turret1, this.targetPlayer);
    this.application.scenes.selected.groups.add(this.bullets);
    this.bullet = this.bullets.create(this.centerX, this.centerY);
    
    
    this.bullet.velocity.x = this.velocity.x;
    this.bullet.velocity.y = this.velocity.y;
    this.bullet.globalX = this.velocity.x;
    this.bullet.globalX = this.velocity.x;
    this.bullet.rotation = this.rotation;
  
    
};







