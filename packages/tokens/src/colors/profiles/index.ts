import { ocean } from "./ocean";
import { earth } from "./earth";
import { twilight } from "./twilight";
import { fire } from "./fire";
import { void_ } from "./void";
import { leaf } from "./leaf";
import type { SemanticColorMap, ProfileName } from "../../types";

export const profiles: Record<ProfileName, SemanticColorMap> = {
  ocean,
  earth,
  twilight,
  fire,
  void: void_,
  leaf,
};

export function getProfile(name: ProfileName): SemanticColorMap {
  return profiles[name];
}

/**
 * Generate semantic CSS custom properties from a profile.
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
