!function(e){function t(t){for(var r,s,a=t[0],c=t[1],l=t[2],p=0,h=[];p<a.length;p++)s=a[p],Object.prototype.hasOwnProperty.call(n,s)&&n[s]&&h.push(n[s][0]),n[s]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);for(d&&d(t);h.length;)h.shift()();return o.push.apply(o,l||[]),i()}function i(){for(var e,t=0;t<o.length;t++){for(var i=o[t],r=!0,a=1;a<i.length;a++){var c=i[a];0!==n[c]&&(r=!1)}r&&(o.splice(t--,1),e=s(s.s=i[0]))}return e}var r={},n={0:0},o=[];function s(t){if(r[t])return r[t].exports;var i=r[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=e,s.c=r,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(i,r,function(t){return e[t]}.bind(null,r));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var a=window.webpackJsonp=window.webpackJsonp||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var l=0;l<a.length;l++)t(a[l]);var d=c;o.push([22,1]),i()}([function(e,t,i){"use strict";i.d(t,"b",(function(){return Utils})),i.d(t,"a",(function(){return r}));class Utils{static log(e,t=r.INFO){const i=`[${(new Date).toTimeString().split(" ")[0]}]: `;switch(t){case r.INFO:console.log(i+"%c[1mi[0m "+e,"font-weight:bold;");break;case r.OK:console.log(i+"[32m[1m%c✓ "+e+"[0m","color:green;font-weight:bold;");break;case r.ERROR:console.error(i+"[31m[1m%c✘ "+e+"[0m","color:red;font-weight:bold;");break;case r.WARNING:console.warn(i+"[33m[1m%c![0m [33m"+e+"[0m","color:goldenrod;font-weight:bold;");break;case r.DIVIDER:{const t="=".repeat(30-e.length/2);console.log(t+e+t+(e.length%2?"=":""));break}default:throw new TypeError("Unknown log type!")}}static mergeObjects(e,t){for(const i in t)"object"==typeof t[i]?(e[i]||(e[i]={}),this.mergeObjects(e[i],t[i])):e[i]?Array.isArray(e[i])?e[i].includes(t[i])||e[i].push(t[i]):e[i]!=t[i]&&(e[i]=[e[i],t[i]]):e[i]=t[i]}}var r;!function(e){e[e.INFO=0]="INFO",e[e.OK=1]="OK",e[e.WARNING=2]="WARNING",e[e.ERROR=3]="ERROR",e[e.DIVIDER=4]="DIVIDER"}(r||(r={}))},function(e,t,i){"use strict";i.d(t,"a",(function(){return View}));class View{constructor(e,t=null){this.type="Views",this.name=e,this.windowLoaded="complete"===document.readyState,this.template=t,this.windowLoaded||window.addEventListener("load",()=>{this.windowLoaded=!0,this.template&&this.render(this.template)})}async initialize(e){this.render(null,e)}render(e=null,t={}){this.windowLoaded?(e||(e=this.template),t||(t={}),this.container.forEach(i=>{if(!e)return;const r={};for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)){const n=t[e];r[e]="function"==typeof n?(...e)=>n(i,...e):n}r.data=this.data,i.innerHTML=e(r)}),this.template=null):this.template=e}toggle(e=null){null==e&&(e="none"==this.container[0].style.display),e?this.container.forEach(e=>{e.style.display="block"}):this.container.forEach(e=>{e.style.display="none"})}get data(){const e={get:(t,i)=>{if(i==Symbol.toPrimitive||"toJSON"==i||"toString"==i)return()=>`<placeholder ${t._}>\x3c!--"placeholders __postfix_${t._}="--\x3e</placeholder>`;const r={_:(t._?t._+".":"")+i};return new Proxy(r,e)}};return new Proxy({_:""},e)}get container(){const e=document.querySelectorAll(`[view=${this.name.toLowerCase()}]`);if(!e)throw new Error(`Container ${this.name} not found!`);return e}}},,,function(e,t,i){"use strict";function r(){class Service{static close(){this.callbacks={}}static on(e,t){e in this.callbacks||(this.callbacks[e]=[]),this.callbacks[e].push(t)}static emit(e,...t){this.callbacks[e]&&this.callbacks[e].forEach(e=>e.call(e,...t))}static expose(e,t=null){if(globalThis[this.name]||(globalThis[this.name]={}),t)globalThis[this.name][e]=t;else{if("function"!=typeof this[e])throw new Error("The function to expose not found!");globalThis[this.name][e]=(...t)=>{this[e].call(this,...t)}}}}return Service.type="Services",Service.callbacks={},Service}i.d(t,"a",(function(){return r}))},function(e,t,i){"use strict";i.d(t,"a",(function(){return o}));var r=i(12),n=i(0);function o(){return class Controller{constructor(e){this.type="Controllers",this.callbacks={},this.sender=null,this.bindings=null,this.safe=!0,this.name=e}bind(){this.bindings=new Map;const e=Array.from(document.querySelectorAll(`[controller=${this.name.toLowerCase()}]`)).reverse();for(const t of e){const e=new r.a(t);e.bind(),this.bindings.set(t,e)}}close(){this.callbacks={}}on(e,t){e in this.callbacks||(this.callbacks[e]=[]),this.callbacks[e].push(t)}emit(e,...t){this.callbacks[e]&&this.callbacks[e].forEach(e=>e.call(e,...t))}expose(e,t=null){globalThis[this.name]||(globalThis[this.name]={});const i=t||this[e].bind(this);globalThis[this.name][e]=(...e)=>{let t;if(null===event||void 0===event?void 0:event.target)this.sender=event.target,t=i(...e);else{const r=Array.from(document.querySelectorAll(`[controller=${this.name.toLowerCase()}]`)).reverse();t=new Set;let o=null;for(const s of r){this.sender=s;const r=i(...e);null!=r&&("object"==typeof r?(o||(o={}),n.b.mergeObjects(o,r)):t.add(r))}t=o||(t.size>1?Array.from(t):t.values().next().value),this.sender=null}return t}}get container(){let e=this.sender?this.sender.closest(`[controller=${this.name.toLowerCase()}]`):null;if(e=e||document.querySelector(`[controller=${this.name.toLowerCase()}]`),!e)throw new Error(`Container ${this.name} not found!`);return e}get data(){if(!this.bindings)throw new Error("Use this.bind() to bind your data first!");let e=[];if(this.sender){const t=this.bindings.get(this.container);t&&(e=[t])}else e=Array.from(this.bindings.values());const t={get:(e,i)=>{const r=(e.__origin?e.__origin+".":"")+i,n=e[i];return"object"==typeof n||void 0===n?new Proxy(Object.assign(Object.assign({},n),{__origin:r}),t):n},set:(t,i,r)=>{if(!this.bindings)return!1;const n=(t.__origin?t.__origin+".":"")+i;t[i]=r;for(const t of e)t.set(n,r,!this.safe);return!0}},i={};for(const t of e)n.b.mergeObjects(i,t.get());return i.__origin="",new Proxy(i,t)}}}"undefined"==typeof globalThis&&(window.globalThis=window),globalThis.Controller=new Proxy({},{get:(e,t)=>{if(!event)return;let i=event.target,r=null;for(;null==r||null==globalThis[r]||null==globalThis[r][t];){if(r=i.getAttribute("controller"),r&&(r=r.charAt(0).toUpperCase()+r.slice(1)),!i.parentElement)return;i=i.parentElement}return globalThis[r][t]}})},,function(e,t,i){"use strict";i.d(t,"a",(function(){return App}));var r=i(8),n=i(9),o=i(10),s=i(11),a=i(14),c=i(16),l=i(18),d=i(19),p=i(20);class App{constructor(){this.manger=null,this.events=null}async initialize(){const e=[l.a,o.a,new c.a,new a.a,new p.a,new s.a,new d.a];this.manger=new r.a(e),this.events=new n.a(e);const t=await this.getComponentArguments();await this.events.registerEvents(),await this.manger.initialize(t)}async getComponentArguments(){if(!this.manger)throw new Error("Initialize manager first!");return{Fetcher:["https://recipe.hldns.ru"],Recipes:["https://res.cloudinary.com/recipe-images/raw/upload/"]}}close(){this.manger&&(this.manger.close(),this.manger=null),this.events=null}}},function(e,t,i){"use strict";i.d(t,"a",(function(){return Manager}));var r=i(0);class Manager{constructor(e){this.logging=!0;const t=["Services","Views","Controllers"];this.components=e.sort((e,i)=>t.indexOf(e.type)>=t.indexOf(i.type)?1:-1)}async initialize(e=[]){let t=0;this.logging&&r.b.log("Initializtion started...");let i="";for(const n in this.components){const o=this.components[n];this.logging&&i!=o.type&&(r.b.log(o.type,r.a.DIVIDER),i=o.type);try{const t=Array.isArray(e)?e[n]:e[o.name];t&&o.initialize?await o.initialize(...t):o.initialize&&await o.initialize(),this.logging&&r.b.log(`${o.name} initialized!`,r.a.OK)}catch(e){this.logging&&r.b.log(`${o.name} initialization exception:\n\t`+`${e.stack.replace(/\n/g,"\n\t")}`,r.a.ERROR),t++}}this.logging&&(r.b.log("",r.a.DIVIDER),t?r.b.log(`Initialization completed with ${t} exceptions!`,r.a.WARNING):r.b.log("Successfyly initialized!",r.a.OK))}close(){this.logging&&(r.b.log("",r.a.DIVIDER),r.b.log("Closing all components..."));let e=0;for(const t of this.components)try{t.close&&t.close(),this.logging&&r.b.log(`${t.name} closed!`,r.a.OK)}catch(i){this.logging&&r.b.log(`${t.name} closing exception:\n\t`+`${i.stack.replace(/\n/g,"\n\t")}`,r.a.ERROR),e++}this.logging&&(r.b.log("",r.a.DIVIDER),e?r.b.log(`Stopped with ${e} exceptions!`,r.a.WARNING):r.b.log("Successfyly stopped!",r.a.OK))}getComponent(e){return this.components.find(t=>t.name.toLowerCase()==e.toLowerCase())||null}}},function(e,t,i){"use strict";i.d(t,"a",(function(){return EnvetsHandler}));class EnvetsHandler{constructor(e){const t={};e.forEach(e=>t[e.name]=e),this.searchController=t.Search,this.recipesController=t.Recipes,this.fetcherService=t.Fetcher}async registerEvents(){this.searchController.on("suggested",e=>{this.fetcherService.searchIngredients(e)}),this.searchController.on("searched",(e,t)=>{e.length<=0||(this.recipesController.setLoading(),this.fetcherService.searchRecipes(e,t))}),this.recipesController.on("reciped",e=>{e&&this.fetcherService.getRecipe(e)}),this.fetcherService.on("gotingredients",e=>{this.searchController.addSuggestions(e?e.map(e=>e.name):[])}),this.fetcherService.on("gotrecipes",e=>{this.recipesController.updateRecipes(e||[])}),this.fetcherService.on("gotrecipe",e=>{e&&this.recipesController.updateRecipeData(e.id,e)})}}},function(e,t,i){"use strict";i.d(t,"a",(function(){return Fetcher}));var r=i(4);class Fetcher extends(Object(r.a)()){static async initialize(e){this.url=e,this.abortIngredientsController=new AbortController,this.abortSearchController=new AbortController,this.abortRecipeController=new AbortController}static async searchIngredients(e){if(!e)return this.emit("gotingredients",null),null;this.abortIngredientsController.abort(),this.abortIngredientsController=new AbortController;let t=null;try{t=await fetch(`${this.url}/api/ingredients/search/${e.toLocaleLowerCase()}`,{mode:"cors",signal:this.abortIngredientsController.signal})}catch(e){return this.emit("gotingredients",null),null}let i=null;try{i=await t.json()}catch(e){}return this.emit("gotingredients",i),i}static async searchRecipes(e,t=!1){let i;this.abortSearchController.abort(),this.abortSearchController=new AbortController;try{i=await fetch(`${this.url}/api/recipe/search/${e.join("&")}${t?"/strict":""}`,{mode:"cors",signal:this.abortSearchController.signal})}catch(e){return null}let r=null;try{r=await i.json()}catch(e){}return this.emit("gotrecipes",r),r}static async getRecipe(e){let t;this.abortRecipeController.abort(),this.abortRecipeController=new AbortController;try{t=await fetch(`${this.url}/api/recipe/get/${e}`,{mode:"cors",signal:this.abortRecipeController.signal})}catch(e){return null}let i=null;try{i=await t.json()}catch(e){}return this.emit("gotrecipe",i),i}}},function(e,t,i){"use strict";i.d(t,"a",(function(){return Search}));var r=i(5),n=i(13),o=i.n(n);class Search extends(Object(r.a)()){constructor(){super("Search"),this.input=null,this.strict=null}async initialize(){this.input=this.container.querySelector("input[type='text']"),this.strict=this.container.querySelector("input[type='checkbox']"),this.tagify=new o.a(this.input,{editTags:!1}),this.tagify.settings.enforceWhitelist=!0,this.tagify.settings.delimiters=/[\n&]/g,this.tagify.on("input",this.loadSuggestions.bind(this)),this.tagify.on("keydown",e=>{setTimeout(()=>{const t=13==e.detail.originalEvent.which,i=""==e.detail.tagify.DOM.input.textContent;t&&i&&this.search()},0)}),this.expose("search")}search(){if(!this.strict||!this.input)return;const e=this.tagify.value.map(e=>e.value);this.emit("searched",e,this.strict.checked)}loadSuggestions(e){e.detail.value.endsWith("&")||(this.tagify.loading(!0),this.emit("suggested",e.detail.value))}addSuggestions(e){this.tagify.loading(!1),this.tagify.settings.whitelist=e,this.tagify.dropdown.show.call(this.tagify,"")}}},function(e,t,i){"use strict";i.d(t,"a",(function(){return Binding}));class Binding{constructor(e){this.removedEvent=new Event("removed"),this.placeholders=new Map,this.container=e,this.loops=new Map,this.binds=new Map,this.data={}}bind(){const e=this.container.querySelectorAll("placeholder"),t=this.container.querySelectorAll("[placeholders]"),i=this.container.querySelectorAll("[iterate]"),r=this.container.querySelectorAll("input[bind]");i.forEach(this.bindLoop.bind(this)),t.forEach(this.bindAttribute.bind(this)),e.forEach(this.bindElement.bind(this)),r.forEach(this.bindInput.bind(this))}register(e,t,i="",r=""){var n;let o=t;if(t instanceof Attr&&(o=t.ownerElement),!this.container.contains(o))return;this.placeholders.has(e)||this.placeholders.set(e,new Set);const s={prefix:i,postfix:r,element:t};null===(n=this.placeholders.get(e))||void 0===n||n.add(s),o.addEventListener("removed",()=>{var t;null===(t=this.placeholders.get(e))||void 0===t||t.delete(s)})}bindElement(e){var t;const i=null===(t=e.attributes.item(0))||void 0===t?void 0:t.name;i&&this.container.contains(e)&&(this.register(i,e),e.innerHTML="",e.observed||(new MutationObserver(e=>{var t;const i=e[e.length-1],r=(null===(t=i.addedNodes[0])||void 0===t?void 0:t.textContent)||"";if(!r)return;const n=i.target.attributes[0].name;this.set(n,r)}).observe(e,{childList:!0}),e.observed=!0))}bindAttribute(e){var t;const i=e.getAttributeNode("placeholders");if(!i)return;if(""!=i.value){const t=i.value.split(";");for(const i of t){if(!i)continue;const t=i.split(":"),r=e.getAttributeNode(t[0]),n=t[1];if(!n||!r)return;const o=e.getAttribute("_"+r.name)||"",s=e.getAttribute(r.name+"_")||"";this.register(n,r,o,s)}return}i.value="";const r=e.attributes;for(const n of r){const r=n.value.match(/^(.*)<placeholder ([\w.]+)><!--/);if(!r)continue;const o=r[2],s=r[1]||"",a=(null===(t=e.getAttribute(`__postfix_${o}`))||void 0===t?void 0:t.slice(17))||"";s&&e.setAttribute("_"+n.name,s),a&&e.setAttribute(n.name+"_",a),n.value=s+a,i.value+=`${n.name}:${o};`,this.register(o,n,s,a),e.removeAttribute(`__postfix_${o}`)}e.observed||(new MutationObserver(t=>{var i;const r=t[t.length-1].attributeName;if(!r)return;let n=e.getAttribute(r);if(!n)return;const o=e.getAttribute(r+"_")||"",s=e.getAttribute("_"+r)||"";n=n.slice(s.length,n.length-o.length);let a=null;const c=null===(i=e.getAttribute("placeholders"))||void 0===i?void 0:i.split(";");if(c){for(const e of c)e.split(":")[0]==r&&(a=e.split(":")[1]);a&&this.set(a,n)}}).observe(e,{attributes:!0}),e.observed=!0)}bindInput(e){var t;const i=e.getAttributeNode("bind");if(!(null==i?void 0:i.value.startsWith("data.")))return;if(!this.container.contains(e))return;const r=i.value.slice(5);i.value=r;const n=()=>{["radio","checkbox"].includes(e.type)?this.set(r,e.checked):this.set(r,e.value)};if("radio"==e.type){this.container.querySelectorAll(`input[type="radio"][name="${e.name}"]`).forEach(e=>{e.addEventListener("input",n)})}else e.addEventListener("input",n);n(),this.binds.has(r)||this.binds.set(r,new Set),null===(t=this.binds.get(r))||void 0===t||t.add(e),e.addEventListener("removed",()=>{var t;null===(t=this.binds.get(r))||void 0===t||t.delete(e)})}bindLoop(e){var t,i;const r=e.getAttributeNode("iterate");if(!r||!this.container.contains(e))return;r.value=r.value.replace("data.","");const n=document.createElement("template");n.content.appendChild(e.cloneNode(!0)),null===(t=e.parentNode)||void 0===t||t.replaceChild(n,e),this.loops.has(r.value)||this.loops.set(r.value,new Set),null===(i=this.loops.get(r.value))||void 0===i||i.add(n),n.addEventListener("removed",()=>{var e;null===(e=this.loops.get(r.value))||void 0===e||e.delete(n)})}createLoopElement(e,t){var i;const r=e.content.firstElementChild;if(!r)return;const n=r.getAttribute("iterate");if(!n)return;const o=r.cloneNode(!0),s=o.querySelectorAll("placeholder"),a=o.querySelectorAll("[placeholders]"),c=o.querySelectorAll("[iterate]"),l=o.querySelectorAll("[bind]");s.forEach(e=>{const i=e.attributes[0].name,r=i.replace(n,`${n}.${t}`);e.removeAttribute(i),e.setAttribute(r,""),this.bindElement(e)}),a.forEach(e=>{this.bindAttribute(e);let i=e.getAttribute("placeholders");if(!i)return;const r=(":"+n).replace(/[.*+\-?^${}()|[\]\\]/g,"\\$&");i=i.replace(new RegExp(r,"g"),`:${n}.${t}`),e.setAttribute("placeholders",i)}),c.forEach(e=>{let i=e.getAttribute("iterate")||"";i=i.replace(n,`${n}.${t}`),e.setAttribute("iterate",i)}),l.forEach(e=>{let i=e.getAttribute("bind")||"";i=i.replace(n,`${n}.${t}`),e.setAttribute("bind",i)}),this.bindAttribute(o);let d=o.getAttribute("placeholders");if(d){const e=(":"+n).replace(/[.*+\-?^${}()|[\]\\]/g,"\\$&");d=d.replace(new RegExp(e,"g"),`:${n}.${t}`),o.setAttribute("placeholders",d)}null===(i=e.parentNode)||void 0===i||i.insertBefore(o,e),c.forEach(this.bindLoop.bind(this)),l.forEach(this.bindInput.bind(this)),a.forEach(this.bindAttribute.bind(this)),s.forEach(this.bindElement.bind(this)),this.bindAttribute(o)}get(e){if(!e)return this.data;let t=this.data;const i=e.split(".");for(const e of i)void 0===t[e]&&(t[e]={}),t=t[e];return t}set(e,t,i=!1){var r;let n=!1;if("object"==typeof t){const r=this.loops.get(e)||[];if(Array.isArray(t))for(const t of r){let i=t.previousElementSibling;for(;i;){const t=i.previousElementSibling;i.getAttribute("iterate")==e&&(i.remove(),i.querySelectorAll("template,placeholder,[placeholders],[bind]").forEach(e=>{e.dispatchEvent(this.removedEvent)})),i=t}}for(const o in t){if(Array.isArray(t))for(const e of r)this.createLoopElement(e,+o);n=this.set(e+"."+o,t[o],i)||n}return n}null===(r=this.binds.get(e))||void 0===r||r.forEach(i=>{i.getAttribute("bind")===e&&(["radio","checkbox"].includes(i.type)?i.checked!=t!=!0&&"true"!=t||(i.checked=!0===t||"true"==t,i.value==t&&(i.dispatchEvent(new Event("input")),n=!0)):i.value!=t.toString()&&(i.value=t,i.value==t&&(i.dispatchEvent(new Event("input")),n=!0)))});const o=this.placeholders.get(e);if(null==o||o.forEach(e=>{const r=e.prefix+t+e.postfix,o=e.element;o instanceof Attr?o.nodeValue!=r&&(o.nodeValue=r,n=!0):i?o.innerHTML!=r&&(o.innerHTML=r,n=!0):o.textContent!=r&&(o.textContent=r,n=!0)}),n&&void 0!==t){let i=this.data;const r=e.split("."),n=r.pop();if(n){for(const e of r)"object"!=typeof i[e]&&(i[e]={}),i=i[e];i[n]=t.toString()}}return n}}},,function(e,t,i){"use strict";i.d(t,"a",(function(){return Search}));i(23),i(25);var r=i(15),n=i.n(r),o=i(1);class Search extends o.a{constructor(){super(Search.name),this.template=n.a}}},function(e,t,i){i(6);e.exports=function(e){var t="";return t+='<div class="search-container" controller="search"><div class="header"><div class="logo"></div><div class="title">RECIPE</div></div><div class="search"><input class="bar" type="text" placeholder="Ваши ингредиенты..." autofocus><button class="button" onclick="Controller.search()"><i class="material-icons">search</i></button></div><div class="settings"><input type="checkbox" id="checkbox-strict"><label class="search-mode" for="checkbox-strict">Строгий Поиск<i class="material-icons">help</i><span class="tooltip">Использовать только указанные ингредиенты</span></label><label class="theme" for="theme"><i class="material-icons">nights_stay</i></label></div></div>'}},function(e,t,i){"use strict";i.d(t,"a",(function(){return Recipes}));i(28);var r=i(17),n=i.n(r),o=i(1);class Recipes extends o.a{constructor(){super(Recipes.name),this.template=n.a}}},function(e,t,i){var r=i(6);e.exports=function(e){var t,i="",n=e||{};return function(e){i=i+'<div class="recipes-container" controller="recipes"><div class="loader hidden"><div></div><div></div><div></div><div></div></div><div class="recipes-list"><div class="recipe" iterate="data.recipes" onclick="Controller.selectRecipe(this.dataset.id)"'+r.attr("data-id",e.recipes.id,!1,!0)+'><div class="title">'+(null==(t=e.recipes.title)?"":t)+'</div><div class="details"><div class="picture"'+r.attr("style",r.style("background-image:url("+e.recipes.picture+")"),!1,!0)+'></div><div class="description-container"><div class="time-container"><i class="material-icons">timer</i><div class="time">'+(null==(t=e.recipes.time)?"":t)+'    </div></div><div class="ingredients"><div class="ingredient-item" iterate="data.recipes.ingredients"><div class="name">'+(null==(t=e.recipes.ingredients.name)?"":t)+'</div><div class="amount">'+(null==(t=e.recipes.ingredients.amount)?"":t)+'</div></div></div><div class="description">'+(null==(t=e.recipes.description)?"":t)+'</div><div class="loader hidden"><div></div><div></div><div></div><div></div></div></div><div class="steps"><div class="step-item" iterate="data.recipes.steps"><img class="picture step"'+r.attr("style",r.style("display:"+e.recipes.steps.display),!1,!0)+r.attr("src",e.recipes.steps.picture,!1,!0)+'><p class="text">'+(null==(t=e.recipes.steps.text)?"":t)+'</p></div></div></div></div><div class="backdrop" onclick="Controller.deselectRecipe()"></div></div></div>'}.call(this,"data"in n?n.data:"undefined"!=typeof data?data:void 0),i}},function(e,t,i){"use strict";i.d(t,"a",(function(){return Offline}));var r=i(4),n=i(0);class Offline extends(Object(r.a)()){static async initialize(){if("serviceWorker"in navigator)try{await navigator.serviceWorker.register("service-worker.js")}catch(e){n.b.log("Service Worker is disabled.",n.a.WARNING)}}}},function(e,t,i){"use strict";i.d(t,"a",(function(){return Recipes}));var r=i(5);class Recipes extends(Object(r.a)()){constructor(){super("Recipes"),this.list=null,this.url="",this.activeRecipeId=0,this.recipes=[],this.loading=!1}async initialize(e){this.bind(),this.list=this.container.querySelector(".recipes-list"),this.url=e,this.expose("selectRecipe"),this.expose("deselectRecipe")}deselectRecipe(){var e;if(!this.list)return;const t=this.recipes.findIndex(e=>e.id==this.activeRecipeId);this.safe=!1,this.data.recipes[t].description=this.recipes[t].description,this.safe=!0,this.activeRecipeId=0,null===(e=this.list.querySelector(".backdrop"))||void 0===e||e.classList.remove("active"),this.list.querySelectorAll(".recipe").forEach(e=>{e.classList.remove("active")})}selectRecipe(e){var t,i,r;if(!this.list)return;if(e===this.activeRecipeId)return;const n=this.list.querySelector(`.recipe[data-id="${e}"]`);n&&(null===(t=this.list.querySelector(".backdrop"))||void 0===t||t.classList.add("active"),this.activeRecipeId=e,n.classList.add("active"),1==(null===(i=n.querySelector(".ingredients"))||void 0===i?void 0:i.children.length)&&(null===(r=n.querySelector(".loader"))||void 0===r||r.classList.remove("hidden")),this.emit("reciped",e))}setLoading(e=!0){this.loading=e;const t=this.container.querySelector(".loader");e?null==t||t.classList.remove("hidden"):null==t||t.classList.add("hidden")}updateRecipes(e){for(const t of e)t.picture=this.url+t.picture;for(const t of e)t.description.length>100&&(t.description=t.description.slice(0,100)+"...");this.safe=!1,this.data.recipes=e,this.safe=!0,this.recipes=e,this.activeRecipeId=0,this.setLoading(!1)}updateRecipeData(e,t){var i;if(!this.list)return;null===(i=this.list.querySelector(`.recipe[data-id="${e}"] .loader`))||void 0===i||i.classList.add("hidden");const r=this.recipes.findIndex(t=>t.id==e),n=t.text.split("\n").filter(e=>e).map((e,i)=>({picture:t.steps[i]?this.url+t.steps[i]:"",display:t.steps[i]?"inherit":"none",text:e}));this.safe=!1,this.data.recipes[r].description=t.description,this.data.recipes[r].steps=n,this.data.recipes[r].ingredients=t.ingredients,this.safe=!0}}},function(e,t,i){"use strict";i.d(t,"a",(function(){return Footer}));i(30);var r=i(21),n=i.n(r),o=i(1);class Footer extends o.a{constructor(){super(Footer.name),this.template=n.a}}},function(e,t,i){i(6);e.exports=function(e){var t="";return t+='<div class="footer-container"><div><span>2020</span><span class="separator">|</span><span>Built&nbsp;with&nbsp;</span><a href="https://github.com/Azarattum/TheFramework/tree/browser" target="_blank">TheFramework</a></div><div><span>Developed&nbsp;by&nbsp;</span><a href="https://github.com/Azarattum" target="_blank">Azarattum</a><span class="separator">|</span><span>Designed&nbsp;by&nbsp;</span><a href="https://vk.com/didiluy" target="_blank">DrGorski</a><span class="separator">|</span><a href="https://github.com/Azarattum/RecipeApp-Frontend" target="_blank">GitHub</a></div></div>'}},function(e,t,i){"use strict";i.r(t);const r=new(i(7).a);window.addEventListener("load",async()=>{await r.initialize()})},function(e,t,i){var r=i(2),n=i(24);"string"==typeof(n=n.__esModule?n.default:n)&&(n=[[e.i,n,""]]);var o={insert:"head",singleton:!1},s=(r(n,o),n.locals?n.locals:{});e.exports=s},function(e,t,i){(t=i(3)(!1)).push([e.i,'.tagify{text-transform:lowercase;border:none;--tag-bg: var(--color-border) !important;--tag-hover: rgba(148, 211, 161, 0.3) !important}.tagify__dropdown{padding-top:5px;margin-top:-9px;z-index:0 !important;box-shadow:0px 5px 10px rgba(0,0,0,0.3);border-bottom-left-radius:8px;border-bottom-right-radius:8px;--tagify-dd-color-primary: var(--color-text);--tagify-dd-bg-color: var(--color-background);color:var(--color-text)}.tagify__dropdown__wrapper{border:none !important}.tagify .tagify__tag{filter:brightness(1.05)}.search-container{position:relative;display:flex;flex-direction:column;margin-top:55vh;transform:translateY(-100%)}.search-container .header{display:flex;flex-direction:column;justify-content:center;align-items:center;height:calc(55vh - 100px - var(--margin-vertical));font-size:5em;font-family:Quartzo;text-align:center;color:var(--color-text);margin-bottom:var(--margin-vertical)}.search-container .header .logo{width:300px;height:100%;background-size:contain;background-repeat:no-repeat;background-position:bottom;background-image:url(/assets/images/logo.svg)}.search-container .search{display:flex;width:calc(100% - var(--margin-sides) * 2);min-height:40px;max-width:800px;margin-left:auto;margin-right:auto;color:var(--color-text);border-bottom-left-radius:var(--border-radius);border-bottom-right-radius:var(--border-radius);box-shadow:0px 4px 8px rgba(0,0,0,0.15);z-index:10}.search-container .search .bar{float:left;width:calc(100% - 44px);height:100%;font-size:18px;padding:0px;margin:0px;border-bottom-left-radius:var(--border-radius);border-top-left-radius:var(--border-radius);background-color:var(--color-background);--tag-text-color: var(--color-text);--tags-border-color: var(--color-background);--tags-hover-border-color: var(--color-background);--tags-focus-border-color: var(--color-background)}.search-container .search .bar .tagify__input{overflow:hidden;min-width:160px}.search-container .search .bar ::before{width:100%;overflow:hidden;text-overflow:ellipsis;text-transform:none !important;color:var(--color-text)}.search-container .search .bar ::after{color:var(--color-text)}.search-container .search .button{width:42px;border-bottom-right-radius:var(--border-radius);border-top-right-radius:var(--border-radius);color:currentColor;background-color:var(--color-border);transition:background-color 0.2s}.search-container .search .button:hover{background-color:var(--color-background-hover)}.search-container .search .button:hover i{transform:scale(1.1)}.search-container .search .button:active{background-color:var(--color-background-active)}.search-container .search .button:active i{transform:scale(1.2)}.search-container .settings{display:flex;align-items:center;width:calc(100% - var(--margin-sides) * 2);min-height:40px;max-width:800px;margin-left:auto;margin-right:auto}.search-container .settings input[type="checkbox"]{position:relative;width:42px;height:24px;float:left;background-color:var(--color-page);border-radius:50px;outline:none;-webkit-appearance:none;appearance:none;border:none;box-shadow:inset 0px 0px 4px rgba(0,0,0,0.35);overflow:hidden;transition:0.2s;cursor:pointer}.search-container .settings input[type="checkbox"]+label{position:relative;margin-left:4px;color:var(--color-text);font-size:1em;cursor:pointer;user-select:none}.search-container .settings input[type="checkbox"]+label i{text-indent:4px;opacity:0.4;font-size:0.7em}.search-container .settings input[type="checkbox"]+label:hover .tooltip{opacity:1}.search-container .settings input[type="checkbox"]+label .tooltip{position:absolute;left:0px;opacity:0;padding:8px;color:var(--color-text-light);background-color:var(--color-background);box-shadow:0px 5px 10px rgba(0,0,0,0.3);pointer-events:none;border-radius:var(--border-radius);font-size:0.8em;transform:translateY(-110%) translateX(-10%);transition:opacity 0.2s;z-index:15}.search-container .settings input[type="checkbox"]:checked{background-color:var(--color-background-active)}.search-container .settings input[type="checkbox"]:checked:after{left:18px;box-shadow:-4px 0px 8px rgba(0,0,0,0.2)}.search-container .settings input[type="checkbox"]:after{content:"";background-color:var(--color-background);position:absolute;top:1px;left:1px;width:22px;height:22px;border-radius:50%;box-shadow:4px 0px 8px rgba(0,0,0,0.2);transition:0.2s}.search-container .settings .theme{margin-left:auto;cursor:pointer;color:var(--color-text);user-select:none;transition:0.2s;transition-property:transform, margin-right}.search-container .settings .theme i{font-size:2em}@media (prefers-color-scheme: no-preference), (prefers-color-scheme: light){#theme:checked+.page .theme{margin-right:6px;transform:rotateY(180deg)}#theme:checked ~ .tagify__dropdown .tagify__dropdown__item--active{color:var(--color-background) !important}}@media (prefers-color-scheme: dark){#theme:not(:checked)+.page .theme{margin-right:6px;transform:rotateY(180deg)}#theme:not(:checked) ~ .tagify__dropdown .tagify__dropdown__item--active{color:var(--color-background) !important}}\n',""]),e.exports=t},,,function(e,t){},function(e,t,i){var r=i(2),n=i(29);"string"==typeof(n=n.__esModule?n.default:n)&&(n=[[e.i,n,""]]);var o={insert:"head",singleton:!1},s=(r(n,o),n.locals?n.locals:{});e.exports=s},function(e,t,i){(t=i(3)(!1)).push([e.i,'.recipes-container .recipes-list{display:grid;grid-template-columns:repeat(auto-fit, minmax(420px, 1fr));padding-left:var(--padding-sides);padding-right:var(--padding-sides)}.recipes-container .recipes-list .recipe{color:var(--color-text-dark);display:flex;flex-direction:column;margin:var(--margin-sides);background-color:var(--color-background);border-radius:var(--border-radius);box-shadow:0px 8px 16px rgba(0,0,0,0.3);height:220px;overflow:hidden;transition:box-shadow 0.2s;cursor:pointer}.recipes-container .recipes-list .recipe:hover{box-shadow:0px 8px 16px rgba(0,0,0,0.4)}.recipes-container .recipes-list .recipe:hover .title{background-color:var(--color-background-hover)}.recipes-container .recipes-list .recipe .title{padding:8px;height:min-content;text-align:center;font-weight:bold;font-size:1.5em;transition:background-color 0.2s}.recipes-container .recipes-list .recipe .details{height:100%}.recipes-container .recipes-list .recipe .details .picture{float:left;height:100%;width:40%;border-top-right-radius:var(--border-radius);background-size:cover;background-position:center}.recipes-container .recipes-list .recipe .details .description-container{display:flex;flex-direction:column;height:100%}.recipes-container .recipes-list .recipe .details .description-container .time-container{margin:8px;display:flex;align-items:center}.recipes-container .recipes-list .recipe .details .description-container .time-container .time{margin-left:8px}.recipes-container .recipes-list .recipe .details .description-container .description{height:100%;display:inline-block;margin-top:0px;margin:8px;text-overflow:ellipsis;word-wrap:normal;overflow:hidden;-webkit-line-clamp:8;-webkit-box-orient:vertical}.recipes-container .recipes-list .recipe .loader{position:absolute;left:50%;transform:translateX(-50%);bottom:0}.recipes-container .recipes-list .recipe:not(.active) .ingredients,.recipes-container .recipes-list .recipe:not(.active) .steps{display:none}.recipes-container .recipes-list .recipe.active{position:fixed;left:50vw;top:50vh;width:100vw;max-width:600px;height:80vh;margin-left:auto;margin-right:auto;transform:translate(-50%, -50%);animation:open 0.5s;z-index:101;box-shadow:0px 8px 16px rgba(0,0,0,0.4);cursor:unset}.recipes-container .recipes-list .recipe.active .title{background-color:var(--color-text);color:var(--color-background);z-index:1}.recipes-container .recipes-list .recipe.active .details{overflow-y:scroll;overflow-x:hidden}.recipes-container .recipes-list .recipe.active .details::-webkit-scrollbar{width:8px;background-color:var(--color-background)}.recipes-container .recipes-list .recipe.active .details .description-container{border-top-left-radius:var(--border-radius);border-top-right-radius:var(--border-radius);backdrop-filter:blur(30px) brightness(2);-webkit-backdrop-filter:blur(30px) brightness(2);height:max-content;padding-bottom:32px}.recipes-container .recipes-list .recipe.active .details .picture{border-radius:var(--border-radius);background-size:contain;height:300px;margin:auto;width:auto;float:none;background-repeat:no-repeat}.recipes-container .recipes-list .recipe.active .details .picture::before{content:"";background-image:inherit;background-repeat:repeat;position:absolute;width:120%;left:-10%;height:inherit;filter:blur(15px) brightness(0.8);z-index:-1}.recipes-container .recipes-list .recipe.active .details .steps{background-color:var(--color-background)}.recipes-container .recipes-list .recipe.active .details .steps .step-item{display:flex;position:relative;top:calc(-1 * var(--border-radius));flex-direction:column;align-items:center;background-color:var(--color-background);transform:translateX(0);border-radius:var(--border-radius);box-shadow:0px -4px 12px rgba(0,0,0,0.25);margin-bottom:calc(-1 * var(--border-radius));margin-left:auto;margin-right:auto;max-width:600px}.recipes-container .recipes-list .recipe.active .details .steps .step-item .step{max-height:300px}.recipes-container .recipes-list .recipe.active .details .steps .step-item .text{max-width:600px;padding:8px}.recipes-container .recipes-list .recipe.active .ingredients{padding:16px}.recipes-container .recipes-list .recipe.active .ingredients .ingredient-item{display:flex;text-transform:capitalize;font-size:1.1em}.recipes-container .recipes-list .recipe.active .ingredients .ingredient-item .name{font-weight:bold}.recipes-container .recipes-list .recipe.active .ingredients .ingredient-item .amount{text-indent:8px}.recipes-container .recipes-list .backdrop{position:fixed;top:0px;left:0px;height:100vh;width:100vw;pointer-events:none;background-color:black;opacity:0}.recipes-container .recipes-list .backdrop.active{z-index:100;opacity:0.45;cursor:pointer;pointer-events:all}.recipes-container .loader{position:relative;margin-left:auto;margin-right:auto;margin-top:32px;margin-bottom:calc(-32px - 80px);width:80px;height:80px;z-index:200}.recipes-container .loader div{box-sizing:border-box;display:block;position:fixed;width:64px;height:64px;margin:8px;border:8px solid var(--color-text-light);border-radius:50%;box-shadow:0px 8px 16px rgba(0,0,0,0.1);animation:loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;z-index:2;border-color:var(--color-text-light) transparent transparent transparent}.recipes-container .loader div:nth-child(1){animation-delay:-0.45s}.recipes-container .loader div:nth-child(2){animation-delay:-0.3s}.recipes-container .loader div:nth-child(3){animation-delay:-0.15s;z-index:0;background-color:var(--color-border)}@media only screen and (max-width: 600px){.page{--margin-sides: 4px;--margin-vertical: 8px;--padding-sides: 16px}.recipes-container .recipes-list{grid-template-columns:1fr !important}}@keyframes loader{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes open{0%{opacity:0;filter:blur(10px);transform:translate(-50%, -50%) scale(0.8)}100%{opacity:1;transform:translate(-50%, -50%)}}@media (prefers-color-scheme: no-preference), (prefers-color-scheme: light){#theme:checked+.page .recipe.active .description-container{backdrop-filter:blur(30px) brightness(0.4);-webkit-backdrop-filter:blur(30px) brightness(0.4)}}@media (prefers-color-scheme: dark){#theme:not(:checked)+.page .recipe.active .description-container{backdrop-filter:blur(30px) brightness(0.4);-webkit-backdrop-filter:blur(30px) brightness(0.4)}}\n',""]),e.exports=t},function(e,t,i){var r=i(2),n=i(31);"string"==typeof(n=n.__esModule?n.default:n)&&(n=[[e.i,n,""]]);var o={insert:"head",singleton:!1},s=(r(n,o),n.locals?n.locals:{});e.exports=s},function(e,t,i){(t=i(3)(!1)).push([e.i,".footer-container{position:absolute;display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;left:0;bottom:0;width:100%;height:64px;color:var(--color-text-light);opacity:0.8;border-top:solid 1px var(--color-border);overflow:hidden}.footer-container .separator{margin-left:8px;margin-right:8px}@media only screen and (max-width: 600px){.footer-container{font-size:0.7em}}\n",""]),e.exports=t}]);