import { getJson} from './ExternalServices.mjs';

const particles = 'https://corsproxy.io/?https://pdgapi.lbl.gov';

export default class Particle {
    constructor(id, name, category, src) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.src = src;
        this.data = null;
    }

    async fetchDetails() {
        const url = `${particles}/summaries/${this.id}`;
        this.data = await getJson(url);
    }

    renderCard() {

        if (!this.data) {
            return `
                <div class='particle-card loading'>
                    <div class="loader"></div>
                    <span class="loading-text">Fetching ${this.name}...</span>
                </div>
            `;
        };
    
        return `
            <div class='particle-card' style="border: 1px solid #ccc; padding: 15px; border-radius: 8px; margin: 10px;">
                <h2 style="margin-top: 0;">${this.name}</h2>
                <div class="particleImage">
                    <img src="images/${this.src}" alt="${this.name}">
                </div>
                <p><small>PDG ID: ${this.data.pdgid}</small></p>
                <button class="details-btn" data-id="${this.id}">See Properties</button>
                <div id="details-${this.id}" class="details-content hidden">
                    ${this._renderProperties()}
                </div>
            </div>
        `;
    }

    _renderProperties() {
        const props = this.data.summaries?.properties || [];
        return props
            .filter(p => p.pdg_values?.[0]?.value_text)
            .map(p => `
                <div class="prop-item">
                    <small>${p.description}</small>
                    <span>${p.pdg_values[0].value_text} ${p.pdg_values[0].unit || ''}</span>
                </div>
            `).join('');
    }
}
