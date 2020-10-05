import { stopGame } from "./index"
export const WIDTH = 30;
export const HEIGHT = 18;
export const BLOCK_WIDTH = 32;

export const UP = 'UP';
export const DOWN = 'DOWN';
export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';
export const NO_WAY = 'NO_WAY';
const DIRS = [NO_WAY, UP, DOWN, LEFT, RIGHT];

const PLAYER = 'A';
const ROCK = 'O';
const FOOD = '*';
const BREAK = '+';
const WALL = '#';
const GROUND = '.';
const EMPTY = ' ';
const SCISSORS = 'X';

const elements = [WALL, GROUND, ROCK, BREAK, FOOD];

export const PREDATOR_QUANTITY = 3;
export const ROCKS_QUANTITY = 10;
export const STARS_QUANTITY = 10;
export const BREAKS_QUANTITY = 10;
export const GROUND_QUANTITY = 250;


export const STOP = "STOP";
export const MOVE_LEFT = "MOVE_LEFT";
export const MOVE_RIGHT = "MOVE_RIGHT";
export const FORCE_LEFT = "FORCE_LEFT";
export const FORCE_RIGHT = "FORCE_RIGHT";
export const MOVE_UP = "MOVE_UP";
export const MOVE_DOWN = "MOVE_DOWN";


import sprite from './assets/merphy/sprite.png';
import sprite2 from './assets/merphy/sprite2.png';
import sprite3 from "./assets/merphy/sprite3.png";

export {
    sprite,
    sprite2,
    sprite3
}


let SEED = 2;

function random() {
    let x = Math.sin(SEED++) * 10000;
    return x - Math.floor(x);
}


export class Player {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.dir = null;
        this.EMPTIES = [];
        this.state = 0;
        this.force = false;
        this.time_to_sleep = false;
        this.img = new Image();
        this.img.src = sprite;
        this.img.width = 100;
        this.img.height = 32;
        this.merphy_state = STOP;
        this.dy = 0;
        
    }

    check(nxt, world) {
        return [EMPTY, '*', '.'].includes(world[nxt.y][nxt.x]);
    }

    check_predator(nxt, world) {
        return world[nxt.y][nxt.x].char === SCISSORS;
    }

    check_force_move_left(world) {
        return world[this.y][this.x-1] === ROCK && world[this.y][this.x-2] === EMPTY && this.force;
    }

    check_force_move_right(world) {
        return world[this.y][this.x+1] === ROCK && world[this.y][this.x+2] === EMPTY && this.force;
    }

    changePic(seconds) {

        if( this.state < 2) this.state +=1;
        else this.state = 0;

        switch (this.merphy_state) {
            case STOP:
                this.dy = 1;
                break;
            case MOVE_LEFT:
                this.dy = 0;
                break;
            case MOVE_RIGHT:
                this.dy = 2;
                break;
            default:
                this.dy = 0;
                break;
        }
        
        // switch (this.merphy_state) {
        //     case STOP:
        //         // if (seconds % 10 === 0) this.time_to_sleep = true;
        //         // if(this.time_to_sleep && this.state < 12) this.state +=1;
        //         // else { this.state = 0; this.time_to_sleep = false; }
        //         this.img.src = merphy_sleep[0];
        //         break;
        //     case MOVE_LEFT:
        //         if( this.state < 2) this.state +=1;
        //         else this.state = 0;
        //         this.img.src = merphy_left[this.state];
        //         this.pic_sequence = merphy_left;
        //         break;
        //     case MOVE_RIGHT:
        //         if( this.state < 2) this.state +=1;
        //         else this.state = 0;
        //         this.img.src = merphy_right[this.state];
        //         this.pic_sequence = merphy_right;
        //         break;
        //     case FORCE_LEFT:
        //         this.img.src = meprhy_force_left;
        //         break;
        //     case FORCE_RIGHT:
        //         this.img.src = meprhy_force_right;
        //         break;
        //     case MOVE_UP:
        //     case MOVE_DOWN:
        //         if( this.state < 2) this.state +=1;
        //         else this.state = 0;
        //         this.img.src = this.pic_sequence[this.state];
        //         break;
        // }

    }

    changeState(world) {
        if (Player.off) return false;
        
        switch  (this.dir) {
            case UP:
                if (this.check_predator({x: this.x, y: this.y - 1}, world))  {
                    Player.off = true;
                }
                else if (this.check({x: this.x, y: this.y - 1}, world)) {
                    this.merphy_state = MOVE_UP;
                    this.y -= 1;
                    if (!this.EMPTIES.some(point => point.x === this.x && point.y === this.y)) this.EMPTIES.push({ x: this.x, y: this.y});
                }
                else this.merphy_state = STOP;
                break;
            case DOWN:
                if (this.check_predator({x: this.x, y: this.y + 1}, world))  {
                    Player.off = true;
                }
                else if (this.check({x: this.x, y: this.y + 1}, world)) {
                    this.y += 1;
                    this.merphy_state = MOVE_DOWN;
                    if (!this.EMPTIES.some(point => point.x === this.x && point.y === this.y)) this.EMPTIES.push({ x: this.x, y: this.y});
                } else this.merphy_state = STOP;
                break;
            case LEFT:
                if (this.check_predator({x: this.x - 1, y: this.y}, world))  {
                    Player.off = true;
                }
                else if (this.check({x: this.x - 1, y: this.y}, world)) {
                    this.merphy_state = MOVE_LEFT;
                    this.x -= 1;
                    if (!this.EMPTIES.some(point => point.x === this.x && point.y === this.y)) this.EMPTIES.push({ x: this.x, y: this.y});
                } else if (this.check_force_move_left(world)) this.x -= 1;
                else this.merphy_state = STOP;
                break;
            case RIGHT:
                if (this.check_predator({x: this.x + 1, y: this.y}, world))  {
                    Player.off = true;
                }
                else if (this.check({x: this.x + 1, y: this.y}, world)) {
                    this.merphy_state = MOVE_RIGHT;
                    this.x += 1;
                    if (!this.EMPTIES.some(point => point.x === this.x && point.y === this.y)) this.EMPTIES.push({ x: this.x, y: this.y});
                } else if (this.check_force_move_right(world)) this.x += 1;
                else this.merphy_state = STOP;
                break;
        }

    }

}

Player.off = false;
Player.flag = true;

export class Predator {

    constructor(y,x) {
        this.state = 0;
        this.x = x;
        this.y = y;
        this.dir_down = true;
        this.dir_left = false;
        this.dir_up = false;
        this.dir_right = false;
        this.dir = DOWN;
        this.flag = false;
        this.still_alive = true;
        this.img = new Image();
        this.img.src = sprite3;
        this.char = SCISSORS;
    }


    looking_around(world) {
        this.dir_left = world[this.y][this.x-1] === EMPTY && !"*O".includes(world[this.y-1][this.x-1]);
        this.dir_up = world[this.y-1][this.x] === EMPTY;
        this.dir_right = world[this.y][this.x+1] === EMPTY && !"*O".includes(world[this.y-1][this.x+1]);
        this.dir_down = world[this.y+1][this.x] === EMPTY;
    }

    find_player(world) {
        let FOUND_PLAYER = false;

        const up = world[this.y-1][this.x] === PLAYER;
        const down = world[this.y+1][this.x] === PLAYER;
        const left = world[this.y][this.x-1] === PLAYER;
        const right = world[this.y][this.x+1] === PLAYER;
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
            case NO_WAY:
                FOUND_PLAYER = up || down || left || right;
                break;
        }

        return FOUND_PLAYER;
    }

    find_rock(world) {
        return world[this.y-1][this.x] === ROCK;
    }


    check_dir() {
        switch (this.dir) {
            case DOWN:
                if (!this.dir_down) this.dir = NO_WAY;
                if (this.dir_left) this.dir = LEFT;
                else if (this.dir_down) this.dir = DOWN;
                else if (this.dir_right) this.dir = RIGHT;
                else this.dir = UP;
                break;
            case RIGHT:
                if (!this.dir_right) this.dir = NO_WAY;
                if (this.dir_down) this.dir = DOWN;
                else if (this.dir_right) this.dir = RIGHT;
                else if (this.dir_up) this.dir = UP;
                else this.dir = LEFT;
                break;
            case UP:
                if (!this.dir_up) this.dir = NO_WAY;
                if (this.dir_right) this.dir = RIGHT;
                else if (this.dir_up) this.dir = UP;
                else if (this.dir_left) this.dir = LEFT;
                else this.dir = DOWN;
                break;
            case LEFT:
                if (!this.dir_left) this.dir = NO_WAY;
                if (this.dir_up) this.dir = UP;
                else if (this.dir_left) this.dir = LEFT;
                else if (this.dir_down) this.dir = DOWN;
                else this.dir = RIGHT;
                break;
            case NO_WAY:
                if (this.dir_up) this.dir = UP;
                else if (this.dir_left) this.dir = LEFT;
                else if (this.dir_down) this.dir = DOWN;
                else if (this.dir_right) this.dir = RIGHT;
                break;
        }
    }

    no_way() {
        return !this.dir_up && !this.dir_down && !this.dir_left && !this.dir_right
    }

    changeState(world) {
        this.state = this.state < 7 ? this.state + 1 : 0;
        this.flag = !this.flag;
        if (this.find_rock(world))
            this.still_alive = false;
        
        if (this.no_way()) this.dir = NO_WAY;

        if (this.find_player(world)) {
            this.still_alive = false;
            Player.off = true;
        }

        this.flag && this.looking_around(world);
        this.flag && this.check_dir();

        switch (this.dir) {
            case DOWN:
                if (this.flag && world[this.y+1][this.x] === EMPTY) this.y += 1;
                break;
            case RIGHT:
                if (this.flag && world[this.y][this.x+1] === EMPTY) this.x += 1;
                break;
            case UP:
                if (this.flag && world[this.y-1][this.x] === EMPTY) this.y -= 1;
                break;
            case LEFT:
                if (this.flag && world[this.y][this.x-1] === EMPTY) this.x -= 1;
                break;
        }

    }

}

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

export class Star {
    constructor(y,x) {
        this.x = x;
        this.y = y;
        this.still_here = true;
        this.falling = false;
        this.killer = false;
    }

    check_way_down(world) {
        if (this.falling && world[this.y+1][this.x] === PLAYER) { this.killer = true; Player.off = true; }
        else if (this.falling && world[this.y+1][this.x].char === SCISSORS) { this.killer = true; }
        this.falling = true;
        return  world[this.y+1] && world[this.y+1][this.x] === EMPTY;
    }

    move_possible(world) {
        return world[this.y+1] && ['+', 'O', '*'].includes(world[this.y+1][this.x]) && !['O', '*'].includes(world[this.y-1][this.x])
    }

    check_way_left(world) {
        this.falling = true;
        return world[this.y][this.x-1] === EMPTY && world[this.y+1][this.x-1] === EMPTY && !['O', '*'].includes(world[this.y-1][this.x-1]);
    }

    check_way_right(world) {
        this.falling = true;
        return world[this.y][this.x+1] === EMPTY && world[this.y+1][this.x+1] === EMPTY && !['O', '*'].includes(world[this.y-1][this.x+1]);
    }

    changeState(world) {
        if (world[this.y][this.x] === PLAYER) { if (this.still_here) { Star.scores += 1; this.still_here = false; } }
        else if (this.check_way_down(world)) this.y += 1;
        else if (this.move_possible(world)) {
            if (this.check_way_left(world)) this.x -= 1;
            else if (this.check_way_right(world)) this.x += 1;
            else this.falling = false;
        }
        else this.falling = false;

    }
}

Star.scores = 0;


export class World {

    constructor(height, width, predators_q, rocks, stars, breaks) {
        this.rand_positions = [];
        this.height = height;
        this.width = width;
        this.minutes = 0;
        this.seconds = 0;
        this.img = new Image();
        this.img.src = sprite2;
        this.timer = null;
        this.pause = false;
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'canvas';
        this.canvas.width = WIDTH * BLOCK_WIDTH;
        this.canvas.height = HEIGHT * BLOCK_WIDTH;
        this.ctx = this.canvas.getContext("2d");
        this.selected_values = [];
        this.mouse_pressed = false;
        this.selected_value = EMPTY;
        
        
        document.body.appendChild(this.canvas);
        this.canvas.onmousedown = e1 => {
            this.mouse_pressed = true;
        }

        this.canvas.onmouseup = e1 => {
            this.mouse_pressed = false;
            this.selected_values = [];
        }

        this.canvas.onmousemove = (e) => {
            if (this.mouse_pressed && window.pause) {
                const rect = e.target.getBoundingClientRect();
                const x = e.clientX - rect.left; //x position within the element.
                const y = e.clientY - rect.top;  //y position within the element.
                const _x = Math.floor(x/BLOCK_WIDTH);
                const _y = Math.floor(y/BLOCK_WIDTH);
    
                let val = _x + "_" + _y;
                
                if (!this.selected_values.includes(val)) { 
                    this.selected_values = [...this.selected_values, val];
                    this.GROUND = this.GROUND.filter((val) => !(val.x === _x && val.y === _y));
                    this.BREAKS = this.BREAKS.filter((val) => !(val.x === _x && val.y === _y));
                    this.ROCKS = this.ROCKS.filter((val) => !(val.x === _x && val.y === _y));
                    this.STARS = this.STARS.filter((val) => !(val.x === _x && val.y === _y));
                    switch( this.selected_value) {
                        case GROUND:
                            this.GROUND.push({ x: _x, y: _y});
                            break;
                        case BREAK:
                            this.BREAKS.push({ x: _x, y: _y});
                            break;
                        case ROCK:
                            this.ROCKS.push(new Rock(_y, _x));
                            break;
                        case FOOD:
                            this.STARS.push(new Star(_y, _x));
                            break;    
                    }
                    
                    this.world = this.generate();
                    this.world[this.player.y][this.player.x] = PLAYER;
                    this.print();
                }
            }
            
            // 
            
        }
        



        const createDiv = (img, index) => {
            const div = document.createElement('div');
            div.style.width = BLOCK_WIDTH + 'px';
            div.style.height = BLOCK_WIDTH + 'px';
            div.style.backgroundImage = `url(${img})`;
            div.style.backgroundColor = 'black';
            div.style.backgroundPositionX = BLOCK_WIDTH * index + 'px';
            div.style.margin = '20px';
            div.style.cursor = 'pointer';
            return div
        }
        
        const resetBtns = () => { 
            const items = document.getElementsByClassName('btn');
            for (let i = 0; i < items.length; i++) {
                items[i].style.border = 'none';
            }
        }
        
        const edit_block = document.createElement('div');
        edit_block.style.width = '10%';
        edit_block.style.border = '1px solid black';
        edit_block.style.height = HEIGHT * BLOCK_WIDTH + 'px';
        edit_block.style.display = 'flex';
        edit_block.style.flexDirection = 'column';
        edit_block.style.alignItems = 'center';

        for (let i = 0; i < 5; i++) {
            const div = createDiv(sprite2, i)
            div.className = 'btn';
            div.onmousedown = e =>  { 
                resetBtns();
                this.selected_value = elements[i]
                div.style.border = '3px solid blue';
            };
            edit_block.appendChild(div);
        }
        
        const empty = createDiv();
        empty.onmousedown = e =>  {
            resetBtns();
            empty.style.border = "3px solid blue";
            empty.className = 'btn';
            this.selected_value = EMPTY
        };
        edit_block.appendChild(empty);

        this.edit_block = edit_block;

        //Breaks
        this.BREAKS = [];
        for (let i = 0; i < breaks; i++) {
            const bip = this.rndomizer(); //break init position
            this.BREAKS.push(bip);
        }

        //Predators
        this.PREDATORS = [];
        for (let i = 0; i < predators_q; i++) {
            const pip = this.rndomizer(); //predator init position
            this.PREDATORS.push(new Predator(pip.y, pip.x));
        }


        //Rocks
        this.ROCKS = [];
        for (let i = 0; i < rocks; i++) {
            const rip = this.rndomizer(); //predator init position
            this.ROCKS.push(new Rock(rip.y, rip.x));
            this.ROCKS.sort((a,b) => a.y - b.y);
        }

        //Stars
        this.STARS = [];
        for (let i = 0; i < stars; i++) {
            const rip = this.rndomizer(); //predator init position
            this.STARS.push(new Star(rip.y, rip.x));
            this.STARS.sort((a,b) => a.y - b.y);
        }

        this.GROUND = [];
        for (let i = 0; i < GROUND_QUANTITY; i++) {
            const rip = this.rndomizer(); //predator init position
            this.GROUND.push({y: rip.y, x: rip.x});
        }


        const pp = this.rndomizer();//player position

        this.player = new Player(pp.x,pp.y);

        this.world = this.generate();

        this.startTimer();


    }

    startTimer() {
        this.timer = setTimeout(() => {
            this.seconds++;
            if (this.seconds > 59) {
                this.seconds = 0;
                this.minutes++;
            }
            this.startTimer();
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timer);
    }

    getTime() {
        const minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
        const seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds;
        return minutes + ':' + seconds;
    }

    generate() {
        const FIRST_ROW = new Array(this.width).fill(WALL);
        const LAST_ROW = new Array(this.width).fill(WALL);

        const MIDDLE = new Array(this.width).fill(EMPTY);
        MIDDLE[0] = WALL; MIDDLE[this.width-1] = WALL;

        const WORLD = new Array(this.height)

        for (let i = 0; i < this.height; i++) WORLD[i] = MIDDLE.slice();

        WORLD[0] = FIRST_ROW;
        WORLD[this.height-1] = LAST_ROW;

        this.GROUND.forEach(P => WORLD[P.y][P.x] = GROUND);

        this.player.EMPTIES.forEach(P => WORLD[P.y][P.x] = EMPTY);

        this.PREDATORS.forEach(P => WORLD[P.y][P.x] = P);

        this.ROCKS.forEach(R => WORLD[R.y][R.x] = ROCK);

        this.STARS.forEach(S => WORLD[S.y][S.x] = FOOD);

        this.BREAKS.forEach(B => WORLD[B.y][B.x] = BREAK);


        return WORLD;
    }

    rndomizer() {

        let rand_x = Math.floor(random() * (this.width - 2)) + 1;
        let rand_y = Math.floor(random() * (this.height - 2)) + 1;
        let pos = { x: rand_x, y: rand_y };

        while(this.rand_positions.some(el => el.x === pos.x && el.y === pos.y)) {
            rand_x = Math.floor(random() * (this.width - 2)) + 1;
            rand_y = Math.floor(random() * (this.height - 2)) + 1;
            pos = { x: rand_x, y: rand_y };
        }

        this.rand_positions.push(pos);

        return pos;
    }

    print() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        

        this.world.forEach((row,i) => {
            row.forEach((el,j) => { 
                if (el === WALL) { 
                    this.ctx.drawImage(this.img, 0, 0, BLOCK_WIDTH, BLOCK_WIDTH, j*BLOCK_WIDTH, i*BLOCK_WIDTH,BLOCK_WIDTH, BLOCK_WIDTH);
                } else if (el === BREAK) { 
                    this.ctx.drawImage(this.img, BLOCK_WIDTH*2, 0, BLOCK_WIDTH, BLOCK_WIDTH, j*BLOCK_WIDTH, i*BLOCK_WIDTH,BLOCK_WIDTH, BLOCK_WIDTH);
                } else if (el === ROCK) { 
                    this.ctx.drawImage(this.img, BLOCK_WIDTH*3, 0, BLOCK_WIDTH, BLOCK_WIDTH, j*BLOCK_WIDTH, i*BLOCK_WIDTH,BLOCK_WIDTH, BLOCK_WIDTH);
                } else if (el === FOOD) { 
                    this.ctx.drawImage(this.img, BLOCK_WIDTH, 0, BLOCK_WIDTH, BLOCK_WIDTH, j*BLOCK_WIDTH, i*BLOCK_WIDTH,BLOCK_WIDTH, BLOCK_WIDTH);
                } else if (el === GROUND) { 
                    this.ctx.drawImage(this.img, BLOCK_WIDTH*4, 0, BLOCK_WIDTH, BLOCK_WIDTH, j*BLOCK_WIDTH, i*BLOCK_WIDTH,BLOCK_WIDTH, BLOCK_WIDTH);
                } else if (el.char === SCISSORS) {
                    this.ctx.drawImage(el.img, BLOCK_WIDTH * el.state, DIRS.indexOf(el.dir) * BLOCK_WIDTH, BLOCK_WIDTH, BLOCK_WIDTH, j*BLOCK_WIDTH, i*BLOCK_WIDTH,BLOCK_WIDTH, BLOCK_WIDTH);
                } else if (el === 'A') {
                    this.ctx.drawImage(this.player.img, this.player.state * BLOCK_WIDTH, this.player.dy * BLOCK_WIDTH, BLOCK_WIDTH, BLOCK_WIDTH, j*BLOCK_WIDTH, i*BLOCK_WIDTH,BLOCK_WIDTH, BLOCK_WIDTH);
                }
            })
        })

        return this.world.map(row => row.join(EMPTY)).join('\n') + '\nscores: ' + Star.scores + '  Time: ' + this.getTime();
    }

    check_predators() {
       
        this.PREDATORS = this.PREDATORS.filter(predator => predator.still_alive);
    }

    check_food() {
        this.STARS = this.STARS.filter(star => star.still_here);
    }

    check_rocks() {
        this.ROCKS = this.ROCKS.filter(rock => !rock.killer);
    }

    check_player() {
        if (Player.off && Player.flag) {
            
            Player.flag = false;
        } else if (Player.flag) {
            this.world[this.player.y][this.player.x] = PLAYER;
        } else {
            stopGame();
        }


    }

    tick() {
        this.PREDATORS.forEach(PREDATOR => PREDATOR.changeState(this.world));
        this.ROCKS.forEach(ROCK => ROCK.changeState(this.world, this.player.force));
        this.STARS.forEach(STAR => STAR.changeState(this.world));
        this.player.changeState(this.world);
        this.player.changePic(this.seconds);
        this.check_predators();
        this.check_food();
        this.check_rocks();
        this.world = this.generate();
        this.check_player();
    }

}



