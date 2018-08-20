import keydown from './Keydown';

function handleControls(e) {
    if(e.keyCode === 37) keydown.left = e.type === "keydown" ? true : false;    
    if(e.keyCode === 39) keydown.right = e.type === "keydown" ? true : false;
    if(e.keyCode === 32) keydown.space = e.type === "keydown" ? true : false;
}

export function addEventListeners() {
    window.addEventListener('keydown', handleControls);
    window.addEventListener('keyup', handleControls);
}