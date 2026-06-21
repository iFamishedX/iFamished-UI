import { useState, useRef, useEffect } from "react"
import { NavLink, Link, useLocation } from "react-router-dom"

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const underlineRef = useRef(null)
  const location = useLocation()

  const toggleMenu = () => setOpen((v) => !v)
  const closeMenu = () => setOpen(false)

  // Move underline on route change
  useEffect(() => {
    const active = document.querySelector(".navbar-link.active")
    const underline = underlineRef.current

    if (active && underline) {
      const rect = active.getBoundingClientRect()
      const parentRect = active.parentElement.parentElement.getBoundingClientRect()

      underline.style.width = `${rect.width}px`
      underline.style.transform = `translateX(${rect.left - parentRect.left}px)`
      underline.style.opacity = 1
    }
  }, [location.pathname])

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <span className="brand-dot" aria-hidden="true" />
          iFamished
        </Link>

        <button
          type="button"
          className={`navbar-toggle ${open ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`navbar-links ${open ? "open" : ""}`}>
          {/* Sliding underline */}
          <span className="navbar-underline" ref={underlineRef} />

          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `navbar-link ${isActive ? "active" : ""}`
                }
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
