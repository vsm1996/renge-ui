import { describe, it, expect } from "vitest";
import { defineComponent, h } from "vue";
import { mount } from "@vue/test-utils";
import { useRengeTheme, type RengeThemeContext } from "../useRengeTheme";

function mountWithTheme(assertions: (ctx: RengeThemeContext) => void) {
  const TestComponent = defineComponent({
    setup() {
      const ctx = useRengeTheme();
      assertions(ctx);
      return () => h("div");
    },
  });
  mount(TestComponent);
}

describe("useRengeTheme", () => {
  it("defaults to the ocean profile", () => {
    mountWithTheme((ctx) => {
      expect(ctx.profile.value).toBe("ocean");
      expect(ctx.mode.value).toBe("light");
    });
  });

  it("keeps profile/mode reactive after switching", () => {
    mountWithTheme((ctx) => {
      ctx.switchProfile("earth");
      ctx.switchMode("dark");
      expect(ctx.profile.value).toBe("earth");
      expect(ctx.mode.value).toBe("dark");
    });
  });
});
