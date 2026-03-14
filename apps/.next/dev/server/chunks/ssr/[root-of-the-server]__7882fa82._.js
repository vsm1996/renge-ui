module.exports = [
"[next]/internal/font/google/dm_serif_display_27ec275a.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "dm_serif_display_27ec275a-module__ZmmmdG__className",
  "variable": "dm_serif_display_27ec275a-module__ZmmmdG__variable",
});
}),
"[next]/internal/font/google/dm_serif_display_27ec275a.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$dm_serif_display_27ec275a$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/dm_serif_display_27ec275a.module.css [app-rsc] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$dm_serif_display_27ec275a$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'DM Serif Display', 'DM Serif Display Fallback'",
        fontWeight: 400,
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$dm_serif_display_27ec275a$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$dm_serif_display_27ec275a$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[next]/internal/font/google/outfit_93ba0792.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "outfit_93ba0792-module__m0TUxW__className",
  "variable": "outfit_93ba0792-module__m0TUxW__variable",
});
}),
"[next]/internal/font/google/outfit_93ba0792.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$outfit_93ba0792$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/outfit_93ba0792.module.css [app-rsc] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$outfit_93ba0792$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Outfit', 'Outfit Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$outfit_93ba0792$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$outfit_93ba0792$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[project]/packages/tokens/dist/index.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ANIMATION_NAMES",
    ()=>ANIMATION_NAMES,
    "FIBONACCI",
    ()=>FIBONACCI,
    "GOLDEN_ANGLE",
    ()=>GOLDEN_ANGLE,
    "PHI",
    ()=>PHI,
    "createAnimationKeyframesCSS",
    ()=>createAnimationKeyframesCSS,
    "createAnimationVars",
    ()=>createAnimationVars,
    "createDurationScale",
    ()=>createDurationScale,
    "createEasingTokens",
    ()=>createEasingTokens,
    "createPaletteVars",
    ()=>createPaletteVars,
    "createRadiusScale",
    ()=>createRadiusScale,
    "createRengeTheme",
    ()=>createRengeTheme,
    "createSemanticColorVars",
    ()=>createSemanticColorVars,
    "createSpacingScale",
    ()=>createSpacingScale,
    "createTypeScale",
    ()=>createTypeScale,
    "getProfile",
    ()=>getProfile,
    "oklch",
    ()=>oklch,
    "palette",
    ()=>palette,
    "phyllotaxis",
    ()=>phyllotaxis,
    "profiles",
    ()=>profiles
]);
// src/constants.ts
var PHI = (1 + Math.sqrt(5)) / 2;
var GOLDEN_ANGLE = 360 / (PHI * PHI);
var FIBONACCI = [
    1,
    2,
    3,
    5,
    8,
    13,
    21,
    34,
    55,
    89
];
function seededRandom(seed) {
    let hash = 0;
    for(let i = 0; i < seed.length; i++){
        const char = seed.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return function() {
        hash = Math.imul(hash ^ hash >>> 16, 2246822507);
        hash = Math.imul(hash ^ hash >>> 13, 3266489909);
        hash ^= hash >>> 16;
        return (hash >>> 0) / 4294967296;
    };
}
function applyVariance(value, variance, random) {
    if (variance === 0) return value;
    const drift = (random() - 0.5) * 2 * variance;
    return value * (1 + drift);
}
// src/scales/spacing.ts
function createSpacingScale(baseUnit, variance = 0, random) {
    const scale = {
        "0": "0px"
    };
    FIBONACCI.forEach((fib, index)=>{
        let value = fib * baseUnit;
        if (variance > 0 && random) {
            value = applyVariance(value, variance, random);
        }
        scale[String(index + 1)] = `${value}px`;
    });
    return scale;
}
// src/scales/typography.ts
var LH_BODY = +PHI.toFixed(3);
var LH_HEADING = +(1 + 1 / (PHI * PHI)).toFixed(3);
var LH_DISPLAY = +(1 + 1 / (PHI * PHI * PHI)).toFixed(3);
var TYPE_STEPS = [
    {
        key: "xs",
        exp: -2,
        lh: String(LH_BODY)
    },
    {
        key: "sm",
        exp: -1,
        lh: String(LH_BODY)
    },
    {
        key: "base",
        exp: 0,
        lh: String(LH_BODY)
    },
    {
        key: "lg",
        exp: 1,
        lh: String(LH_BODY)
    },
    {
        key: "xl",
        exp: 2,
        lh: String(LH_HEADING)
    },
    {
        key: "2xl",
        exp: 3,
        lh: String(LH_HEADING)
    },
    {
        key: "3xl",
        exp: 4,
        lh: String(LH_DISPLAY)
    },
    {
        key: "4xl",
        exp: 5,
        lh: String(LH_DISPLAY)
    }
];
function createTypeScale(base, ratio = PHI) {
    const scale = {};
    for (const step of TYPE_STEPS){
        const size = base * Math.pow(ratio, step.exp);
        scale[step.key] = {
            fontSize: `${size}px`,
            lineHeight: step.lh
        };
    }
    return scale;
}
// src/scales/motion.ts
var A = +(1 / (PHI * PHI)).toFixed(3);
var B = +(1 / PHI).toFixed(3);
function createDurationScale(variance = 0, random) {
    const scale = {
        "0": "0ms"
    };
    FIBONACCI.slice(0, 10).forEach((fib, index)=>{
        let value = fib * 100;
        if (variance > 0 && random) {
            value = applyVariance(value, variance, random);
        }
        scale[String(index + 1)] = `${value}ms`;
    });
    return scale;
}
function createEasingTokens() {
    return {
        linear: "linear",
        "ease-out": `cubic-bezier(${A}, 1, ${B}, 1)`,
        "ease-in": `cubic-bezier(${A}, 0, 1, ${B})`,
        "ease-in-out": `cubic-bezier(${A}, 0, ${B}, 1)`,
        spring: `cubic-bezier(${A}, ${B}, ${B}, ${1 + A})`
    };
}
// src/scales/radius.ts
function createRadiusScale(baseUnit, variance = 0, random) {
    const scale = {
        none: "0px",
        full: "9999px"
    };
    FIBONACCI.slice(0, 5).forEach((fib, index)=>{
        let value = fib * baseUnit;
        if (variance > 0 && random) {
            value = applyVariance(value, variance, random);
        }
        scale[String(index + 1)] = `${value}px`;
    });
    return scale;
}
// src/scales/animations.ts
var DEFS = {
    "vortex-reveal": {
        value: "rengeVortexReveal var(--renge-duration-9) cubic-bezier(0.4, 0.0, 0.6, 1) forwards",
        keyframes: `@keyframes rengeVortexReveal {
  0%   { transform: scale(0.8) rotate(20deg); opacity: 0; }
  100% { transform: scale(1) rotate(0deg);   opacity: 1; }
}`
    },
    "helix-rise": {
        value: "rengeHelixRise var(--renge-duration-9) ease-out forwards",
        keyframes: `@keyframes rengeHelixRise {
  0%   { transform: translateY(50px) rotate(10deg); opacity: 0; }
  100% { transform: translateY(0) rotate(0deg);     opacity: 1; }
}`
    },
    "sacred-fade": {
        value: "rengeSacredFade var(--renge-duration-9) ease-in-out forwards",
        keyframes: `@keyframes rengeSacredFade {
  0%   { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1);    opacity: 1; }
}`
    },
    "spiral-in": {
        value: "rengeSpiralIn var(--renge-duration-9) cubic-bezier(0.75, 0.2, 0.5, 1) forwards",
        keyframes: `@keyframes rengeSpiralIn {
  0%   { transform: translate(-30px, 30px) rotate(-12deg); opacity: 0; }
  100% { transform: translate(0, 0) rotate(0deg);          opacity: 1; }
}`
    },
    "morph-fade-in": {
        value: "rengeMorphFadeIn var(--renge-duration-9) ease-in-out forwards",
        keyframes: `@keyframes rengeMorphFadeIn {
  0%   { opacity: 0; border-radius: 50% 30% 70% 50% / 50% 70% 30% 50%; transform: scale(0.8); }
  50%  { border-radius: 30% 50% 50% 70% / 70% 50% 50% 30%; }
  100% { opacity: 1; transform: scale(1); }
}`
    },
    "bloom": {
        value: "rengeBloom var(--renge-duration-10) ease-in-out forwards",
        keyframes: `@keyframes rengeBloom {
  0%   { transform: scale(0.9); opacity: 0.8; }
  100% { transform: scale(1);   opacity: 1;   }
}`
    },
    "pulse": {
        value: "rengePulse var(--renge-duration-9) infinite ease-in-out",
        keyframes: `@keyframes rengePulse {
  0%, 100% { transform: scale(1);    opacity: 1;   }
  50%       { transform: scale(1.05); opacity: 0.8; }
}`
    },
    "vibrate": {
        value: "rengeVibrate var(--renge-duration-6) infinite linear",
        keyframes: `@keyframes rengeVibrate {
  0%   { transform: translate(0); }
  25%  { transform: translate(-1px, 1px); }
  50%  { transform: translate(1px, -1px); }
  75%  { transform: translate(-1px, 1px); }
  100% { transform: translate(0); }
}`
    },
    "wave": {
        value: "rengeWave var(--renge-duration-9) infinite ease-in-out",
        keyframes: `@keyframes rengeWave {
  0%   { transform: rotate(0deg); }
  50%  { transform: rotate(5deg); }
  100% { transform: rotate(0deg); }
}`
    },
    "breathe": {
        value: "rengeBreathe var(--renge-duration-10) ease-in-out infinite",
        keyframes: `@keyframes rengeBreathe {
  0%, 100% { transform: scale(1);    }
  50%       { transform: scale(1.08); }
}`
    },
    "fall": {
        value: "rengeFall var(--renge-duration-9) ease-in-out infinite",
        keyframes: `@keyframes rengeFall {
  0%   { transform: translateY(0);    }
  50%  { transform: translateY(10px); }
  100% { transform: translateY(0);    }
}`
    },
    "float": {
        value: "rengeFloat var(--renge-duration-9) ease-in-out infinite",
        keyframes: `@keyframes rengeFloat {
  0%   { transform: translateY(0);     }
  50%  { transform: translateY(-10px); }
  100% { transform: translateY(0);     }
}`
    },
    "float-wave": {
        value: "rengeFloatWave var(--renge-duration-9) ease-in-out infinite",
        keyframes: `@keyframes rengeFloatWave {
  0%   { transform: translateY(0);     }
  50%  { transform: translateY(-22px); }
  100% { transform: translateY(0);     }
}`
    },
    "pulse-color-shift": {
        value: "rengePulseColorShift var(--renge-duration-9) infinite ease-in-out",
        keyframes: `@keyframes rengePulseColorShift {
  0%, 100% { background: var(--renge-color-success); }
  50%       { background: var(--renge-color-danger);  }
}`
    },
    "swelling": {
        value: "rengeSwelling var(--renge-duration-9) ease-in-out infinite",
        keyframes: `@keyframes rengeSwelling {
  0%, 100% { transform: scale(1);   opacity: 1;   }
  50%       { transform: scale(1.1); opacity: 0.8; }
}`
    }
};
var ANIMATION_NAMES = Object.keys(DEFS);
function createAnimationVars() {
    const vars = {};
    for (const [name, def] of Object.entries(DEFS)){
        vars[`--renge-animation-${name}`] = def.value;
    }
    return vars;
}
function createAnimationKeyframesCSS() {
    return Object.values(DEFS).map((d)=>d.keyframes).join("\n\n");
}
// src/colors/palette.ts
var palette = {
    // Blues
    skyBlue: {
        l: 75,
        c: 0.35,
        h: 210
    },
    oceanBlue: {
        l: 50,
        c: 0.5,
        h: 190
    },
    riverBlue: {
        l: 60,
        c: 0.45,
        h: 200
    },
    slateBlue: {
        l: 50,
        c: 0.4,
        h: 210
    },
    cobaltBlue: {
        l: 45,
        c: 0.55,
        h: 210
    },
    // Indigos
    indigo: {
        l: 45,
        c: 0.25,
        h: 280
    },
    deepIndigo: {
        l: 30,
        c: 0.2,
        h: 280
    },
    wildIndigo: {
        l: 55,
        c: 0.3,
        h: 275
    },
    // Purples
    twilightPurple: {
        l: 40,
        c: 0.45,
        h: 250
    },
    lavender: {
        l: 75,
        c: 0.35,
        h: 240
    },
    plumPurple: {
        l: 45,
        c: 0.6,
        h: 270
    },
    // Greens
    grassGreen: {
        l: 70,
        c: 0.45,
        h: 120
    },
    leafGreen: {
        l: 75,
        c: 0.55,
        h: 120
    },
    mossGreen: {
        l: 50,
        c: 0.6,
        h: 130
    },
    seaFoam: {
        l: 80,
        c: 0.3,
        h: 170
    },
    rainforest: {
        l: 45,
        c: 0.6,
        h: 130
    },
    pineGreen: {
        l: 45,
        c: 0.65,
        h: 140
    },
    appleGreen: {
        l: 75,
        c: 0.45,
        h: 120
    },
    oliveGreen: {
        l: 55,
        c: 0.45,
        h: 90
    },
    mossyRock: {
        l: 45,
        c: 0.4,
        h: 125
    },
    // Browns & Earthtones
    earthBrown: {
        l: 45,
        c: 0.35,
        h: 30
    },
    barkBrown: {
        l: 40,
        c: 0.3,
        h: 30
    },
    chocolate: {
        l: 35,
        c: 0.5,
        h: 30
    },
    sandBeige: {
        l: 75,
        c: 0.15,
        h: 40
    },
    desertTan: {
        l: 80,
        c: 0.2,
        h: 30
    },
    earthyOchre: {
        l: 60,
        c: 0.5,
        h: 40
    },
    // Oranges & Yellows
    sunsetOrange: {
        l: 60,
        c: 0.6,
        h: 40
    },
    leafYellow: {
        l: 70,
        c: 0.45,
        h: 60
    },
    wheatYellow: {
        l: 75,
        c: 0.3,
        h: 60
    },
    honeyYellow: {
        l: 80,
        c: 0.35,
        h: 50
    },
    lemonYellow: {
        l: 85,
        c: 0.45,
        h: 60
    },
    // Reds & Pinks
    autumnRed: {
        l: 60,
        c: 0.65,
        h: 10
    },
    raspberryRed: {
        l: 65,
        c: 0.7,
        h: 0
    },
    firebrickRed: {
        l: 55,
        c: 0.6,
        h: 10
    },
    cranberryRed: {
        l: 60,
        c: 0.55,
        h: 0
    },
    coralPink: {
        l: 80,
        c: 0.35,
        h: 350
    },
    cherryBlossom: {
        l: 85,
        c: 0.35,
        h: 340
    },
    wildflowerPink: {
        l: 80,
        c: 0.35,
        h: 320
    },
    // Neutrals
    snowWhite: {
        l: 100,
        c: 0.05,
        h: 0
    },
    fogWhite: {
        l: 90,
        c: 0.1,
        h: 210
    },
    birchWhite: {
        l: 90,
        c: 0.1,
        h: 20
    },
    skyGrey: {
        l: 60,
        c: 0.2,
        h: 210
    },
    stoneGrey: {
        l: 55,
        c: 0.2,
        h: 10
    }
};
function oklch(color) {
    return `oklch(${color.l}% ${color.c} ${color.h})`;
}
function createPaletteVars() {
    const vars = {};
    for (const [key, color] of Object.entries(palette)){
        const kebab = key.replace(/([A-Z])/g, "-$1").toLowerCase();
        vars[`--renge-palette-${kebab}`] = oklch(color);
    }
    return vars;
}
// src/colors/profiles/ocean.ts
var ocean = {
    bg: oklch(palette.snowWhite),
    bgSubtle: oklch(palette.fogWhite),
    bgMuted: "oklch(95% 0.02 210)",
    bgInverse: oklch(palette.slateBlue),
    fg: "oklch(20% 0.02 210)",
    fgSubtle: "oklch(35% 0.03 210)",
    fgMuted: oklch(palette.skyGrey),
    fgInverse: oklch(palette.snowWhite),
    border: "oklch(80% 0.02 210)",
    borderSubtle: "oklch(90% 0.01 210)",
    borderFocus: oklch(palette.skyBlue),
    accent: oklch(palette.skyBlue),
    accentHover: oklch(palette.riverBlue),
    accentSubtle: "oklch(92% 0.08 210)",
    success: oklch(palette.grassGreen),
    successSubtle: "oklch(92% 0.08 120)",
    warning: oklch(palette.sunsetOrange),
    warningSubtle: "oklch(92% 0.08 40)",
    danger: oklch(palette.cranberryRed),
    dangerSubtle: "oklch(92% 0.08 0)",
    info: oklch(palette.riverBlue),
    infoSubtle: "oklch(92% 0.08 200)"
};
// src/colors/profiles/earth.ts
var earth = {
    bg: oklch(palette.birchWhite),
    bgSubtle: oklch(palette.desertTan),
    bgMuted: "oklch(92% 0.03 28)",
    bgInverse: oklch(palette.barkBrown),
    fg: "oklch(18% 0.04 28)",
    fgSubtle: "oklch(33% 0.05 28)",
    fgMuted: "oklch(52% 0.1 28)",
    fgInverse: oklch(palette.birchWhite),
    border: "oklch(76% 0.05 28)",
    borderSubtle: "oklch(87% 0.03 28)",
    borderFocus: oklch(palette.earthBrown),
    accent: oklch(palette.earthBrown),
    accentHover: oklch(palette.chocolate),
    accentSubtle: "oklch(88% 0.06 28)",
    success: oklch(palette.mossGreen),
    successSubtle: "oklch(90% 0.08 130)",
    warning: oklch(palette.sunsetOrange),
    warningSubtle: "oklch(90% 0.08 40)",
    danger: oklch(palette.autumnRed),
    dangerSubtle: "oklch(90% 0.08 10)",
    info: oklch(palette.slateBlue),
    infoSubtle: "oklch(90% 0.08 210)"
};
// src/colors/profiles/twilight.ts
var twilight = {
    bg: oklch(palette.deepIndigo),
    bgSubtle: "oklch(25% 0.15 270)",
    bgMuted: "oklch(22% 0.10 270)",
    bgInverse: oklch(palette.fogWhite),
    fg: "oklch(92% 0.03 250)",
    fgSubtle: "oklch(78% 0.04 250)",
    fgMuted: "oklch(55% 0.08 260)",
    fgInverse: oklch(palette.deepIndigo),
    border: "oklch(35% 0.08 270)",
    borderSubtle: "oklch(28% 0.06 270)",
    borderFocus: oklch(palette.lavender),
    accent: oklch(palette.lavender),
    accentHover: oklch(palette.skyBlue),
    accentSubtle: "oklch(30% 0.12 250)",
    success: oklch(palette.seaFoam),
    successSubtle: "oklch(28% 0.10 170)",
    warning: oklch(palette.honeyYellow),
    warningSubtle: "oklch(28% 0.10 50)",
    danger: oklch(palette.coralPink),
    dangerSubtle: "oklch(28% 0.10 350)",
    info: oklch(palette.skyBlue),
    infoSubtle: "oklch(28% 0.10 210)"
};
// src/colors/profiles/index.ts
var profiles = {
    ocean,
    earth,
    twilight
};
function getProfile(name) {
    return profiles[name];
}
function createSemanticColorVars(profile) {
    const vars = {};
    for (const [key, value] of Object.entries(profile)){
        const kebab = key.replace(/([A-Z])/g, "-$1").toLowerCase();
        vars[`--renge-color-${kebab}`] = value;
    }
    return vars;
}
// src/theme.ts
var defaults = {
    baseUnit: 4,
    typeBase: 16,
    scaleRatio: PHI,
    profile: "ocean",
    variance: 0,
    varianceSeed: "renge",
    includeReset: false,
    selector: ":root"
};
function createRengeTheme(config = {}) {
    const resolved = {
        ...defaults,
        ...config
    };
    const { baseUnit, typeBase, scaleRatio, profile, variance, varianceSeed, selector, includeReset } = resolved;
    const random = variance > 0 ? seededRandom(varianceSeed) : void 0;
    const spacing = createSpacingScale(baseUnit, variance, random);
    const typography = createTypeScale(typeBase, scaleRatio);
    const duration = createDurationScale(variance, random);
    const easing = createEasingTokens();
    const radius = createRadiusScale(baseUnit, variance, random);
    const paletteVars = createPaletteVars();
    const semanticVars = createSemanticColorVars(profiles[profile]);
    const vars = {};
    for (const [key, value] of Object.entries(spacing)){
        vars[`--renge-space-${key}`] = value;
    }
    for (const [key, { fontSize, lineHeight }] of Object.entries(typography)){
        vars[`--renge-font-size-${key}`] = fontSize;
        vars[`--renge-line-height-${key}`] = lineHeight;
    }
    for (const [key, value] of Object.entries(duration)){
        vars[`--renge-duration-${key}`] = value;
    }
    for (const [key, value] of Object.entries(easing)){
        vars[`--renge-easing-${key}`] = value;
    }
    for (const [key, value] of Object.entries(radius)){
        vars[`--renge-radius-${key}`] = value;
    }
    for (const [key, value] of Object.entries(paletteVars)){
        vars[key] = value;
    }
    for (const [key, value] of Object.entries(semanticVars)){
        vars[key] = value;
    }
    for (const [key, value] of Object.entries(createAnimationVars())){
        vars[key] = value;
    }
    const css = generateCSS(vars, selector, includeReset, createAnimationKeyframesCSS());
    return {
        config: resolved,
        vars,
        css
    };
}
function generateCSS(vars, selector, includeReset, keyframesCSS) {
    const lines = [];
    if (includeReset) {
        lines.push(`*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
`);
    }
    lines.push(`${selector} {`);
    const categories = [
        {
            prefix: "--renge-space-",
            comment: "/* Spacing */"
        },
        {
            prefix: "--renge-font-size-",
            comment: "/* Typography - Font Size */"
        },
        {
            prefix: "--renge-line-height-",
            comment: "/* Typography - Line Height */"
        },
        {
            prefix: "--renge-duration-",
            comment: "/* Motion - Duration */"
        },
        {
            prefix: "--renge-easing-",
            comment: "/* Motion - Easing */"
        },
        {
            prefix: "--renge-radius-",
            comment: "/* Border Radius */"
        },
        {
            prefix: "--renge-animation-",
            comment: "/* Animations */"
        },
        {
            prefix: "--renge-palette-",
            comment: "/* Palette Colors */"
        },
        {
            prefix: "--renge-color-",
            comment: "/* Semantic Colors */"
        }
    ];
    for (const { prefix, comment } of categories){
        const categoryVars = Object.entries(vars).filter(([key])=>key.startsWith(prefix)).sort(([a], [b])=>a.localeCompare(b, void 0, {
                numeric: true
            }));
        if (categoryVars.length > 0) {
            lines.push(`  ${comment}`);
            for (const [key, value] of categoryVars){
                lines.push(`  ${key}: ${value};`);
            }
            lines.push("");
        }
    }
    lines.push("}");
    if (keyframesCSS) {
        lines.push("");
        lines.push("/* Animation Keyframes */");
        lines.push(keyframesCSS);
    }
    return lines.join("\n");
}
// src/phyllotaxis.ts
function phyllotaxis(config) {
    const { count, spread = 10, angleOffset = GOLDEN_ANGLE, scale = 1 } = config;
    const points = [];
    for(let i = 0; i < count; i++){
        const angle = i * angleOffset * (Math.PI / 180);
        const radius = spread * Math.sqrt(i) * scale;
        points.push({
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle),
            index: i,
            angle,
            radius
        });
    }
    return points;
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/apps/src/lib/tokens.ts [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "color",
    ()=>color,
    "duration",
    ()=>duration,
    "easing",
    ()=>easing,
    "fontSize",
    ()=>fontSize,
    "generateRootCSS",
    ()=>generateRootCSS,
    "getProfileVars",
    ()=>getProfileVars,
    "radius",
    ()=>radius,
    "space",
    ()=>space
]);
/**
 * Token utilities for the Renge site.
 * Generates CSS and provides typed access to design tokens.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$tokens$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/tokens/dist/index.mjs [app-rsc] (ecmascript)");
;
;
function generateRootCSS(profile = "ocean") {
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$tokens$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createRengeTheme"])({
        profile
    });
    return theme.css;
}
function getProfileVars(profile) {
    const semanticColorVars = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$tokens$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSemanticColorVars"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$tokens$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["profiles"][profile]);
    const vars = {};
    for (const [key, value] of Object.entries(semanticColorVars)){
        vars[key] = value;
    }
    return vars;
}
const space = {
    0: "var(--renge-space-0)",
    1: "var(--renge-space-1)",
    2: "var(--renge-space-2)",
    3: "var(--renge-space-3)",
    4: "var(--renge-space-4)",
    5: "var(--renge-space-5)",
    6: "var(--renge-space-6)",
    7: "var(--renge-space-7)",
    8: "var(--renge-space-8)",
    9: "var(--renge-space-9)",
    10: "var(--renge-space-10)"
};
const fontSize = {
    xs: "var(--renge-font-size-xs)",
    sm: "var(--renge-font-size-sm)",
    base: "var(--renge-font-size-base)",
    lg: "var(--renge-font-size-lg)",
    xl: "var(--renge-font-size-xl)",
    "2xl": "var(--renge-font-size-2xl)",
    "3xl": "var(--renge-font-size-3xl)",
    "4xl": "var(--renge-font-size-4xl)"
};
const duration = {
    0: "var(--renge-duration-0)",
    1: "var(--renge-duration-1)",
    2: "var(--renge-duration-2)",
    3: "var(--renge-duration-3)",
    4: "var(--renge-duration-4)",
    5: "var(--renge-duration-5)",
    6: "var(--renge-duration-6)"
};
const easing = {
    linear: "var(--renge-easing-linear)",
    out: "var(--renge-easing-ease-out)",
    in: "var(--renge-easing-ease-in)",
    inOut: "var(--renge-easing-ease-in-out)",
    spring: "var(--renge-easing-spring)"
};
const radius = {
    none: "var(--renge-radius-none)",
    1: "var(--renge-radius-1)",
    2: "var(--renge-radius-2)",
    3: "var(--renge-radius-3)",
    4: "var(--renge-radius-4)",
    5: "var(--renge-radius-5)",
    full: "var(--renge-radius-full)"
};
const color = {
    bg: "var(--renge-color-bg)",
    bgSubtle: "var(--renge-color-bg-subtle)",
    bgMuted: "var(--renge-color-bg-muted)",
    bgInverse: "var(--renge-color-bg-inverse)",
    fg: "var(--renge-color-fg)",
    fgSubtle: "var(--renge-color-fg-subtle)",
    fgMuted: "var(--renge-color-fg-muted)",
    fgInverse: "var(--renge-color-fg-inverse)",
    border: "var(--renge-color-border)",
    borderSubtle: "var(--renge-color-border-subtle)",
    accent: "var(--renge-color-accent)",
    accentHover: "var(--renge-color-accent-hover)",
    accentSubtle: "var(--renge-color-accent-subtle)"
};
}),
"[project]/apps/src/app/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$dm_serif_display_27ec275a$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/dm_serif_display_27ec275a.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$outfit_93ba0792$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/outfit_93ba0792.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$tokens$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/src/lib/tokens.ts [app-rsc] (ecmascript) <locals>");
;
;
;
;
;
const metadata = {
    title: "Renge — Proportion as a First Principle",
    description: "A design system built on natural mathematics. PHI. Fibonacci. The ratios that appear in every living thing.",
    openGraph: {
        title: "Renge — Proportion as a First Principle",
        description: "A design system built on natural mathematics. PHI. Fibonacci. The ratios that appear in every living thing.",
        type: "website"
    }
};
function RootLayout({ children }) {
    // Generate token CSS server-side — inject as style tag
    const tokenCSS = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$tokens$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["generateRootCSS"])("ocean");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "en",
        className: `${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$dm_serif_display_27ec275a$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].variable} ${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$outfit_93ba0792$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].variable}`,
        "data-profile": "ocean",
        suppressHydrationWarning: true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("head", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                    dangerouslySetInnerHTML: {
                        __html: tokenCSS
                    },
                    "data-renge-tokens": true
                }, void 0, false, {
                    fileName: "[project]/apps/src/app/layout.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/src/app/layout.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/src/app/layout.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/src/app/layout.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-rsc] (ecmascript)").vendored['react-rsc'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7882fa82._.js.map