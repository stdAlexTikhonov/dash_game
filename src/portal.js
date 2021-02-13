import {  PORTAL } from "./constants";
import portal_sprite from "./assets/images/portal_sprite.png";

export class Portal {
    constructor(y,x) {
      this.x = x;
      this.y = y;
      this.state = 0;
      this.char = PORTAL;
      this.img = new Image();
      this.img.src = portal_sprite;
      this.run = false;
      this.counter = 0;
      this.killer = false;
    }

  changeState() {
  }
}