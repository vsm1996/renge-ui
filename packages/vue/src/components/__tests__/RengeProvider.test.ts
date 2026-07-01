import { describe, it, expect, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import RengeProvider from "../RengeProvider.vue";

describe("RengeProvider", () => {
  afterEach(() => {
    document.documentElement.removeAttribute("data-profile");
    document.documentElement.removeAttribute("data-mode");
  });

  it("applies the default profile/mode on mount without an explicit switchProfile call", async () => {
    mount(RengeProvider, { slots: { default: "<div>content</div>" } });
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(document.documentElement.getAttribute("data-profile")).toBe("ocean");
    expect(document.documentElement.getAttribute("data-mode")).toBe("light");
  });

  it("applies an explicit profile/mode prop on mount", async () => {
    mount(RengeProvider, {
      props: { profile: "earth", mode: "dark" },
      slots: { default: "<div>content</div>" },
    });
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(document.documentElement.getAttribute("data-profile")).toBe("earth");
    expect(document.documentElement.getAttribute("data-mode")).toBe("dark");
  });
});
