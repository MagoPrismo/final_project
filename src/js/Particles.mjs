import { getJson} from './ExternalServices.mjs';

const particles = '/pdgapi';

export default class Particle {
    constructor(id) {
        this.id = id;
        this.data = null;
    }

    async init() {
        const url = `${particles}/summaries/${this.id}`;
        this.data = await getJson(url);
    }

    renderCard() {
        if (!this.data) return `<p>Error loading ${this.id}</p>`;

        const mainValue = this.data.pdg_values[0];
        return `
            <div class='particle-card'>
                <h3>${this.data.description}</h3>
                <p>ID: ${this.data.pdgid}</p>
                <p>Value: ${mainValue.value_text} ${mainValue.unit}</p>
            </div>
        `;
    }
}
