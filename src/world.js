import { stopGame, store } from "./index"
import "./user";

import { 
    WIDTH, HEIGHT, BLOCK_WIDTH, UP, DOWN, RIGHT, LEFT,
    DIRS, PLAYER, ROCK, FOOD, BREAK, EXIT,
    WALL, GROUND, EMPTY, SCISSORS, elements, MAP_SIZE_CONSTANT,
    GROUND_QUANTITY, SEED, VIEWPORT_HEIGHT, VIEWPORT_WIDTH, MOVE_DOWN, MOVE_UP, STEPS, MOVE_RIGHT, MOVE_LEFT, FORCE_LEFT, FORCE_RIGHT, FORCE_UP, FIRE, FORCE_DOWN, STOP, PART, ELECTRON, ORANGE_DISK, ORANGE_DISK_QUANTITY, BOMB_QUANTITY, RED_DISK, PC, YELLOW_DISK_QUANTITY, YELLOW_DISK, BUGS_QUANTITY, BUG, PORTAL, PORTAL_QUANTITY,
} from "./constants";
import { sleep } from "./helpers";
import { Player } from "./player";
import { Star } from "./star";
import { Bomb } from "./bomb";
import { Rock } from "./rock";
import { Disk } from "./disk";
import { Bug } from "./bug";
import { Computer } from "./computer";
import { Portal } from "./portal";
import { Predator } from "./predator"
import { Explosion } from "./explosion";
import { YellowDisk } from "./yellow_disk";
import { Dashboard } from "./Components/Dashboard";
import { Time } from "./Components/Time";

import sprite from './assets/images/sprite.png';
import sprite3 from './assets/images/sprite3.png';
import wall from "./assets/images/wall.png";
import break_ from "./assets/images/break.png";
import ground from "./assets/images/ground.png";
import exit from "./assets/images/exit.png";

import a1 from "./assets/images/a1.png";
import a2 from "./assets/images/a2.png";
import a3 from "./assets/images/a3.png";
import a4 from "./assets/images/a4.png";
import a5 from "./assets/images/a5.png";
import a6 from "./assets/images/a6.png";
import a7 from "./assets/images/a7.png";
import a8 from "./assets/images/a8.png";
import a9 from "./assets/images/a9.png";
import a10 from "./assets/images/a10.png";
import { Bombs } from "./Components/Bombs";
import { CLEAR_BOMB } from "./actions/bombActions";

const parts = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10];

const wall_img = new Image();
wall_img.src = wall;

const break_img = new Image();
break_img.src = break_;

const ground_img = new Image();
ground_img.src = ground;

const exit_img = new Image();
exit_img.src = exit;

const parts_transformed = parts.map(source => {
    const img = new Image();
    img.src = source;
    return img;
})


let seed = SEED;


function random() {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

export const generateUID = () => {
    return (
      "_" +
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

export class World {

    constructor(height, width, predators_q, rocks, stars, breaks, ip, players_quantity) {
        this.rand_positions = [];
        this.height = height;
        this.width = width;
        this.minutes = 0;
        this.seconds = 0;
        this.timer = null;
        this.pause = false;
        this.start = !ip;
        this.ip = ip;
        this.container = document.createElement('div');
        this.container.style.position = 'relative';
        this.appendCanvas();
        this.selected_values = [];
        this.mouse_pressed = false;
        this.selected_value = EMPTY;
        this.ws = ip && new WebSocket(`ws://${ip}:3000`);
        

    
        // document.body.appendChild(this.canvas);
        
        this.container.appendChild(Dashboard);
     
        document.body.appendChild(this.container);

        let pointerX, pointerY;

        this.container.onpointerdown = e => {
            pointerX = e.offsetX;
            pointerY = e.offsetY;
        };

        this.container.onpointerup = e => {
            const diffLeft = e.offsetX - pointerX;
            const diffUp = e.offsetY - pointerY;
            const vertical = Math.abs(diffLeft) < Math.abs(diffUp);


            if (vertical) {
                if (e.offsetY > pointerY) {
                    if (this.player.dir === DOWN) this.player.force = true;
                    else this.player.dir = DOWN;
                    this.world.ws && this.world.ws.send(JSON.stringify({ method: "CD", dir: DOWN, token: this.player.token, x: player.x, y: player.y }))
                } else {
                    if (this.player.dir === UP) this.player.force = true;
                    else this.player.dir = UP;
                    this.world.ws && this.world.ws.send(JSON.stringify({ method: "CD", dir: UP, token: this.player.token, x: player.x, y: player.y }))
                }
            } else {
                if (e.offsetX > pointerX) {
                    if (this.player.dir === RIGHT) this.player.force = true;
                    else this.player.dir = RIGHT;
                    this.world.ws && this.world.ws.send(JSON.stringify({ method: "CD", dir: RIGHT, token: this.player.token, x: player.x, y: player.y }))
                } else {
                    if (this.player.dir === LEFT) this.player.force = true; 
                    else this.player.dir = LEFT;
                    this.world.ws && this.world.ws.send(JSON.stringify({ method: "CD", dir: LEFT, token: this.player.token, x: player.x, y: player.y }))
                }
            }


        };


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
            const div = createDiv(wall_img, i)
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

        const scissors = createDiv(sprite3, 0);
        scissors.onmousedown = e =>  {
            resetBtns();
            scissors.style.border = "3px solid blue";
            scissors.className = 'btn';
            this.selected_value = SCISSORS;
        };
        edit_block.appendChild(scissors);

        const player = createDiv(sprite, 0);
        player.onmousedown = e =>  {
            resetBtns();
            player.style.border = "3px solid blue";
            player.className = 'btn';
            this.selected_value = PLAYER;
        };
        edit_block.appendChild(player);

        this.edit_block = edit_block;

        //WALLS
        this.WALLS = [];

        this.BUGS = [];
        for (let i = 0; i < BUGS_QUANTITY; i++) {
            const pip = this.rndomizer(); //predator init position
            this.BUGS.push(new Bug(pip.y, pip.x));
        }


        this.PARTS = [];
        for (let i = 0; i < parts.length; i++) {
            const rip = this.rndomizer(); //predator init position
            this.PARTS.push({y: rip.y, x: rip.x, char: PART, img: parts_transformed[i] });
        }

        const pp = this.rndomizer();//player position

        this.player = new Player(pp.y,pp.x);
        this.player.token = generateUID();

        const pc = this.rndomizer();//player position

        this.COMPUTER = new Computer(pc.y, pc.x);

        //Breaks
        this.BREAKS = [];
        for (let i = 0; i < breaks; i++) {
            const bip = this.rndomizer(); //break init position
            this.BREAKS.push({y: bip.y, x: bip.x, char: BREAK, img: break_img });
        }

        //Portals
        this.PORTALS = [];
        for (let i = 0; i < PORTAL_QUANTITY; i++) {
            const pip = this.rndomizer(); //break init position
            this.PORTALS.push(new Portal(pip.y, pip.x));
        }


        //Predators
        this.PREDATORS = [];
        for (let i = 0; i < predators_q; i++) {
            const pip = this.rndomizer(); //predator init position
            this.PREDATORS.push(new Predator(pip.y, pip.x));
        }

        //Electrons
        this.ELECTRONS = [];
        for (let i = 0; i < MAP_SIZE_CONSTANT; i++) {
            const pip = this.rndomizer(); //predator init position
            this.ELECTRONS.push(new Predator(pip.y, pip.x, true));
        }


        //Rocks
        this.ROCKS = [];
        for (let i = 0; i < rocks; i++) {
            const rip = this.rndomizer(); //predator init position
            this.ROCKS.push(new Rock(rip.y, rip.x));
            this.ROCKS.sort((a,b) => a.y - b.y);
        }

        //orange disks
        this.DISKS = [];
        for (let i = 0; i < ORANGE_DISK_QUANTITY; i++) {
            const rip = this.rndomizer(); //predator init position
            this.DISKS.push(new Disk(rip.y, rip.x));
            this.DISKS.sort((a,b) => a.y - b.y);
        }

        //yellow disks
        this.YELLOW_DISKS = [];
        for (let i = 0; i < YELLOW_DISK_QUANTITY; i++) {
            const rip = this.rndomizer(); //predator init position
            this.YELLOW_DISKS.push(new YellowDisk(rip.y, rip.x));
            this.YELLOW_DISKS.sort((a,b) => a.y - b.y);
        }

        //Stars
        this.STARS = [];
        for (let i = 0; i < stars; i++) {
            const rip = this.rndomizer(); //predator init position
            this.STARS.push(new Star(rip.y, rip.x));
            this.STARS.sort((a,b) => a.y - b.y);
        }

        //Bombs
        this.BOMBS = [];
        for (let i = 0; i < BOMB_QUANTITY; i++) {
            const rip = this.rndomizer(); //predator init position
            this.BOMBS.push(new Bomb(rip.y, rip.x));
            this.BOMBS.sort((a,b) => a.y - b.y);
        }

        this.GROUND = [];
        for (let i = 0; i < GROUND_QUANTITY; i++) {
            const rip = this.rndomizer(); //predator init position
            this.GROUND.push({y: rip.y, x: rip.x, char: GROUND, img: ground_img });
        }

        this.PLAYERS = [];
        // for (let i = 0; i < PLAYERS_QUANTITY; i++) {
        //     const pp = this.rndomizer();//player position
        //     this.PLAYERS.push({y: pp.y, x: pp.x, char: REMOTE_PLAYER});
        // }
        this.EXPLOSIONS = [];

        

        const ext = this.rndomizer();
        this.EXIT = { x: ext.x, y: ext.y, char: EXIT, img: exit_img };
  
        if (ip) this.ws.onopen = () => this.ws.send(JSON.stringify({method: "SET_PLAYER_POSITION", token: this.player.token, player: this.player}));

        this.world = this.generate();

        

        if (ip) this.ws.onmessage = response => {
            
            try {
                const res = JSON.parse(response.data);
                switch(res.method) {
                    case "SET_PLAYERS":
                        //remove current client
                        delete res.players[this.player.token];
                        const filtered = Object.values(res.players);
                        this.PLAYERS = filtered.map(pl => { 
                            const new_pl = new Player(pl.y, pl.x);
                            new_pl.token = pl.token;
                            return new_pl;
                        });
                        if (Object.keys(res.players).length === players_quantity - 1) this.start = true;
                        break;
                    case "CD":
                        this.PLAYERS.forEach(player => {
                            if (res.token === player.token) { 
                                player.dir = res.dir;
                                player.x = res.x;
                                player.y = res.y;
                             }
                        })
                        break;
                    case "CLOSE":
                        //remove current client
                        delete res.players[this.player.token];
                        const filtered1 = Object.values(res.players);
                        this.PLAYERS = filtered1.map(pl => { 
                            const new_pl = new Player(pl.y, pl.x);
                            new_pl.token = pl.token;
                            return new_pl;
                        });
                        break;

                }
            } catch (e) {
                console.log(e);
            }
            
        }

    }

    appendCanvas() {
        const { settings } = store.getState();

        this.viewport = document.createElement('canvas');
        this.viewport.id = 'viewport';
        this.viewport.width = settings.orientation ? VIEWPORT_WIDTH * BLOCK_WIDTH : VIEWPORT_HEIGHT * BLOCK_WIDTH;
        this.viewport.height = settings.orientation ? VIEWPORT_HEIGHT * BLOCK_WIDTH : VIEWPORT_WIDTH * BLOCK_WIDTH;
        this.ctx_vp = this.viewport.getContext("2d");

        this.container.appendChild(this.viewport);
    }



    startTimer() {
        this.timer = setTimeout(() => {
            if (!window.pause) {
                this.seconds++;
                if (this.seconds > 59) {
                    this.seconds = 0;
                    this.minutes++;
                }
                
                Time.innerText = this.getTime();
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
        const FIRST_ROW = new Array(this.width).fill({ char: WALL, img: wall_img });
        const LAST_ROW = new Array(this.width).fill({ char: WALL, img: wall_img });

        const MIDDLE = new Array(this.width).fill({char: EMPTY});
        MIDDLE[0] = { char: WALL, img: wall_img } ; MIDDLE[this.width-1] = { char: WALL, img: wall_img };

        const WORLD = new Array(this.height)

        for (let i = 0; i < this.height; i++) WORLD[i] = MIDDLE.slice();

        WORLD[0] = FIRST_ROW;
        WORLD[this.height-1] = LAST_ROW;

        this.GROUND.forEach(G => WORLD[G.y][G.x] = G);

        this.BUGS.forEach(B => WORLD[B.y][B.x] = B);

        this.player.EMPTIES.forEach(P => WORLD[P.y][P.x] = { char: EMPTY});

        this.ip && this.PLAYERS.forEach(P => { 
            P.EMPTIES.forEach(P => WORLD[P.y][P.x] = { char: EMPTY});
            WORLD[P.y][P.x] = P 
        });

        this.PREDATORS.forEach(P => WORLD[P.y][P.x] = P);

        this.ELECTRONS.forEach(P => WORLD[P.y][P.x] = P);

        this.ROCKS.forEach(R => WORLD[R.y][R.x] = R);

        this.DISKS.forEach(D => WORLD[D.y][D.x] = D);

        this.YELLOW_DISKS.forEach(D => WORLD[D.y][D.x] = D);

        this.STARS.forEach(S => WORLD[S.y][S.x] = S);

        this.BOMBS.forEach(S => WORLD[S.y][S.x] = S);

        this.BREAKS.forEach(B => WORLD[B.y][B.x] = B);

        this.WALLS.forEach(W => WORLD[W.y][W.x] = W);

        this.PARTS.forEach(P => WORLD[P.y][P.x] = P);

        this.PLAYERS.forEach(P => WORLD[P.y][P.x] = P);
        
        this.EXPLOSIONS.forEach(EXP => WORLD[EXP.y][EXP.x] = EXP);

        WORLD[this.COMPUTER.y][this.COMPUTER.x] = this.COMPUTER;

        WORLD[this.EXIT.y][this.EXIT.x] = this.EXIT;

        this.PORTALS.forEach(P => WORLD[P.y][P.x] = P);

        return WORLD;
    }

    rndomizer(type) {

        let rand_x = Math.floor(random() * (this.width - 2)) + 1;
        let rand_y = Math.floor(random() * (this.height - 2)) + 1;
        let pos = { x: rand_x, y: rand_y };

        while(this.rand_positions.some(el => el.x === pos.x && el.y === pos.y)) {
            rand_x = Math.floor(random() * (this.width - 2)) + 1;
            rand_y = Math.floor(random() * (this.height - 2)) + 1;
            pos = { x: rand_x, y: rand_y };
        }

        this.rand_positions.push(pos);
        if (type === PLAYER) {
            this.rand_positions.push({ x: pos.x - 1, y: pos.y + 1 });
            this.rand_positions.push({ x: pos.x - 1, y: pos.y - 1 });
            this.rand_positions.push({ x: pos.x - 1, y: pos.y });
            this.rand_positions.push({ x: pos.x + 1, y: pos.y + 1 });
            this.rand_positions.push({ x: pos.x + 1, y: pos.y - 1});
            this.rand_positions.push({ x: pos.x + 1, y: pos.y });
            this.rand_positions.push({ x: pos.x, y: pos.y + 1 });
            this.rand_positions.push({ x: pos.x, y: pos.y - 1 });
        }

        return pos;
    }

    print(value) {
        // this.ctx.fillStyle = "black";
        // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        //viewport
        this.ctx_vp.fillStyle = 'black';
        this.ctx_vp.fillRect(0, 0, this.viewport.width, this.viewport.height);
        const { settings } = store.getState();

        const viewport_start_x = this.player.x - Math.floor(settings.orientation ? VIEWPORT_WIDTH/2 : VIEWPORT_HEIGHT/2);
        const viewport_start_y = this.player.y - Math.floor(settings.orientation ? VIEWPORT_HEIGHT/2 : VIEWPORT_WIDTH/2);
        const viewport_end_x = viewport_start_x + (settings.orientation ? VIEWPORT_WIDTH : VIEWPORT_HEIGHT);
        const viewport_end_y = viewport_start_y + (settings.orientation ? VIEWPORT_HEIGHT : VIEWPORT_WIDTH);

        this.world.forEach((row,i) => {
            const draw_view_y_flag = i >= viewport_start_y - 1 && i <= viewport_end_y;
            row.forEach((el,j) => { 
                const draw_view_x_flag = j >= viewport_start_x - 1  && j <= viewport_end_x;
                if (draw_view_y_flag && draw_view_x_flag) {
                    let pos_x = (j - viewport_start_x)*BLOCK_WIDTH;
                    let pos_y = (i - viewport_start_y)*BLOCK_WIDTH;

                    if (this.player.animation)
                        switch(this.player.merphy_state) {
                            case MOVE_RIGHT:
                            case FORCE_RIGHT:
                                pos_x -= BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                                break;
                            case MOVE_LEFT:
                            case FORCE_LEFT:
                                pos_x += BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                                break;
                            case MOVE_UP:
                            case FORCE_UP:
                                pos_y += BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                                break;
                            case MOVE_DOWN:
                            case FORCE_DOWN:
                                pos_y -= BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                                break;
                        }

                    switch (el.char) {
                        case SCISSORS:
                            if (el.animation)
                                switch(el.dir) {
                                    case RIGHT:
                                        pos_x += BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                                        break;
                                    case LEFT:
                                        pos_x -= BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                                        break;
                                    case UP:
                                        pos_y -= BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                                        break;
                                    case DOWN:
                                        pos_y += BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                                        break;
                                }
                            this.ctx_vp.drawImage(el.img, BLOCK_WIDTH * el.state, DIRS.indexOf(el.dir) * BLOCK_WIDTH, BLOCK_WIDTH, BLOCK_WIDTH, pos_x, pos_y,BLOCK_WIDTH, BLOCK_WIDTH);
                            break;
                        case ELECTRON:
                            if (el.animation)
                                switch(el.dir) {
                                    case RIGHT:
                                        pos_x += BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                                        break;
                                    case LEFT:
                                        pos_x -= BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                                        break;
                                    case UP:
                                        pos_y -= BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                                        break;
                                    case DOWN:
                                        pos_y += BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                                        break;
                                }
                            this.ctx_vp.drawImage(el.img, BLOCK_WIDTH * el.state, 0, BLOCK_WIDTH, BLOCK_WIDTH, pos_x, pos_y,BLOCK_WIDTH, BLOCK_WIDTH);
                            break;
                        case GROUND:
                            this.ctx_vp.drawImage(el.img, pos_x, pos_y,BLOCK_WIDTH, BLOCK_WIDTH);
                            break;
                        case WALL:
                        case PART:
                            this.ctx_vp.drawImage(el.img, pos_x, pos_y,BLOCK_WIDTH, BLOCK_WIDTH);
                            break;
                        case BREAK:
                            this.ctx_vp.drawImage(el.img, pos_x, pos_y,BLOCK_WIDTH, BLOCK_WIDTH);
                            break;
                        case ROCK:
                        case ORANGE_DISK:
                            if (el.right) pos_x += BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                            else if (el.left) pos_x -= BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH ;
                            else if (el.falling) pos_y += BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH; 
                            this.ctx_vp.drawImage(el.img, pos_x, pos_y,BLOCK_WIDTH, BLOCK_WIDTH);
                            break;
                        case YELLOW_DISK:
                            if (el.move)
                                switch(this.player.merphy_state) {
                                    case FORCE_RIGHT:
                                        pos_x += BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                                        break;
                                    case FORCE_LEFT:
                                        pos_x -= BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                                        break;
                                    case FORCE_UP:
                                        pos_y -= BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                                        break;
                                    case FORCE_DOWN:
                                        pos_y += BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                                        break;
                                }
                            this.ctx_vp.drawImage(el.img, pos_x, pos_y,BLOCK_WIDTH, BLOCK_WIDTH);
                            break;
                        case FOOD:
                        case RED_DISK:
                            if (el.right) pos_x += BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                            else if (el.left) pos_x -= BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                            else if (el.falling) pos_y += BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH; 
                            this.ctx_vp.drawImage(el.img, el.state * BLOCK_WIDTH, 0, BLOCK_WIDTH, BLOCK_WIDTH, pos_x, pos_y,BLOCK_WIDTH, BLOCK_WIDTH);
                            break;
                        case PLAYER:
                            switch(el.merphy_state) {
                                case MOVE_RIGHT:
                                case FORCE_RIGHT:
                                    pos_x += BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                                    break;
                                case MOVE_LEFT:
                                case FORCE_LEFT:
                                    pos_x -= BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                                    break;
                                case MOVE_UP:
                                case FORCE_UP:
                                    pos_y -= BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                                    break;
                                case MOVE_DOWN:
                                case FORCE_DOWN:
                                    pos_y += BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                                    break;
                            }
                            this.ctx_vp.drawImage(el.img, el.state * BLOCK_WIDTH, el.dy * BLOCK_WIDTH, BLOCK_WIDTH, BLOCK_WIDTH, pos_x, pos_y,BLOCK_WIDTH, BLOCK_WIDTH);
                            break;
                        case FIRE:
                            this.ctx_vp.drawImage(el.img, BLOCK_WIDTH * el.state, 0, BLOCK_WIDTH, BLOCK_WIDTH, pos_x, pos_y, BLOCK_WIDTH, BLOCK_WIDTH);
                            break;
                        case PC:
                            this.ctx_vp.drawImage(el.img, BLOCK_WIDTH * el.state, BLOCK_WIDTH * el.dy, BLOCK_WIDTH, BLOCK_WIDTH, pos_x, pos_y, BLOCK_WIDTH, BLOCK_WIDTH);
                            break;
                        case BUG:
                            this.ctx_vp.drawImage(el.img, BLOCK_WIDTH * el.state, 0, BLOCK_WIDTH, BLOCK_WIDTH, pos_x, pos_y, BLOCK_WIDTH, BLOCK_WIDTH);
                            break;
                        case EXIT:
                            this.ctx_vp.drawImage(el.img, pos_x, pos_y,BLOCK_WIDTH, BLOCK_WIDTH);
                            break;
                        case PORTAL:
                            this.ctx_vp.drawImage(el.img, BLOCK_WIDTH * el.state, 0, BLOCK_WIDTH, BLOCK_WIDTH, pos_x, pos_y, BLOCK_WIDTH, BLOCK_WIDTH);
                            break;
                    }
               
                               
                }
                
            })
        })

        return this.world.map(row => row.join(EMPTY)).join('\n') + '\nscores: ' + store.getState().score + '  Time: ' + this.getTime();
    }

    check_predators() {
        const died = this.PREDATORS.find(rock => !rock.still_alive);
        if (died) {
            this.EXPLOSIONS.push(new Explosion(died.y, died.x));
            this.EXPLOSIONS.push(new Explosion(died.y+1, died.x));
            this.EXPLOSIONS.push(new Explosion(died.y-1, died.x));
            this.EXPLOSIONS.push(new Explosion(died.y, died.x+1));
            this.EXPLOSIONS.push(new Explosion(died.y, died.x-1));
            this.EXPLOSIONS.push(new Explosion(died.y+1, died.x-1));
            this.EXPLOSIONS.push(new Explosion(died.y+1, died.x+1));
            this.EXPLOSIONS.push(new Explosion(died.y-1, died.x-1));
            this.EXPLOSIONS.push(new Explosion(died.y - 1, died.x + 1));

            const arr = [ {x: died.x, y: died.y }, {x: died.x, y: died.y + 1 }, {x: died.x, y: died.y -1 }, {x: died.x + 1, y: died.y },{x: died.x - 1, y: died.y }, {x: died.x-1, y: died.y+1 },{x: died.x + 1, y: died.y + 1},{x: died.x -1, y: died.y -1 },{x: died.x+1, y: died.y -1 }]
            
            this.GROUND = this.GROUND.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            this.ROCKS = this.ROCKS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            this.DISKS = this.DISKS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            this.STARS = this.STARS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));

            this.BOMBS = this.BOMBS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));

            this.BUGS = this.BUGS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));

            this.BREAKS = this.BREAKS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            this.PORTALS = this.PORTALS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            this.PARTS = this.PARTS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            Player.off = arr.some(el => el.x === this.player.x && el.y === this.player.y);
        }
        this.PREDATORS = this.PREDATORS.filter(predator => predator.still_alive);
    }

    check_electrons() {
        const died = this.ELECTRONS.find(rock => !rock.still_alive);
        if (died) {
            this.STARS.push(new Star(died.y, died.x));
            this.STARS.push(new Star(died.y+1, died.x));
            this.STARS.push(new Star(died.y-1, died.x));
            this.STARS.push(new Star(died.y, died.x+1));
            this.STARS.push(new Star(died.y, died.x-1));
            this.STARS.push(new Star(died.y+1, died.x-1));
            this.STARS.push(new Star(died.y+1, died.x+1));
            this.STARS.push(new Star(died.y-1, died.x-1));
            this.STARS.push(new Star(died.y - 1, died.x + 1));

            const arr = [ {x: died.x, y: died.y }, {x: died.x, y: died.y + 1 }, {x: died.x, y: died.y -1 }, {x: died.x + 1, y: died.y },{x: died.x - 1, y: died.y }, {x: died.x-1, y: died.y+1 },{x: died.x + 1, y: died.y + 1},{x: died.x -1, y: died.y -1 },{x: died.x+1, y: died.y -1 }]
            
            this.GROUND = this.GROUND.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            this.ROCKS = this.ROCKS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            this.DISKS = this.DISKS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            // this.STARS = this.STARS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            this.BOMBS = this.BOMBS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));

            this.BUGS = this.BUGS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            this.PORTALS = this.PORTALS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            this.BREAKS = this.BREAKS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            this.PARTS = this.PARTS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            Player.off = arr.some(el => el.x === this.player.x && el.y === this.player.y);
        }
        this.ELECTRONS = this.ELECTRONS.filter(predator => predator.still_alive);
    }


    check_food() {
        this.STARS = this.STARS.filter(star => star.still_here);
    }

    check_bombs() {
        const { bombs } = store.getState();
        this.BOMBS = this.BOMBS.filter(bomb => bomb.still_here);
        if (bombs.bomb) {
            this.BOMBS.push(bombs.bomb);
            store.dispatch({ type: CLEAR_BOMB });
        }

        const died = this.BOMBS.find(bomb => bomb.counter === 0);
        if (died) {
            this.EXPLOSIONS.push(new Explosion(died.y, died.x));
            this.EXPLOSIONS.push(new Explosion(died.y+1, died.x));
            this.EXPLOSIONS.push(new Explosion(died.y-1, died.x));
            this.EXPLOSIONS.push(new Explosion(died.y, died.x+1));
            this.EXPLOSIONS.push(new Explosion(died.y, died.x-1));
            this.EXPLOSIONS.push(new Explosion(died.y+1, died.x-1));
            this.EXPLOSIONS.push(new Explosion(died.y+1, died.x+1));
            this.EXPLOSIONS.push(new Explosion(died.y-1, died.x-1));
            this.EXPLOSIONS.push(new Explosion(died.y - 1, died.x + 1));

            const arr = [ {x: died.x, y: died.y }, {x: died.x, y: died.y + 1 }, {x: died.x, y: died.y -1 }, {x: died.x + 1, y: died.y },{x: died.x - 1, y: died.y }, {x: died.x-1, y: died.y+1 },{x: died.x + 1, y: died.y + 1},{x: died.x -1, y: died.y -1 },{x: died.x+1, y: died.y -1 }]
            
            this.GROUND = this.GROUND.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            this.ROCKS = this.ROCKS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            this.DISKS = this.DISKS.map(G => arr.some(el => el.x === G.x && el.y === G.y) ? {...G, still_alive: false } : G);
            this.STARS = this.STARS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            this.ELECTRONS = this.ELECTRONS.map(G => arr.some(el => el.x === G.x && el.y === G.y) ? {...G, still_alive: false } : G);
            this.BOMBS = this.BOMBS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            this.PORTALS = this.PORTALS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            this.BUGS = this.BUGS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));

            this.BREAKS = this.BREAKS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            this.PARTS = this.PARTS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            Player.off = arr.some(el => el.x === this.player.x && el.y === this.player.y);
        }
    }

    check_rocks() {
        this.ROCKS = this.ROCKS.filter(rock => !rock.killer);
    }

    check_disks() {
        
        const died = this.DISKS.find(rock => !rock.still_alive);
        if (died) {
            this.EXPLOSIONS.push(new Explosion(died.y, died.x));
            this.EXPLOSIONS.push(new Explosion(died.y+1, died.x));
            this.EXPLOSIONS.push(new Explosion(died.y-1, died.x));
            this.EXPLOSIONS.push(new Explosion(died.y, died.x+1));
            this.EXPLOSIONS.push(new Explosion(died.y, died.x-1));
            this.EXPLOSIONS.push(new Explosion(died.y+1, died.x-1));
            this.EXPLOSIONS.push(new Explosion(died.y+1, died.x+1));
            this.EXPLOSIONS.push(new Explosion(died.y-1, died.x-1));
            this.EXPLOSIONS.push(new Explosion(died.y - 1, died.x + 1));

            const arr = [ {x: died.x, y: died.y }, {x: died.x, y: died.y + 1 }, {x: died.x, y: died.y -1 }, {x: died.x + 1, y: died.y },{x: died.x - 1, y: died.y }, {x: died.x-1, y: died.y+1 },{x: died.x + 1, y: died.y + 1},{x: died.x -1, y: died.y -1 },{x: died.x+1, y: died.y -1 }]
            
            this.GROUND = this.GROUND.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            this.ROCKS = this.ROCKS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));

            this.DISKS = this.DISKS.filter(predator => predator.still_alive);

            this.DISKS = this.DISKS.map(G => arr.some(el => el.x === G.x && el.y === G.y) ? { ...G, still_alive: false } : G);

            this.BOMBS = this.BOMBS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            this.PORTALS = this.PORTALS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            this.BUGS = this.BUGS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            
            this.STARS = this.STARS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            this.BREAKS = this.BREAKS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            this.PARTS = this.PARTS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            Player.off = arr.some(el => el.x === this.player.x && el.y === this.player.y);
        }
        
    }

    check_yellow_disks() {
        
        const some = this.YELLOW_DISKS.find(rock => !rock.still_alive);
        if (some) {
            this.YELLOW_DISKS.forEach(died => {
                this.EXPLOSIONS.push(new Explosion(died.y, died.x));
                this.EXPLOSIONS.push(new Explosion(died.y + 1, died.x));
                this.EXPLOSIONS.push(new Explosion(died.y - 1, died.x));
                this.EXPLOSIONS.push(new Explosion(died.y, died.x + 1));
                this.EXPLOSIONS.push(new Explosion(died.y, died.x - 1));
                this.EXPLOSIONS.push(new Explosion(died.y + 1, died.x - 1));
                this.EXPLOSIONS.push(new Explosion(died.y + 1, died.x + 1));
                this.EXPLOSIONS.push(new Explosion(died.y - 1, died.x - 1));
                this.EXPLOSIONS.push(new Explosion(died.y - 1, died.x + 1));

                const arr = [{ x: died.x, y: died.y }, { x: died.x, y: died.y + 1 }, { x: died.x, y: died.y - 1 }, { x: died.x + 1, y: died.y }, { x: died.x - 1, y: died.y }, { x: died.x - 1, y: died.y + 1 }, { x: died.x + 1, y: died.y + 1 }, { x: died.x - 1, y: died.y - 1 }, { x: died.x + 1, y: died.y - 1 }]
                
                this.GROUND = this.GROUND.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
                this.ROCKS = this.ROCKS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));

                this.DISKS = this.DISKS.filter(predator => predator.still_alive);

                this.DISKS = this.DISKS.map(G => arr.some(el => el.x === G.x && el.y === G.y) ? { ...G, still_alive: false } : G);

                this.BOMBS = this.BOMBS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));

                this.BUGS = this.BUGS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
                this.PORTALS = this.PORTALS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
                this.STARS = this.STARS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
                this.BREAKS = this.BREAKS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
                this.PARTS = this.PARTS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
                Player.off = arr.some(el => el.x === this.player.x && el.y === this.player.y);
                
            });
            this.YELLOW_DISKS = [];
        }
        
    }

    check_bugs() {
        const { x, y } = this.player;
        const died = this.BUGS.find(bug => x === bug.x && y === bug.y && bug.killer);
        if (died) {
            this.EXPLOSIONS.push(new Explosion(died.y, died.x));
            this.EXPLOSIONS.push(new Explosion(died.y+1, died.x));
            this.EXPLOSIONS.push(new Explosion(died.y-1, died.x));
            this.EXPLOSIONS.push(new Explosion(died.y, died.x+1));
            this.EXPLOSIONS.push(new Explosion(died.y, died.x-1));
            this.EXPLOSIONS.push(new Explosion(died.y+1, died.x-1));
            this.EXPLOSIONS.push(new Explosion(died.y+1, died.x+1));
            this.EXPLOSIONS.push(new Explosion(died.y-1, died.x-1));
            this.EXPLOSIONS.push(new Explosion(died.y - 1, died.x + 1));

            const arr = [ {x: died.x, y: died.y }, {x: died.x, y: died.y + 1 }, {x: died.x, y: died.y -1 }, {x: died.x + 1, y: died.y },{x: died.x - 1, y: died.y }, {x: died.x-1, y: died.y+1 },{x: died.x + 1, y: died.y + 1},{x: died.x -1, y: died.y -1 },{x: died.x+1, y: died.y -1 }]
            
            this.GROUND = this.GROUND.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            this.ROCKS = this.ROCKS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));

            this.DISKS = this.DISKS.filter(predator => predator.still_alive);

            this.DISKS = this.DISKS.map(G => arr.some(el => el.x === G.x && el.y === G.y) ? { ...G, still_alive: false } : G);

            this.BOMBS = this.BOMBS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            
            this.BUGS = this.BUGS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            this.PORTALS = this.PORTALS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            this.STARS = this.STARS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            this.BREAKS = this.BREAKS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            this.PARTS = this.PARTS.filter(G => !arr.some(el => el.x === G.x && el.y === G.y));
            this
           
            Player.off = true;
          
        }

        const just_to_filter = this.BUGS.find(bug => x === bug.x && y === bug.y);
        if (just_to_filter) this.BUGS = this.BUGS.filter(el => el.x !== just_to_filter.x && el.y !== just_to_filter.y)
    }

    check_player() {
        if (Player.off && Player.flag) {
            Player.flag = false;
        } else if (Player.flag) {
            this.world[this.player.y][this.player.x] = this.player;
        } else {
            this.player.animation = false;
            // sleep(2000);
            const timeout = setTimeout(() => { stopGame(); clearTimeout(timeout);}, 1000); 
            Time.innerText = "00:00";
        }
             
    }

    check_explosions() {
        this.EXPLOSIONS = this.EXPLOSIONS.filter(exp => exp.still_here);
    }

    tick() {
        this.PREDATORS.forEach(PREDATOR => PREDATOR.changeState(this.world));
        this.ELECTRONS.forEach(PREDATOR => PREDATOR.changeState(this.world));
        this.ROCKS.forEach(ROCK => ROCK.changeState(this.world, this.player));
        this.DISKS.forEach(DISK => {
            if (DISK.changeState) DISK.changeState(this.world, this.player);
        });
        this.YELLOW_DISKS.forEach(DISK => {
            if (DISK.changeState) DISK.changeState(this.world, this.player);
        });
        this.STARS.forEach(STAR => STAR.changeState(this.world));
        this.BOMBS.forEach(BOMB => BOMB.changeState(this.world));
        this.BUGS.forEach(bug => bug.changeState());
        this.EXPLOSIONS.forEach(EXP => EXP.changeState());
        this.ip && this.PLAYERS.forEach(PLAYER => {
            PLAYER.changeState(this.world);
            PLAYER.changePic();
        });
        this.player.changeState(this.world);
        this.player.changePic();
        this.COMPUTER.changeState();

        this.check_food();
        this.check_bombs();
        this.world = this.generate();
        this.check_player();
        this.check_predators();
        this.check_electrons();
        this.check_rocks();
        this.check_disks();
        this.check_yellow_disks();
        this.check_bugs();
        this.check_explosions();

    }

}



