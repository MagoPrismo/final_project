(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(t){if(t.ep)return;t.ep=!0;const i=e(t);fetch(t.href,i)}})();async function o(s){const r=await fetch(s);if(r.ok)return await r.json();throw new Error("Bad Response")}const c="/pdgapi";class l{constructor(r,e,n,t){this.id=r,this.name=e,this.category=n,this.src=t,this.data=null}async fetchDetails(){const r=`${c}/summaries/${this.id}`;this.data=await o(r)}renderCard(){return this.data?`
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
            `).join("")}}const d="./json/particlesId.json",p=s=>new Promise(r=>setTimeout(r,s));async function u(){try{const r=await(await fetch(d)).json();for(const e of r){const n=new l(e.pdgId,e.name,e.category,e.src),t=document.querySelector(`#${e.category}`),i=document.createElement("div");i.id=`container-${e.pdgId}`,i.innerHTML=n.renderCard(),t.appendChild(i),await n.fetchDetails(),document.getElementById(`container-${e.pdgId}`).innerHTML=n.renderCard(),await p(500)}}catch{console.error("Error while populating the site.")}}u();document.querySelector("#app").addEventListener("click",s=>{if(s.target.classList.contains("details-btn")){const r=s.target.getAttribute("data-id"),e=document.querySelector(`#details-${r}`);e.classList.toggle("hidden"),s.target.textContent=e.classList.contains("hidden")?"See Properties":"Close"}});const f=document.querySelectorAll(".nav-link[data-filter]");f.forEach(s=>{s.addEventListener("click",r=>{r.preventDefault();const e=r.target.getAttribute("data-filter");document.querySelectorAll(".particleCards").forEach(t=>{e==="All"||t.id.includes(e)?t.style.display="":t.style.display="none"})})});const m=document.querySelector(".search-input"),h=document.querySelector(".search-button");function g(){const s=m.value.toLowerCase(),r=document.querySelectorAll(".particle-card");document.querySelectorAll(".particleCards"),r.forEach(e=>{const n=e.querySelector("h2").textContent.toLowerCase(),t=e.querySelector("p").textContent.toLocaleLowerCase();s===""||n.includes(s)||t.includes(s)?e.style.display="":e.style.display="none"})}h.addEventListener("click",s=>{s.preventDefault(),g()});
