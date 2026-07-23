import { describe, it, expect } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { afterEach } from "vitest";
import * as Renge from "../index";
import {
  RengeProvider,
  Button,
  IconButton,
  Checkbox,
  Switch,
  Input,
  Textarea,
  Badge,
  Alert,
  Card,
  Heading,
  Text,
  Divider,
  Chip,
  Avatar,
  Container,
  Stack,
  Grid,
  Modal,
  Spinner,
  Skeleton,
  Anchor,
  KBD,
  Tabs,
  TabList,
  Tab,
  TabPanel,
} from "../index";

afterEach(cleanup);

// ─── Smoke: every listed component renders without throwing ──────────────────
// The React package is the reference implementation and had ZERO tests. This is
// the safety net: import → render → assert a DOM node exists. It catches import
// crashes, bad hooks, and render-time throws across the surface.

describe("smoke — components render", () => {
  const cases: [string, React.ReactElement][] = [
    ["Button", <Button>Save</Button>],
    ["IconButton", <IconButton aria-label="Close">×</IconButton>],
    ["Checkbox", <Checkbox label="Accept" />],
    ["Switch", <Switch label="On" />],
    ["Input", <Input aria-label="Name" defaultValue="x" />],
    ["Textarea", <Textarea aria-label="Bio" />],
    ["Badge", <Badge>New</Badge>],
    ["Alert", <Alert>Heads up</Alert>],
    ["Card", <Card>Body</Card>],
    ["Heading", <Heading>Title</Heading>],
    ["Text", <Text>Paragraph</Text>],
    ["Divider", <Divider />],
    ["Chip", <Chip>Tag</Chip>],
    ["Avatar", <Avatar>AB</Avatar>],
    ["Container", <Container>content</Container>],
    ["Stack", <Stack><span>a</span><span>b</span></Stack>],
    ["Grid", <Grid><span>a</span></Grid>],
    ["Spinner", <Spinner />],
    ["Skeleton", <Skeleton />],
    ["Anchor", <Anchor href="/x">link</Anchor>],
    ["KBD", <KBD>⌘</KBD>],
  ];

  it.each(cases)("%s renders a node", (_name, element) => {
    const { container } = render(element);
    expect(container.firstChild).not.toBeNull();
  });

  it("renders inside RengeProvider (theming context) without error", () => {
    render(
      <RengeProvider>
        <Button>themed</Button>
      </RengeProvider>,
    );
    expect(screen.getByRole("button", { name: "themed" })).toBeInTheDocument();
  });
});

// ─── Behaviour & accessibility on the highest-risk components ─────────────────

describe("behaviour & a11y", () => {
  it("Button renders a <button> with its label", () => {
    render(<Button>Submit</Button>);
    const btn = screen.getByRole("button", { name: "Submit" });
    expect(btn.tagName).toBe("BUTTON");
  });

  it("IconButton exposes an accessible name from aria-label", () => {
    render(<IconButton aria-label="Close dialog">×</IconButton>);
    expect(screen.getByRole("button", { name: "Close dialog" })).toBeInTheDocument();
  });

  it("Checkbox is a real checkbox, labelled, and toggles", () => {
    render(<Checkbox label="Subscribe" />);
    const box = screen.getByRole("checkbox", { name: "Subscribe" });
    expect(box).not.toBeChecked();
    fireEvent.click(box);
    expect(box).toBeChecked();
  });

  it("Switch has role=switch and toggles when clicked", () => {
    render(<Switch label="Wifi" />);
    const sw = screen.getByRole("switch"); // input[type=checkbox][role=switch]
    expect(sw).not.toBeChecked();
    fireEvent.click(sw);
    expect(sw).toBeChecked();
  });

  it("Modal renders a dialog only when open", () => {
    const { rerender } = render(
      <Modal open={false} onClose={() => {}}>
        secret
      </Modal>,
    );
    expect(screen.queryByText("secret")).not.toBeInTheDocument();
    rerender(
      <Modal open onClose={() => {}}>
        secret
      </Modal>,
    );
    expect(screen.getByText("secret")).toBeInTheDocument();
  });

  it("Tabs shows the selected panel", () => {
    render(
      <Tabs defaultTab="a">
        <TabList>
          <Tab value="a">A</Tab>
          <Tab value="b">B</Tab>
        </TabList>
        <TabPanel value="a">Panel A</TabPanel>
        <TabPanel value="b">Panel B</TabPanel>
      </Tabs>,
    );
    expect(screen.getByText("Panel A")).toBeInTheDocument();
  });

  it("disabled Button carries the disabled state", () => {
    render(<Button disabled>Nope</Button>);
    expect(screen.getByRole("button", { name: "Nope" })).toBeDisabled();
  });
});

// ─── Public API sanity ────────────────────────────────────────────────────────

describe("package exports", () => {
  it("exports the provider, hooks, and a representative component set", () => {
    for (const name of ["RengeProvider", "useRengeTheme", "Button", "Modal", "Tabs"]) {
      expect(Renge).toHaveProperty(name);
    }
  });
});
