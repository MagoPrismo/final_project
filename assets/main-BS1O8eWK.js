(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();async function n(i){const t=await fetch(i);if(t.ok)return await t.json();throw new Error("Bad Response")}const c="/pdgapi";class l{constructor(t,r,o,e){this.id=t,this.name=r,this.category=o,this.src=e,this.data=null}async fetchDetails(){const t=`${c}/summaries/${this.id}`;this.data=await n(t)}renderCard(){if(!this.data||!this.data.summaries)return`<p>Error loading ${this.customName}</p>`;const r=this.data.summaries.properties.map(o=>{const e=o.pdg_values?.[0]||{};return`
                <div class="property-row" style="margin-bottom: 8px; border-bottom: 1px solid #eee;">
                    <small style="color: #666; display: block;">${o.description}</small>
                    <span style="font-weight: bold;">${e.value_text||"N/A"} ${e.unit||""}</span>
                </div>
            `}).join("");return`
            <div class='particle-card' style="border: 1px solid #ccc; padding: 15px; border-radius: 8px; margin: 10px;">
                <h2 style="margin-top: 0;">${this.name}</h2>
                <img src="/images/${this.src}" alt="${this.name}">
                <p><small>PDG ID: ${this.data.pdgid}</small></p>
                <div class="properties-container">
                    ${r}
                </div>
            </div>
        `}}document.querySelector("#app");const p="./json/particlesId.json",d=i=>new Promise(t=>setTimeout(t,i));async function u(){try{const t=await(await fetch(p)).json();for(const r of t){const o=new l(r.pdgId,r.name,r.category,r.src);await o.fetchDetails();const e=document.querySelector(`#${r.category}`);e.innerHTML+=o.renderCard(),await d(500)}}catch{console.error("Error while populating the site.")}}u();
