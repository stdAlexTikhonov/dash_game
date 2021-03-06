import { PLAYER, EMPTY, YELLOW_DISK, LEFT, RIGHT, UP, DOWN } from "./constants";
import disk from "./assets/images/yellow_disk.png"
import { store } from "./index";

export class YellowDisk {
    constructor(y,x) {
      this.x = x;
      this.y = y;
      this.char = YELLOW_DISK;
      this.img = new Image();
      this.img.src = disk;
      this.still_alive = true;
      this.move = false;
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
  


    changeState(world, player) {
        this.move = false;
        
        const { activate_detonation } = store.getState();
        this.still_alive = !activate_detonation;

        if (this.check_force_move_down(world) && player.force && player.dir === DOWN) {
            this.y += 1;
            this.move = true;
        }
        else if (this.check_force_move_left(world) && player.force && player.dir === LEFT) {
            this.x -= 1
            this.move = true;
        }
        else if (this.check_force_move_right(world) && player.force && player.dir === RIGHT) {
            this.x += 1
            this.move = true;
        }
        else if (this.check_force_move_up(world) && player.force && player.dir === UP) {
            this.y -= 1;
            this.move = true;
        }

    }
}
