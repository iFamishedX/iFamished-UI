import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"

const ANIMATION_DURATION = 150 // ms

export default function Dropdown({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false)        // visual state (for CSS)
  const [mounted, setMounted] = useState(false)  // portal mount
  const triggerRef = useRef(null)
  const menuRef = useRef(null)

  const [typed, setTyped] = useState("")
  const typedTimeout = useRef(null)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const [menuStyle, setMenuStyle] = useState({})

  function showMenu() {
    if (!mounted) setMounted(true)
    requestAnimationFrame(() => setOpen(true))
  }

  function hideMenu() {
    setOpen(false)
    setTimeout(() => setMounted(false), ANIMATION_DURATION)
  }

  useEffect(() => {
    function handleClick(e) {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target) &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        hideMenu()
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  useEffect(() => {
    if (!mounted || !triggerRef.current) return

    const rect = triggerRef.current.getBoundingClientRect()
    const base = {
      position: "absolute",
      left: rect.left + "px",
      width: "220px",
      zIndex: 999999999,
    }

    let style = {
      ...base,
      top: rect.bottom + 6 + "px",
    }
    setMenuStyle(style)

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
      }
    })
  }, [mounted])

  function formatLabel(opt) {
    if (!opt) return "All"
    return opt.charAt(0).toUpperCase() + opt.slice(1)
  }

  function handleType(e) {
    const char = e.key.length === 1 ? e.key : null
    if (!char) return

    const next = (typed + char).toLowerCase()
    setTyped(next)

    clearTimeout(typedTimeout.current)
    typedTimeout.current = setTimeout(() => setTyped(""), 1500)

    const lower = options.map(o => o.toLowerCase())

    let idx = lower.findIndex(o => o === next)
    if (idx === -1) {
      idx = lower.findIndex(o => o.startsWith(next))
    }
    if (idx !== -1) {
      setHighlightedIndex(idx)
      onChange(options[idx])
    }
  }

  function handleKeyDown(e) {
    if (!mounted && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      showMenu()
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
      onChange(opt)
      hideMenu()
    } else if (e.key === "Escape") {
      e.preventDefault()
      hideMenu()
    } else {
      handleType(e)
    }
  }

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
          if (mounted && open) {
            hideMenu()
          } else {
            showMenu()
          }
          triggerRef.current?.focus()
        }}
        onKeyDown={handleKeyDown}
        type="button"
      >
        <span>{label}:</span>
        <span className="dropdown-trigger-value">
          {formatLabel(value)}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </button>

      {mounted &&
        createPortal(
          <div
            className={
              "dropdown-menu" + (open ? " dropdown-menu--open" : "")
            }
            ref={menuRef}
            style={menuStyle}
          >
            {options.map((opt, idx) => (
              <div
                key={opt}
                className={
                  "dropdown-item" +
                  (opt === value ? " active" : "") +
                  (idx === highlightedIndex ? " highlighted" : "")
                }
                onMouseEnter={() => setHighlightedIndex(idx)}
                onClick={() => {
                  onChange(opt)
                  hideMenu()
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
