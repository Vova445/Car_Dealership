(()=>{"use strict";({386:function(){var e=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(d,s){function l(e){try{i(n.next(e))}catch(e){s(e)}}function a(e){try{i(n.throw(e))}catch(e){s(e)}}function i(e){var t;e.done?d(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(l,a)}i((n=n.apply(e,t||[])).next())}))};document.addEventListener("DOMContentLoaded",(()=>{const t=document.getElementById("profileIcon"),o=document.getElementById("modal-auth"),n=document.getElementById("closeModal"),d=document.getElementById("authTitle"),s=document.getElementById("authForm"),l=document.getElementById("toggleAuth"),a=document.getElementById("emailAuth"),i=document.getElementById("password"),c=document.getElementById("confirmPassword"),m=document.getElementById("username"),r=document.getElementById("usernameLabel"),u=document.getElementById("confirmPasswordLabel"),g=document.getElementById("submitButton"),y=document.getElementById("modal-profile"),v=document.getElementById("closeProfileModal"),p=document.getElementById("profileUsername"),I=document.getElementById("profileEmail"),E=document.getElementById("logoutButton"),h=()=>{null==s||s.reset()},f=(e,t)=>{p&&I&&y&&(e&&(p.textContent=e),t&&(I.textContent=t),y.classList.add("show"),document.body.classList.add("modal-open"))},L=(e,t)=>{const o=e.querySelector(t);o.classList.add("hide"),setTimeout((()=>{e.classList.remove("show"),o.classList.remove("hide"),document.body.classList.remove("modal-open")}),500)},B=()=>{y&&L(y,".modal-content-profile")},C=()=>{localStorage.removeItem("loggedInUser"),B(),o.classList.add("show"),document.body.classList.add("modal-open")};if(t&&o&&n&&d&&s&&l&&a&&i&&c&&m&&r&&u&&g&&y&&v&&p&&I&&E){t.addEventListener("click",(()=>{const e=localStorage.getItem("loggedInUser");if(e){const{username:t,email:o}=JSON.parse(e);f(t,o)}else o.classList.add("show"),document.body.classList.add("modal-open"),h()})),n.addEventListener("click",(()=>{const e=null==o?void 0:o.querySelector(".modal-content-auth");e&&(e.classList.add("hide"),setTimeout((()=>{o.classList.remove("show"),e.classList.remove("hide"),document.body.classList.remove("modal-open")}),500))})),v.addEventListener("click",B),E.addEventListener("click",C),l.addEventListener("click",(e=>{e.preventDefault();const t=s;t.classList.add("form-hide"),setTimeout((()=>{"Registration"===d.textContent?(d.textContent="Authorization",l.textContent="Registration",g.textContent="Sign In",r.style.display="none",u.style.display="none",m.style.display="none",c.style.display="none"):(d.textContent="Registration",l.textContent="Sign In",g.textContent="Register",r.style.display="block",u.style.display="block",m.style.display="block",c.style.display="block"),t.classList.remove("form-hide"),t.classList.add("form-transition")}),500),h()}));const y="https://vova445.github.io/Car_Dealership";s.addEventListener("submit",(t=>e(void 0,void 0,void 0,(function*(){t.preventDefault();const e=null==a?void 0:a.value,n=null==i?void 0:i.value,s=null==c?void 0:c.value,l=null==m?void 0:m.value;if(!e||!n||"Registration"===(null==d?void 0:d.textContent)&&(!l||n!==s))return;const r="Registration"===(null==d?void 0:d.textContent)?`${y}/register`:`${y}/login`,u="Registration"===(null==d?void 0:d.textContent)?{email:e,password:n,username:l}:{email:e,password:n};try{const t=yield fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(u)});t.ok?(console.log("Registration"===(null==d?void 0:d.textContent)?"User registered":"User signed in"),o&&L(o,".modal-content-auth"),localStorage.setItem("loggedInUser",JSON.stringify({username:l,email:e})),f(l,e)):console.error("Error:",yield t.text())}catch(e){console.error("Network error:",e)}}))))}else console.error("Some elements were not found on the page.")})),document.addEventListener("DOMContentLoaded",(()=>{const e=document.getElementById("visitBtn"),t=document.getElementById("modal-auth"),o=document.getElementById("closeModal"),n=document.getElementById("myModal"),d=document.getElementById("closeModalBtn");e&&t&&o&&n&&d?e.addEventListener("click",(()=>{if(localStorage.getItem("loggedInUser")){n.style.display="none";const e=localStorage.getItem("loggedInUser");if(e){const{username:t,email:o}=JSON.parse(e);((e,t)=>{const o=document.getElementById("modal-profile"),n=document.getElementById("profileUsername"),d=document.getElementById("profileEmail");n&&d&&o&&(e&&(n.textContent=e),t&&(d.textContent=t),o.classList.add("show"),document.body.classList.add("modal-open"))})(t,o)}}else n.style.display="none",t.classList.add("show"),document.body.classList.add("modal-open")})):console.error("Required elements not found")}))}})[386]()})();