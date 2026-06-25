export const TOP_LINKS = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Example",    href: "/example"    },
  { label: "Start",      href: "#start"      },
] as const;

export const DOCS_LINKS = [
  { label: "Tokens",     href: "/#tokens",            desc: "@renge-ui/tokens — CSS custom properties"     },
  { label: "Tailwind",   href: "/tailwind",           desc: "@renge-ui/tailwind — Utility classes"         },
  { label: "Components", href: "/components",         desc: "@renge-ui/react — React components"           },
  { label: "Vue",        href: "/vue",                desc: "@renge-ui/vue — Vue 3 components"             },
  { label: "Svelte",     href: "/svelte",             desc: "@renge-ui/svelte — Svelte components"         },
  { label: "System",     href: "/system",             desc: "Token API · Animations · Patterns"            },
  { label: "Test Utils", href: "/test-utils",         desc: "@renge-ui/test-utils — Testing utilities"     },
  { label: "Accessibility", href: "/system#accessibility", desc: "WCAG 2.1 AA compliance guide"          },
] as const;
