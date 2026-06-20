const socials = [
  { label: "GitHub", href: "https://github.com/iFamishedX" },
  { label: "Modrinth", href: "https://modrinth.com/user/iFamished" },
  { label: "Discord", href: "https://discord.com/users/iFamished" },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <span className="footer-brand">
            <span className="gradient-text">iFamished</span>
          </span>
          <div className="footer-social">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} iFamished. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
