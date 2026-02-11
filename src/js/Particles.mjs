import { getJson} from './ExternalServices.mjs';

const particles = '/pdgapi';

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
        if (!this.data || !this.data.summaries) return `<p>Error loading ${this.customName}</p>`;
    
        // 1. Pegamos a lista de propriedades da partícula
        const props = this.data.summaries.properties;
    
        // 2. Criamos o HTML para TODAS as propriedades dinamicamente
        const propertiesHtml = props.map(p => {
            // Cada propriedade pode ter vários valores, pegamos o primeiro (oficial)
            const val = p.pdg_values?.[0] || {};
            
            if (!val.value_text || val.value_text === '') return '';
            return `
                <div class="property-row" style="margin-bottom: 8px; border-bottom: 1px solid #eee;">
                    <small style="color: #666; display: block;">${p.description}</small>
                    <span style="font-weight: bold;">${val.value_text || 'N/A'} ${val.unit || ''}</span>
                </div>
            `;
        }).join('');
    
        // 3. Montamos o card final
        return `
            <div class='particle-card' style="border: 1px solid #ccc; padding: 15px; border-radius: 8px; margin: 10px;">
                <h2 style="margin-top: 0;">${this.name}</h2>
                <div class="particleImage">
                    <img src="/images/${this.src}" alt="${this.name}">
                </div>
                <p><small>PDG ID: ${this.data.pdgid}</small></p>
                <div class="properties-container">
                    ${propertiesHtml}
                </div>
            </div>
        `;
    }
}
