import { PLAYER, SCISSORS, EMPTY, ORANGE_DISK, LEFT, RIGHT, ROCK, FOOD } from "./constants";
import { Player } from "./player";
import disk from "./assets/images/orange_disk.png"

export class Disk {
    constructor(y,x) {
      this.x = x;
      this.y = y;
      this.killer = false;
      this.falling = false;
      this.char = ORANGE_DISK;
      this.right = false;
      this.left = false;
      this.img = new Image();
      this.img.src = disk;
      this.still_alive = true;
    }

    check_way_down(world) {
        if (this.falling && world[this.y + 1][this.x].char === PLAYER) {
            this.killer = true; Player.off = true;
        }
        else if (this.falling && world[this.y + 1][this.x].char === SCISSORS) {
            this.killer = true;
        }
        return  world[this.y+1][this.x].char === EMPTY;
    }

    move_possible(world) {
        return ['+', 'O', '*'].includes(world[this.y+1][this.x].char) && !['O', '*'].includes(world[this.y-1][this.x].char)
    }

    check_way_left(world) {
        return world[this.y][this.x-1].char === EMPTY && world[this.y+1][this.x-1].char === EMPTY && !['O', '*'].includes(world[this.y-1][this.x-1].char);
    }

    check_way_right(world) {
        return world[this.y][this.x+1].char === EMPTY && world[this.y+1][this.x+1].char === EMPTY && !['O', '*'].includes(world[this.y-1][this.x+1].char);
    }

    check_force_move_left(world) {
        return world[this.y][this.x-1].char === EMPTY && world[this.y][this.x+1].char === PLAYER;
    }

    check_force_move_right(world) {
        return world[this.y][this.x+1].char === EMPTY && world[this.y][this.x-1].char === PLAYER;
    }
  
    find_death(world) {
        const killers = [ROCK, FOOD, ORANGE_DISK];
        const pt1 = killers.includes(world[this.y - 1][this.x].char) && world[this.y - 1][this.x].falling;
        const pt2 = killers.includes(world[this.y][this.x].char);
        return pt1;
    }

    changeState(world, player) {
      this.right = false;
      this.left = false;
      
      if (this.find_death(world))
        this.still_alive = false;
      
      if (world[this.y][this.x].char === PLAYER) { this.killer = true; Player.off = true; }
      if (this.check_way_down(world)) {
          this.falling = true; this.y += 1;
      }
      else if (this.check_force_move_left(world) && player.force && player.dir === LEFT) {
          this.x -= 1
          this.left = true;
      }
      else if (this.check_force_move_right(world) && player.force && player.dir === RIGHT) {
          this.x += 1
          this.right = true;
      }
      else {
        if (this.falling) this.still_alive = false;
        this.falling = false;
      }

    }
}
