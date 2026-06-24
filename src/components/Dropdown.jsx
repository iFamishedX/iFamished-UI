import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"

export default function Dropdown({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const menuRef = useRef(null)

  const isMulti = Array.isArray(value)

  // --- STATE ---
  const [typed, setTyped] = useState("")
  const typedTimeout = useRef(null)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const [menuStyle, setMenuStyle] = useState({})

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

  // --- POSITION + AUTO-FLIP ---
  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const base = {
        position: "absolute",
        left: rect.left + "px",
        width: "220px", // static width
        zIndex: 999999999,
      }

      // initial bottom placement
      let style = {
        ...base,
        top: rect.bottom + 6 + "px",
      }

      // after first paint, check if we need to flip
      requestAnimationFrame(() => {
        if (!menuRef.current) return
        const menuRect = menuRef.current.getBoundingClientRect()
        const overflowBottom = menuRect.bottom > window.innerHeight
        if (overflowBottom) {
          style = {
            ...base,
            top: rect.top - menuRect.height - 6 + "px",
          }
          setMenuStyle(style)
        } else {
          setMenuStyle(style)
        }
      })

      setMenuStyle(style)
    }
  }, [open])

  // --- FORMAT LABEL ---
  function formatLabel(opt) {
    if (opt == null) return ""
    return opt.charAt(0).toUpperCase() + opt.slice(1)
  }

  // --- TYPEAHEAD (EXACT MATCH PRIORITY) ---
  function handleType(e) {
    const char = e.key.length === 1 ? e.key : null
    if (!char) return

    const next = (typed + char).toLowerCase()
    setTyped(next)

    clearTimeout(typedTimeout.current)
    typedTimeout.current = setTimeout(() => setTyped(""), 1500)

    const lower = options.map(o => o.toLowerCase())

    // exact match first
    let idx = lower.findIndex(o => o === next)
    if (idx === -1) {
      // then prefix match
      idx = lower.findIndex(o => o.startsWith(next))
    }
    if (idx !== -1) {
      setHighlightedIndex(idx)
      if (!isMulti) {
        onChange(options[idx])
      }
    }
  }

  // --- ARROW KEY NAVIGATION ---
  function handleKeyDown(e) {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true)
      return
    }

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlightedIndex(i => (i + 1) % options.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightedIndex(i => (i - 1 + options.length) % options.length)
    } else if (e.key === "Enter") {
      e.preventDefault()
      const opt = options[highlightedIndex]
      if (!opt) return
      if (isMulti) {
        toggleMulti(opt)
      } else {
        onChange(opt)
        setOpen(false)
      }
    } else if (e.key === "Escape") {
      e.preventDefault()
      setOpen(false)
    } else {
      handleType(e)
    }
  }

  // --- MULTI-SELECT TOGGLE ---
  function toggleMulti(opt) {
    const current = Array.isArray(value) ? value : []
    const exists = current.includes(opt)
    const next = exists
      ? current.filter(v => v !== opt)
      : [...current, opt]
    onChange(next)
  }

  // --- HIGHLIGHT TYPED PREFIX ---
  function highlight(opt) {
    const label = formatLabel(opt)
    if (!typed) return label
    return label.replace(
      new RegExp(`^(${typed})`, "i"),
      `<strong style="color: var(--neon-cyan)">$1</strong>`
    )
  }

  // --- TRIGGER LABEL (SINGLE VS MULTI) ---
  function renderTriggerValue() {
    if (isMulti) {
      const arr = value || []
      if (!arr.length) return "All"
      if (arr.length === 1) return formatLabel(arr[0])
      return `${arr.length} selected`
    }
    return formatLabel(value)
  }

  return (
    <>
      <button
        className="dropdown-trigger"
        ref={triggerRef}
        onClick={() => {
          setOpen(o => !o)
          triggerRef.current?.focus()
        }}
        onKeyDown={handleKeyDown}
        type="button"
      >
        <span>{label}: </span>
        <strong>{renderTriggerValue()}</strong>
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </button>

      {open &&
        createPortal(
          <div
            className="dropdown-menu dropdown-menu--open"
            ref={menuRef}
            style={menuStyle}
          >
            {options.map((opt, idx) => {
              const active = isMulti
                ? Array.isArray(value) && value.includes(opt)
                : opt === value

              return (
                <div
                  key={opt}
                  className={
                    "dropdown-item" +
                    (active ? " active" : "") +
                    (idx === highlightedIndex ? " highlighted" : "")
                  }
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  onClick={() => {
                    if (isMulti) {
                      toggleMulti(opt)
                    } else {
                      onChange(opt)
                      setOpen(false)
                    }
                  }}
                  dangerouslySetInnerHTML={{ __html: highlight(opt) }}
                />
              )
            })}
          </div>,
          document.body
        )}
    </>
  )
}
