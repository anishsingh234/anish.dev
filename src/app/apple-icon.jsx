import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Home-screen icon: the same AK. monogram as icon.svg, with room around it
// because iOS rounds the corners itself.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8DD2E" }}>
        <svg width="132" height="132" viewBox="0 0 32 32">
          <g transform="rotate(-4 16 16)" fill="#111111">
            <path fillRule="evenodd" d="M2.5 26.5 7 5.5h4l4.5 21h-3.4l-.9-4.3H6.8l-.9 4.3ZM7.4 19.2h3.2L9 11.6Z" />
            <path d="M16.6 5.5h3.3v21h-3.3Z" />
            <path d="M19.6 16.6 24 5.5h3.4l-4.9 12Z" />
            <path d="M21.3 14.4l5.9 12.1h-3.5l-4-8.2Z" />
          </g>
          <circle cx="29.2" cy="25.4" r="1.9" fill="#E62D5B" />
        </svg>
      </div>
    ),
    size
  );
}
