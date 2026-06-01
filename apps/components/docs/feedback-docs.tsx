"use client";

// Feedback Docs — component documentation.

import { useState } from "react";
import {
  Alert, Spinner, Progress, ToastProvider, useToast, Modal, ModalHeader, ModalBody,
  ModalFooter, Stack, Text, Heading, Button, Badge, Card, Input,
} from "@renge-ui/react";
import { PropRow, PropsTable, Demo, Code, Callout, ComponentSection } from "@/components/ui/DocPrimitives";

export function AlertDocs() {
  return (
    <ComponentSection id="alert" title="Alert" description="Contextual banner with left-border accent and semantic status. Renders with role=&quot;alert&quot; for screen reader compatibility.">
      <Demo label="All statuses">
        <Stack gap="3" style={{ width: "100%" }}>
          <Alert status="info" title="PHI is irrational">The golden ratio cannot be expressed as a simple fraction.</Alert>
          <Alert status="success" title="Build succeeded">All 106 tests passed. Zero regressions.</Alert>
          <Alert status="warning" title="High variance">Variance above 0.1 may affect visual consistency across themes.</Alert>
          <Alert status="danger" title="Token not found">--renge-color-unknown is undefined in this profile.</Alert>
        </Stack>
      </Demo>
      <Demo label="Without title">
        <Stack gap="3" style={{ width: "100%" }}>
          <Alert status="info">Informational message without a title.</Alert>
          <Alert status="warning">Variance is set to 0.08 — slight organic drift is active.</Alert>
        </Stack>
      </Demo>
      <Code>{`<Alert status="info" title="Note">
  Informational context.
</Alert>

<Alert status="success" title="Deployed">
  Production build complete.
</Alert>

<Alert status="danger" title="Error">
  Something went wrong.
</Alert>

{/* No title — body only */}
<Alert status="warning">
  Approaching rate limit.
</Alert>`}</Code>
      <PropsTable>
        <PropRow name="status" type='"info" | "success" | "warning" | "danger"' defaultVal='"info"' desc="Sets left-border color and background using semantic token pairs." />
        <PropRow name="title" type="string" defaultVal="—" desc="Bold heading inside the alert. Optional — body renders alone if omitted." />
      </PropsTable>
    </ComponentSection>
  );
}


export function SpinnerDocs() {
  return (
    <ComponentSection id="spinner" title="Spinner" description="Animated loading indicator. The CSS keyframe (rengeSpinnerSpin) is injected once at module load — no runtime overhead per instance.">
      <Demo label="Sizes">
        <Stack direction="horizontal" gap="6" align="center" style={{ flexWrap: "wrap" }}>
          <Stack gap="2" align="center">
            <Spinner size="sm" />
            <Text size="sm" color="fg-subtle">sm · 16px</Text>
          </Stack>
          <Stack gap="2" align="center">
            <Spinner size="md" />
            <Text size="sm" color="fg-subtle">md · 24px</Text>
          </Stack>
          <Stack gap="2" align="center">
            <Spinner size="lg" />
            <Text size="sm" color="fg-subtle">lg · 32px</Text>
          </Stack>
        </Stack>
      </Demo>
      <Demo label="Colors">
        <Stack direction="horizontal" gap="6" align="center" style={{ flexWrap: "wrap" }}>
          <Stack gap="2" align="center">
            <Spinner color="accent" />
            <Text size="sm" color="fg-subtle">accent</Text>
          </Stack>
          <Stack gap="2" align="center">
            <Spinner color="fg" />
            <Text size="sm" color="fg-subtle">fg</Text>
          </Stack>
          <Stack gap="2" align="center">
            <Spinner color="fg-muted" />
            <Text size="sm" color="fg-subtle">fg-muted</Text>
          </Stack>
        </Stack>
      </Demo>
      <Code>{`<Spinner size="md" color="accent" label="Loading tokens" />
<Spinner size="sm" color="fg-subtle" />

{/* In a button */}
<Button variant="outline" disabled>
  <Stack direction="horizontal" gap="2" align="center">
    <Spinner size="sm" color="accent" />
    <span>Saving...</span>
  </Stack>
</Button>`}</Code>
      <PropsTable>
        <PropRow name="size" type='"sm" | "md" | "lg"' defaultVal='"md"' desc="16 / 24 / 32 px diameter." />
        <PropRow name="color" type='"accent" | "fg" | "fg-muted"' defaultVal='"accent"' desc="Spinner ring color token." />
        <PropRow name="label" type="string" defaultVal='"Loading"' desc="aria-label for screen readers." />
      </PropsTable>
    </ComponentSection>
  );
}


export function ProgressDocs() {
  return (
    <ComponentSection id="progress" title="Progress" description="Linear progress bar. Value is clamped 0–100. Track and fill colors reference semantic tokens.">
      <Demo label="PHI-derived values">
        <Stack gap="4" style={{ width: "100%" }}>
          <Stack gap="1">
            <Text size="sm" color="fg-subtle">61.8% — 1/φ</Text>
            <Progress value={61.8} label="PHI progress" />
          </Stack>
          <Stack gap="1">
            <Text size="sm" color="fg-subtle">38.2% — 1/φ²</Text>
            <Progress value={38.2} color="success" />
          </Stack>
          <Stack gap="1">
            <Text size="sm" color="fg-subtle">80% — warning</Text>
            <Progress value={80} color="warning" size="lg" />
          </Stack>
          <Stack gap="1">
            <Text size="sm" color="fg-subtle">20% — danger, no radius</Text>
            <Progress value={20} color="danger" size="sm" radius="none" />
          </Stack>
        </Stack>
      </Demo>
      <Code>{`<Progress value={61.8} color="accent" />
<Progress value={100} color="success" size="lg" />
<Progress value={30} color="danger" radius="none" />

{/* Controlled */}
<Progress
  value={uploadProgress}
  color="accent"
  size="md"
  label="Upload progress"
/>`}</Code>
      <PropsTable>
        <PropRow name="value" type="number" defaultVal="—" desc="0–100 fill percentage. Values outside range are clamped." />
        <PropRow name="color" type='"accent" | "success" | "warning" | "danger"' defaultVal='"accent"' desc="Fill color semantic token." />
        <PropRow name="size" type='"sm" | "md" | "lg"' defaultVal='"md"' desc="Track height: 4 / 8 / 12 px." />
        <PropRow name="radius" type='"none" | "full"' defaultVal='"full"' desc="Track border radius." />
        <PropRow name="label" type="string" defaultVal="—" desc="aria-label for accessibility." />
      </PropsTable>
    </ComponentSection>
  );
}


export function ToastDocs() {
  const { toast } = useToast();
  return (
    <ComponentSection id="toast" title="Toast" description="Portal-based notification system. Max 5 toasts visible (Fibonacci). Entries use spring easing; exits use ease-in. Wrap your app in ToastProvider and call useToast() anywhere.">
      <Demo label="Trigger toasts">
        <Stack direction="horizontal" gap="3" style={{ flexWrap: "wrap" }}>
          <Button size="sm" variant="outline" onClick={() => toast({ title: "Saved successfully", status: "success" })}>
            Success
          </Button>
          <Button size="sm" variant="outline" onClick={() => toast({ title: "Update available", description: "A new version of Renge is ready.", status: "info" })}>
            Info
          </Button>
          <Button size="sm" variant="outline" onClick={() => toast({ title: "Rate limit reached", description: "Try again in 60 seconds.", status: "warning" })}>
            Warning
          </Button>
          <Button size="sm" variant="outline" onClick={() => toast({ title: "Build failed", description: "TypeScript error in Button.tsx:42.", status: "danger" })}>
            Danger
          </Button>
          <Button size="sm" variant="ghost" onClick={() => toast({ title: "Default notification" })}>
            Default
          </Button>
        </Stack>
      </Demo>
      <Code>{`// 1. Wrap app (or page) in ToastProvider
import { ToastProvider } from "@renge-ui/react";

export default function Layout({ children }) {
  return (
    <ToastProvider>
      {children}
    </ToastProvider>
  );
}

// 2. Use the hook anywhere inside
import { useToast } from "@renge-ui/react";

export function SaveButton() {
  const { toast } = useToast();
  return (
    <Button onClick={() => {
      await save();
      toast({
        title: "Saved",
        description: "Your changes are live.",
        status: "success",
        duration: 3000,  // ms — default 5000
      });
    }}>
      Save
    </Button>
  );
}`}</Code>
      <Callout>
        Toast uses <code>createPortal</code> to render outside the DOM tree into <code>document.body</code>. Add <code>ToastProvider</code> once at the root — not per-page.
      </Callout>
      <PropsTable>
        <PropRow name="title" type="string" desc="(toast()) Required — primary message." />
        <PropRow name="description" type="string" defaultVal="—" desc="(toast()) Optional body text below the title." />
        <PropRow name="status" type='"default" | "success" | "warning" | "danger" | "info"' defaultVal='"default"' desc="(toast()) Determines left-border color and icon." />
        <PropRow name="duration" type="number" defaultVal="5000" desc="(toast()) Auto-dismiss after N ms. Set to 0 for persistent." />
        <PropRow name="id" type="string" defaultVal="auto" desc="(toast()) Custom ID — use to deduplicate or dismiss programmatically." />
      </PropsTable>
    </ComponentSection>
  );
}


export function ModalDocs() {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  return (
    <ComponentSection id="modal" title="Modal" description="Portal-based dialog. Overlay fades in; dialog opens with bloom spring easing. Closes on Escape key and overlay click by default. Focus is trapped inside while open.">
      <Demo label="Sizes">
        <Stack direction="horizontal" gap="3" style={{ flexWrap: "wrap" }}>
          {(["sm", "md", "lg"] as const).map(s => (
            <Button key={s} size="sm" variant="outline" onClick={() => { setSize(s); setOpen(true); }}>
              {s} modal
            </Button>
          ))}
        </Stack>
      </Demo>
      <Modal open={open} onClose={() => setOpen(false)} size={size}>
        <ModalHeader>
          <Heading level={3} size="lg" style={{ margin: 0 }}>Natural proportion</Heading>
          <Button size="sm" variant="ghost" onClick={() => setOpen(false)} style={{ fontSize: 18, lineHeight: 1, padding: "var(--renge-space-1)" }}>×</Button>
        </ModalHeader>
        <ModalBody>
          <Stack gap="4">
            <Text as="p" color="fg-subtle" style={{ margin: 0 }}>
              φ = 1.618033… The golden ratio appears in nautilus shells, sunflower spirals, galaxy arms.
              Renge builds its entire token system from this single number.
            </Text>
            <Progress value={61.8} color="accent" />
            <Text size="sm" color="fg-subtle">61.8% — 1/φ</Text>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button size="sm" variant="solid" onClick={() => setOpen(false)}>Confirm</Button>
        </ModalFooter>
      </Modal>
      <Code>{`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open modal</Button>

<Modal open={open} onClose={() => setOpen(false)} size="md">
  <ModalHeader>
    <Heading level={3}>Title</Heading>
    <Button variant="ghost" onClick={() => setOpen(false)}>×</Button>
  </ModalHeader>
  <ModalBody>
    <Text>Modal content goes here.</Text>
  </ModalBody>
  <ModalFooter>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="solid" onClick={handleConfirm}>Confirm</Button>
  </ModalFooter>
</Modal>`}</Code>
      <PropsTable>
        <PropRow name="open" type="boolean" desc="Controls whether the modal is visible." />
        <PropRow name="onClose" type="() => void" desc="Called when the modal should close (Escape key or overlay click)." />
        <PropRow name="size" type='"sm" | "md" | "lg" | "xl" | "full"' defaultVal='"md"' desc="Max width — sm:380px · md:520px · lg:720px · xl:960px · full:100vw." />
        <PropRow name="closeOnOverlayClick" type="boolean" defaultVal="true" desc="Whether clicking the backdrop closes the modal." />
        <PropRow name="closeOnEsc" type="boolean" defaultVal="true" desc="Whether Escape key closes the modal." />
      </PropsTable>
    </ComponentSection>
  );
}

// ============================================================================
// New component docs — Layout
// ============================================================================
