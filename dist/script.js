(()=>{"use strict";const e=document.getElementById("myModal"),t=document.getElementById("openModalBtn"),n=document.getElementById("closeModalBtn");function o(e){if(!e.querySelector(".description")){const t=document.createElement("div");t.className="description",t.innerText=e.getAttribute("data-description")||"",e.appendChild(t)}}function c(e){const t=e.querySelector(".description");t&&e.removeChild(t)}t.addEventListener("click",(function(){e.style.display="block",document.body.classList.add("modal-open")})),n.addEventListener("click",(function(){const t=e.querySelector(".modal-content");t.style.opacity="0",t.style.transform="scale(0.1)",setTimeout((()=>{e.style.display="none",document.body.classList.remove("modal-open"),t.style.opacity="1",t.style.transform="scale(1)"}),500)})),document.querySelectorAll(".point").forEach((e=>{e.addEventListener("mouseenter",(function(){o(this)})),e.addEventListener("mouseleave",(function(){c(this)})),e.addEventListener("click",(function(){var e;(e=this).querySelector(".description")?c(e):o(e)}))})),document.addEventListener("DOMContentLoaded",(()=>{document.querySelectorAll(".modal-car");const e=document.querySelectorAll(".car-card"),t=document.querySelectorAll(".close-car");e.forEach((e=>{e.addEventListener("click",(()=>{const t=e.querySelector(".car-image").classList[1],n=document.getElementById(`modal-${t}`);n&&(n.style.display="block")}))})),t.forEach((e=>{e.addEventListener("click",(()=>{const t=e.getAttribute("data-modal-id"),n=document.getElementById(t);n&&(n.style.display="none")}))})),window.addEventListener("click",(e=>{e.target.classList.contains("modal-car")&&(e.target.style.display="none")}))}))})();