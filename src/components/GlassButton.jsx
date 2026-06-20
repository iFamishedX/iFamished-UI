import { Link } from "react-router-dom"

export default function GlassButton({
  children,
  variant = "default",
  size = "md",
  to,
  href,
  icon,
  block = false,
  className = "",
  ...props
}) {
  const classes = [
    "glass-btn",
    variant !== "default" ? `glass-btn--${variant}` : "",
    size !== "md" ? `glass-btn--${size}` : "",
    block ? "glass-btn--block" : "",
    icon ? "glass-btn--icon" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
