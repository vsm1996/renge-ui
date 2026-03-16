import { ocean } from "./ocean";
import { earth } from "./earth";
import { twilight } from "./twilight";
import { fire } from "./fire";
import { void_ } from "./void";
import { leaf } from "./leaf";
import type { SemanticColorMap, ProfileName, ProfileMode, ProfileVariant } from "../../types";

export const profiles: Record<ProfileName, ProfileVariant> = {
  ocean,
  earth,
  twilight,
  fire,
  void: void_,
  leaf,
};

export function getProfile(name: ProfileName, mode: ProfileMode = "light"): SemanticColorMap {
  return profiles[name][mode];
}

/**
 * Generate semantic CSS custom properties from a profile + mode.
 */
export function createSemanticColorVars(
  profile: SemanticColorMap
): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const [key, value] of Object.entries(profile)) {
    const kebab = key.replace(/([A-Z])/g, "-$1").toLowerCase();
    vars[`--renge-color-${kebab}`] = value;
  }
  return vars;
}
