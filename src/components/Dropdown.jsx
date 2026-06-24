import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"

export default function Dropdown({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const menuRef = useRef(null)

  // Close on outside click
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

  // Position menu under trigger
  const [menuStyle, setMenuStyle] = useState({})
  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setMenuStyle({
        position: "absolute",
        top: rect.bottom + 6 + "px",
        left: rect.left + "px",
        width: rect.width + "px",
        zIndex: 999999999,
      })
    }
  }, [open])

  return (
    <>
      <button
        className="dropdown-trigger"
        ref={triggerRef}
        onClick={() => setOpen(!open)}
      >
        <span>{label}: </span>
        <strong>{value}</strong>
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
              >
                {opt}
              </div>
            ))}
          </div>,
          document.body
        )}
    </>
  )
}
