//width: 460px
//height: 470px
import "./styles/styles.css"
import background_audio from './assets/audio/back.mp3';
import { World } from "./world";
import { Player } from "./player"; 
import { Star } from "./star";
import { GameScreen } from "./Components/Screens/GameScreen";
import { MainScreen } from "./Components/Screens/MainScreen";
import { LevelsScreen } from "./Components/Screens/Levels";
import { ScoresComponent } from "./Components/Scores";
import { createStore } from "./store";
import { appReducer } from "./reducers";

import {
    WIDTH, HEIGHT, PREDATOR_QUANTITY,
    ROCKS_QUANTITY, STARS_QUANTITY,
    BREAKS_QUANTITY, STEPS
} from "./constants";

export const audio = new Audio(background_audio);
export const store = createStore(appReducer);

store.dispatch({ type: 'Init' });

store.subscribe(() => {
    console.log(store.getState());
})

let frames = 0;
window.prevStates = [];

document.body.appendChild(MainScreen);


window.pause = false;
window.myReq = null;
export let THE_WORLD;
export const startGame = (ip, players_quantity) => {
    THE_WORLD = new World(HEIGHT, WIDTH, PREDATOR_QUANTITY, ROCKS_QUANTITY, STARS_QUANTITY, BREAKS_QUANTITY, ip, players_quantity);
    Player.off = false;
    Player.flag = true;
    Star.scores = 0;
    prevStates.push(THE_WORLD.print());
    document.body.removeChild(GameScreen);
    window.pause = false;
    THE_WORLD.startTimer();
    draw();
}

let frame = 0;

export const draw = () => {
    
    if (!window.pause) {
        if (frames % STEPS === 0 && THE_WORLD.start) THE_WORLD.tick(); 
            
        prevStates.push(THE_WORLD.print(frame))
        if (prevStates.length > 10) prevStates = prevStates.slice(1, prevStates.length)
        frame = frame < STEPS - 1 ? frame + 1 : 0;
    }
     
    if (!window.pause) window.myReq = window.requestAnimationFrame(draw);   
   
    frames++;
}

export const stopGame = () => {
    THE_WORLD.stopTimer(); 
    THE_WORLD.ws && THE_WORLD.ws.send(JSON.stringify({ method: "CLOSE", token: THE_WORLD.player.token}));
  
    window.cancelAnimationFrame(window.myReq);
    window.pause = true;

    ScoresComponent.innerHTML = 'Your score: ' + Star.scores + '<br>' + 'Your time: ' + THE_WORLD.getTime();

    THE_WORLD.container.parentNode &&
        document.body.removeChild(THE_WORLD.container);
    
    document.body.appendChild(GameScreen);
}







