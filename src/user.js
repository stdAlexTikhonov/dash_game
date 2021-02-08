import { MINUS_ONE_BOMB } from './actions/bombActions';
import { SET_SPACE_BAR, RESET_SPACE_BAR } from './actions/userActions';
import { LEFT, UP, RIGHT, DOWN, BOMB_RIGHT, BOMB_LEFT, BOMB_UP, BOMB_DOWN } from './constants';
import { THE_WORLD } from "./index";
import { store } from "./index";


document.onkeydown = e => {
    const { space_bar } = store.getState();
    
    switch (e.keyCode) {
        case 37:
            if ([null, LEFT].includes(THE_WORLD.player.dir)) THE_WORLD.player.force = true;
            THE_WORLD.player.dir = space_bar ? null : LEFT;
            if (space_bar) {
                THE_WORLD.player.merphy_state = BOMB_LEFT;
                store.dispatch({ type: MINUS_ONE_BOMB });
            }
            break;
        case 38:
            if ([null, UP].includes(THE_WORLD.player.dir)) THE_WORLD.player.force = true;
            THE_WORLD.player.dir = space_bar ? null : UP;
            if (space_bar) {
                THE_WORLD.player.merphy_state = BOMB_UP;
                store.dispatch({ type: MINUS_ONE_BOMB });
            }
            break;
        case 39:
            if ([null, RIGHT].includes(THE_WORLD.player.dir)) THE_WORLD.player.force = true;
            THE_WORLD.player.dir = space_bar ? null : RIGHT;
            if (space_bar) {
                THE_WORLD.player.merphy_state = BOMB_RIGHT;
                store.dispatch({ type: MINUS_ONE_BOMB });
            }
            break;
        case 40:
            if ([null, DOWN].includes(THE_WORLD.player.dir)) THE_WORLD.player.force = true;
            THE_WORLD.player.dir = space_bar ? null : DOWN;
            if (space_bar) {
                THE_WORLD.player.merphy_state = BOMB_DOWN;
                store.dispatch({ type: MINUS_ONE_BOMB });
            }
            break;
        case 32:
            store.dispatch({ type: SET_SPACE_BAR });
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
        case 32:
            store.dispatch({ type: RESET_SPACE_BAR });
            break;
    }
};

