import { useState, useRef, useEffect } from "react"

export default function Dropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <div className="dropdown" ref={ref}>
      <button className="dropdown-trigger" onClick={() => setOpen(!open)}>
        <span>{label}: </span>
        <strong>{value}</strong>
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </button>

      {open && (
        <div className="dropdown-menu">
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
        </div>
      )}
    </div>
  )
}
