(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(r){if(r.ep)return;r.ep=!0;const i=e(r);fetch(r.href,i)}})();async function a(s){try{const t=await fetch(s);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return await t.json()}catch(t){throw console.error("Erro no fetch:",t),t}}const c="https://pdgapi.lbl.gov/pdgapi";class l{constructor(t,e,n,r){this.id=t,this.name=e,this.category=n,this.src=r,this.data=null}async fetchDetails(){const t=`${c}/summaries/${this.id}`;this.data=await a(t)}renderCard(){return this.data?`
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
            `).join("")}}const d="./json/particlesId.json",p=s=>new Promise(t=>setTimeout(t,s));async function u(){try{const t=await(await fetch(d)).json();for(const e of t){const n=new l(e.pdgId,e.name,e.category,e.src),r=document.querySelector(`#${e.category}`),i=document.createElement("div");i.id=`container-${e.pdgId}`,i.innerHTML=n.renderCard(),r.appendChild(i),await n.fetchDetails(),document.getElementById(`container-${e.pdgId}`).innerHTML=n.renderCard(),await p(500)}}catch{console.error("Error while populating the site.")}}u();document.querySelector("#app").addEventListener("click",s=>{if(s.target.classList.contains("details-btn")){const t=s.target.getAttribute("data-id"),e=document.querySelector(`#details-${t}`);e.classList.toggle("hidden"),s.target.textContent=e.classList.contains("hidden")?"See Properties":"Close"}});const h=document.querySelectorAll(".nav-link[data-filter]");h.forEach(s=>{s.addEventListener("click",t=>{t.preventDefault();const e=t.target.getAttribute("data-filter");document.querySelectorAll(".particleCards").forEach(r=>{e==="All"||r.id.includes(e)?r.style.display="":r.style.display="none"})})});const f=document.querySelector(".search-input"),m=document.querySelector(".search-button");function g(){const s=f.value.toLowerCase(),t=document.querySelectorAll(".particle-card");document.querySelectorAll(".particleCards"),t.forEach(e=>{const n=e.querySelector("h2").textContent.toLowerCase(),r=e.querySelector("p").textContent.toLocaleLowerCase();s===""||n.includes(s)||r.includes(s)?e.style.display="":e.style.display="none"})}m.addEventListener("click",s=>{s.preventDefault(),g()});
