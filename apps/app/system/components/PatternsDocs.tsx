import {
  Stack, Text, Heading, Card, Badge,
  Button, Input, FormField, Progress, Divider, Grid, Stat,
} from "@renge-ui/react";
import { Demo, Code, Callout, ComponentSection } from "@/components/ui/DocPrimitives";

export function PatternsDocs() {
  return (
    <ComponentSection id="patterns" title="Patterns" description="Common composition patterns using @renge-ui/react components. Every value resolves to a CSS custom property — switch profiles and all colors update instantly.">
      <Demo label="Status card">
        <Card variant="outlined" padding="5" style={{ minWidth: 240 }}>
          <Stack gap="4">
            <Stack direction="horizontal" justify="between" align="center">
              <Heading level={3} size="lg">Build status</Heading>
              <Badge variant="success">Passing</Badge>
            </Stack>
            <Stack gap="2">
              <Stack direction="horizontal" justify="between">
                <Text size="sm" color="fg-subtle">Tests</Text>
                <Text size="sm" weight="medium">114 / 114</Text>
              </Stack>
              <Progress value={100} color="success" size="sm" />
            </Stack>
            <Divider spacing="0" />
            <Text size="sm" color="fg-subtle">Last run 2 minutes ago</Text>
          </Stack>
        </Card>
      </Demo>
      <Demo label="Form with validation">
        <Stack gap="5" style={{ width: "100%", maxWidth: 360 }}>
          <FormField label="Email" htmlFor="pat-email" helperText="Used for login and notifications.">
            <Input id="pat-email" type="email" placeholder="you@example.com" fullWidth />
          </FormField>
          <FormField label="Password" htmlFor="pat-pass" required errorText="Must be at least 12 characters.">
            <Input id="pat-pass" type="password" state="error" placeholder="••••••••••••" fullWidth />
          </FormField>
          <Stack direction="horizontal" gap="3" justify="end">
            <Button variant="ghost" colorScheme="accent">Cancel</Button>
            <Button variant="solid" colorScheme="accent">Save changes</Button>
          </Stack>
        </Stack>
      </Demo>
      <Demo label="Metric grid">
        <Grid columns={3} gap="3" style={{ width: "100%" }}>
          <Card variant="filled" padding="3"><Stat value="φ" label="Scale ratio" /></Card>
          <Card variant="filled" padding="3"><Stat value="89" label="Fibonacci 10" trend="up" trendValue="+34" /></Card>
          <Card variant="filled" padding="3"><Stat value="114" label="Tests" trend="up" trendValue="+9" /></Card>
        </Grid>
      </Demo>
      <Code>{`{/* Every component uses only CSS custom properties */}
{/* Switch profiles and all colors update instantly — no re-render */}
import { createRengeTheme } from "@renge-ui/tokens";

const theme = createRengeTheme({ profile: "twilight" });
// Inject theme.css — all @renge-ui/react components adapt automatically.`}</Code>
      <Callout>
        All 44 components use only <code>var(--renge-*)</code> CSS custom properties. Switch color profiles by swapping the injected theme block — no component state changes required.
      </Callout>
    </ComponentSection>
  );
}
