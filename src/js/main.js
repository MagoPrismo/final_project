import Particle from './Particles.mjs';

const pdgIds = './json/particlesId.json';
 
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function populateParticles() {
    try {
        const response = await fetch(pdgIds);
        const particles = await response.json();

        for (const part of particles) {
            const p = new Particle(part.pdgId, part.name, part.category, part.src);
            const section = document.querySelector(`#${part.category}`);
            
            const placeholder = document.createElement('div');
            placeholder.id = `container-${part.pdgId}`;
            placeholder.innerHTML = p.renderCard(); // add spinner 
            section.appendChild(placeholder);

            await p.fetchDetails();
            document.getElementById(`container-${part.pdgId}`).innerHTML = p.renderCard();

            await sleep(500); // we have to wait a bit - the api don't let us to load more then two particles per second
        }
    } catch (error) {
        console.error("Error while populating the site.")
    }
}

populateParticles();

// buttons to see the properties
document.querySelector('#app').addEventListener('click', (e) => {
    if (e.target.classList.contains('details-btn')) {
        const particleId = e.target.getAttribute('data-id');
        const detailsDiv = document.querySelector(`#details-${particleId}`);
        
        detailsDiv.classList.toggle('hidden');
        
        e.target.textContent = detailsDiv.classList.contains('hidden') 
            ? 'See Properties' 
            : 'Close';
    }
});

// filters
const filterLinks = document.querySelectorAll('.nav-link[data-filter]');

filterLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const filter = e.target.getAttribute("data-filter");

        const allSections = document.querySelectorAll(".particleCards");

        allSections.forEach(section => {
            if (filter === 'All' || section.id.includes(filter)) {
                section.style.display = ''; //show
            } else {
                section.style.display = 'none'; // hide
            }
        })
    })
})

// the search functions

const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");

function peformSearch(){
    const term = searchInput.value.toLowerCase();
    const allCards = document.querySelectorAll(".particle-card");
    const allSections = document.querySelectorAll(".particleCards");

    allCards.forEach(card => {
        const name = card.querySelector("h2").textContent.toLowerCase();
        const id = card.querySelector("p").textContent.toLocaleLowerCase();

        if (term === "" || name.includes(term) || id.includes(term)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}

searchButton.addEventListener("click", (e) => {
    e.preventDefault();

    peformSearch();
})

