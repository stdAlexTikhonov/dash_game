import {  PC } from "./constants";
import { store } from "./index";
import computer_sprite from "./assets/images/computer_sprite.png";

export class Computer {
    constructor(y,x) {
      this.x = x;
      this.y = y;
      this.state = 0;
      this.dy = 0;
      this.char = PC;
      this.img = new Image();
      this.img.src = computer_sprite;
    }

  changeState() {
    const { activate_detonation } = store.getState();
    this.state = this.state < 7 ? this.state + 1 : 0;
    this.dy = activate_detonation ? 1 : 0;
  }
}