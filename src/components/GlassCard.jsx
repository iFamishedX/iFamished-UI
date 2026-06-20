export default function GlassCard({
  children,
  className = "",
  variant = "",
  as: Tag = "div",
  ...props
}) {
  const variantClass = variant ? `glass-card glass-card--${variant}` : "glass-card"
  const combined = className ? `${variantClass} ${className}` : variantClass

  return (
    <Tag className={combined} {...props}>
      {children}
    </Tag>
  )
}
