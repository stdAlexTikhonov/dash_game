import { LEFT, UP, RIGHT, DOWN } from './constants';
import { THE_WORLD } from "./index";



document.onkeydown = e => {
    
    switch (e.keyCode) {
        case 37:
            if ([null, LEFT].includes(THE_WORLD.player.dir)) THE_WORLD.player.force = true;
            THE_WORLD.player.dir = LEFT;
            break;
        case 38:
            if ([null, UP].includes(THE_WORLD.player.dir)) THE_WORLD.player.force = true;
            THE_WORLD.player.dir = UP;
            break;
        case 39:
            if ([null, RIGHT].includes(THE_WORLD.player.dir)) THE_WORLD.player.force = true;
            THE_WORLD.player.dir = RIGHT;
            break;
        case 40:
            if ([null, DOWN].includes(THE_WORLD.player.dir)) THE_WORLD.player.force = true;
            THE_WORLD.player.dir = DOWN;
            break;
    }
};

document.onkeyup = e => {

    switch (e.keyCode) {
        case 37:
            if (THE_WORLD.player.dir === LEFT) THE_WORLD.player.dir = null;
            break;
        case 38:
            if (THE_WORLD.player.dir === UP) THE_WORLD.player.dir = null;
            break;
        case 39:
            if (THE_WORLD.player.dir === RIGHT) THE_WORLD.player.dir = null;
            break;
        case 40:
            if (THE_WORLD.player.dir === DOWN) THE_WORLD.player.dir = null;
            break;
    }
};

