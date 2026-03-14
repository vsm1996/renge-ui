(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/packages/tokens/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
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
_c = ANIMATION_NAMES;
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
var _c;
__turbopack_context__.k.register(_c, "ANIMATION_NAMES");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=index.mjs.map
}),
"[project]/apps/src/components/ui/ProfileToggle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProfileProvider",
    ()=>ProfileProvider,
    "ProfileToggle",
    ()=>ProfileToggle,
    "useProfile",
    ()=>useProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$tokens$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/tokens/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
const ProfileContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    profile: "ocean",
    setProfile: ()=>{}
});
function useProfile() {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ProfileContext);
}
_s(useProfile, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
function ProfileProvider({ children }) {
    _s1();
    const [profile, setProfileState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("ocean");
    const setProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ProfileProvider.useCallback[setProfile]": (p)=>{
            setProfileState(p);
            // Apply semantic color vars to :root
            const vars = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$tokens$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSemanticColorVars"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$tokens$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["profiles"][p]);
            const root = document.documentElement;
            root.setAttribute("data-profile", p);
            for (const [key, value] of Object.entries(vars)){
                root.style.setProperty(key, value);
            }
        }
    }["ProfileProvider.useCallback[setProfile]"], []);
    // Sync on mount to ensure correct state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProfileProvider.useEffect": ()=>{
            setProfile("ocean");
        }
    }["ProfileProvider.useEffect"], [
        setProfile
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProfileContext.Provider, {
        value: {
            profile,
            setProfile
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/src/components/ui/ProfileToggle.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_s1(ProfileProvider, "XcKu7pGfrVV3nbixPUIObVlgAEA=");
_c = ProfileProvider;
// ============================================================================
// Toggle UI
// ============================================================================
const PROFILES = [
    {
        id: "ocean",
        label: "Ocean",
        description: "Sky blue. Light. Airy."
    },
    {
        id: "earth",
        label: "Earth",
        description: "Ochre. Warm. Grounded."
    },
    {
        id: "twilight",
        label: "Twilight",
        description: "Indigo. Deep. Nocturnal."
    }
];
function ProfileToggle() {
    _s2();
    const { profile, setProfile } = useProfile();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            gap: "var(--renge-space-2)",
            alignItems: "center"
        },
        role: "radiogroup",
        "aria-label": "Color profile",
        children: PROFILES.map((p)=>{
            const active = profile === p.id;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                role: "radio",
                "aria-checked": active,
                onClick: ()=>setProfile(p.id),
                title: p.description,
                style: {
                    padding: "var(--renge-space-2) var(--renge-space-4)",
                    borderRadius: "var(--renge-radius-full)",
                    border: `1px solid ${active ? "var(--renge-color-accent)" : "var(--renge-color-border)"}`,
                    background: active ? "var(--renge-color-accent-subtle)" : "transparent",
                    color: active ? "var(--renge-color-accent)" : "var(--renge-color-fg-muted)",
                    fontSize: "var(--renge-font-size-sm)",
                    fontFamily: "var(--font-body)",
                    cursor: "pointer",
                    letterSpacing: "0.05em",
                    transition: "all 300ms var(--renge-easing-ease-out)"
                },
                children: p.label
            }, p.id, false, {
                fileName: "[project]/apps/src/components/ui/ProfileToggle.tsx",
                lineNumber: 81,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/apps/src/components/ui/ProfileToggle.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
_s2(ProfileToggle, "kqiHnVjTaWmlJkl2s88IK1vOtco=", false, function() {
    return [
        useProfile
    ];
});
_c1 = ProfileToggle;
var _c, _c1;
__turbopack_context__.k.register(_c, "ProfileProvider");
__turbopack_context__.k.register(_c1, "ProfileToggle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/src/lib/phi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EASE_OUT",
    ()=>EASE_OUT,
    "FIBONACCI",
    ()=>FIBONACCI,
    "GOLDEN_ANGLE",
    ()=>GOLDEN_ANGLE,
    "PHI",
    ()=>PHI,
    "phi",
    ()=>phi,
    "space",
    ()=>space
]);
const PHI = (1 + Math.sqrt(5)) / 2;
const GOLDEN_ANGLE = 360 / (PHI * PHI);
const FIBONACCI = [
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
const EASE_OUT = [
    0.382,
    1,
    0.618,
    1
];
function phi(n) {
    return Math.pow(PHI, n);
}
function space(step) {
    return `var(--renge-space-${step})`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/src/components/ui/Nav.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Nav",
    ()=>Nav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.36.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/src/lib/phi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$components$2f$ui$2f$ProfileToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/src/components/ui/ProfileToggle.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
function Nav() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].nav, {
        style: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "var(--renge-space-3) var(--renge-space-5)",
            borderBottom: "1px solid transparent"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "#",
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--renge-space-2)",
                    textDecoration: "none",
                    color: "var(--renge-color-fg)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        width: "20",
                        height: "20",
                        viewBox: "0 0 20 20",
                        "aria-hidden": true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                            x: "1",
                            y: "1",
                            width: 12.36,
                            height: 12.36 / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHI"],
                            fill: "none",
                            stroke: "var(--renge-color-accent)",
                            strokeWidth: "1"
                        }, void 0, false, {
                            fileName: "[project]/apps/src/components/ui/Nav.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/src/components/ui/Nav.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: "var(--font-display)",
                            fontSize: "var(--renge-font-size-lg)",
                            letterSpacing: "-0.01em"
                        },
                        children: "Renge"
                    }, void 0, false, {
                        fileName: "[project]/apps/src/components/ui/Nav.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/src/components/ui/Nav.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--renge-space-5)"
                },
                children: [
                    [
                        {
                            label: "Philosophy",
                            href: "#philosophy"
                        },
                        {
                            label: "Tokens",
                            href: "#tokens"
                        },
                        {
                            label: "Components",
                            href: "/docs"
                        },
                        {
                            label: "Start",
                            href: "#start"
                        }
                    ].map(({ label, href })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: href,
                            style: {
                                fontSize: "var(--renge-font-size-sm)",
                                color: "var(--renge-color-fg-muted)",
                                textDecoration: "none",
                                fontFamily: "var(--font-body)",
                                letterSpacing: "0.04em",
                                transition: "color 200ms"
                            },
                            onMouseEnter: (e)=>e.currentTarget.style.color = "var(--renge-color-fg)",
                            onMouseLeave: (e)=>e.currentTarget.style.color = "var(--renge-color-fg-muted)",
                            children: label
                        }, href, false, {
                            fileName: "[project]/apps/src/components/ui/Nav.tsx",
                            lineNumber: 62,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$components$2f$ui$2f$ProfileToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProfileToggle"], {}, void 0, false, {
                        fileName: "[project]/apps/src/components/ui/Nav.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/src/components/ui/Nav.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/src/components/ui/Nav.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = Nav;
var _c;
__turbopack_context__.k.register(_c, "Nav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/src/components/ui/Lotus.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Lotus",
    ()=>Lotus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.36.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/src/lib/phi.ts [app-client] (ecmascript)");
"use client";
;
;
;
/**
 * Lotus flower — top-down view.
 *
 * Mathematical structure:
 *   • Two concentric petal rings: 8 outer + 5 inner = 13 total (Fibonacci)
 *   • Ring radii scale by 1/φ:  r_inner = r_outer / φ
 *   • Petal dimensions scale by 1/φ between rings
 *   • Inner ring starting angle offset by GOLDEN_ANGLE (137.508°) — phyllotaxis
 *   • Receptacle seed holes: 13 arranged in a ring (Fibonacci)
 *   • Stamen dots: 21 arranged in a ring (Fibonacci)
 *
 * All colors are CSS custom properties → reactive to profile changes.
 */ const EASE = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EASE_OUT"];
/**
 * Lotus petal — elongated with a pointed tip, matching real lotus anatomy.
 * Base at (0, 0), tip at (0, −h). Widest at ~48% of height.
 */ function petalPath(w, h) {
    const hw = w / 2;
    return [
        "M 0 0",
        // left edge: swell outward to widest point then taper inward to pointed tip
        `C ${-hw * 0.65} ${-h * 0.1}   ${-hw * 1.0} ${-h * 0.43}  ${-hw * 0.76} ${-h * 0.7}`,
        `C ${-hw * 0.45} ${-h * 0.86}  ${-hw * 0.14} ${-h * 0.97}  0 ${-h}`,
        // right edge mirrored
        `C ${hw * 0.14} ${-h * 0.97}   ${hw * 0.45} ${-h * 0.86}   ${hw * 0.76} ${-h * 0.7}`,
        `C ${hw * 1.0} ${-h * 0.43}    ${hw * 0.65} ${-h * 0.1}    0 0`,
        "Z"
    ].join(" ");
}
/** Central midrib — subtle vein line from near-base to near-tip */ function midribPath(h) {
    return `M 0 ${-h * 0.06} C 0 ${-h * 0.38} 0 ${-h * 0.65} 0 ${-h * 0.91}`;
}
function Lotus({ size = 400, animate = true, style }) {
    const cx = size / 2;
    const cy = size / 2;
    const half = size / 2;
    // ── ring geometry — all proportions scale by φ ────────────────────────────
    const outerBaseR = half * 0.30; // outer petal bases sit on this ring
    const innerBaseR = outerBaseR / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHI"]; // inner ring radius = outer / φ
    const outerW = half * 0.28; // outer petal width at widest
    const outerH = half * 0.62; // outer petal height (base → tip)
    const innerW = outerW / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHI"]; // inner petal width = outer / φ
    const innerH = outerH / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHI"]; // inner petal height = outer / φ
    // ── ring angles — inner ring offset by golden angle (phyllotaxis) ──────────
    const outerStart = -90; // first outer petal points straight up
    const innerStart = -90 + __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GOLDEN_ANGLE"]; // inner ring rotated by φ°
    // ── petal arrays ───────────────────────────────────────────────────────────
    const outerPetals = Array.from({
        length: 8
    }, (_, i)=>({
            angleDeg: outerStart + i * 45,
            baseR: outerBaseR,
            w: outerW,
            h: outerH,
            fill: "var(--renge-color-accent-subtle)",
            fillOpacity: 0.62,
            strokeOpacity: 0.24,
            midribOpacity: 0.18,
            delay: i * 0.07
        }));
    const innerPetals = Array.from({
        length: 5
    }, (_, i)=>({
            angleDeg: innerStart + i * 72,
            baseR: innerBaseR,
            w: innerW,
            h: innerH,
            fill: "var(--renge-color-accent)",
            fillOpacity: 0.82,
            strokeOpacity: 0.38,
            midribOpacity: 0.28,
            delay: 0.42 + i * 0.09
        }));
    // ── center ─────────────────────────────────────────────────────────────────
    const receptacleR = half * 0.115;
    const stamenRingR = half * 0.172;
    const seedRingR = receptacleR * 0.63;
    const SEED_COUNT = 13; // Fibonacci
    const STAMEN_COUNT = 21; // Fibonacci
    function renderPetal(p, key) {
        const rad = p.angleDeg * Math.PI / 180;
        const bx = cx + p.baseR * Math.cos(rad);
        const by = cy + p.baseR * Math.sin(rad);
        const rotDeg = p.angleDeg + 90; // align tip outward from centre
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
            transform: `translate(${bx}, ${by}) rotate(${rotDeg})`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].path, {
                    d: petalPath(p.w, p.h),
                    fill: p.fill,
                    fillOpacity: p.fillOpacity,
                    stroke: "var(--renge-color-accent)",
                    strokeWidth: 0.65,
                    strokeOpacity: p.strokeOpacity,
                    style: {
                        transformBox: "fill-box",
                        transformOrigin: "50% 100%"
                    },
                    initial: animate ? {
                        scaleY: 0,
                        opacity: 0
                    } : undefined,
                    animate: {
                        scaleY: 1,
                        opacity: 1
                    },
                    transition: {
                        scaleY: {
                            duration: 0.95,
                            delay: p.delay,
                            ease: EASE
                        },
                        opacity: {
                            duration: 0.45,
                            delay: p.delay
                        }
                    }
                }, void 0, false, {
                    fileName: "[project]/apps/src/components/ui/Lotus.tsx",
                    lineNumber: 112,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].path, {
                    d: midribPath(p.h),
                    fill: "none",
                    stroke: "var(--renge-color-accent)",
                    strokeWidth: 0.5,
                    strokeOpacity: p.midribOpacity,
                    strokeLinecap: "round",
                    style: {
                        transformBox: "fill-box",
                        transformOrigin: "50% 100%"
                    },
                    initial: animate ? {
                        scaleY: 0,
                        opacity: 0
                    } : undefined,
                    animate: {
                        scaleY: 1,
                        opacity: 1
                    },
                    transition: {
                        scaleY: {
                            duration: 0.95,
                            delay: p.delay + 0.1,
                            ease: EASE
                        },
                        opacity: {
                            duration: 0.4,
                            delay: p.delay + 0.1
                        }
                    }
                }, void 0, false, {
                    fileName: "[project]/apps/src/components/ui/Lotus.tsx",
                    lineNumber: 128,
                    columnNumber: 9
                }, this)
            ]
        }, key, true, {
            fileName: "[project]/apps/src/components/ui/Lotus.tsx",
            lineNumber: 110,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: `0 0 ${size} ${size}`,
        "aria-hidden": true,
        style: style,
        children: [
            outerPetals.map((p, i)=>renderPetal(p, `outer-${i}`)),
            innerPetals.map((p, i)=>renderPetal(p, `inner-${i}`)),
            Array.from({
                length: STAMEN_COUNT
            }, (_, i)=>{
                const a = i / STAMEN_COUNT * 2 * Math.PI - Math.PI / 2;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].circle, {
                    cx: cx + stamenRingR * Math.cos(a),
                    cy: cy + stamenRingR * Math.sin(a),
                    r: half * 0.009,
                    fill: "var(--renge-color-accent)",
                    fillOpacity: 0.65,
                    style: {
                        transformBox: "fill-box",
                        transformOrigin: "center"
                    },
                    initial: animate ? {
                        scale: 0,
                        opacity: 0
                    } : undefined,
                    animate: {
                        scale: 1,
                        opacity: 1
                    },
                    transition: {
                        duration: 0.3,
                        delay: 0.84 + i * 0.018,
                        ease: EASE
                    }
                }, `stamen-${i}`, false, {
                    fileName: "[project]/apps/src/components/ui/Lotus.tsx",
                    lineNumber: 165,
                    columnNumber: 11
                }, this);
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].circle, {
                cx: cx,
                cy: cy,
                r: receptacleR,
                fill: "var(--renge-color-accent)",
                fillOpacity: 0.9,
                style: {
                    transformBox: "fill-box",
                    transformOrigin: "center"
                },
                initial: animate ? {
                    scale: 0
                } : undefined,
                animate: {
                    scale: 1
                },
                transition: {
                    duration: 0.5,
                    delay: 0.78,
                    ease: EASE
                }
            }, void 0, false, {
                fileName: "[project]/apps/src/components/ui/Lotus.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, this),
            Array.from({
                length: SEED_COUNT
            }, (_, i)=>{
                const a = i / SEED_COUNT * 2 * Math.PI - Math.PI / 2;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].circle, {
                    cx: cx + seedRingR * Math.cos(a),
                    cy: cy + seedRingR * Math.sin(a),
                    r: half * 0.017,
                    fill: "var(--renge-color-bg)",
                    fillOpacity: 0.75,
                    style: {
                        transformBox: "fill-box",
                        transformOrigin: "center"
                    },
                    initial: animate ? {
                        scale: 0
                    } : undefined,
                    animate: {
                        scale: 1
                    },
                    transition: {
                        duration: 0.28,
                        delay: 0.88 + i * 0.026,
                        ease: EASE
                    }
                }, `seed-${i}`, false, {
                    fileName: "[project]/apps/src/components/ui/Lotus.tsx",
                    lineNumber: 201,
                    columnNumber: 11
                }, this);
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].circle, {
                cx: cx,
                cy: cy,
                r: half * 0.017,
                fill: "var(--renge-color-bg)",
                fillOpacity: 0.7,
                style: {
                    transformBox: "fill-box",
                    transformOrigin: "center"
                },
                initial: animate ? {
                    scale: 0
                } : undefined,
                animate: {
                    scale: 1
                },
                transition: {
                    duration: 0.28,
                    delay: 1.05,
                    ease: EASE
                }
            }, void 0, false, {
                fileName: "[project]/apps/src/components/ui/Lotus.tsx",
                lineNumber: 217,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/src/components/ui/Lotus.tsx",
        lineNumber: 148,
        columnNumber: 5
    }, this);
}
_c = Lotus;
var _c;
__turbopack_context__.k.register(_c, "Lotus");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/src/components/sections/Hero.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Hero",
    ()=>Hero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.36.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.36.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.36.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/src/lib/phi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$components$2f$ui$2f$Lotus$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/src/components/ui/Lotus.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const fadeUp = {
    hidden: {
        opacity: 0,
        y: 24
    },
    visible: (delay)=>({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay,
                ease: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EASE_OUT"]
            }
        })
};
function LotusBackground() {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { scrollYProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"])({
        target: ref,
        offset: [
            "start start",
            "end start"
        ]
    });
    const opacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0,
        0.5
    ], [
        0.07,
        0
    ]);
    const y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0,
        1
    ], [
        0,
        -80
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        ref: ref,
        style: {
            position: "absolute",
            top: "50%",
            left: "50%",
            x: "-50%",
            y,
            opacity,
            pointerEvents: "none"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$components$2f$ui$2f$Lotus$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Lotus"], {
            size: 700,
            animate: true
        }, void 0, false, {
            fileName: "[project]/apps/src/components/sections/Hero.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/src/components/sections/Hero.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_s(LotusBackground, "LVnNeGiQkReSQye7Xmr7+bx8sLo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"]
    ];
});
_c = LotusBackground;
function Hero() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        style: {
            position: "relative",
            minHeight: "100svh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "var(--renge-space-7) var(--renge-space-5)",
            overflow: "hidden"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LotusBackground, {}, void 0, false, {
                fileName: "[project]/apps/src/components/sections/Hero.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "var(--renge-space-6)",
                    textAlign: "center",
                    maxWidth: 720
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: "hidden",
                        animate: "visible",
                        custom: 0,
                        variants: fadeUp,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$components$2f$ui$2f$Lotus$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Lotus"], {
                                size: 300,
                                animate: true
                            }, void 0, false, {
                                fileName: "[project]/apps/src/components/sections/Hero.tsx",
                                lineNumber: 81,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    marginTop: "var(--renge-space-3)",
                                    fontSize: "var(--renge-font-size-xs)",
                                    color: "var(--renge-color-accent)",
                                    fontFamily: "var(--font-body)",
                                    letterSpacing: "0.12em",
                                    opacity: 0.7
                                },
                                children: [
                                    "φ° = ",
                                    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GOLDEN_ANGLE"].toFixed(3),
                                    "°"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/src/components/sections/Hero.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/src/components/sections/Hero.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h1, {
                        initial: "hidden",
                        animate: "visible",
                        custom: 0.2,
                        variants: fadeUp,
                        style: {
                            fontFamily: "var(--font-display)",
                            fontSize: "clamp(2.4rem, 6vw, var(--renge-font-size-4xl))",
                            lineHeight: 1.15,
                            color: "var(--renge-color-fg)",
                            fontWeight: 400,
                            margin: 0,
                            letterSpacing: "-0.02em"
                        },
                        children: "Proportion as a first principle."
                    }, void 0, false, {
                        fileName: "[project]/apps/src/components/sections/Hero.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                        initial: "hidden",
                        animate: "visible",
                        custom: 0.35,
                        variants: fadeUp,
                        style: {
                            fontSize: "var(--renge-font-size-lg)",
                            color: "var(--renge-color-fg-subtle)",
                            lineHeight: "var(--renge-line-height-lg)",
                            maxWidth: 560,
                            margin: 0,
                            fontFamily: "var(--font-body)"
                        },
                        children: "Renge is a design system built on natural mathematics. PHI. Fibonacci. The ratios that appear in every living thing."
                    }, void 0, false, {
                        fileName: "[project]/apps/src/components/sections/Hero.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: "hidden",
                        animate: "visible",
                        custom: 0.5,
                        variants: fadeUp,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "#tokens",
                            style: {
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "var(--renge-space-2)",
                                padding: "var(--renge-space-3) var(--renge-space-5)",
                                borderRadius: "var(--renge-radius-full)",
                                border: "1px solid var(--renge-color-accent)",
                                color: "var(--renge-color-accent)",
                                fontSize: "var(--renge-font-size-sm)",
                                fontFamily: "var(--font-body)",
                                letterSpacing: "0.08em",
                                textDecoration: "none",
                                transition: "all 300ms var(--renge-easing-ease-out)",
                                textTransform: "uppercase"
                            },
                            onMouseEnter: (e)=>{
                                const el = e.currentTarget;
                                el.style.background = "var(--renge-color-accent)";
                                el.style.color = "var(--renge-color-fg-inverse)";
                            },
                            onMouseLeave: (e)=>{
                                const el = e.currentTarget;
                                el.style.background = "transparent";
                                el.style.color = "var(--renge-color-accent)";
                            },
                            children: [
                                "Explore the system",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "aria-hidden": true,
                                    children: "↓"
                                }, void 0, false, {
                                    fileName: "[project]/apps/src/components/sections/Hero.tsx",
                                    lineNumber: 172,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/src/components/sections/Hero.tsx",
                            lineNumber: 143,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/src/components/sections/Hero.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 0.4
                        },
                        transition: {
                            delay: 1.5,
                            duration: 1
                        },
                        style: {
                            position: "absolute",
                            bottom: "var(--renge-space-6)",
                            left: "50%",
                            transform: "translateX(-50%)",
                            fontSize: "var(--renge-font-size-xs)",
                            color: "var(--renge-color-fg-muted)",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            fontFamily: "var(--font-body)"
                        },
                        children: [
                            "φ° = ",
                            __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GOLDEN_ANGLE"].toFixed(3),
                            "°"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/src/components/sections/Hero.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/src/components/sections/Hero.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/src/components/sections/Hero.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_c1 = Hero;
var _c, _c1;
__turbopack_context__.k.register(_c, "LotusBackground");
__turbopack_context__.k.register(_c1, "Hero");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/src/components/sections/Philosophy.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Philosophy",
    ()=>Philosophy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.36.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.36.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/src/lib/phi.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
"use client";
;
;
;
// ============================================================================
// PHI visualization — animated golden ratio bars
// ============================================================================
function PhiViz() {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        margin: "-10%"
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        style: {
            display: "flex",
            flexDirection: "column",
            gap: "var(--renge-space-2)"
        },
        children: [
            [
                1,
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHI"],
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHI"] * __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHI"]
            ].map((ratio, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    style: {
                        height: 2,
                        background: "var(--renge-color-accent)",
                        transformOrigin: "left",
                        opacity: 1 - i * 0.2
                    },
                    initial: {
                        scaleX: 0
                    },
                    animate: inView ? {
                        scaleX: ratio / (__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHI"] * __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHI"])
                    } : {
                        scaleX: 0
                    },
                    transition: {
                        duration: 1.2,
                        delay: i * 0.15,
                        ease: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EASE_OUT"]
                    }
                }, i, false, {
                    fileName: "[project]/apps/src/components/sections/Philosophy.tsx",
                    lineNumber: 18,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    gap: "var(--renge-space-5)",
                    marginTop: "var(--renge-space-2)",
                    fontSize: "var(--renge-font-size-xs)",
                    color: "var(--renge-color-fg-muted)",
                    fontFamily: "var(--font-body)",
                    letterSpacing: "0.06em"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "1"
                    }, void 0, false, {
                        fileName: "[project]/apps/src/components/sections/Philosophy.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "φ = 1.618"
                    }, void 0, false, {
                        fileName: "[project]/apps/src/components/sections/Philosophy.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "φ² = 2.618"
                    }, void 0, false, {
                        fileName: "[project]/apps/src/components/sections/Philosophy.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/src/components/sections/Philosophy.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/src/components/sections/Philosophy.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_s(PhiViz, "O7qYEn3iCrBBWRAefWku+E/MdDM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = PhiViz;
// ============================================================================
// Fibonacci sequence visualization
// ============================================================================
function FibViz() {
    _s1();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        margin: "-10%"
    });
    const fibs = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIBONACCI"].slice(0, 7);
    const max = fibs[fibs.length - 1];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        style: {
            display: "flex",
            alignItems: "flex-end",
            gap: "var(--renge-space-1)",
            height: 48
        },
        children: fibs.map((fib, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                style: {
                    flex: 1,
                    height: Math.round(fib / max * 48),
                    background: "var(--renge-color-accent)",
                    borderRadius: "var(--renge-radius-1) var(--renge-radius-1) 0 0",
                    opacity: 0.3 + i / fibs.length * 0.7,
                    transformOrigin: "bottom"
                },
                initial: {
                    scaleY: 0
                },
                animate: inView ? {
                    scaleY: 1
                } : {
                    scaleY: 0
                },
                transition: {
                    duration: 0.8,
                    delay: i * 0.08,
                    ease: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EASE_OUT"]
                }
            }, i, false, {
                fileName: "[project]/apps/src/components/sections/Philosophy.tsx",
                lineNumber: 61,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/apps/src/components/sections/Philosophy.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_s1(FibViz, "O7qYEn3iCrBBWRAefWku+E/MdDM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c1 = FibViz;
// ============================================================================
// Phyllotaxis visualization — sunflower dot pattern
// ============================================================================
function PhyllotaxisViz() {
    _s2();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        margin: "-10%"
    });
    const GOLDEN_ANGLE = 137.508;
    const n = 60;
    const size = 80;
    const points = Array.from({
        length: n
    }, (_, i)=>{
        const r = Math.sqrt(i / n) * size;
        const theta = i * GOLDEN_ANGLE * Math.PI / 180;
        const round = (v)=>Math.round(v * 1e4) / 1e4;
        return {
            x: round(size + r * Math.cos(theta)),
            y: round(size + r * Math.sin(theta)),
            delay: i * 0.015
        };
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ref: ref,
        width: size * 2,
        height: size * 2,
        viewBox: `0 0 ${size * 2} ${size * 2}`,
        children: points.map((pt, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].circle, {
                cx: pt.x,
                cy: pt.y,
                r: 1.5,
                fill: "var(--renge-color-accent)",
                initial: {
                    opacity: 0,
                    scale: 0
                },
                animate: inView ? {
                    opacity: 0.7,
                    scale: 1
                } : {},
                transition: {
                    duration: 0.4,
                    delay: pt.delay,
                    ease: "easeOut"
                }
            }, i, false, {
                fileName: "[project]/apps/src/components/sections/Philosophy.tsx",
                lineNumber: 104,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/apps/src/components/sections/Philosophy.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
_s2(PhyllotaxisViz, "O7qYEn3iCrBBWRAefWku+E/MdDM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c2 = PhyllotaxisViz;
// ============================================================================
// Section
// ============================================================================
const principles = [
    {
        id: "phi",
        symbol: "φ",
        title: "PHI",
        subtitle: "1.618033...",
        body: "The golden ratio appears in nautilus shells, sunflower spirals, galaxy arms. We built the spacing scale from it.",
        viz: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PhiViz, {}, void 0, false, {
            fileName: "[project]/apps/src/components/sections/Philosophy.tsx",
            lineNumber: 130,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        id: "fibonacci",
        symbol: "∑",
        title: "Fibonacci",
        subtitle: "1, 1, 2, 3, 5, 8, 13...",
        body: "The sequence that generates PHI. Every Renge size step follows it. Growth that feels inevitable.",
        viz: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FibViz, {}, void 0, false, {
            fileName: "[project]/apps/src/components/sections/Philosophy.tsx",
            lineNumber: 138,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        id: "phyllotaxis",
        symbol: "⊙",
        title: "Phyllotaxis",
        subtitle: "137.508°",
        body: "The golden angle. Nature's solution to optimal packing — the logic behind leaves on a stem, seeds in a sunflower.",
        viz: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PhyllotaxisViz, {}, void 0, false, {
            fileName: "[project]/apps/src/components/sections/Philosophy.tsx",
            lineNumber: 146,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0))
    }
];
const fadeUp = {
    hidden: {
        opacity: 0,
        y: 32
    },
    visible: (delay)=>({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.9,
                delay,
                ease: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EASE_OUT"]
            }
        })
};
function Philosophy() {
    _s3();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        margin: "-15%"
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: ref,
        id: "philosophy",
        style: {
            padding: "var(--renge-space-8) var(--renge-space-5)",
            background: "var(--renge-color-bg-subtle)",
            borderTop: "1px solid var(--renge-color-border-subtle)",
            borderBottom: "1px solid var(--renge-color-border-subtle)"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                maxWidth: 1080,
                margin: "0 auto"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: "hidden",
                    animate: inView ? "visible" : "hidden",
                    custom: 0,
                    variants: fadeUp,
                    style: {
                        marginBottom: "var(--renge-space-7)",
                        textAlign: "center"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: "var(--renge-font-size-xs)",
                                color: "var(--renge-color-accent)",
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                fontFamily: "var(--font-body)",
                                marginBottom: "var(--renge-space-3)"
                            },
                            children: "The argument"
                        }, void 0, false, {
                            fileName: "[project]/apps/src/components/sections/Philosophy.tsx",
                            lineNumber: 183,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                fontFamily: "var(--font-display)",
                                fontSize: "clamp(1.8rem, 4vw, var(--renge-font-size-3xl))",
                                color: "var(--renge-color-fg)",
                                fontWeight: 400,
                                margin: 0,
                                letterSpacing: "-0.02em"
                            },
                            children: "Why natural mathematics?"
                        }, void 0, false, {
                            fileName: "[project]/apps/src/components/sections/Philosophy.tsx",
                            lineNumber: 193,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/src/components/sections/Philosophy.tsx",
                    lineNumber: 176,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "var(--renge-space-5)"
                    },
                    children: principles.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: "hidden",
                            animate: inView ? "visible" : "hidden",
                            custom: 0.1 + i * 0.12,
                            variants: fadeUp,
                            style: {
                                padding: "var(--renge-space-6)",
                                background: "var(--renge-color-bg)",
                                border: "1px solid var(--renge-color-border-subtle)",
                                borderRadius: "var(--renge-radius-2)",
                                display: "flex",
                                flexDirection: "column",
                                gap: "var(--renge-space-4)"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontFamily: "var(--font-display)",
                                        fontSize: "var(--renge-font-size-3xl)",
                                        color: "var(--renge-color-accent)",
                                        lineHeight: 1,
                                        opacity: 0.6
                                    },
                                    children: p.symbol
                                }, void 0, false, {
                                    fileName: "[project]/apps/src/components/sections/Philosophy.tsx",
                                    lineNumber: 229,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            style: {
                                                fontFamily: "var(--font-display)",
                                                fontSize: "var(--renge-font-size-xl)",
                                                color: "var(--renge-color-fg)",
                                                fontWeight: 400,
                                                margin: 0,
                                                marginBottom: "var(--renge-space-1)"
                                            },
                                            children: p.title
                                        }, void 0, false, {
                                            fileName: "[project]/apps/src/components/sections/Philosophy.tsx",
                                            lineNumber: 241,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: "var(--renge-font-size-sm)",
                                                color: "var(--renge-color-accent)",
                                                fontFamily: "var(--font-mono, monospace)",
                                                margin: 0,
                                                letterSpacing: "0.05em"
                                            },
                                            children: p.subtitle
                                        }, void 0, false, {
                                            fileName: "[project]/apps/src/components/sections/Philosophy.tsx",
                                            lineNumber: 251,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/src/components/sections/Philosophy.tsx",
                                    lineNumber: 240,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        minHeight: 60
                                    },
                                    children: p.viz
                                }, void 0, false, {
                                    fileName: "[project]/apps/src/components/sections/Philosophy.tsx",
                                    lineNumber: 263,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: "var(--renge-font-size-base)",
                                        color: "var(--renge-color-fg-subtle)",
                                        lineHeight: "var(--renge-line-height-base)",
                                        margin: 0,
                                        fontFamily: "var(--font-body)"
                                    },
                                    children: p.body
                                }, void 0, false, {
                                    fileName: "[project]/apps/src/components/sections/Philosophy.tsx",
                                    lineNumber: 268,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, p.id, true, {
                            fileName: "[project]/apps/src/components/sections/Philosophy.tsx",
                            lineNumber: 212,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/src/components/sections/Philosophy.tsx",
                    lineNumber: 206,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/src/components/sections/Philosophy.tsx",
            lineNumber: 174,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/src/components/sections/Philosophy.tsx",
        lineNumber: 164,
        columnNumber: 5
    }, this);
}
_s3(Philosophy, "O7qYEn3iCrBBWRAefWku+E/MdDM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c3 = Philosophy;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "PhiViz");
__turbopack_context__.k.register(_c1, "FibViz");
__turbopack_context__.k.register(_c2, "PhyllotaxisViz");
__turbopack_context__.k.register(_c3, "Philosophy");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/src/components/sections/TokenShowcase.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TokenShowcase",
    ()=>TokenShowcase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.36.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.36.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/src/lib/phi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$components$2f$ui$2f$ProfileToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/src/components/ui/ProfileToggle.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
// ============================================================================
// Helpers
// ============================================================================
const fadeUp = {
    hidden: {
        opacity: 0,
        y: 24
    },
    visible: (d)=>({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: d,
                ease: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EASE_OUT"]
            }
        })
};
function SectionLabel({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        style: {
            fontSize: "var(--renge-font-size-xs)",
            color: "var(--renge-color-accent)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "var(--font-body)",
            margin: 0,
            marginBottom: "var(--renge-space-3)"
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_c = SectionLabel;
function SubheadingH3({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
        style: {
            fontFamily: "var(--font-display)",
            fontSize: "var(--renge-font-size-2xl)",
            color: "var(--renge-color-fg)",
            fontWeight: 400,
            margin: 0,
            marginBottom: "var(--renge-space-5)",
            letterSpacing: "-0.01em"
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_c1 = SubheadingH3;
// ============================================================================
// Color showcase
// ============================================================================
const semanticColors = [
    {
        key: "bg",
        label: "bg"
    },
    {
        key: "bg-subtle",
        label: "bg-subtle"
    },
    {
        key: "bg-muted",
        label: "bg-muted"
    },
    {
        key: "fg",
        label: "fg"
    },
    {
        key: "fg-subtle",
        label: "fg-subtle"
    },
    {
        key: "fg-muted",
        label: "fg-muted"
    },
    {
        key: "border",
        label: "border"
    },
    {
        key: "accent",
        label: "accent"
    },
    {
        key: "accent-hover",
        label: "accent-hover"
    },
    {
        key: "accent-subtle",
        label: "accent-subtle"
    }
];
function ColorShowcase() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                children: "Tokens / Color"
            }, void 0, false, {
                fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "var(--renge-space-5)",
                    flexWrap: "wrap",
                    gap: "var(--renge-space-3)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SubheadingH3, {
                        children: "Color profiles."
                    }, void 0, false, {
                        fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$components$2f$ui$2f$ProfileToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProfileToggle"], {}, void 0, false, {
                        fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                    gap: "var(--renge-space-3)"
                },
                children: semanticColors.map(({ key, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: "var(--renge-space-1)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    height: 60,
                                    borderRadius: "var(--renge-radius-2)",
                                    background: `var(--renge-color-${key})`,
                                    border: "1px solid var(--renge-color-border-subtle)",
                                    transition: "background 600ms var(--renge-easing-ease-in-out)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: "var(--renge-font-size-xs)",
                                    color: "var(--renge-color-fg-muted)",
                                    fontFamily: "var(--font-mono, monospace)",
                                    margin: 0,
                                    letterSpacing: "0.04em"
                                },
                                children: [
                                    "--renge-color-",
                                    label
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                                lineNumber: 99,
                                columnNumber: 13
                            }, this)
                        ]
                    }, key, true, {
                        fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                        lineNumber: 91,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
_c2 = ColorShowcase;
// ============================================================================
// Spacing showcase
// ============================================================================
function SpacingShowcase() {
    const fibSteps = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIBONACCI"].slice(0, 8).map((fib, i)=>({
            step: i + 1,
            px: fib * 4,
            fib
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                children: "Tokens / Spacing"
            }, void 0, false, {
                fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SubheadingH3, {
                children: "Fibonacci spacing."
            }, void 0, false, {
                fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--renge-space-3)"
                },
                children: fibSteps.map(({ step, px, fib })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "var(--renge-space-4)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 48,
                                    fontSize: "var(--renge-font-size-xs)",
                                    color: "var(--renge-color-fg-muted)",
                                    fontFamily: "var(--font-mono, monospace)",
                                    flexShrink: 0,
                                    letterSpacing: "0.04em"
                                },
                                children: step
                            }, void 0, false, {
                                fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                                lineNumber: 133,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: px,
                                    maxWidth: "calc(100% - 120px)",
                                    height: 8,
                                    background: "var(--renge-color-accent)",
                                    borderRadius: "var(--renge-radius-full)",
                                    opacity: 0.5 + step / 10 * 0.5,
                                    flexShrink: 0
                                }
                            }, void 0, false, {
                                fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                                lineNumber: 143,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: "var(--renge-font-size-xs)",
                                    color: "var(--renge-color-fg-muted)",
                                    fontFamily: "var(--font-mono, monospace)",
                                    letterSpacing: "0.04em"
                                },
                                children: [
                                    fib,
                                    " × 4 = ",
                                    px,
                                    "px"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                                lineNumber: 152,
                                columnNumber: 13
                            }, this)
                        ]
                    }, step, true, {
                        fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                        lineNumber: 132,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
        lineNumber: 127,
        columnNumber: 5
    }, this);
}
_c3 = SpacingShowcase;
// ============================================================================
// Typography showcase
// ============================================================================
const typeSteps = [
    {
        key: "xs",
        label: "xs",
        exp: -2
    },
    {
        key: "sm",
        label: "sm",
        exp: -1
    },
    {
        key: "base",
        label: "base",
        exp: 0
    },
    {
        key: "lg",
        label: "lg",
        exp: 1
    },
    {
        key: "xl",
        label: "xl",
        exp: 2
    },
    {
        key: "2xl",
        label: "2xl",
        exp: 3
    },
    {
        key: "3xl",
        label: "3xl",
        exp: 4
    },
    {
        key: "4xl",
        label: "4xl",
        exp: 5
    }
];
function TypeScaleShowcase() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                children: "Tokens / Typography"
            }, void 0, false, {
                fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SubheadingH3, {
                children: "PHI type scale."
            }, void 0, false, {
                fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                lineNumber: 186,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--renge-space-3)"
                },
                children: typeSteps.slice().reverse().map(({ key, label, exp })=>{
                    const px = (16 * Math.pow(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHI"], exp)).toFixed(2);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "baseline",
                            gap: "var(--renge-space-4)",
                            borderBottom: "1px solid var(--renge-color-border-subtle)",
                            paddingBottom: "var(--renge-space-2)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "var(--font-body)",
                                    fontSize: `var(--renge-font-size-${key})`,
                                    color: "var(--renge-color-fg)",
                                    lineHeight: `var(--renge-line-height-${key})`,
                                    flex: 1
                                },
                                children: key === "4xl" || key === "3xl" ? "Proportion." : "The ratios that appear in living things."
                            }, void 0, false, {
                                fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                                lineNumber: 201,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: "var(--renge-font-size-xs)",
                                    color: "var(--renge-color-fg-muted)",
                                    fontFamily: "var(--font-mono, monospace)",
                                    flexShrink: 0,
                                    letterSpacing: "0.04em"
                                },
                                children: [
                                    label,
                                    " · ",
                                    px,
                                    "px · φ^",
                                    exp
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                                lineNumber: 210,
                                columnNumber: 15
                            }, this)
                        ]
                    }, key, true, {
                        fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                        lineNumber: 191,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
        lineNumber: 184,
        columnNumber: 5
    }, this);
}
_c4 = TypeScaleShowcase;
// ============================================================================
// Motion showcase
// ============================================================================
const easings = [
    {
        key: "ease-out",
        label: "ease-out",
        curve: [
            0.22,
            1,
            0.36,
            1
        ]
    },
    {
        key: "ease-in",
        label: "ease-in",
        curve: [
            0.55,
            0.055,
            0.675,
            0.19
        ]
    },
    {
        key: "ease-in-out",
        label: "ease-in-out",
        curve: [
            0.65,
            0,
            0.35,
            1
        ]
    },
    {
        key: "spring",
        label: "spring",
        curve: [
            0.175,
            0.885,
            0.32,
            1.275
        ]
    }
];
function MotionShowcase() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                children: "Tokens / Motion"
            }, void 0, false, {
                fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                lineNumber: 241,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SubheadingH3, {
                children: "Natural easing."
            }, void 0, false, {
                fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                lineNumber: 242,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--renge-space-4)"
                },
                children: easings.map(({ key, label, curve })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "var(--renge-space-4)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 100,
                                    fontSize: "var(--renge-font-size-xs)",
                                    color: "var(--renge-color-fg-muted)",
                                    fontFamily: "var(--font-mono, monospace)",
                                    flexShrink: 0,
                                    letterSpacing: "0.04em"
                                },
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                                lineNumber: 246,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    position: "relative",
                                    height: 32
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        style: {
                                            position: "absolute",
                                            left: 0,
                                            top: "50%",
                                            translateY: "-50%",
                                            width: 8,
                                            height: 8,
                                            borderRadius: "50%",
                                            background: "var(--renge-color-accent)"
                                        },
                                        animate: {
                                            x: "calc(100vw - 200px)"
                                        },
                                        transition: {
                                            duration: 1.5,
                                            ease: curve,
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                            repeatDelay: 0.5
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                                        lineNumber: 257,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            height: 1,
                                            background: "var(--renge-color-border-subtle)"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                                        lineNumber: 277,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                                lineNumber: 256,
                                columnNumber: 13
                            }, this)
                        ]
                    }, key, true, {
                        fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                        lineNumber: 245,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                lineNumber: 243,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
        lineNumber: 240,
        columnNumber: 5
    }, this);
}
_c5 = MotionShowcase;
// ============================================================================
// Radius showcase
// ============================================================================
const radiusSteps = [
    {
        key: "1",
        px: 4,
        fib: 1
    },
    {
        key: "2",
        px: 8,
        fib: 2
    },
    {
        key: "3",
        px: 12,
        fib: 3
    },
    {
        key: "4",
        px: 20,
        fib: 5
    },
    {
        key: "5",
        px: 32,
        fib: 8
    },
    {
        key: "full",
        px: 9999,
        fib: null
    }
];
function RadiusShowcase() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                children: "Tokens / Radius"
            }, void 0, false, {
                fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                lineNumber: 309,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SubheadingH3, {
                children: "Border radius."
            }, void 0, false, {
                fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                lineNumber: 310,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "var(--renge-space-5)",
                    alignItems: "flex-end"
                },
                children: radiusSteps.map(({ key, px, fib })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "var(--renge-space-2)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 56,
                                    height: 56,
                                    background: "var(--renge-color-accent-subtle)",
                                    border: "1px solid var(--renge-color-accent)",
                                    borderRadius: key === "full" ? "var(--renge-radius-full)" : `var(--renge-radius-${key})`
                                }
                            }, void 0, false, {
                                fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                                lineNumber: 314,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: "var(--renge-font-size-xs)",
                                    color: "var(--renge-color-fg-muted)",
                                    fontFamily: "var(--font-mono, monospace)",
                                    textAlign: "center",
                                    letterSpacing: "0.04em"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: key
                                    }, void 0, false, {
                                        fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                                        lineNumber: 328,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: fib ? `${px}px` : "pill"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                                        lineNumber: 329,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                                lineNumber: 321,
                                columnNumber: 13
                            }, this)
                        ]
                    }, key, true, {
                        fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                        lineNumber: 313,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                lineNumber: 311,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
        lineNumber: 308,
        columnNumber: 5
    }, this);
}
_c6 = RadiusShowcase;
function TokenShowcase() {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        margin: "-10%"
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: ref,
        id: "tokens",
        style: {
            padding: "var(--renge-space-8) var(--renge-space-5)",
            background: "var(--renge-color-bg)"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                maxWidth: 1080,
                margin: "0 auto"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: "hidden",
                    animate: inView ? "visible" : "hidden",
                    custom: 0,
                    variants: fadeUp,
                    style: {
                        marginBottom: "var(--renge-space-7)",
                        textAlign: "center"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                            children: "The system"
                        }, void 0, false, {
                            fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                            lineNumber: 363,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                fontFamily: "var(--font-display)",
                                fontSize: "clamp(1.8rem, 4vw, var(--renge-font-size-3xl))",
                                color: "var(--renge-color-fg)",
                                fontWeight: 400,
                                margin: 0,
                                letterSpacing: "-0.02em"
                            },
                            children: "Every token derived. Nothing arbitrary."
                        }, void 0, false, {
                            fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                            lineNumber: 364,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                    lineNumber: 356,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        flexDirection: "column",
                        gap: "var(--renge-space-8)"
                    },
                    children: [
                        ColorShowcase,
                        SpacingShowcase,
                        TypeScaleShowcase,
                        MotionShowcase,
                        RadiusShowcase
                    ].map((Component, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: "hidden",
                            animate: inView ? "visible" : "hidden",
                            custom: 0.1 + i * 0.08,
                            variants: fadeUp,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Component, {}, void 0, false, {
                                fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                                lineNumber: 386,
                                columnNumber: 17
                            }, this)
                        }, i, false, {
                            fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                            lineNumber: 379,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
                    lineNumber: 376,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
            lineNumber: 355,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/src/components/sections/TokenShowcase.tsx",
        lineNumber: 347,
        columnNumber: 5
    }, this);
}
_s(TokenShowcase, "O7qYEn3iCrBBWRAefWku+E/MdDM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c7 = TokenShowcase;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "SectionLabel");
__turbopack_context__.k.register(_c1, "SubheadingH3");
__turbopack_context__.k.register(_c2, "ColorShowcase");
__turbopack_context__.k.register(_c3, "SpacingShowcase");
__turbopack_context__.k.register(_c4, "TypeScaleShowcase");
__turbopack_context__.k.register(_c5, "MotionShowcase");
__turbopack_context__.k.register(_c6, "RadiusShowcase");
__turbopack_context__.k.register(_c7, "TokenShowcase");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/src/components/sections/GettingStarted.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GettingStarted",
    ()=>GettingStarted
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/src/lib/phi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.36.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.36.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const fadeUp = {
    hidden: {
        opacity: 0,
        y: 24
    },
    visible: (d)=>({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: d,
                ease: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EASE_OUT"]
            }
        })
};
// ============================================================================
// Code block
// ============================================================================
function CodeBlock({ code }) {
    _s();
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const copy = async ()=>{
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(()=>setCopied(false), 2000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "relative",
            background: "var(--renge-color-bg-inverse)",
            borderRadius: "var(--renge-radius-2)",
            padding: "var(--renge-space-5)",
            border: "1px solid var(--renge-color-border)",
            overflow: "auto"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: copy,
                "aria-label": "Copy code",
                style: {
                    position: "absolute",
                    top: "var(--renge-space-3)",
                    right: "var(--renge-space-3)",
                    padding: "var(--renge-space-1) var(--renge-space-3)",
                    background: copied ? "var(--renge-color-accent)" : "transparent",
                    border: `1px solid var(--renge-color-border)`,
                    borderRadius: "var(--renge-radius-full)",
                    color: copied ? "var(--renge-color-fg-inverse)" : "var(--renge-color-fg-inverse)",
                    fontSize: "var(--renge-font-size-xs)",
                    fontFamily: "var(--font-body)",
                    cursor: "pointer",
                    transition: "all 200ms var(--renge-easing-ease-out)",
                    opacity: 0.7,
                    letterSpacing: "0.04em"
                },
                children: copied ? "Copied" : "Copy"
            }, void 0, false, {
                fileName: "[project]/apps/src/components/sections/GettingStarted.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                style: {
                    margin: 0,
                    overflow: "auto"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                    style: {
                        fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                        fontSize: "var(--renge-font-size-sm)",
                        color: "var(--renge-color-fg-inverse)",
                        lineHeight: "var(--renge-line-height-base)",
                        whiteSpace: "pre"
                    },
                    children: code
                }, void 0, false, {
                    fileName: "[project]/apps/src/components/sections/GettingStarted.tsx",
                    lineNumber: 61,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/src/components/sections/GettingStarted.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/src/components/sections/GettingStarted.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_s(CodeBlock, "NE86rL3vg4NVcTTWDavsT0hUBJs=");
_c = CodeBlock;
// ============================================================================
// Install option tabs
// ============================================================================
const OPTIONS = [
    {
        id: "css",
        label: "CSS",
        description: "CSS custom properties — framework agnostic.",
        code: `import { createRengeTheme } from "@renge/tokens";

const theme = createRengeTheme({ profile: "ocean" });

// Inject into your document
const style = document.createElement("style");
style.textContent = theme.css;
document.head.appendChild(style);`,
        lang: "ts"
    },
    {
        id: "js",
        label: "JavaScript",
        description: "Typed tokens for direct consumption.",
        code: `import {
  PHI,
  FIBONACCI,
  createRengeTheme,
  profiles,
} from "@renge/tokens";

const theme = createRengeTheme({ profile: "earth" });
// theme.vars — Record<string, string>
// theme.css  — full :root { ... } block`,
        lang: "ts"
    },
    {
        id: "next",
        label: "Next.js",
        description: "Server-side injection — no flash.",
        code: `// app/layout.tsx
import { createRengeTheme } from "@renge/tokens";

export default function RootLayout({ children }) {
  const theme = createRengeTheme({ profile: "ocean" });
  return (
    <html>
      <head>
        <style dangerouslySetInnerHTML={{ __html: theme.css }} />
      </head>
      <body>{children}</body>
    </html>
  );
}`,
        lang: "tsx"
    }
];
function GettingStarted() {
    _s1();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        margin: "-10%"
    });
    const [activeOption, setActiveOption] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("css");
    const active = OPTIONS.find((o)=>o.id === activeOption) ?? OPTIONS[0];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: ref,
        id: "start",
        style: {
            padding: "var(--renge-space-8) var(--renge-space-5)",
            background: "var(--renge-color-bg-subtle)",
            borderTop: "1px solid var(--renge-color-border-subtle)"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                maxWidth: 800,
                margin: "0 auto"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: "hidden",
                    animate: inView ? "visible" : "hidden",
                    custom: 0,
                    variants: fadeUp,
                    style: {
                        marginBottom: "var(--renge-space-7)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: "var(--renge-font-size-xs)",
                                color: "var(--renge-color-accent)",
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                fontFamily: "var(--font-body)",
                                margin: 0,
                                marginBottom: "var(--renge-space-3)"
                            },
                            children: "Get started"
                        }, void 0, false, {
                            fileName: "[project]/apps/src/components/sections/GettingStarted.tsx",
                            lineNumber: 157,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                fontFamily: "var(--font-display)",
                                fontSize: "clamp(1.8rem, 4vw, var(--renge-font-size-3xl))",
                                color: "var(--renge-color-fg)",
                                fontWeight: 400,
                                margin: 0,
                                marginBottom: "var(--renge-space-5)",
                                letterSpacing: "-0.02em"
                            },
                            children: "Install and consume."
                        }, void 0, false, {
                            fileName: "[project]/apps/src/components/sections/GettingStarted.tsx",
                            lineNumber: 168,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CodeBlock, {
                            code: "pnpm add @renge/tokens",
                            lang: "bash"
                        }, void 0, false, {
                            fileName: "[project]/apps/src/components/sections/GettingStarted.tsx",
                            lineNumber: 179,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/src/components/sections/GettingStarted.tsx",
                    lineNumber: 150,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: "hidden",
                    animate: inView ? "visible" : "hidden",
                    custom: 0.15,
                    variants: fadeUp,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: "var(--renge-space-2)",
                                marginBottom: "var(--renge-space-4)",
                                flexWrap: "wrap"
                            },
                            children: OPTIONS.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveOption(o.id),
                                    style: {
                                        padding: "var(--renge-space-2) var(--renge-space-4)",
                                        borderRadius: "var(--renge-radius-full)",
                                        border: `1px solid ${o.id === activeOption ? "var(--renge-color-accent)" : "var(--renge-color-border)"}`,
                                        background: o.id === activeOption ? "var(--renge-color-accent-subtle)" : "transparent",
                                        color: o.id === activeOption ? "var(--renge-color-accent)" : "var(--renge-color-fg-muted)",
                                        fontSize: "var(--renge-font-size-sm)",
                                        fontFamily: "var(--font-body)",
                                        cursor: "pointer",
                                        transition: "all 200ms var(--renge-easing-ease-out)",
                                        letterSpacing: "0.04em"
                                    },
                                    children: o.label
                                }, o.id, false, {
                                    fileName: "[project]/apps/src/components/sections/GettingStarted.tsx",
                                    lineNumber: 196,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/apps/src/components/sections/GettingStarted.tsx",
                            lineNumber: 189,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: "var(--renge-font-size-sm)",
                                color: "var(--renge-color-fg-muted)",
                                fontFamily: "var(--font-body)",
                                margin: 0,
                                marginBottom: "var(--renge-space-4)"
                            },
                            children: active.description
                        }, void 0, false, {
                            fileName: "[project]/apps/src/components/sections/GettingStarted.tsx",
                            lineNumber: 217,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CodeBlock, {
                            code: active.code,
                            lang: active.lang
                        }, void 0, false, {
                            fileName: "[project]/apps/src/components/sections/GettingStarted.tsx",
                            lineNumber: 226,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/src/components/sections/GettingStarted.tsx",
                    lineNumber: 183,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/src/components/sections/GettingStarted.tsx",
            lineNumber: 149,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/src/components/sections/GettingStarted.tsx",
        lineNumber: 140,
        columnNumber: 5
    }, this);
}
_s1(GettingStarted, "MLdpM1Kvo0ZZhIokpuW/l63hhOQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c1 = GettingStarted;
var _c, _c1;
__turbopack_context__.k.register(_c, "CodeBlock");
__turbopack_context__.k.register(_c1, "GettingStarted");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/src/components/sections/ComingSoon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComingSoon",
    ()=>ComingSoon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/src/lib/phi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.36.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.36.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const fadeUp = {
    hidden: {
        opacity: 0,
        y: 24
    },
    visible: (d)=>({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: d,
                ease: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EASE_OUT"]
            }
        })
};
function ComingSoon() {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        margin: "-10%"
    });
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [submitted, setSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (email.trim()) {
            setSubmitted(true);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: ref,
        id: "react",
        style: {
            padding: "var(--renge-space-8) var(--renge-space-5)",
            background: "var(--renge-color-bg)",
            borderTop: "1px solid var(--renge-color-border-subtle)",
            textAlign: "center"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                maxWidth: 560,
                margin: "0 auto"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: "hidden",
                    animate: inView ? "visible" : "hidden",
                    custom: 0,
                    variants: fadeUp,
                    style: {
                        display: "inline-block",
                        padding: "var(--renge-space-2) var(--renge-space-4)",
                        background: "var(--renge-color-accent-subtle)",
                        borderRadius: "var(--renge-radius-full)",
                        fontSize: "var(--renge-font-size-xs)",
                        color: "var(--renge-color-accent)",
                        fontFamily: "var(--font-body)",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        marginBottom: "var(--renge-space-5)"
                    },
                    children: "Coming soon"
                }, void 0, false, {
                    fileName: "[project]/apps/src/components/sections/ComingSoon.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h2, {
                    initial: "hidden",
                    animate: inView ? "visible" : "hidden",
                    custom: 0.1,
                    variants: fadeUp,
                    style: {
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.8rem, 4vw, var(--renge-font-size-3xl))",
                        color: "var(--renge-color-fg)",
                        fontWeight: 400,
                        margin: 0,
                        marginBottom: "var(--renge-space-4)",
                        letterSpacing: "-0.02em"
                    },
                    children: "@renge/react"
                }, void 0, false, {
                    fileName: "[project]/apps/src/components/sections/ComingSoon.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                    initial: "hidden",
                    animate: inView ? "visible" : "hidden",
                    custom: 0.2,
                    variants: fadeUp,
                    style: {
                        fontSize: "var(--renge-font-size-lg)",
                        color: "var(--renge-color-fg-subtle)",
                        lineHeight: "var(--renge-line-height-lg)",
                        margin: 0,
                        marginBottom: "var(--renge-space-6)",
                        fontFamily: "var(--font-body)"
                    },
                    children: "React components built on the token system. Proportional. Accessible. Composable."
                }, void 0, false, {
                    fileName: "[project]/apps/src/components/sections/ComingSoon.tsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].form, {
                    initial: "hidden",
                    animate: inView ? "visible" : "hidden",
                    custom: 0.3,
                    variants: fadeUp,
                    onSubmit: handleSubmit,
                    style: {
                        display: "flex",
                        gap: "var(--renge-space-2)",
                        justifyContent: "center",
                        flexWrap: "wrap"
                    },
                    children: submitted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: "var(--renge-font-size-base)",
                            color: "var(--renge-color-accent)",
                            fontFamily: "var(--font-body)",
                            margin: 0
                        },
                        children: "You will hear from us."
                    }, void 0, false, {
                        fileName: "[project]/apps/src/components/sections/ComingSoon.tsx",
                        lineNumber: 112,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "email",
                                value: email,
                                onChange: (e)=>setEmail(e.target.value),
                                placeholder: "your@email.com",
                                required: true,
                                style: {
                                    padding: "var(--renge-space-3) var(--renge-space-4)",
                                    borderRadius: "var(--renge-radius-full)",
                                    border: "1px solid var(--renge-color-border)",
                                    background: "var(--renge-color-bg-subtle)",
                                    color: "var(--renge-color-fg)",
                                    fontSize: "var(--renge-font-size-base)",
                                    fontFamily: "var(--font-body)",
                                    minWidth: 240,
                                    outline: "none"
                                }
                            }, void 0, false, {
                                fileName: "[project]/apps/src/components/sections/ComingSoon.tsx",
                                lineNumber: 122,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                style: {
                                    padding: "var(--renge-space-3) var(--renge-space-5)",
                                    borderRadius: "var(--renge-radius-full)",
                                    border: "none",
                                    background: "var(--renge-color-accent)",
                                    color: "var(--renge-color-fg-inverse)",
                                    fontSize: "var(--renge-font-size-base)",
                                    fontFamily: "var(--font-body)",
                                    cursor: "pointer",
                                    letterSpacing: "0.04em",
                                    transition: "background 200ms var(--renge-easing-ease-out)"
                                },
                                children: "Notify me"
                            }, void 0, false, {
                                fileName: "[project]/apps/src/components/sections/ComingSoon.tsx",
                                lineNumber: 140,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                }, void 0, false, {
                    fileName: "[project]/apps/src/components/sections/ComingSoon.tsx",
                    lineNumber: 98,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/src/components/sections/ComingSoon.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/src/components/sections/ComingSoon.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_s(ComingSoon, "9zdwpaP/EZhGfwIfRwPtFVc60rI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = ComingSoon;
var _c;
__turbopack_context__.k.register(_c, "ComingSoon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/src/components/sections/Footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.36.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.36.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/src/lib/phi.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function Footer() {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        margin: "-5%"
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        ref: ref,
        style: {
            padding: "var(--renge-space-7) var(--renge-space-5)",
            background: "var(--renge-color-bg-inverse)",
            color: "var(--renge-color-fg-inverse)",
            borderTop: "1px solid var(--renge-color-border)"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                maxWidth: 1080,
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                gap: "var(--renge-space-6)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 16
                    },
                    animate: inView ? {
                        opacity: 1,
                        y: 0
                    } : {},
                    transition: {
                        duration: 0.8,
                        ease: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EASE_OUT"]
                    },
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                        gap: "var(--renge-space-5)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: "var(--font-display)",
                                        fontSize: "var(--renge-font-size-2xl)",
                                        margin: 0,
                                        marginBottom: "var(--renge-space-2)",
                                        letterSpacing: "-0.02em",
                                        opacity: 0.9
                                    },
                                    children: "Renge"
                                }, void 0, false, {
                                    fileName: "[project]/apps/src/components/sections/Footer.tsx",
                                    lineNumber: 43,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: "var(--renge-font-size-sm)",
                                        fontFamily: "var(--font-body)",
                                        margin: 0,
                                        opacity: 0.5,
                                        letterSpacing: "0.04em"
                                    },
                                    children: "Part of the Soka Labs ecosystem."
                                }, void 0, false, {
                                    fileName: "[project]/apps/src/components/sections/Footer.tsx",
                                    lineNumber: 53,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/src/components/sections/Footer.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: "var(--renge-space-5)",
                                alignItems: "center"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "https://github.com",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    style: {
                                        fontSize: "var(--renge-font-size-sm)",
                                        fontFamily: "var(--font-body)",
                                        color: "var(--renge-color-fg-inverse)",
                                        textDecoration: "none",
                                        opacity: 0.6,
                                        letterSpacing: "0.04em",
                                        transition: "opacity 200ms"
                                    },
                                    onMouseEnter: (e)=>e.currentTarget.style.opacity = "1",
                                    onMouseLeave: (e)=>e.currentTarget.style.opacity = "0.6",
                                    children: "GitHub"
                                }, void 0, false, {
                                    fileName: "[project]/apps/src/components/sections/Footer.tsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "#start",
                                    style: {
                                        fontSize: "var(--renge-font-size-sm)",
                                        fontFamily: "var(--font-body)",
                                        color: "var(--renge-color-fg-inverse)",
                                        textDecoration: "none",
                                        opacity: 0.6,
                                        letterSpacing: "0.04em",
                                        transition: "opacity 200ms"
                                    },
                                    onMouseEnter: (e)=>e.currentTarget.style.opacity = "1",
                                    onMouseLeave: (e)=>e.currentTarget.style.opacity = "0.6",
                                    children: "Docs"
                                }, void 0, false, {
                                    fileName: "[project]/apps/src/components/sections/Footer.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/src/components/sections/Footer.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/src/components/sections/Footer.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        height: 1,
                        background: "currentColor",
                        opacity: 0.1
                    }
                }, void 0, false, {
                    fileName: "[project]/apps/src/components/sections/Footer.tsx",
                    lineNumber: 104,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: inView ? {
                        opacity: 1
                    } : {},
                    transition: {
                        duration: 1,
                        delay: 0.2
                    },
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "var(--renge-space-4)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: "var(--renge-font-size-xs)",
                                fontFamily: "var(--font-body)",
                                margin: 0,
                                opacity: 0.4,
                                letterSpacing: "0.08em"
                            },
                            children: "Built with Renge."
                        }, void 0, false, {
                            fileName: "[project]/apps/src/components/sections/Footer.tsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "var(--font-mono, monospace)",
                                fontSize: "var(--renge-font-size-sm)",
                                opacity: 0.5,
                                letterSpacing: "0.06em",
                                textAlign: "right"
                            },
                            children: [
                                "φ = ",
                                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$src$2f$lib$2f$phi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHI"].toFixed(10)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/src/components/sections/Footer.tsx",
                            lineNumber: 130,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/src/components/sections/Footer.tsx",
                    lineNumber: 107,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/src/components/sections/Footer.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/src/components/sections/Footer.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_s(Footer, "O7qYEn3iCrBBWRAefWku+E/MdDM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$36$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_b0f7b063._.js.map