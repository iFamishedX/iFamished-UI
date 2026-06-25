import React from "react"

/**
 * Icon — inline SVG icon component.
 * All icons normalized to 24×24, stroke-based, centered, consistent.
 */

const icons = {
  bolt: {
    viewBox: "0 0 24 24",
    path: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
  },

  cpu: {
    viewBox: "0 0 24 24",
    path: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
      </>
    )
  },

  star: {
    viewBox: "0 0 24 24",
    path: <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" strokeLinecap="round" strokeLinejoin="round" />
  },

  sparkles: {
    viewBox: "0 0 24 24",
    path: (
      <>
        <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z" />
        <path d="M19 14l.7 2L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7z" />
        <path d="M5 18l.5 1.5L7 20l-1.5.5L5 22l-.5-1.5L3 20l1.5-.5z" />
      </>
    )
  },

  palette: {
    viewBox: "0 0 24 24",
    path: (
      <path d="M12 22A10 10 0 1 1 22 12c0 1.7-1.3 3-3 3h-1.5a1.5 1.5 0 0 0 0 3H19a1 1 0 0 1 0 2h-7zM7 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm4 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
    )
  },

  zoom: {
    viewBox: "0 0 24 24",
    path: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" strokeLinecap="round" strokeLinejoin="round" />
      </>
    )
  },

  lightbulb: {
    viewBox: "0 0 24 24",
    path: <path d="M9 21h6M12 3a6 6 0 0 1 3 11v3H9v-3a6 6 0 0 1 3-11z" strokeLinecap="round" strokeLinejoin="round" />
  },

  puzzle: {
    viewBox: "0 0 24 24",
    path: <path d="M20 15a2 2 0 0 1-2 2h-3v-3a2 2 0 1 0-4 0v3H8a2 2 0 0 1-2-2v-3h3a2 2 0 1 0 0-4H6V8a2 2 0 0 1 2-2h3v3a2 2 0 1 0 4 0V6h3a2 2 0 0 1 2 2v3h-3a2 2 0 1 0 0 4h3z" />
  },

  download: {
    viewBox: "0 0 24 24",
    path: (
      <>
        <path d="M12 3v12" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 11l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 19h18" />
      </>
    )
  },

  checkCircle: {
    viewBox: "0 0 24 24",
    path: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    )
  },

  xCircle: {
    viewBox: "0 0 24 24",
    path: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    )
  },

  play: {
    viewBox: "0 0 24 24",
    path: <path d="M6 4l12 8-12 8z" strokeLinecap="round" strokeLinejoin="round" />
  },

  folder: {
    viewBox: "0 0 24 24",
    path: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  },

  tool: {
    viewBox: "0 0 24 24",
    path: <path d="M14 6l4 4-6 6-4-4 6-6zM3 21l6-6" strokeLinecap="round" strokeLinejoin="round" />
  },

  cube: {
    viewBox: "0 0 24 24",
    path: <path d="M12 2l9 5v10l-9 5-9-5V7zM12 2v20M3 7l9 5 9-5" strokeLinecap="round" strokeLinejoin="round" />
  },

  github: {
    viewBox: "0 0 24 24",
    path: (
      <path d="M12 2a10 10 0 0 0-3 19.5c.5.1.7-.2.7-.5v-2c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5.1 0-1.1.4-2 1-2.7-.1-.3-.5-1.3.1-2.7 0 0 .8-.3 2.7 1a9 9 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .6 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 4-2.3 4.8-4.6 5.1.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />
    )
  },

  discord: {
    viewBox: "0 0 24 24",
    path: (
      <>
        <path d="M7.5 4.5c1.2-.4 2.5-.7 4-.7s2.8.3 4 .7l.5 1.8c1.1.3 2 .8 2.8 1.4-.7 4.7-3.5 7.5-7.3 7.5s-6.6-2.8-7.3-7.5c.8-.6 1.7-1.1 2.8-1.4l.5-1.8z" />
        <circle cx="9" cy="11" r="1" />
        <circle cx="15" cy="11" r="1" />
      </>
    )
  },

  modrinth: {
    viewBox: "0 0 24 24",
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 8h3v8H8zM13 8h3v5h-3z" />
      </>
    )
  },

  arrowRight: {
    viewBox: "0 0 24 24",
    path: <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  },

  chevronDown: {
    viewBox: "0 0 24 24",
    path: <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  },

  warning: {
    viewBox: "0 0 24 24",
    path: (
      <>
        <path d="M12 9v4M12 17h.01" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.3 4L2 20a2 2 0 0 0 2 3h16a2 2 0 0 0 2-3L13.7 4a2 2 0 0 0-3.4 0z" />
      </>
    )
  },

  check: {
    viewBox: "0 0 24 24",
    path: <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
  },

  x: {
    viewBox: "0 0 24 24",
    path: <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
  },

  battery: {
    viewBox: "0 0 24 24",
    path: (
      <>
        <rect x="2" y="7" width="16" height="10" rx="2" />
        <path d="M22 11v2" />
      </>
    )
  }
}

export default function Icon({ name, size = 20, className = "", strokeWidth = 1.75 }) {
  const icon = icons[name]
  if (!icon) return null

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={icon.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden="true"
    >
      {icon.path}
    </svg>
  )
}
