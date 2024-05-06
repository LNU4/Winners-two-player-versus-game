//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @class
 * @classdesc
 *
 * Game scene.
 */
/**
 * 
 */
Winners.entity.Soldiers = function(x, y, targetPlayer, layer, play) {
    this.targetPlayer = targetPlayer;
    this.shootDistance = 200;
    this.moveSpeed = 1;
    this.shootCooldown = 900;
    this.lastShootTime = 0;
    this.play = play;

    this.isDead= false; 
    this.powerUpProb = 0; 

    this.layer = layer;
    this.baseOwner = this.targetPlayer.player2Base;
    this.baseTarget = this.targetPlayer.enemy1Base;

    
    rune.display.Sprite.call(this, x, y, 32, 32, "soldiers");
    this.layer.addChild(this);
};

//----------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.Soldiers.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Soldiers.prototype.constructor = Winners.entity.Soldiers;
//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------


Winners.entity.Soldiers.prototype.update = function(step) {
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


   
    var currentPosition = new rune.geom.Point(this.x, this.y);
    var targetPosition = new rune.geom.Point(this.targetPlayer.center.x, this.targetPlayer.center.y);
    var distanceX = targetPosition.x - currentPosition.x;
    var distanceY = targetPosition.y - currentPosition.y;
    var distance = currentPosition.distance(targetPosition);


     // in order to achieve what we want, we need to rotate the bullet, we need to know the angle between the bullet/player and the target
     // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2
    var angle = Math.atan2(distanceY, distanceX);
    
    var rotationCords = angle * (180 / Math.PI);
   
    this.rotation = rotationCords;
    
    var directionX = distanceX / distance;
    var directionY = distanceY / distance;

   if (this.shootDistance < distance ) {
    currentPosition.x += directionX * this.moveSpeed;
    currentPosition.y += directionY * this.moveSpeed;
   }
    currentPosition.x = Math.min(Math.max(currentPosition.x, 0), 1280 - this.width);
    currentPosition.y = Math.min(Math.max(currentPosition.y, 0), 720 - this.height);

    
    this.x = currentPosition.x;
    this.y = currentPosition.y;

    var currentTime = Date.now();
    if (currentTime - this.lastShootTime >= this.shootCooldown) {
        this.shoot();
        this.lastShootTime = currentTime;
    }

  
    if (this.play.player2.hitTest(this)) {
        console.log('HIT');
        this.play.layer0.removeChild(this);
    }
};



Winners.entity.Soldiers.prototype.shoot = function() {
    var currentPosition = new rune.geom.Point(this.centerX, this.centerY);
    var targetPosition = new rune.geom.Point(this.targetPlayer.centerX, this.targetPlayer.centerY);
    
    
    var distanceX = targetPosition.x - currentPosition.x;
    var distanceY = targetPosition.y - currentPosition.y;
    
    
    var distance = currentPosition.distance(targetPosition);
    console.log(distance);
    if (distance <= this.shootDistance) {
        var bulletSpeed = 1;
        
        
        var bulletDirectionX = distanceX / distance;
        var bulletDirectionY = distanceY / distance;

            this.bullets = new Winners.entity.Bullets(this.layer, this, this.turret1, this.targetPlayer, this.baseOwner, this.baseTarget);
            this.application.scenes.selected.groups.add(this.bullets);
        
        var bullet = this.bullets.create(this.centerX, this.centerY);
        bullet.velocity.x = bulletDirectionX * bulletSpeed;
        bullet.velocity.y = bulletDirectionY * bulletSpeed;

     
        bullet.rotation = Math.atan2(distanceY, distanceX) * (180 / Math.PI);
    }
};


