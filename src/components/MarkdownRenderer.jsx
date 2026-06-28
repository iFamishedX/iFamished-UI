import React from "react"

export default function MarkdownRenderer({ text }) {
  const lines = text.split("\n")
  const elements = []
  let i = 0

  function renderInline(str) {
    str = str.replace(/`([^`]+)`/g, "<code class='md-inline-code'>$1</code>")
    str = str.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    str = str.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, "$1<em>$2</em>")
    str = str.replace(/(^|[^_])_([^_]+)_(?!_)/g, "$1<em>$2</em>")
    str = str.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a href='$2' target='_blank'>$1</a>")
    return str
  }

  while (i < lines.length) {
    const raw = lines[i]
    const line = raw // DO NOT TRIM — indentation matters

    // -------------------------
    // CODE BLOCKS
    // -------------------------
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim()
      i++
      const code = []

      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        code.push(lines[i])
        i++
      }

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
    // NESTED LISTS (supports all bullet characters)
    // -------------------------
    if (/^([ \t]*)([-*•·‣▪–—])\s+/.test(raw)) {
      const items = []

      while (i < lines.length) {
        const m = lines[i].match(/^([ \t]*)([-*•·‣▪–—])\s+(.*)/)
        if (!m) break

        const indentSpaces = m[1].length
        const level = Math.floor(indentSpaces / 2)

        items.push({
          level,
          content: renderInline(m[3])
        })

        i++
      }

      function build(level) {
        const ul = []

        while (items.length > 0 && items[0].level === level) {
          const item = items.shift()

          const children = []
          while (items.length > 0 && items[0].level > level) {
            children.push(items.shift())
          }

          ul.push(
            <li className="md-li" key={ul.length}>
              <span dangerouslySetInnerHTML={{ __html: item.content }} />
              {children.length > 0 && (
                <ul className="md-ul">{build(level + 1)}</ul>
              )}
            </li>
          )
        }

        return ul
      }

      elements.push(
        <ul className="md-ul" key={elements.length}>
          {build(0)}
        </ul>
      )

      continue
    }

    // -------------------------
    // TABLES
    // -------------------------
    if (line.includes("|") && lines[i + 1]?.includes("|---")) {
      const header = line.split("|").map(c => c.trim()).filter(Boolean)
      i++
      i++

      const rows = []
      while (i < lines.length && lines[i].includes("|")) {
        rows.push(lines[i].split("|").map(c => c.trim()).filter(Boolean))
        i++
      }

      elements.push(
        <table className="md-table" key={elements.length}>
          <thead>
            <tr>
              {header.map((h, idx) => (
                <th key={idx}>{renderInline(h)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} dangerouslySetInnerHTML={{ __html: renderInline(cell) }} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )
      continue
    }

    // -------------------------
    // PARAGRAPHS (MUST BE LAST)
    // -------------------------
    if (line.trim().length > 0) {
      const buffer = [renderInline(line.trim())]
      i++

      while (i < lines.length && lines[i].trim().length > 0) {
        buffer.push(renderInline(lines[i].trim()))
        i++
      }

      elements.push(
        <p
          className="md-p"
          key={elements.length}
          dangerouslySetInnerHTML={{ __html: buffer.join(" ") }}
        />
      )
      continue
    }

    i++
  }

  return <div className="markdown-body">{elements}</div>
}
