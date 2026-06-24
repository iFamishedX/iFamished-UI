import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"

export default function Dropdown({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const menuRef = useRef(null)

  // --- TYPEAHEAD STATE ---
  const [typed, setTyped] = useState("")
  const typedTimeout = useRef(null)

  // --- CLOSE ON OUTSIDE CLICK ---
  useEffect(() => {
    function handleClick(e) {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target) &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  // --- POSITION MENU UNDER TRIGGER ---
  const [menuStyle, setMenuStyle] = useState({})
  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setMenuStyle({
        position: "absolute",
        top: rect.bottom + 6 + "px",
        left: rect.left + "px",
        width: "220px", // fixed width
        zIndex: 999999999,
      })
    }
  }, [open])

  // --- TYPEAHEAD HANDLER ---
  function handleType(e) {
    const char = e.key.length === 1 ? e.key : null
    if (!char) return

    const next = typed + char.toLowerCase()
    setTyped(next)

    clearTimeout(typedTimeout.current)
    typedTimeout.current = setTimeout(() => setTyped(""), 1500)

    const match = options.find(opt =>
      opt.toLowerCase().startsWith(next)
    )
    if (match) onChange(match)
  }

  // --- CAPITALIZE LABELS ---
  function formatLabel(opt) {
    return opt.charAt(0).toUpperCase() + opt.slice(1)
  }

  // --- HIGHLIGHT MATCH ---
  function highlight(opt) {
    const label = formatLabel(opt)
    if (!typed) return label

    return label.replace(
      new RegExp(`^(${typed})`, "i"),
      `<strong style="color: var(--neon-cyan)">$1</strong>`
    )
  }

  return (
    <>
      <button
        className="dropdown-trigger"
        ref={triggerRef}
        onClick={() => {
          setOpen(!open)
          triggerRef.current?.focus() // ensures typeahead works
        }}
        onKeyDown={handleType}
      >
        <span>{label}: </span>
        <strong>{formatLabel(value)}</strong>
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </button>

      {open &&
        createPortal(
          <div className="dropdown-menu" ref={menuRef} style={menuStyle}>
            {options.map(opt => (
              <div
                key={opt}
                className={`dropdown-item ${opt === value ? "active" : ""}`}
                onClick={() => {
                  onChange(opt)
                  setOpen(false)
                }}
                dangerouslySetInnerHTML={{ __html: highlight(opt) }}
              />
            ))}
          </div>,
          document.body
        )}
    </>
  )
}
