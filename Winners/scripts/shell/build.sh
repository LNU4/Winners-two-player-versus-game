#!/bin/bash

npx google-closure-compiler \
--language_in ECMASCRIPT5_STRICT \
--language_out ECMASCRIPT5_STRICT \
--warning_level DEFAULT \
--compilation_level WHITESPACE_ONLY \
--isolation_mode IIFE \
--js "./../../lib/rune.js" \
--js "./../../src/scope/Manifest.js" \
--js "./../../src/data/resource/Requests.js" \
--js "./../../src/entity/Powerup/Powerup.js" \
--js "./../../src/entity/Powerup/PowerupCounter.js" \
--js "./../../src/entity/Powerup/UnfilledStar.js" \
--js "./../../src/entity/Effect/Spark.js" \
--js "./../../src/entity/Effect/Body.js" \
--js "./../../src/entity/Effect/Head.js" \
--js "./../../src/entity/Effect/Leg.js" \
--js "./../../src/entity/Effect/Plate.js" \
--js "./../../src/entity/Effect/Tyre.js" \
--js "./../../src/entity/Effect/Turretdes.js" \
--js "./../../src/system/Main.js" \
--js "./../../src/entity/Player/Players.js" \
--js "./../../src/entity/Player/Player.js" \
--js "./../../src/entity/Player/Player2.js" \
--js "./../../src/entity/Player/Turrets.js" \
--js "./../../src/entity/Player/Turret1.js" \
--js "./../../src/entity/Player/Turret2.js" \
--js "./../../src/entity/Base/Base.js" \
--js "./../../src/entity/Base/Base2.js" \
--js "./../../src/entity/Base/Base1shield.js" \
--js "./../../src/entity/Base/Base2shield.js" \
--js "./../../src/entity/Misc/Truck.js" \
--js "./../../src/entity/Soldier/SoldierUtil.js" \
--js "./../../src/entity/Soldier/Soldier.js" \
--js "./../../src/entity/Soldier/HeavySoldier.js" \
--js "./../../src/entity/Soldier/SniperSoldier.js" \
--js "./../../src/entity/Soldier/RocketSoldier.js" \
--js "./../../src/entity/Soldier/RepairSoldier.js" \
--js "./../../src/entity/Life/Hps.js" \
--js "./../../src/entity/Projectile/Bullet.js" \
--js "./../../src/entity/Projectile/Bullets.js" \
--js "./../../src/entity/Projectile/Rocket.js" \
--js "./../../src/scene/menu/Menu.js" \
--js "./../../src/scene/howtoplay/Howtoplay.js" \
--js "./../../src/scene/credits/Credits.js" \
--js "./../../src/scene/game/Game.js" \
--js "./../../src/scope/Alias.js" \
--js_output_file "./../../dist/Winners.js";
