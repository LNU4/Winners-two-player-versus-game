Winners.entity.Soldiers = function (x, y, targetPlayer, layer, play){
    this.targetPlayer = targetPlayer;
    this.shootDistance = 200;
    this.moveSpeed = 2;
    this.shootCooldown = 900;
    this.lastShootTime = 0;
    this.play = play;
    this.isDead= false; 
    this.powerUpProb = 0; 
    this.layer = layer;
    this.baseOwner = this.targetPlayer.player2Base;
    this.baseTarget = this.targetPlayer.enemy1Base ;
    console.log(this.baseOwner)

    rune.display.Sprite.call(this, x, y, 32, 32, "soldiers");
    this.layer.addChild(this);

};

Winners.entity.Soldiers.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Soldiers.prototype.constructor = Winners.entity.Soldiers;


Winners.entity.Soldiers.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);
    var m_this = this; 
    var dx = this.targetPlayer.x - this.x;
    var dy = this.targetPlayer.y - this.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
 //console.log(this.play)
    if (this.play.player2.hitTest(this))   {
     
        this.isDead = true;
        console.log(this.isDead)
        this.powerUpProb = Math.random() * 5;
        console.log(Math.round(this.powerUpProb))
        this.play.layer0.removeChild(this);
        this.dispose()
    } 
     if (Math.round(this.powerUpProb) == 2) {
                    console.log('UUU')
                    var ranX = Math.random() * 1280; 
                    var ranY = Math.random() * 720; 
                    this.play.timers.create({
                             duration: 5000,
                            onComplete: function(){
                                console.log(this)
                                console.log(m_this)
                    this.powerUp =  new Winners.entity.Powerup (ranX, ranY);
                    this.layer0.addChild(this.powerUp);
                } 
            } 
                  );
    } 

    if (distance <= this.shootDistance && distance > 90) {
        
        this.x = this.x;
        this.y = this.y;

        var currentTime = Date.now();
        if (currentTime - this.lastShootTime >= this.shootCooldown) {
            this.shoot();
            this.lastShootTime = currentTime;
        }
    } else {
        
        dx /= distance;
        dy /= distance;
        this.x += dx * this.moveSpeed;
        this.y += dy * this.moveSpeed;
    }

    
    var minX = 0;
    var minY = 0;
    var maxX = 1280 - this.width;
    var maxY = 720 - this.height;
    this.x = Math.min(Math.max(this.x, minX), maxX);
    this.y = Math.min(Math.max(this.y, minY), maxY);
};


Winners.entity.Soldiers.prototype.shoot = function () {
    var currentTime = Date.now();

    if (currentTime - this.lastShootTime >= this.shootCooldown) {

        var startX = this.centerX;
        var startY = this.centerY;

        var dx = this.targetPlayer.centerX - startX;
        var dy = this.targetPlayer.centerY - startY;
        var distance = Math.sqrt(dx * dx + dy * dy);


        if (distance <= this.shootDistance) {

            var vx = dx / distance;
            var vy = dy / distance;


            if (!this.bullets) {
                this.bullets = new Winners.entity.Bullets(this.layer, this, this.turret1, this.targetPlayer, this.baseOwner, this.baseTarget);
                this.application.scenes.selected.groups.add(this.bullets);
            }

            var bullet = this.bullets.create(startX, startY);


            var bulletSpeed = 1;
            bullet.velocity.x = vx * bulletSpeed;
            bullet.velocity.y = vy * bulletSpeed;

            var rotationRadians = Math.atan2(dy, dx);
            bullet.rotation = rotationRadians * (180 / Math.PI);


            this.lastShootTime = currentTime;

            /* old code, perhaps better but requires further checks
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
    
    
            
            this.bullets = new Winners.entity.Bullets(this.layer, this, this.turret1, this.targetPlayer);
            this.application.scenes.selected.groups.add(this.bullets);
            this.bullet = this.bullets.create(this.centerX, this.centerY);
    
    
            this.bullet.velocity.x = this.velocity.x;
            this.bullet.velocity.y = this.velocity.y;
            this.bullet.globalX = this.velocity.x;
             this.bullet.globalX = this.velocity.x;
    
             this.bullet.rotation = this.newPoint;
    
            */
        }
    }
};
