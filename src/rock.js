import { PLAYER, SCISSORS, EMPTY } from "./constants";
import { Player } from "./player";

export class Rock {
    constructor(y,x) {
        this.x = x;
        this.y = y;
        this.killer = false;
        this.falling = false;
    }

    check_way_down(world) {
        if (this.falling && world[this.y+1][this.x] === PLAYER) { this.killer = true; Player.off = true; }
        else if (this.falling && world[this.y+1][this.x].char === SCISSORS) { this.killer = true; }
        this.falling = true;
        return  world[this.y+1][this.x] === EMPTY;
    }

    move_possible(world) {
        return ['+', 'O', '*'].includes(world[this.y+1][this.x]) && !['O', '*'].includes(world[this.y-1][this.x])
    }

    check_way_left(world) {
        this.falling = true;
        return world[this.y][this.x-1] === EMPTY && world[this.y+1][this.x-1] === EMPTY && !['O', '*'].includes(world[this.y-1][this.x-1]);
    }

    check_way_right(world) {
        this.falling = true;
        return world[this.y][this.x+1] === EMPTY && world[this.y+1][this.x+1] === EMPTY && !['O', '*'].includes(world[this.y-1][this.x+1]);
    }

    check_force_move_left(world) {
        return world[this.y][this.x-1] === EMPTY && world[this.y][this.x+1] === PLAYER;
    }

    check_force_move_right(world) {
        return world[this.y][this.x+1] === EMPTY && world[this.y][this.x-1] === PLAYER;
    }

    changeState(world, force) {
        if (world[this.y][this.x] === PLAYER) { this.killer = true; Player.off = true; }
        if (this.check_way_down(world)) this.y += 1;
        else if (this.check_force_move_left(world) && force) {
            this.x -= 1
        }
        else if (this.check_force_move_right(world) && force) {
            this.x += 1
        }
        else if (this.move_possible(world)) {
            if (this.check_way_left(world)) this.x -= 1;
            else if (this.check_way_right(world)) this.x += 1;
            else this.falling = false;
        } else {
            this.falling = false;
        }

    }
}
