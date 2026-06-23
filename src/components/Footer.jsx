export default function Footer({
  brand = "Site",
  socials = [],
  footerNote = "",
}) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <span className="footer-brand">
            <span className="gradient-text">{brand}</span>
          </span>

          <div className="footer-social">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <p className="footer-copy">{footerNote}</p>
      </div>
    </footer>
  )
}
