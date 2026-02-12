import Particle from './Particles.mjs';

const app = document.querySelector('#app');
const pdgIds = './json/particlesId.json';
// we have to wait a bit 
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function populateParticles() {
    try {
        const response = await fetch(pdgIds);
        const particles = await response.json();

        for (const part of particles) {
<<<<<<< HEAD
            const p = new Particle(part.pdgId, part.name, part.category, part.src);
            await p.fetchDetails();

            const section = document.querySelector(`#${part.category}`);

            section.innerHTML += p.renderCard();

            await sleep(500);
=======
            const p = new Particle(part.pdgId, part.name);
            await p.fetchDetails();

            app.innerHTML += p.renderCard();

            await sleep(1000);
>>>>>>> 382d295f665edab210ccc7a2b05319e21a4b73e8
        }
    } catch (error) {
        console.error("Error while populating the site.")
    }
}

populateParticles();