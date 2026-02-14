(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();async function o(i){const s=await fetch(i);if(s.ok)return await s.json();throw new Error("Bad Response")}const c="/pdgapi";class d{constructor(s,e,a,t){this.id=s,this.name=e,this.category=a,this.src=t,this.data=null}async fetchDetails(){const s=`${c}/summaries/${this.id}`;this.data=await o(s)}renderCard(){return this.data?`
            <div class='particle-card' style="border: 1px solid #ccc; padding: 15px; border-radius: 8px; margin: 10px;">
                <h2 style="margin-top: 0;">${this.name}</h2>
                <div class="particleImage">
                    <img src="/images/${this.src}" alt="${this.name}">
                </div>
                <p><small>PDG ID: ${this.data.pdgid}</small></p>
                <button class="details-btn" data-id="${this.id}">See Properties</button>
                <div id="details-${this.id}" class="details-content hidden">
                    ${this._renderProperties()}
                </div>
            </div>
        `:`
                <div class='particle-card loading'>
                    <div class="loader"></div>
                    <span class="loading-text">Fetching ${this.name}...</span>
                </div>
            `}_renderProperties(){return(this.data.summaries?.properties||[]).filter(e=>e.pdg_values?.[0]?.value_text).map(e=>`
                <div class="prop-item">
                    <small>${e.description}</small>
                    <span>${e.pdg_values[0].value_text} ${e.pdg_values[0].unit||""}</span>
                </div>
            `).join("")}}const l="./json/particlesId.json",p=i=>new Promise(s=>setTimeout(s,i));async function u(){try{const s=await(await fetch(l)).json();for(const e of s){const a=new d(e.pdgId,e.name,e.category,e.src),t=document.querySelector(`#${e.category}`),r=document.createElement("div");r.id=`container-${e.pdgId}`,r.innerHTML=a.renderCard(),t.appendChild(r),await a.fetchDetails(),document.getElementById(`container-${e.pdgId}`).innerHTML=a.renderCard(),await p(500)}}catch{console.error("Error while populating the site.")}}u();document.querySelector("#app").addEventListener("click",i=>{if(i.target.classList.contains("details-btn")){const s=i.target.getAttribute("data-id"),e=document.querySelector(`#details-${s}`);e.classList.toggle("hidden"),i.target.textContent=e.classList.contains("hidden")?"See Properties":"Close"}});const f=document.querySelectorAll(".nav-link[data-filter]");f.forEach(i=>{i.addEventListener("click",s=>{s.preventDefault();const e=s.target.getAttribute("data-filter");document.querySelectorAll(".particleCards").forEach(t=>{t.id.includes(e)||(t.style.display="none")})})});
