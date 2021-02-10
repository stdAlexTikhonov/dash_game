import {  FIRE } from "./constants";

import explosion_sprite from "./assets/images/explosion_sprite.png";

export class Explosion {
    constructor(y,x) {
      this.x = x;
      this.y = y;
      this.state = 0;
      this.char = FIRE;
      this.img = new Image();
      this.img.src = explosion_sprite;
      this.still_here = true;
    }


    changeState() {
      this.state = this.state + 1;
      this.still_here = this.state <= 6;
    }
}