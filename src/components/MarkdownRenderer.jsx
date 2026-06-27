import React from "react"

export default function MarkdownRenderer({ text }) {
  const lines = text.split("\n")
  const elements = []
  let i = 0

  function renderInline(str) {
    // Inline code: `code`
    str = str.replace(/`([^`]+)`/g, "<code class='md-inline-code'>$1</code>")

    // Bold: **text**
    str = str.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")

    // Italic: *text* (single asterisk, not bold)
    str = str.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, "$1<em>$2</em>")

    // Italic: _text_ (single underscore only)
    str = str.replace(/(^|[^_])_([^_]+)_(?!_)/g, "$1<em>$2</em>")

    // Links: [text](url)
    str = str.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a href='$2' target='_blank'>$1</a>")

    return str
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

      i++ // skip closing ```

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
    // NESTED LISTS (supports up to 3 levels)
    // -------------------------
    if (/^(\s*)([-*])\s+/.test(raw)) {
      const listItems = []
      const baseIndent = raw.match(/^(\s*)/)[1].length

      while (i < lines.length) {
        const m = lines[i].match(/^(\s*)([-*])\s+(.*)/)
        if (!m) break

        const indent = m[1].length
        const content = renderInline(m[3])

        if (indent < baseIndent) break

        listItems.push({ indent, content })
        i++
      }

      // Build nested structure
      function buildList(items, level = 0) {
        const ul = []

        while (items.length > 0) {
          const item = items[0]

          if (item.indent !== level) break

          items.shift()

          // Check for nested items
          const nested = []
          while (items.length > 0 && items[0].indent > level) {
            nested.push(items.shift())
          }

          ul.push(
            <li className="md-li" key={ul.length}>
              <span dangerouslySetInnerHTML={{ __html: item.content }} />
              {nested.length > 0 && (
                <ul className="md-ul">{buildList(nested, level + 2)}</ul>
              )}
            </li>
          )
        }

        return ul
      }

      elements.push(
        <ul className="md-ul" key={elements.length}>
          {buildList(listItems)}
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
      i++ // skip separator row

      const rows = []
      while (i < lines.length && lines[i].includes("|")) {
        rows.push(
          lines[i].split("|").map(c => c.trim()).filter(Boolean)
        )
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
    // PARAGRAPHS
    // -------------------------
    if (line.length > 0) {
      const buffer = [renderInline(line)]
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
