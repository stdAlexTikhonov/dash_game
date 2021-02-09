import { PLAYER, SCISSORS, EMPTY, STARS_QUANTITY, FOOD } from "./constants";
import { Player } from "./player";
import { PLUS_ONE } from "./actions/scoreActions";
import { store } from "./index";
import food from "./assets/images/food.png";

export class Star {
    constructor(y,x) {
        this.x = x;
        this.y = y;
        this.still_here = true;
        this.falling = false;
        this.right = false;
        this.left = false;
        this.killer = false;
        this.char = FOOD;
        this.img = new Image();
        this.img.src = food;
        this.state = 0;
    }

    check_way_down(world) {
        if (this.falling && world[this.y+1][this.x].char === PLAYER) { 
            this.killer = true;
            Player.off = true; 
            
        }
        else if (this.falling && world[this.y+1][this.x].char === SCISSORS) { this.killer = true; }
        this.falling = true;
        return  world[this.y+1] && world[this.y+1][this.x].char === EMPTY;
    }

    move_possible(world) {
        return world[this.y+1] && ['+', 'O', '*'].includes(world[this.y+1][this.x].char) && !['O', '*'].includes(world[this.y-1][this.x].char)
    }

    check_way_left(world) {
        this.falling = true;
        return world[this.y][this.x-1].char === EMPTY && world[this.y+1][this.x-1].char === EMPTY && !['O', '*'].includes(world[this.y-1][this.x-1].char);
    }

    check_way_right(world) {
        this.falling = true;
        return world[this.y][this.x+1].char === EMPTY && world[this.y+1][this.x+1].char === EMPTY && !['O', '*'].includes(world[this.y-1][this.x+1].char);
    }

    changeState(world) {
        this.right = false;
        this.left = false;
        if (world[this.y][this.x].char === PLAYER) { if (this.still_here) { 
            store.dispatch({ type: PLUS_ONE });
            this.still_here = false;
         } }
        else if (this.check_way_down(world)) this.y += 1;
        else if (this.move_possible(world)) {
            if (this.check_way_left(world)) { this.x -= 1; this.left = true; }
            else if (this.check_way_right(world)) { this.x += 1; this.right = true; }
            else this.falling = false;
        }
        else this.falling = false;

    }
}