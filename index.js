import{a as v,S as L,i as c}from"./assets/vendor-xpOxgMII.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const b="https://pixabay.com/api/",w="54469620-809557b4428fb405aef4b70a6",P=15;async function S(t,r){return(await v.get(b,{params:{key:w,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:P}})).data}const f=document.querySelector(".gallery"),p=document.querySelector(".loader"),m=document.querySelector(".load-more"),q=new L(".gallery a");function E(t){const r=t.map(({webformatURL:i,largeImageURL:n,tags:e,likes:o,views:a,comments:g,downloads:y})=>`
          <li class="gallery-item">
            <a href="${n}">
              <img src="${i}" alt="${e}" />
            </a>
            <div class="info">
              <div class="info-item">
                <p class="label">Likes</p>
                <p class="value">${o}</p>
              </div>
              <div class="info-item">
                <p class="label">Views</p>
                <p class="value">${a}</p>
              </div>
              <div class="info-item">
                <p class="label">Comments</p>
                <p class="value">${g}</p>
              </div>
              <div class="info-item">
                <p class="label">Downloads</p>
                <p class="value">${y}</p>
              </div>
            </div>
          </li>
        `).join("");f.insertAdjacentHTML("beforeend",r),q.refresh()}function $(){f.innerHTML=""}function B(){p.classList.remove("hidden")}function M(){p.classList.add("hidden")}function R(){m.classList.remove("hidden")}function l(){m.classList.add("hidden")}const A=document.querySelector(".form"),O=document.querySelector(".load-more");let d="",s=1,u=0;const _=15;A.addEventListener("submit",async t=>{if(t.preventDefault(),d=t.target.elements["search-text"].value.trim(),!d){c.warning({message:"Please enter a search query",position:"topRight"});return}s=1,u=0,$(),l(),await h()});O.addEventListener("click",async()=>{s+=1,await h()});async function h(){try{B();const t=await S(d,s);if(t.hits.length===0&&s===1){c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),l();return}E(t.hits),u=t.totalHits;const r=Math.ceil(u/_);if(s>=r){l(),c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}R(),s>1&&x()}catch{c.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{M()}}function x(){const t=document.querySelector(".gallery-item");if(!t)return;const{height:r}=t.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
