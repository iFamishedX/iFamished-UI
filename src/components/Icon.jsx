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
      <g transform="translate(2,2) scale(0.83)">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </g>
    )
  },

  modrinth: {
    viewBox: "0 0 24 24",
    path: (
      <g transform="translate(1.5,1.5) scale(0.17)">
        <path d="M12.252 0.004a11.78 11.768 0 0 0 -8.92 3.73 11 10.999 0 0 0 -2.17 3.11 11.37 11.359 0 0 0 -1.16 5.169c0 1.42 0.17 2.5 0.6 3.77 0.24 0.759 0.77 1.899 1.17 2.529a12.3 12.298 0 0 0 8.85 5.639c0.44 0.05 2.54 0.07 2.76 0.02 0.2 -0.04 0.22 0.1 -0.26 -1.7l-0.36 -1.37 -1.01 -0.06a8.5 8.489 0 0 1 -5.18 -1.8 5.34 5.34 0 0 1 -1.3 -1.26c0 -0.05 0.34 -0.28 0.74 -0.5a37.572 37.545 0 0 1 2.88 -1.629c0.03 0 0.5 0.45 1.06 0.98l1 0.97 2.07 -0.43 2.06 -0.43 1.47 -1.47c0.8 -0.8 1.48 -1.5 1.48 -1.52 0 -0.09 -0.42 -1.63 -0.46 -1.7 -0.04 -0.06 -0.2 -0.03 -1.02 0.18 -0.53 0.13 -1.2 0.3 -1.45 0.4l-0.48 0.15 -0.53 0.53 -0.53 0.53 -0.93 0.1 -0.93 0.07 -0.52 -0.5a2.7 2.7 0 0 1 -0.96 -1.7l-0.13 -0.6 0.43 -0.57c0.68 -0.9 0.68 -0.9 1.46 -1.1 0.4 -0.1 0.65 -0.2 0.83 -0.33 0.13 -0.099 0.65 -0.579 1.14 -1.069l0.9 -0.9 -0.7 -0.7 -0.7 -0.7 -1.95 0.54c-1.07 0.3 -1.96 0.53 -1.97 0.53 -0.03 0 -2.23 2.48 -2.63 2.97l-0.29 0.35 0.28 1.03c0.16 0.56 0.3 1.16 0.31 1.34l0.03 0.3 -0.34 0.23c-0.37 0.23 -2.22 1.3 -2.84 1.63 -0.36 0.2 -0.37 0.2 -0.44 0.1 -0.08 -0.1 -0.23 -0.6 -0.32 -1.03 -0.18 -0.86 -0.17 -2.75 0.02 -3.73a8.84 8.839 0 0 1 7.9 -6.93c0.43 -0.03 0.77 -0.08 0.78 -0.1 0.06 -0.17 0.5 -2.999 0.47 -3.039 -0.01 -0.02 -0.1 -0.02 -0.2 -0.03Zm3.68 0.67c-0.2 0 -0.3 0.1 -0.37 0.38 -0.06 0.23 -0.46 2.42 -0.46 2.52 0 0.04 0.1 0.11 0.22 0.16a8.51 8.499 0 0 1 2.99 2 8.38 8.379 0 0 1 2.16 3.449 6.9 6.9 0 0 1 0.4 2.8c0 1.07 0 1.27 -0.1 1.73a9.37 9.369 0 0 1 -1.76 3.769c-0.32 0.4 -0.98 1.06 -1.37 1.38 -0.38 0.32 -1.54 1.1 -1.7 1.14 -0.1 0.03 -0.1 0.06 -0.07 0.26 0.03 0.18 0.64 2.56 0.7 2.78l0.06 0.06a12.07 12.058 0 0 0 7.27 -9.4c0.13 -0.77 0.13 -2.58 0 -3.4a11.96 11.948 0 0 0 -5.73 -8.578c-0.7 -0.42 -2.05 -1.06 -2.25 -1.06Z"/>
      </g>
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
