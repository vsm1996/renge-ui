import { describe, it, expect } from "vitest";
import { defineComponent, h, provide } from "vue";
import { mount } from "@vue/test-utils";
import { useRengeTheme, useRengeInject, type RengeThemeContext } from "../useRengeTheme";

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

describe("useRengeInject", () => {
  it("resolves a context provided by a second module instance of the composable", () => {
    // The published package can evaluate useRengeTheme twice (bundled copy in
    // index.mjs + raw copy under dist/composables imported by the SFCs). Each
    // instance computes its own injection key, so the key must come from the
    // global symbol registry. Simulate the "other instance" by providing under
    // an independently computed Symbol.for of the same name.
    const fakeContext = { marker: "other-instance" };
    let injected: unknown;

    const Child = defineComponent({
      setup() {
        injected = useRengeInject();
        return () => h("div");
      },
    });
    const Parent = defineComponent({
      setup() {
        provide(Symbol.for("renge-ui:theme"), fakeContext);
        return () => h(Child);
      },
    });
    mount(Parent);

    expect(injected).toBe(fakeContext);
  });

  it("throws outside a provider tree", () => {
    const Orphan = defineComponent({
      setup() {
        useRengeInject();
        return () => h("div");
      },
    });
    expect(() => mount(Orphan)).toThrowError(/RengeProvider/);
  });
});
