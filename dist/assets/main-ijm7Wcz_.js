(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();async function a(r){try{const t=await fetch(r);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return await t.json()}catch(t){throw console.error("Error in fetching:",t),t}}const c="https://corsproxy.io/?https://pdgapi.lbl.gov";class l{constructor(t,e,n,s){this.id=t,this.name=e,this.category=n,this.src=s,this.data=null}async fetchDetails(){const t=`${c}/summaries/${this.id}`;this.data=await a(t)}renderCard(){return this.data?`
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
            `).join("")}}class d{constructor(t){this.name=t.quantity,this.value=t.value,this.error=t.uncertainty,this.unit=t.unit||""}renderCard(){return`
            <div class='constant-card' style="border: 1px solid #ccc; padding: 15px; border-radius: 8px; margin: 10px; cursor: pointer;">
                <h2 style="margin: 0; font-size: 1.2em;">${this.name}</h2>
                <div class="constant-preview-value">
                    ${this.value} ${this.unit}
                </div>
                <div class="details hidden" style="margin-top: 10px; border-top: 1px dashed #eee; padding-top: 10px;">
                    <p><strong>Uncertainty:</strong> ${this.uncertainty}</p>
                    <p><strong>Full Expression:</strong> ${this.value} ${this.unit}</p>
                </div>
            </div>
        `}}async function u(){return(await a("/json/constants.json")).map(e=>new d(e))}const p="./json/particlesId.json",h=r=>new Promise(t=>setTimeout(t,r));async function m(){try{const t=await(await fetch(p)).json();for(const e of t){const n=new l(e.pdgId,e.name,e.category,e.src),s=document.querySelector(`#${e.category}`),i=document.createElement("div");i.id=`container-${e.pdgId}`,i.innerHTML=n.renderCard(),s.appendChild(i),await n.fetchDetails(),document.getElementById(`container-${e.pdgId}`).innerHTML=n.renderCard(),await h(500)}}catch{console.error("Error while populating the site.")}}m();document.querySelector("#app").addEventListener("click",r=>{if(r.target.classList.contains("details-btn")){const t=r.target.getAttribute("data-id"),e=document.querySelector(`#details-${t}`);e.classList.toggle("hidden"),r.target.textContent=e.classList.contains("hidden")?"See Properties":"Close"}});const f=document.querySelectorAll(".nav-link[data-filter]");f.forEach(r=>{r.addEventListener("click",t=>{t.preventDefault();const e=t.target.getAttribute("data-filter");document.querySelectorAll(".particleCards").forEach(s=>{e==="All"||s.id.includes(e)?s.style.display="":s.style.display="none"})})});const g=document.querySelector(".search-input"),y=document.querySelector(".search-button");function v(){const r=g.value.toLowerCase(),t=document.querySelectorAll(".particle-card");document.querySelectorAll(".particleCards"),t.forEach(e=>{const n=e.querySelector("h2").textContent.toLowerCase(),s=e.querySelector("p").textContent.toLocaleLowerCase();r===""||n.includes(r)||s.includes(r)?e.style.display="":e.style.display="none"})}y.addEventListener("click",r=>{r.preventDefault(),v()});async function $(){const r=document.querySelector("#constants-container"),t=await u();r.innerHTML=t.map(n=>n.renderCard()).join(""),r.querySelectorAll(".constant-card").forEach(n=>{n.addEventListener("click",()=>{n.querySelector(".details").classList.toggle("hidden"),n.classList.toggle("active")})})}$();
