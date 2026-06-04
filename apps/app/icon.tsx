import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#0d1b22",
          borderRadius: 7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 21,
          fontFamily: "Georgia, serif",
          color: "#5ecfcf",
          lineHeight: 1,
          paddingBottom: 2,
        }}
      >
        φ
      </div>
    ),
    { ...size }
  );
}
