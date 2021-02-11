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
      this.run = false;
      this.counter = 0;
      this.killer = false;
    }

  changeState() {
  
    this.counter = this.counter < 20 ? this.counter + 1 : 0;
    this.state = this.counter < 5 ? this.state + 1 : 0;
    this.killer = this.counter < 5;
  }
}