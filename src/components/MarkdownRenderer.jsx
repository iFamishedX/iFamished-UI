export default function MarkdownRenderer({ text }) {
  const lines = text.split("\n")

  const elements = []
  let buffer = []
  let inCode = false
  let codeLang = ""
  let codeBuffer = []

  function flushParagraph() {
    if (buffer.length > 0) {
      elements.push(
        <p className="md-p" key={elements.length}>
          {buffer.join(" ")}
        </p>
      )
      buffer = []
    }
  }

  for (let raw of lines) {
    const line = raw.trim()

    // Code block start/end
    if (line.startsWith("```")) {
      if (!inCode) {
        inCode = true
        codeLang = line.replace("```", "").trim()
        codeBuffer = []
      } else {
        inCode = false
        elements.push(
          <pre className="md-pre" key={elements.length}>
            <code className={`lang-${codeLang}`}>{codeBuffer.join("\n")}</code>
          </pre>
        )
      }
      continue
    }

    if (inCode) {
      codeBuffer.push(raw)
      continue
    }

    // Headings
    if (line.startsWith("# ")) {
      flushParagraph()
      elements.push(<h1 className="md-h1" key={elements.length}>{line.slice(2)}</h1>)
      continue
    }
    if (line.startsWith("## ")) {
      flushParagraph()
      elements.push(<h2 className="md-h2" key={elements.length}>{line.slice(3)}</h2>)
      continue
    }
    if (line.startsWith("### ")) {
      flushParagraph()
      elements.push(<h3 className="md-h3" key={elements.length}>{line.slice(4)}</h3>)
      continue
    }

    // Bulleted list
    if (line.startsWith("- ") || line.startsWith("* ")) {
      flushParagraph()
      const items = []
      let i = lines.indexOf(raw)
      while (i < lines.length && (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))) {
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

    // Horizontal rule
    if (line === "---") {
      flushParagraph()
      elements.push(<hr className="md-hr" key={elements.length} />)
      continue
    }

    // Normal paragraph text
    if (line.length > 0) {
      buffer.push(line)
    } else {
      flushParagraph()
    }
  }

  flushParagraph()

  return <div className="markdown-body">{elements}</div>
}
