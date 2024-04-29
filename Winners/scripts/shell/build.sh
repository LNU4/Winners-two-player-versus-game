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
--js "./../../src/system/Main.js" \
--js "./../../src/entity/Player.js" \
--js "./../../src/entity/Player2.js" \
--js "./../../src/entity/Turret1.js" \
--js "./../../src/entity/Turret2.js" \
--js "./../../src/entity/Base.js" \
--js "./../../src/entity/Base2.js" \
--js "./../../src/entity/Base1shield.js" \
--js "./../../src/entity/Base2shield.js" \
--js "./../../src/entity/soldier.js" \
--js "./../../src/entity/Hps.js" \
--js "./../../src/entity/Bullet.js" \
--js "./../../src/entity/Bullets.js" \
--js "./../../src/scene/menu/Menu.js" \
--js "./../../src/scene/game/Game.js" \
--js "./../../src/entity/Effect.js" \
--js "./../../src/scope/Alias.js" \
--js_output_file "./../../dist/Winners.js";