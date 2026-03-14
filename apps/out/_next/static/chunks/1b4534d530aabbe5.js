(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,30066,(e,r,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"warnOnce",{enumerable:!0,get:function(){return a}});let a=e=>{}},58564,62794,e=>{"use strict";var r=e.i(76809),t=e.i(65773),a=(1+Math.sqrt(5))/2,n=360/(a*a),o=[1,2,3,5,8,13,21,34,55,89];function l(e,r,t){return 0===r?e:e*(1+(t()-.5)*2*r)}var i=[{key:"xs",exp:-2,lh:"1.5"},{key:"sm",exp:-1,lh:"1.5"},{key:"base",exp:0,lh:"1.6"},{key:"lg",exp:1,lh:"1.4"},{key:"xl",exp:2,lh:"1.3"},{key:"2xl",exp:3,lh:"1.2"},{key:"3xl",exp:4,lh:"1.2"},{key:"4xl",exp:5,lh:"1.2"}],s={"vortex-reveal":{value:"rengeVortexReveal var(--renge-duration-9) cubic-bezier(0.4, 0.0, 0.6, 1) forwards",keyframes:`@keyframes rengeVortexReveal {
  0%   { transform: scale(0.8) rotate(20deg); opacity: 0; }
  100% { transform: scale(1) rotate(0deg);   opacity: 1; }
}`},"helix-rise":{value:"rengeHelixRise var(--renge-duration-9) ease-out forwards",keyframes:`@keyframes rengeHelixRise {
  0%   { transform: translateY(50px) rotate(10deg); opacity: 0; }
  100% { transform: translateY(0) rotate(0deg);     opacity: 1; }
}`},"sacred-fade":{value:"rengeSacredFade var(--renge-duration-9) ease-in-out forwards",keyframes:`@keyframes rengeSacredFade {
  0%   { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1);    opacity: 1; }
}`},"spiral-in":{value:"rengeSpiralIn var(--renge-duration-9) cubic-bezier(0.75, 0.2, 0.5, 1) forwards",keyframes:`@keyframes rengeSpiralIn {
  0%   { transform: translate(-30px, 30px) rotate(-12deg); opacity: 0; }
  100% { transform: translate(0, 0) rotate(0deg);          opacity: 1; }
}`},"morph-fade-in":{value:"rengeMorphFadeIn var(--renge-duration-9) ease-in-out forwards",keyframes:`@keyframes rengeMorphFadeIn {
  0%   { opacity: 0; border-radius: 50% 30% 70% 50% / 50% 70% 30% 50%; transform: scale(0.8); }
  50%  { border-radius: 30% 50% 50% 70% / 70% 50% 50% 30%; }
  100% { opacity: 1; transform: scale(1); }
}`},bloom:{value:"rengeBloom var(--renge-duration-10) ease-in-out forwards",keyframes:`@keyframes rengeBloom {
  0%   { transform: scale(0.9); opacity: 0.8; }
  100% { transform: scale(1);   opacity: 1;   }
}`},pulse:{value:"rengePulse var(--renge-duration-9) infinite ease-in-out",keyframes:`@keyframes rengePulse {
  0%, 100% { transform: scale(1);    opacity: 1;   }
  50%       { transform: scale(1.05); opacity: 0.8; }
}`},vibrate:{value:"rengeVibrate var(--renge-duration-6) infinite linear",keyframes:`@keyframes rengeVibrate {
  0%   { transform: translate(0); }
  25%  { transform: translate(-1px, 1px); }
  50%  { transform: translate(1px, -1px); }
  75%  { transform: translate(-1px, 1px); }
  100% { transform: translate(0); }
}`},wave:{value:"rengeWave var(--renge-duration-9) infinite ease-in-out",keyframes:`@keyframes rengeWave {
  0%   { transform: rotate(0deg); }
  50%  { transform: rotate(5deg); }
  100% { transform: rotate(0deg); }
}`},breathe:{value:"rengeBreathe var(--renge-duration-10) ease-in-out infinite",keyframes:`@keyframes rengeBreathe {
  0%, 100% { transform: scale(1);    }
  50%       { transform: scale(1.08); }
}`},fall:{value:"rengeFall var(--renge-duration-9) ease-in-out infinite",keyframes:`@keyframes rengeFall {
  0%   { transform: translateY(0);    }
  50%  { transform: translateY(10px); }
  100% { transform: translateY(0);    }
}`},float:{value:"rengeFloat var(--renge-duration-9) ease-in-out infinite",keyframes:`@keyframes rengeFloat {
  0%   { transform: translateY(0);     }
  50%  { transform: translateY(-10px); }
  100% { transform: translateY(0);     }
}`},"float-wave":{value:"rengeFloatWave var(--renge-duration-9) ease-in-out infinite",keyframes:`@keyframes rengeFloatWave {
  0%   { transform: translateY(0);     }
  50%  { transform: translateY(-22px); }
  100% { transform: translateY(0);     }
}`},"pulse-color-shift":{value:"rengePulseColorShift var(--renge-duration-9) infinite ease-in-out",keyframes:`@keyframes rengePulseColorShift {
  0%, 100% { background: var(--renge-color-success); }
  50%       { background: var(--renge-color-danger);  }
}`},swelling:{value:"rengeSwelling var(--renge-duration-9) ease-in-out infinite",keyframes:`@keyframes rengeSwelling {
  0%, 100% { transform: scale(1);   opacity: 1;   }
  50%       { transform: scale(1.1); opacity: 0.8; }
}`}},c=Object.keys(s),u={skyBlue:{l:75,c:.35,h:210},oceanBlue:{l:50,c:.5,h:190},riverBlue:{l:60,c:.45,h:200},slateBlue:{l:50,c:.4,h:210},cobaltBlue:{l:45,c:.55,h:210},indigo:{l:45,c:.25,h:280},deepIndigo:{l:30,c:.2,h:280},wildIndigo:{l:55,c:.3,h:275},twilightPurple:{l:40,c:.45,h:250},lavender:{l:75,c:.35,h:240},plumPurple:{l:45,c:.6,h:270},grassGreen:{l:70,c:.45,h:120},leafGreen:{l:75,c:.55,h:120},mossGreen:{l:50,c:.6,h:130},seaFoam:{l:80,c:.3,h:170},rainforest:{l:45,c:.6,h:130},pineGreen:{l:45,c:.65,h:140},appleGreen:{l:75,c:.45,h:120},oliveGreen:{l:55,c:.45,h:90},mossyRock:{l:45,c:.4,h:125},earthBrown:{l:45,c:.35,h:30},barkBrown:{l:40,c:.3,h:30},chocolate:{l:35,c:.5,h:30},sandBeige:{l:75,c:.15,h:40},desertTan:{l:80,c:.2,h:30},earthyOchre:{l:60,c:.5,h:40},sunsetOrange:{l:60,c:.6,h:40},leafYellow:{l:70,c:.45,h:60},wheatYellow:{l:75,c:.3,h:60},honeyYellow:{l:80,c:.35,h:50},lemonYellow:{l:85,c:.45,h:60},autumnRed:{l:60,c:.65,h:10},raspberryRed:{l:65,c:.7,h:0},firebrickRed:{l:55,c:.6,h:10},cranberryRed:{l:60,c:.55,h:0},coralPink:{l:80,c:.35,h:350},cherryBlossom:{l:85,c:.35,h:340},wildflowerPink:{l:80,c:.35,h:320},snowWhite:{l:100,c:.05,h:0},fogWhite:{l:90,c:.1,h:210},birchWhite:{l:90,c:.1,h:20},skyGrey:{l:60,c:.2,h:210},stoneGrey:{l:55,c:.2,h:10}};function f(e){return`oklch(${e.l}% ${e.c} ${e.h})`}var g={bg:f(u.snowWhite),bgSubtle:f(u.fogWhite),bgMuted:"oklch(95% 0.02 210)",bgInverse:f(u.slateBlue),fg:"oklch(20% 0.02 210)",fgSubtle:"oklch(35% 0.03 210)",fgMuted:f(u.skyGrey),fgInverse:f(u.snowWhite),border:"oklch(80% 0.02 210)",borderSubtle:"oklch(90% 0.01 210)",borderFocus:f(u.skyBlue),accent:f(u.skyBlue),accentHover:f(u.riverBlue),accentSubtle:"oklch(92% 0.08 210)",success:f(u.grassGreen),successSubtle:"oklch(92% 0.08 120)",warning:f(u.sunsetOrange),warningSubtle:"oklch(92% 0.08 40)",danger:f(u.cranberryRed),dangerSubtle:"oklch(92% 0.08 0)",info:f(u.riverBlue),infoSubtle:"oklch(92% 0.08 200)"},h={clear:g,earth:{bg:f(u.birchWhite),bgSubtle:f(u.sandBeige),bgMuted:"oklch(92% 0.04 30)",bgInverse:f(u.earthBrown),fg:"oklch(20% 0.03 30)",fgSubtle:"oklch(35% 0.04 30)",fgMuted:f(u.stoneGrey),fgInverse:f(u.birchWhite),border:"oklch(78% 0.04 30)",borderSubtle:"oklch(88% 0.02 30)",borderFocus:f(u.earthyOchre),accent:f(u.earthyOchre),accentHover:f(u.earthBrown),accentSubtle:"oklch(90% 0.08 40)",success:f(u.mossGreen),successSubtle:"oklch(90% 0.08 130)",warning:f(u.sunsetOrange),warningSubtle:"oklch(90% 0.08 40)",danger:f(u.autumnRed),dangerSubtle:"oklch(90% 0.08 10)",info:f(u.slateBlue),infoSubtle:"oklch(90% 0.08 210)"},twilight:{bg:f(u.deepIndigo),bgSubtle:"oklch(25% 0.15 270)",bgMuted:"oklch(22% 0.10 270)",bgInverse:f(u.fogWhite),fg:"oklch(92% 0.03 250)",fgSubtle:"oklch(78% 0.04 250)",fgMuted:"oklch(55% 0.08 260)",fgInverse:f(u.deepIndigo),border:"oklch(35% 0.08 270)",borderSubtle:"oklch(28% 0.06 270)",borderFocus:f(u.lavender),accent:f(u.lavender),accentHover:f(u.skyBlue),accentSubtle:"oklch(30% 0.12 250)",success:f(u.seaFoam),successSubtle:"oklch(28% 0.10 170)",warning:f(u.honeyYellow),warningSubtle:"oklch(28% 0.10 50)",danger:f(u.coralPink),dangerSubtle:"oklch(28% 0.10 350)",info:f(u.skyBlue),infoSubtle:"oklch(28% 0.10 210)"}};function d(e){let r={};for(let[t,a]of Object.entries(e)){let e=t.replace(/([A-Z])/g,"-$1").toLowerCase();r[`--renge-color-${e}`]=a}return r}var m={baseUnit:4,typeBase:16,scaleRatio:a,profile:"clear",variance:0,varianceSeed:"renge",includeReset:!1,selector:":root"};function p(e={}){let r={...m,...e},{baseUnit:t,typeBase:n,scaleRatio:c,profile:g,variance:b,varianceSeed:y,selector:k,includeReset:v}=r,x=b>0?function(e){let r=0;for(let t=0;t<e.length;t++){let a=e.charCodeAt(t);r=(r<<5)-r+a,r&=r}return function(){return r=Math.imul((r=Math.imul(r^r>>>16,0x85ebca6b))^r>>>13,0xc2b2ae35),((r^=r>>>16)>>>0)/0x100000000}}(y):void 0,S=function(e,r=0,t){let a={0:"0px"};return o.forEach((n,o)=>{let i=n*e;r>0&&t&&(i=l(i,r,t)),a[String(o+1)]=`${i}px`}),a}(t,b,x),w=function(e,r=a){let t={};for(let a of i){let n=e*Math.pow(r,a.exp);t[a.key]={fontSize:`${n}px`,lineHeight:a.lh}}return t}(n,c),O=function(e=0,r){let t={0:"0ms"};return o.slice(0,10).forEach((a,n)=>{let o=100*a;e>0&&r&&(o=l(o,e,r)),t[String(n+1)]=`${o}ms`}),t}(b,x),B=function(e,r=0,t){let a={none:"0px",full:"9999px"};return o.slice(0,5).forEach((n,o)=>{let i=n*e;r>0&&t&&(i=l(i,r,t)),a[String(o+1)]=`${i}px`}),a}(t,b,x),j=function(){let e={};for(let[r,t]of Object.entries(u)){let a=r.replace(/([A-Z])/g,"-$1").toLowerCase();e[`--renge-palette-${a}`]=f(t)}return e}(),$=d(h[g]),P={};for(let[e,r]of Object.entries(S))P[`--renge-space-${e}`]=r;for(let[e,{fontSize:r,lineHeight:t}]of Object.entries(w))P[`--renge-font-size-${e}`]=r,P[`--renge-line-height-${e}`]=t;for(let[e,r]of Object.entries(O))P[`--renge-duration-${e}`]=r;for(let[e,r]of Object.entries({linear:"linear","ease-out":"cubic-bezier(0.22, 1, 0.36, 1)","ease-in":"cubic-bezier(0.55, 0.055, 0.675, 0.19)","ease-in-out":"cubic-bezier(0.65, 0, 0.35, 1)",spring:"cubic-bezier(0.175, 0.885, 0.32, 1.275)"}))P[`--renge-easing-${e}`]=r;for(let[e,r]of Object.entries(B))P[`--renge-radius-${e}`]=r;for(let[e,r]of Object.entries(j))P[e]=r;for(let[e,r]of Object.entries($))P[e]=r;for(let[e,r]of Object.entries(function(){let e={};for(let[r,t]of Object.entries(s))e[`--renge-animation-${r}`]=t.value;return e}()))P[e]=r;let I=function(e,r,t,a){let n=[];for(let{prefix:a,comment:o}of(t&&n.push(`*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
`),n.push(`${r} {`),[{prefix:"--renge-space-",comment:"/* Spacing */"},{prefix:"--renge-font-size-",comment:"/* Typography - Font Size */"},{prefix:"--renge-line-height-",comment:"/* Typography - Line Height */"},{prefix:"--renge-duration-",comment:"/* Motion - Duration */"},{prefix:"--renge-easing-",comment:"/* Motion - Easing */"},{prefix:"--renge-radius-",comment:"/* Border Radius */"},{prefix:"--renge-animation-",comment:"/* Animations */"},{prefix:"--renge-palette-",comment:"/* Palette Colors */"},{prefix:"--renge-color-",comment:"/* Semantic Colors */"}])){let r=Object.entries(e).filter(([e])=>e.startsWith(a)).sort(([e],[r])=>e.localeCompare(r,void 0,{numeric:!0}));if(r.length>0){for(let[e,t]of(n.push(`  ${o}`),r))n.push(`  ${e}: ${t};`);n.push("")}}return n.push("}"),a&&(n.push(""),n.push("/* Animation Keyframes */"),n.push(a)),n.join("\n")}(P,k,v,Object.values(s).map(e=>e.keyframes).join("\n\n"));return{config:r,vars:P,css:I}}e.s(["ANIMATION_NAMES",()=>c,"FIBONACCI",()=>o,"GOLDEN_ANGLE",()=>n,"PHI",()=>a,"createRengeTheme",()=>p,"createSemanticColorVars",()=>d,"profiles",()=>h],62794);let b=(0,t.createContext)({profile:"clear",setProfile:()=>{}});function y(){return(0,t.useContext)(b)}function k({children:e}){let[a,n]=(0,t.useState)("clear"),o=(0,t.useCallback)(e=>{n(e);let r=d(h[e]),t=document.documentElement;for(let[a,n]of(t.setAttribute("data-profile",e),Object.entries(r)))t.style.setProperty(a,n)},[]);return(0,t.useEffect)(()=>{o("clear")},[o]),(0,r.jsx)(b.Provider,{value:{profile:a,setProfile:o},children:e})}let v=[{id:"clear",label:"Clear",description:"Sky blue. Light. Airy."},{id:"earth",label:"Earth",description:"Ochre. Warm. Grounded."},{id:"twilight",label:"Twilight",description:"Indigo. Deep. Nocturnal."}];function x(){let{profile:e,setProfile:t}=y();return(0,r.jsx)("div",{style:{display:"flex",gap:"var(--renge-space-2)",alignItems:"center"},role:"radiogroup","aria-label":"Color profile",children:v.map(a=>{let n=e===a.id;return(0,r.jsx)("button",{role:"radio","aria-checked":n,onClick:()=>t(a.id),title:a.description,style:{padding:"var(--renge-space-2) var(--renge-space-4)",borderRadius:"var(--renge-radius-full)",border:`1px solid ${n?"var(--renge-color-accent)":"var(--renge-color-border)"}`,background:n?"var(--renge-color-accent-subtle)":"transparent",color:n?"var(--renge-color-accent)":"var(--renge-color-fg-muted)",fontSize:"var(--renge-font-size-sm)",fontFamily:"var(--font-body)",cursor:"pointer",letterSpacing:"0.05em",transition:"all 300ms var(--renge-easing-ease-out)"},children:a.label},a.id)})})}e.s(["ProfileProvider",()=>k,"ProfileToggle",()=>x,"useProfile",()=>y],58564)}]);