import { DIFF_ROWS } from "./data";

export function DiffTable() {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: "var(--font-body)",
          fontSize: "var(--renge-font-size-base)",
        }}
      >
        <thead>
          <tr>
            {["Property", "Arbitrary", "Renge", "Why"].map((col, i) => (
              <th
                key={col}
                style={{
                  textAlign: "left",
                  padding: "var(--renge-space-2) var(--renge-space-3)",
                  fontSize: "var(--renge-font-size-sm)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--renge-color-fg-muted)",
                  borderBottom: "1px solid var(--renge-color-border)",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  paddingLeft: i === 0 ? 0 : undefined,
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DIFF_ROWS.map((row, i) => (
            <tr
              key={row.property}
              style={{
                borderBottom:
                  i < DIFF_ROWS.length - 1
                    ? "1px solid var(--renge-color-border-subtle)"
                    : "none",
              }}
            >
              <td
                style={{
                  padding: "var(--renge-space-3) var(--renge-space-3) var(--renge-space-3) 0",
                  color: "var(--renge-color-fg)",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                {row.property}
              </td>
              <td
                style={{
                  padding: "var(--renge-space-3)",
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  fontSize: "var(--renge-font-size-sm)",
                  color: "var(--renge-color-fg-muted)",
                  whiteSpace: "nowrap",
                }}
              >
                {row.arbitrary}
              </td>
              <td
                style={{
                  padding: "var(--renge-space-3)",
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  fontSize: "var(--renge-font-size-sm)",
                  color: "var(--renge-color-accent)",
                  whiteSpace: "nowrap",
                }}
              >
                {row.renge}
              </td>
              <td
                style={{
                  padding: "var(--renge-space-3)",
                  color: "var(--renge-color-fg-muted)",
                  minWidth: "180px",
                  lineHeight: 1.5,
                }}
              >
                {row.note}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
