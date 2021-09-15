import React from 'react'

export function parseMarkdown(text: string) {
  const gen = new IdGenerator()

  const textParser = (txt: string) => parseText(txt, gen)
  const paragraphParser = (txt: string) => parseParagraph(txt, gen, textParser)
  return parsePreformatted(text, gen, paragraphParser)
}

type Parser = (text: string) => JSX.Element

class IdGenerator {
  constructor(private id: number = 0) {}

  next(): string {
    const id = ++this.id
    return `md-element-${id}`
  }
}

function trimEmptyLines(text: string): string {
  const lines = text.split('\n')
  const emptyFlags = lines.map((line: string) => line.trim().length === 0)

  const first = emptyFlags.indexOf(false)
  const last = emptyFlags.lastIndexOf(false)

  return lines.slice(first, last + 1).join('\n')
}

function parsePreformatted(text: string, gen: IdGenerator, nextParser: Parser) {
  function parsePart(part: string, index: number): JSX.Element {
    if (index % 2 === 0) {
      return nextParser(part)
    } else {
      return <pre key={gen.next()}>{trimEmptyLines(part)}</pre>
    }
  }

  const parts = text.split('```')
  const elements = parts.map(parsePart)
  return <>{elements}</>
}

function parseParagraph(text: string, gen: IdGenerator, nextParser: Parser): JSX.Element {
  const elements = text.split('\n\n').map((part: string) => <p key={gen.next()}>{nextParser(part)}</p>)
  return <React.Fragment key={gen.next()}>{elements}</React.Fragment>
}

function parseText(text: string, gen: IdGenerator): JSX.Element {
  return <React.Fragment key={gen.next()}>{text}</React.Fragment>
}
