import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"

const ANIMATION_DURATION = 150 // ms

export default function Dropdown({ label, value, options, onChange }) {
  const [isOpen, setIsOpen] = useState(false)      // controls animation state
  const [isMounted, setIsMounted] = useState(false) // controls portal mount
  const triggerRef = useRef(null)
  const menuRef = useRef(null)

  const [typed, setTyped] = useState("")
  const typedTimeout = useRef(null)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const [menuStyle, setMenuStyle] = useState({})

  // --- OPEN / CLOSE HELPERS ---
  function openDropdown() {
    if (isMounted) {
      setIsOpen(true)
      return
    }
    setIsMounted(true)
    setIsOpen(true)
  }

  function closeDropdown() {
    setIsOpen(false)
    setTimeout(() => {
      setIsMounted(false)
    }, ANIMATION_DURATION)
  }

  // --- CLOSE ON OUTSIDE CLICK ---
  useEffect(() => {
    function handleClick(e) {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target) &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        closeDropdown()
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  // --- POSITION + AUTO-FLIP ---
  useEffect(() => {
    if (!isMounted || !triggerRef.current) return

    const rect = triggerRef.current.getBoundingClientRect()
    const base = {
      position: "absolute",
      left: rect.left + "px",
      width: "220px",
      zIndex: 999999999,
    }

    // initial bottom placement
    let style = {
      ...base,
      top: rect.bottom + 6 + "px",
    }
    setMenuStyle(style)

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
      }
    })
  }, [isMounted])

  // --- FORMAT LABEL ---
  function formatLabel(opt) {
    if (!opt) return "All"
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
      onChange(options[idx])
    }
  }

  // --- ARROW KEY NAVIGATION ---
  function handleKeyDown(e) {
    if (!isMounted && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      openDropdown()
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
      closeDropdown()
    } else if (e.key === "Escape") {
      e.preventDefault()
      closeDropdown()
    } else {
      handleType(e)
    }
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

  return (
    <>
      <button
        className="dropdown-trigger"
        ref={triggerRef}
        onClick={() => {
          if (isMounted && isOpen) {
            closeDropdown()
          } else {
            openDropdown()
          }
          triggerRef.current?.focus()
        }}
        onKeyDown={handleKeyDown}
        type="button"
      >
        <span>{label}: </span>
        <strong>{formatLabel(value)}</strong>
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </button>

      {isMounted &&
        createPortal(
          <div
            className={
              "dropdown-menu" + (isOpen ? " dropdown-menu--open" : "")
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
                  closeDropdown()
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
