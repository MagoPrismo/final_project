import Particle from './Particles.mjs';

async function init() {
    const app = document.querySelector('#app');

    const electron = new Particle('S003M');

    await electron.init();
    app.innerHTML = electron.renderCard();
}

init();