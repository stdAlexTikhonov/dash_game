import { PLAYER, SCISSORS, EMPTY, YELLOW_DISK, LEFT, RIGHT, ROCK, FOOD, UP, DOWN } from "./constants";
import { Player } from "./player";
import disk from "./assets/images/yellow_disk.png"

export class YellowDisk {
    constructor(y,x) {
      this.x = x;
      this.y = y;
      this.killer = false;
      this.falling = false;
      this.char = YELLOW_DISK;
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
  
    check_force_move_up(world) {
        return world[this.y-1][this.x].char === EMPTY && world[this.y+1][this.x].char === PLAYER;
    }
  
    check_force_move_down(world) {
        return world[this.y+1][this.x].char === EMPTY && world[this.y-1][this.x].char === PLAYER;
    }

    check_force_move_left(world) {
        return world[this.y][this.x-1].char === EMPTY && world[this.y][this.x+1].char === PLAYER;
    }

    check_force_move_right(world) {
        return world[this.y][this.x+1].char === EMPTY && world[this.y][this.x-1].char === PLAYER;
    }
  
    find_death(world) {
        const killers = [ROCK, FOOD];
        const pt1 = killers.includes(world[this.y - 1][this.x].char);
        const pt2 = killers.includes(world[this.y][this.x].char);
        return pt1;
    }

    changeState(world, player) {

      if (this.check_force_move_down(world) && player.force && player.dir === DOWN) {
          this.y += 1;
      }
      else if (this.check_force_move_left(world) && player.force && player.dir === LEFT) {
          this.x -= 1
      }
      else if (this.check_force_move_right(world) && player.force && player.dir === RIGHT) {
          this.x += 1
      }
      else if (this.check_force_move_up(world) &&player.force && player.dir === UP) {
        this.y -= 1;
      }

    }
}
