import { store } from "../../../index";
import { settings as settings_ } from "./settings";
import { isMobile } from "../../../helpers";

export const Settings = document.createElement('div');
Settings.style.display = 'flex';
Settings.style.justifyContent = 'space-around';
Settings.style.alignItems = 'flex-start';
Settings.style.fontFamily = 'Roboto';
Settings.style.position = 'relative';
Settings.style.width = "100%";
Settings.style.height = "100vh";
Settings.style.paddingTop = '50px';
Settings.style.overflow = 'auto';
Settings.style.position = 'absolute';
Settings.style.top = 0;
Settings.style.left = 0;
Settings.style.background = 'black';

const filtered = isMobile ? settings_.filter(item => item.mobile) : settings_;

filtered.forEach((setting) => {
  const setting_block = document.createElement('div');
  setting_block.style.height = '50px';
  setting_block.style.width = '50px';
  setting_block.style.backgroundSize = '100%';
  setting_block.style.backgroundImage = `url(${setting.initial ? setting.img_on : setting.img_off})`;
  
  setting_block.addEventListener(isMobile ? 'touchstart' : 'click',(e) => {
    store.dispatch({ type: setting.action });
    const { settings } = store.getState();
    if (setting.name === 'Music') {
      setting_block.style.backgroundImage = `url(${settings.music ? setting.img_on : setting.img_off})`;
    } else if (setting.name === 'Orientation') {
      setting_block.style.backgroundImage = `url(${settings.orientation ? setting.img_on : setting.img_off})`;
    }
  });

  Settings.appendChild(setting_block);
});


const close = document.createElement('div');
close.style.color = 'white';
close.innerHTML = 'x';
close.style.position = 'absolute';
close.style.top = '10px';
close.style.right = '10px';
close.style.fontSize = '40px'
close.style.lineHeight = '20px';

close.addEventListener(isMobile ? 'touchstart' : 'click',() => {
  document.body.removeChild(Settings);
});

Settings.appendChild(close);