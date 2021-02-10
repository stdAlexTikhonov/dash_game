import {  BUG } from "./constants";
import { store } from "./index";
import bug_sprite from "./assets/images/bug_sprite.png";

export class Bug {
    constructor(y,x) {
      this.x = x;
      this.y = y;
      this.state = 0;
      this.char = BUG;
      this.img = new Image();
      this.img.src = bug_sprite;
    }

  changeState() {
    this.state = this.state < 5 ? this.state + 1 : 0;
  }
}