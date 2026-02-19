(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function i(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=i(s);fetch(s.href,r)}})();async function a(e){try{const t=await fetch(e);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return await t.json()}catch(t){throw console.error("Error in fetching:",t),t}}class c{constructor(t){this.pdgId=t.pdgId,this.name=t.name,this.category=t.category,this.src=t.src,this.symbol=t.symbol,this.mass=t.mass,this.charge=t.charge,this.spin=t.spin}renderCard(){return this.data?`
            <div class='particle-card' style="border: 1px solid #ccc; padding: 15px; border-radius: 8px; margin: 10px;">
                <h2 style="margin-top: 0;">${this.name}</h2>
                <div class="particleImage">
                    <img src="images/${this.src}" alt="${this.name}">
                </div>
                <p><small>PDG ID: ${this.pdgId}</small></p>
                <button class="details-btn" data-id="${this.pdgId}">See Properties</button>
                <div id="details-${this.pdgId}" class="details-content hidden">
                    ${this._renderProperties()}
                </div>
            </div>
        `:`
                <div class='particle-card loading'>
                    <div class="loader"></div>
                    <span class="loading-text">Fetching ${this.name}...</span>
                </div>
            `}_renderProperties(){return`
            <div class="prop-item"><small>Symbol:</small> <span>${this.symbol}</span></div>
            <div class="prop-item"><small>Mass:</small> <span>${this.mass}</span></div>
            <div class="prop-item"><small>Charge:</small> <span>${this.charge}</span></div>
            <div class="prop-item"><small>Spin:</small> <span>${this.spin}</span></div>
        `}}async function l(){return(await a("./json/particles.json")).map(i=>new c(i))}class d{constructor(t){this.name=t.quantity,this.value=t.value,this.uncertainty=t.uncertainty,this.unit=t.unit||""}renderCard(){return`
            <div class='constant-card'>
                <h2>${this.name}</h2>
                <div class="constant-preview-value">
                    ${this.value} <small>${this.unit}</small>
                </div>
                <div class="details hidden">
                    <p><strong>Uncertainty:</strong> ${this.uncertainty}</p>
                    <p><strong>Full Value:</strong> ${this.value} ${this.unit}</p>
                </div>
            </div>
        `}}async function u(){return(await a("./json/constants.json")).map(i=>new d(i))}const p=e=>new Promise(t=>setTimeout(t,e));async function h(){try{const e=await l();for(const t of e){const i=document.querySelector(`#${t.category}`);if(!i)continue;const n=document.createElement("div"),s=`container-${t.pdgId}`;n.id=s,n.innerHTML=t.renderCard(),i.appendChild(n),await p(500),t.data=t;const r=document.getElementById(s);r&&(r.innerHTML=t.renderCard())}}catch{console.error("Error while populating the site.")}}h();document.querySelector("#app").addEventListener("click",e=>{if(e.target.classList.contains("details-btn")){const t=e.target.getAttribute("data-id"),i=document.querySelector(`#details-${t}`);i.classList.toggle("hidden"),e.target.textContent=i.classList.contains("hidden")?"See Properties":"Close"}});const m=document.querySelectorAll(".nav-link[data-filter]");m.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const i=t.target.getAttribute("data-filter");document.querySelectorAll(".particleCards").forEach(s=>{i==="All"||s.id.includes(i)?s.style.display="":s.style.display="none"})})});const y=document.querySelector(".search-input"),f=document.querySelector(".search-button");function g(){const e=y.value.toLowerCase(),t=document.querySelectorAll(".particle-card"),i=document.querySelectorAll(".constant-card");t.forEach(n=>{const s=n.querySelector("h2").textContent.toLowerCase(),r=n.querySelector("p").textContent.toLocaleLowerCase();e===""||s.includes(e)||r.includes(e)?n.style.display="":n.style.display="none"}),i.forEach(n=>{const s=n.querySelector("h2").textContent.toLowerCase(),r=n.querySelector("p").textContent.toLocaleLowerCase();e===""||s.includes(e)||r.includes(e)?n.style.display="":n.style.display="none"})}f.addEventListener("click",e=>{e.preventDefault(),g()});async function v(){const e=document.querySelector("#constants-container");if(!e)return;const t=await u();e.innerHTML=t.map(n=>n.renderCard()).join(""),e.querySelectorAll(".constant-card").forEach(n=>{n.addEventListener("click",()=>{n.querySelector(".details").classList.toggle("hidden"),n.classList.toggle("active")})})}v();
