"use client";

// Data Display Docs — component documentation.

import {
  Table, TableHead, TableBody, TableRow, TableHeader, TableCell,
  Accordion, AccordionItem, Timeline, TimelineItem, Badge,
} from "@renge-ui/react";
import { PropRow, PropsTable, Demo, Code, ComponentSection } from "@/components/ui/DocPrimitives";

export function TableDocs() {
  const plants = [
    { name: "Coast Live Oak", ratio: "1.618", fib: "89", habitat: "Woodland" },
    { name: "Blue Wild Rye", ratio: "1.382", fib: "55", habitat: "Riparian" },
    { name: "California Poppy", ratio: "1.236", fib: "34", habitat: "Grassland" },
    { name: "Sword Fern", ratio: "1.618", fib: "89", habitat: "Forest" },
    { name: "Toyon", ratio: "1.382", fib: "55", habitat: "Chaparral" },
  ];
  return (
    <ComponentSection id="table" title="Table" description="Data table primitives: Table, TableHead, TableBody, TableFoot, TableRow, TableHeader, TableCell. Row padding follows Fibonacci spacing. Header uses semantic uppercase styling.">
      <Demo label="Full table">
        <Table bordered style={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableHeader>Plant</TableHeader>
              <TableHeader>φ Ratio</TableHeader>
              <TableHeader>Fibonacci</TableHeader>
              <TableHeader>Habitat</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {plants.map((p, i) => (
              <TableRow key={p.name} index={i}>
                <TableCell>{p.name}</TableCell>
                <TableCell><Badge variant="accent" size="sm">{p.ratio}</Badge></TableCell>
                <TableCell muted>{p.fib}</TableCell>
                <TableCell muted>{p.habitat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Demo>
      <Code>{`<Table bordered>
  <TableHead>
    <TableRow>
      <TableHeader>Name</TableHeader>
      <TableHeader>Value</TableHeader>
    </TableRow>
  </TableHead>
  <TableBody>
    {rows.map((row, i) => (
      <TableRow key={row.id} index={i}>
        <TableCell>{row.name}</TableCell>
        <TableCell muted>{row.value}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`}</Code>
      <PropsTable>
        <PropRow name="bordered" type="boolean" defaultVal="false" desc="(Table) Outer border on the container." />
        <PropRow name="striped" type="boolean" defaultVal="false" desc="(Table) Zebra-stripe via data-striped attribute." />
        <PropRow name="index" type="number" defaultVal="—" desc="(TableRow) 0-indexed position — even rows get bg-subtle." />
        <PropRow name="muted" type="boolean" defaultVal="false" desc="(TableCell) Renders in fg-muted for secondary data." />
      </PropsTable>
    </ComponentSection>
  );
}


export function AccordionDocs() {
  return (
    <ComponentSection id="accordion" title="Accordion" description="Expandable sections. Height animates with ease-in-out at duration-4 (500ms). The chevron rotates 180° on open. Accordion manages which items are open; AccordionItem is a single row.">
      <Demo label="Single (default)">
        <Accordion defaultOpen="phi" style={{ width: "100%" }}>
          <AccordionItem id="phi" title="What is PHI?">
            The golden ratio — 1.618033… It appears in nautilus shells, sunflower spirals, galaxy arms. Renge builds its spacing scale from it.
          </AccordionItem>
          <AccordionItem id="fibonacci" title="What is the Fibonacci sequence?">
            1, 1, 2, 3, 5, 8, 13, 21… Each number is the sum of the two before it. The ratio of consecutive Fibonacci numbers converges toward φ.
          </AccordionItem>
          <AccordionItem id="phyllotaxis" title="What is phyllotaxis?">
            The pattern of leaves on a stem. Nature&apos;s solution to optimal packing — each leaf grows at the golden angle (137.5°) from the previous. The logic behind our grid.
          </AccordionItem>
        </Accordion>
      </Demo>
      <Demo label="Multiple open allowed">
        <Accordion multiple style={{ width: "100%" }}>
          <AccordionItem id="a" title="Open me">I can be open simultaneously with others.</AccordionItem>
          <AccordionItem id="b" title="Open me too" >Both panels can be open at once when multiple=true.</AccordionItem>
          <AccordionItem id="c" title="Disabled" disabled>This item is disabled.</AccordionItem>
        </Accordion>
      </Demo>
      <Code>{`<Accordion defaultOpen="phi">
  <AccordionItem id="phi" title="What is PHI?">
    The golden ratio — 1.618033…
  </AccordionItem>
  <AccordionItem id="fibonacci" title="Fibonacci sequence">
    1, 1, 2, 3, 5, 8, 13…
  </AccordionItem>
</Accordion>

{/* Multiple simultaneously open */}
<Accordion multiple>
  <AccordionItem id="one" title="Section 1">Content</AccordionItem>
  <AccordionItem id="two" title="Section 2">Content</AccordionItem>
</Accordion>`}</Code>
      <PropsTable>
        <PropRow name="multiple" type="boolean" defaultVal="false" desc="(Accordion) Allow multiple items open simultaneously." />
        <PropRow name="defaultOpen" type="string | string[]" defaultVal="—" desc="(Accordion) ID(s) of items open on mount." />
        <PropRow name="id" type="string" desc="(AccordionItem) Unique identifier used for open state tracking." />
        <PropRow name="title" type="ReactNode" desc="(AccordionItem) Trigger label." />
        <PropRow name="disabled" type="boolean" defaultVal="false" desc="(AccordionItem) Prevents expanding." />
      </PropsTable>
    </ComponentSection>
  );
}


export function TimelineDocs() {
  return (
    <ComponentSection id="timeline" title="Timeline" description="Vertical event list. Dots are sized at space-3 (12px = Fibonacci×3). The connector gradient transitions from the item's status color to border-subtle — events flow forward in time.">
      <Demo label="Build history">
        <Timeline style={{ width: "100%", maxWidth: 480 }}>
          <TimelineItem
            title="Tokens — v2.2.4"
            description="Added animation scale. 15 named keyframes. All Fibonacci-derived durations."
            timestamp="Today"
            status="completed"
          />
          <TimelineItem
            title="React — v2.3.3"
            description="44 components. Added data input, display, navigation, feedback, layout, and action categories."
            timestamp="Today"
            status="active"
          />
          <TimelineItem
            title="Tailwind — v2.2.5"
            description="v4 plugin now injects animation vars and @keyframes blocks."
            timestamp="Today"
            status="completed"
          />
          <TimelineItem
            title="@renge-ui/vue"
            description="Vue 3 component port. Not started."
            timestamp="TBD"
            status="pending"
          />
        </Timeline>
      </Demo>
      <Code>{`<Timeline>
  <TimelineItem
    title="v1.0 released"
    description="First stable token system."
    timestamp="Jan 2025"
    status="completed"
  />
  <TimelineItem
    title="React components"
    description="44 components added."
    timestamp="Feb 2025"
    status="active"
  />
  <TimelineItem
    title="Vue port"
    description="Coming soon."
    timestamp="TBD"
    status="pending"
  />
</Timeline>`}</Code>
      <PropsTable>
        <PropRow name="title" type="ReactNode" desc="(TimelineItem) Event label." />
        <PropRow name="description" type="ReactNode" defaultVal="—" desc="(TimelineItem) Supporting copy below the title." />
        <PropRow name="timestamp" type="ReactNode" defaultVal="—" desc="(TimelineItem) Time label — aligned right." />
        <PropRow name="status" type='"completed" | "active" | "pending"' defaultVal='"pending"' desc="(TimelineItem) completed=success · active=accent · pending=border." />
        <PropRow name="icon" type="ReactNode" defaultVal="—" desc="(TimelineItem) Optional icon inside the dot (small — use 8–10px icons)." />
      </PropsTable>
    </ComponentSection>
  );
}
