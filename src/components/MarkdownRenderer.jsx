export default function MarkdownRenderer({ text }) {
  const lines = text.split("\n")

  const elements = []
  let i = 0

  function pushParagraph(buffer) {
    if (buffer.length > 0) {
      elements.push(
        <p className="md-p" key={elements.length}>
          {buffer.join(" ")}
        </p>
      )
    }
  }

  while (i < lines.length) {
    const raw = lines[i]
    const line = raw.trim()

    // -------------------------
    // CODE BLOCKS (```lang)
    // -------------------------
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim()
      i++
      const code = []

      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        code.push(lines[i])
        i++
      }

      // Skip closing ```
      i++

      elements.push(
        <pre className="md-pre" key={elements.length}>
          <code className={`lang-${lang}`}>{code.join("\n")}</code>
        </pre>
      )
      continue
    }

    // -------------------------
    // HEADINGS
    // -------------------------
    if (line.startsWith("# ")) {
      elements.push(<h1 className="md-h1" key={elements.length}>{line.slice(2)}</h1>)
      i++
      continue
    }
    if (line.startsWith("## ")) {
      elements.push(<h2 className="md-h2" key={elements.length}>{line.slice(3)}</h2>)
      i++
      continue
    }
    if (line.startsWith("### ")) {
      elements.push(<h3 className="md-h3" key={elements.length}>{line.slice(4)}</h3>)
      i++
      continue
    }

    // -------------------------
    // BULLETED LISTS
    // -------------------------
    if (line.startsWith("- ") || line.startsWith("* ")) {
      const items = []

      while (
        i < lines.length &&
        (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))
      ) {
        items.push(lines[i].trim().slice(2))
        i++
      }

      elements.push(
        <ul className="md-ul" key={elements.length}>
          {items.map((item, idx) => (
            <li className="md-li" key={idx}>{item}</li>
          ))}
        </ul>
      )
      continue
    }

    // -------------------------
    // HORIZONTAL RULE
    // -------------------------
    if (line === "---") {
      elements.push(<hr className="md-hr" key={elements.length} />)
      i++
      continue
    }

    // -------------------------
    // PARAGRAPHS
    // -------------------------
    if (line.length > 0) {
      const buffer = [line]
      i++

      while (i < lines.length && lines[i].trim().length > 0) {
        buffer.push(lines[i].trim())
        i++
      }

      pushParagraph(buffer)
      continue
    }

    // Blank line → skip
    i++
  }

  return <div className="markdown-body">{elements}</div>
}
