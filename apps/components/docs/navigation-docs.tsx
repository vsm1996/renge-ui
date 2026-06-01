"use client";

// Navigation Docs — component documentation.

import { useState } from "react";
import {
  Navbar, Tabs, TabList, Tab, TabPanel, Breadcrumb, BreadcrumbItem, Pagination, Stack, Text, Badge, Button,
} from "@renge-ui/react";
import { PropRow, PropsTable, Demo, Code, Callout, ComponentSection } from "@/components/ui/DocPrimitives";

export function NavbarDocs() {
  return (
    <ComponentSection id="navbar" title="Navbar" description="Navigation container. Composes with Stack to build any nav layout. Pass sticky to get fixed-top positioning.">
      <Demo label="Basic navigation">
        <div style={{ width: "100%", border: "1px solid var(--renge-color-border-subtle)", borderRadius: "var(--renge-radius-2)", overflow: "hidden" }}>
          <Navbar>
            <Stack direction="horizontal" gap="4" align="center" justify="between" style={{ width: "100%" }}>
              <Text weight="semibold">Renge</Text>
              <Stack direction="horizontal" gap="4" align="center">
                <Text size="sm" color="fg-subtle">Docs</Text>
                <Text size="sm" color="fg-subtle">GitHub</Text>
                <Badge variant="accent" size="sm">v0.1</Badge>
              </Stack>
            </Stack>
          </Navbar>
        </div>
      </Demo>
      <Demo label="With border off">
        <div style={{ width: "100%", border: "1px solid var(--renge-color-border-subtle)", borderRadius: "var(--renge-radius-2)", overflow: "hidden" }}>
          <Navbar border={false} style={{ background: "var(--renge-color-bg-inverse)" }}>
            <Stack direction="horizontal" gap="4" align="center" justify="between" style={{ width: "100%" }}>
              <Text weight="semibold" color="fg-subtle">Dark nav</Text>
              <Stack direction="horizontal" gap="4">
                <Text size="sm" color="fg-subtle">Link</Text>
              </Stack>
            </Stack>
          </Navbar>
        </div>
      </Demo>
      <Code>{`{/* Basic */}
<Navbar>
  <Stack direction="horizontal" justify="between" style={{ width: "100%" }}>
    <Text weight="semibold">Brand</Text>
    <Stack direction="horizontal" gap="4">
      <a href="/docs">Docs</a>
      <a href="/github">GitHub</a>
    </Stack>
  </Stack>
</Navbar>

{/* Sticky top */}
<Navbar sticky>
  <Stack direction="horizontal" justify="between" style={{ width: "100%" }}>
    <Text weight="semibold">Brand</Text>
    <ProfileToggle />
  </Stack>
</Navbar>`}</Code>
      <PropsTable>
        <PropRow name="sticky" type="boolean" defaultVal="false" desc="position: sticky, top: 0, z-index: 100." />
        <PropRow name="border" type="boolean" defaultVal="true" desc="Renders a 1px bottom border using border-subtle token." />
        <PropRow name="height" type="string" defaultVal='"56px"' desc="min-height of the bar." />
        <PropRow name="paddingX" type='"0" – "8"' defaultVal='"5"' desc="Horizontal padding." />
      </PropsTable>
    </ComponentSection>
  );
}


export function TabsDocs() {
  return (
    <ComponentSection id="tabs" title="Tabs" description="Tab navigation with spring-eased active underline. Tabs manages open state; Tab registers a value; TabPanel renders conditionally.">
      <Demo label="Basic tabs">
        <Tabs defaultTab="phi" style={{ width: "100%" }}>
          <TabList>
            <Tab value="phi">PHI</Tab>
            <Tab value="fibonacci">Fibonacci</Tab>
            <Tab value="phyllotaxis">Phyllotaxis</Tab>
          </TabList>
          <TabPanel value="phi">
            <Text as="p" color="fg-subtle" style={{ margin: 0 }}>
              φ = 1.618033… The golden ratio. Two quantities are in the golden ratio if their ratio equals the ratio of their sum to the larger quantity.
            </Text>
          </TabPanel>
          <TabPanel value="fibonacci">
            <Text as="p" color="fg-subtle" style={{ margin: 0 }}>
              1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89… Consecutive ratios converge toward φ. Renge spacing, durations, and sizes all follow this sequence.
            </Text>
          </TabPanel>
          <TabPanel value="phyllotaxis">
            <Text as="p" color="fg-subtle" style={{ margin: 0 }}>
              The arrangement of leaves on a stem. Each leaf grows at the golden angle (137.5°) from the previous — nature&apos;s optimal packing solution.
            </Text>
          </TabPanel>
        </Tabs>
      </Demo>
      <Code>{`<Tabs defaultTab="overview">
  <TabList>
    <Tab value="overview">Overview</Tab>
    <Tab value="props">Props</Tab>
    <Tab value="examples">Examples</Tab>
  </TabList>
  <TabPanel value="overview">
    <Text>Overview content</Text>
  </TabPanel>
  <TabPanel value="props">
    <PropsTable>…</PropsTable>
  </TabPanel>
  <TabPanel value="examples">
    <Demo>…</Demo>
  </TabPanel>
</Tabs>

{/* Controlled */}
<Tabs value={activeTab} onChange={setActiveTab}>
  …
</Tabs>`}</Code>
      <PropsTable>
        <PropRow name="defaultTab" type="string" defaultVal='""' desc="(Tabs) ID of the tab active on mount." />
        <PropRow name="value" type="string" defaultVal="—" desc="(Tabs) Controlled active tab." />
        <PropRow name="onChange" type="(id: string) => void" defaultVal="—" desc="(Tabs) Called when active tab changes." />
        <PropRow name="value" type="string" desc="(Tab / TabPanel) The identifier shared between a Tab and its TabPanel." />
      </PropsTable>
    </ComponentSection>
  );
}


export function BreadcrumbDocs() {
  return (
    <ComponentSection id="breadcrumb" title="Breadcrumb" description="Path navigation. Items are separated by a chevron. The current page is rendered in fg (not a link). All spacing uses space-1 (4px = Fibonacci×1).">
      <Demo label="Navigation path">
        <Breadcrumb>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
          <BreadcrumbItem current>Breadcrumb</BreadcrumbItem>
        </Breadcrumb>
      </Demo>
      <Demo label="Longer path">
        <Breadcrumb>
          <BreadcrumbItem href="/">Renge</BreadcrumbItem>
          <BreadcrumbItem href="/packages">Packages</BreadcrumbItem>
          <BreadcrumbItem href="/packages/react">React</BreadcrumbItem>
          <BreadcrumbItem href="/packages/react/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Breadcrumb</BreadcrumbItem>
        </Breadcrumb>
      </Demo>
      <Code>{`<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
  <BreadcrumbItem current>Current page</BreadcrumbItem>
</Breadcrumb>

{/* Custom separator */}
<Breadcrumb separator="/">
  <BreadcrumbItem href="/">usr</BreadcrumbItem>
  <BreadcrumbItem href="/local">local</BreadcrumbItem>
  <BreadcrumbItem current>bin</BreadcrumbItem>
</Breadcrumb>`}</Code>
      <PropsTable>
        <PropRow name="separator" type="ReactNode" defaultVal="chevron SVG" desc="(Breadcrumb) Custom separator element between items." />
        <PropRow name="href" type="string" defaultVal="—" desc="(BreadcrumbItem) Renders as a link. Omit for non-linked items." />
        <PropRow name="current" type="boolean" defaultVal="false" desc="(BreadcrumbItem) Marks as current page — renders in fg color with aria-current='page'." />
      </PropsTable>
    </ComponentSection>
  );
}


export function PaginationDocs() {
  const [page, setPage] = useState(1);
  return (
    <ComponentSection id="pagination" title="Pagination" description="Page navigation. Shows at most siblings×2+5 pages — default sibling=1 (Fibonacci). Active page uses accent. Ellipsis replaces gaps greater than 2 pages.">
      <Demo label="Interactive">
        <Stack gap="3" align="center" style={{ width: "100%" }}>
          <Pagination total={20} page={page} onChange={setPage} />
          <Text size="sm" color="fg-subtle">Page {page} of 20</Text>
        </Stack>
      </Demo>
      <Demo label="Siblings = 2">
        <Pagination total={15} page={7} onChange={() => {}} siblings={2} />
      </Demo>
      <Code>{`const [page, setPage] = useState(1);

<Pagination
  total={20}
  page={page}
  onChange={setPage}
/>

{/* More siblings visible */}
<Pagination
  total={100}
  page={50}
  onChange={setPage}
  siblings={2}
/>`}</Code>
      <PropsTable>
        <PropRow name="total" type="number" desc="Total number of pages." />
        <PropRow name="page" type="number" desc="Current page (1-indexed)." />
        <PropRow name="onChange" type="(page: number) => void" desc="Called with the new page number when the user navigates." />
        <PropRow name="siblings" type="number" defaultVal="1" desc="Pages shown on each side of the active page before ellipsis truncation." />
      </PropsTable>
    </ComponentSection>
  );
}
