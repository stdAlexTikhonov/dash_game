import { FRAME, LEFT, UP, FORCE_LEFT, RIGHT, FORCE_RIGHT, DOWN, STOP } from './constants';
import { THE_WORLD } from "./index";
let frame = FRAME;

document.onkeydown = e => {
    const player = THE_WORLD.player;
    
    switch (e.keyCode) {
        case 37:
            if (THE_WORLD.player.dir === LEFT) THE_WORLD.player.force = true; 
            else THE_WORLD.player.dir = LEFT;
            THE_WORLD.ws && THE_WORLD.ws.send(JSON.stringify({ method: "CD", dir: LEFT, token: THE_WORLD.player.token, x: player.x, y: player.y }))
            break;
        case 38:
            if (THE_WORLD.player.dir === UP) THE_WORLD.player.force = true;
            else THE_WORLD.player.dir = UP;
            THE_WORLD.ws && THE_WORLD.ws.send(JSON.stringify({ method: "CD", dir: UP, token: THE_WORLD.player.token, x: player.x, y: player.y }))
            break;
        case 39:
            if (THE_WORLD.player.dir === RIGHT) THE_WORLD.player.force = true;
            else THE_WORLD.player.dir = RIGHT;
            THE_WORLD.ws && THE_WORLD.ws.send(JSON.stringify({ method: "CD", dir: RIGHT, token: THE_WORLD.player.token, x: player.x, y: player.y }))
            break;
        case 40:
            if (THE_WORLD.player.dir === DOWN) THE_WORLD.player.force = true;
            else THE_WORLD.player.dir = DOWN;
            THE_WORLD.ws && THE_WORLD.ws.send(JSON.stringify({ method: "CD", dir: DOWN, token: THE_WORLD.player.token, x: player.x, y: player.y }))
            break;
        case 190:
            if (window.pause) {
                
                if (frame < FRAME) { 
                    frame++; 
                    document.getElementsByTagName('pre')[0].innerText = window.prevStates[frame]
                }
                else {
                    THE_WORLD.tick();
                    document.getElementsByTagName('pre')[0].innerText = THE_WORLD.print();
                    prevStates.push(THE_WORLD.print())
                    if (prevStates.length > 10) prevStates = prevStates.slice(1, prevStates.length)
                }
            }
            break;
        case 188:
            if (window.pause) {
                if (frame > 0) { frame--; console.log(frame); }
                document.getElementsByTagName('pre')[0].innerText = window.prevStates[frame];
            }
            break;
    }
    
};

document.onkeyup = e => {
    if (e.shiftKey === false) { frame = FRAME; }
    
}

// document.addEventListener('DOMContentLoaded', function() {
//     THE_WORLD.container.onpointerdown = e => {
//         pointerX = e.offsetX;
//         pointerY = e.offsetY;
//     };

//     THE_WORLD.container.onpointerup = e => {
//         const diffLeft = e.offsetX - pointerX;
//         const diffUp = e.offsetY - pointerY;
//         const vertical = Math.abs(diffLeft) < Math.abs(diffUp);


//         if (vertical) {
//             if (e.offsetY > pointerY) {
//                 if (THE_WORLD.player.dir === DOWN) THE_WORLD.player.force = true;
//                 else THE_WORLD.player.dir = DOWN;
//                 THE_WORLD.ws && THE_WORLD.ws.send(JSON.stringify({ method: "CD", dir: DOWN, token: THE_WORLD.player.token, x: player.x, y: player.y }))
//             } else {
//                 if (THE_WORLD.player.dir === UP) THE_WORLD.player.force = true;
//                 else THE_WORLD.player.dir = UP;
//                 THE_WORLD.ws && THE_WORLD.ws.send(JSON.stringify({ method: "CD", dir: UP, token: THE_WORLD.player.token, x: player.x, y: player.y }))
//             }
//         } else {
//             if (e.offsetX > pointerX) {
//                 if (THE_WORLD.player.dir === RIGHT) THE_WORLD.player.force = true;
//                 else THE_WORLD.player.dir = RIGHT;
//                 THE_WORLD.ws && THE_WORLD.ws.send(JSON.stringify({ method: "CD", dir: RIGHT, token: THE_WORLD.player.token, x: player.x, y: player.y }))
//             } else {
//                 if (THE_WORLD.player.dir === LEFT) THE_WORLD.player.force = true; 
//                 else THE_WORLD.player.dir = LEFT;
//                 THE_WORLD.ws && THE_WORLD.ws.send(JSON.stringify({ method: "CD", dir: LEFT, token: THE_WORLD.player.token, x: player.x, y: player.y }))
//             }
//         }


//     };

// });
