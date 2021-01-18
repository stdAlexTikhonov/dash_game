import { isMobile } from "../../helpers";
import { draw, audio, store } from "../../index";
export const Pause = document.createElement('i');
Pause.className = "material-icons waves-effect waves-light";
Pause.innerHTML = 'p';
Pause.style.color = 'white';


Pause.addEventListener(isMobile ? 'touchstart' : 'click',_ => {
  const { settings } = store.getState();
  if (window.pause) {
    window.pause = false;
    Pause.innerHTML = 'p';
    settings.music && audio.play();
    draw();
  } else {
    settings.music && audio.pause();
    window.pause = true;  
    Pause.innerHTML = 's';
    window.cancelAnimationFrame(window.myReq);
  }

})
