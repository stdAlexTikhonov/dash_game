import { 
    EMPTY, PLAYER, UP, DOWN,
    RIGHT, LEFT,
    SCISSORS, ROCK, FOOD, ELECTRON
} from "./constants";
import sprite3 from "./assets/images/sprite3.png";
import electron from "./assets/images/electron.png";
import { Player } from "./player";

export class Predator {

    constructor(y,x, electron_flag) {
        this.state = 0;
        this.x = x;
        this.y = y;
        this.dir_down = true;
        this.dir_left = false;
        this.dir_up = false;
        this.dir_right = false;
        this.dir = DOWN;
        this.still_alive = true;
        this.img = new Image();
        this.img.src = electron_flag ? electron : sprite3;
        this.char = electron_flag ? ELECTRON : SCISSORS;
        this.prev_dir = null;
        this.animation = true;

    }


    looking_around(world) {
        this.dir_left = world[this.y][this.x-1].char === EMPTY && !"*O".includes(world[this.y-1][this.x-1].char);
        this.dir_up = world[this.y-1][this.x].char === EMPTY;
        this.dir_right = world[this.y][this.x+1].char === EMPTY && !"*O".includes(world[this.y-1][this.x+1].char);
        this.dir_down = world[this.y+1][this.x].char === EMPTY;
    }

    find_player(world) {
        let FOUND_PLAYER = false;

        const up = world[this.y-1][this.x].char === PLAYER;
        const down = world[this.y+1][this.x].char === PLAYER;
        const left = world[this.y][this.x-1].char === PLAYER;
        const right = world[this.y][this.x + 1].char === PLAYER;
        const here = world[this.y][this.x].char === PLAYER;
        switch (this.dir) {
            case UP:
                FOUND_PLAYER = up;
                break;
            case DOWN:
                FOUND_PLAYER = down;
                break;
            case LEFT:
                FOUND_PLAYER = left;
                break;
            case RIGHT:
                FOUND_PLAYER = right;
                break;
        }

        return FOUND_PLAYER || here;
    }

    find_death(world) {
        const pt1 = world[this.y - 1][this.x].char === ROCK || world[this.y - 1][this.x].char === FOOD;
        const pt2 = world[this.y][this.x].char === ROCK || world[this.y][this.x].char === FOOD;
        return pt1 || pt2;
    }


    check_dir() {
        this.animation = false;
        switch (this.dir) {
            case DOWN:
                if (this.dir === this.prev_dir) {
                    if (this.dir_right) this.dir = RIGHT;
                    else if (this.dir_down) this.dir = DOWN;
                    else this.dir = LEFT;
                }
                this.prev_dir = DOWN;
                break;
            case RIGHT:
                if (this.dir === this.prev_dir) {
                    if (this.dir_up) this.dir = UP;
                    else if (this.dir_right) this.dir = RIGHT;
                    else this.dir = DOWN;
                } 
                this.prev_dir = RIGHT;
                break;
            case UP:
                if (this.dir === this.prev_dir) {
                    if (this.dir_left) this.dir = LEFT;
                    else if (this.dir_up) this.dir = UP;
                    else this.dir = RIGHT;
                }
                this.prev_dir = UP;
                break;
            case LEFT:
                if (this.dir === this.prev_dir) {
                    if (this.dir_down) this.dir = DOWN;
                    else if (this.dir_left) this.dir = LEFT
                    else this.dir = UP;
                }
                this.prev_dir = LEFT;
                break;
        }
    }


    changeState(world) {
        this.state = this.state < 7 ? this.state + 1 : 0;
   
        if (this.find_death(world))
            this.still_alive = false;
        

        if (this.find_player(world)) {
            this.still_alive = false;
            Player.off = true;
        }

        this.looking_around(world);

        this.check_dir();
        
        if (this.dir === this.prev_dir) {
            
            switch (this.dir) {
                case DOWN:
                    if (world[this.y + 1][this.x].char === EMPTY) {
                        this.animation = true; this.y += 1;
                    }
                    break;
                case RIGHT:
                    if (world[this.y][this.x + 1].char === EMPTY) {
                        this.animation = true; this.x += 1;
                    }
                    break;
                case UP:
                    if (world[this.y - 1][this.x].char === EMPTY) {
                        this.animation = true; this.y -= 1;
                    }
                    break;
                case LEFT:
                    if (world[this.y][this.x - 1].char === EMPTY) {
                        this.animation = true; this.x -= 1;
                    }
                    break;
            }
        }

    }

}