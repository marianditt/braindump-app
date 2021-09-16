import React from 'react'
import { clusterLines, trimEmptyLines } from '../services/string-utils'
import { clamp } from '../services/math-utils'

export interface MarkdownParserOptions {
  headingOffset: number
}

const defaultOptions: MarkdownParserOptions = {
  headingOffset: 0,
}

export function parseMarkdown(text: string, options: MarkdownParserOptions = defaultOptions) {
  const gen = new IdGenerator()
  const textParser = (txt: string) => parseText(txt, gen)
  const paragraphParser = (txt: string) => parseParagraph(txt, gen, textParser)
  const headingParser = (txt: string) => parseHeading(txt, options.headingOffset, gen, paragraphParser)
  const preformattedParser = (txt: string) => parsePreformatted(txt, gen, headingParser)
  return preformattedParser(text)
}

type Parser = (text: string) => JSX.Element

class IdGenerator {
  constructor(private id: number = 0) {}

  next(): string {
    const id = ++this.id
    return `md-element-${id}`
  }
}

function parsePreformatted(text: string, gen: IdGenerator, nextParser: Parser): JSX.Element {
  function parsePart(part: string, index: number): JSX.Element {
    if (index % 2 === 0) {
      return nextParser(part)
    } else {
      const lines = part.split('\n')
      return <pre key={gen.next()}>{trimEmptyLines(lines)}</pre>
    }
  }

  const parts = text.split('```')
  const elements = parts.map(parsePart)
  return <>{elements}</>
}

function parseHeading(text: string, headingOffset: number, gen: IdGenerator, nextParser: Parser): JSX.Element {
  const lines: string[] = clusterLines(text.split('\n'), (line: string) => line[0] === '#').filter(
    (line: string) => line.trim().length > 0
  )

  const headingDepths = lines.map((line: string) => line.split('').findIndex((ch: string) => ch !== '#'))
  const elements = lines.map((line: string, index: number) => {
    const depth = headingDepths[index]
    if (depth > 0) {
      const Hx = `h${clamp(depth + headingOffset, 1, 6)}` as keyof JSX.IntrinsicElements
      return <Hx key={gen.next()}>{line.substr(depth + 1).trim()}</Hx>
    } else {
      return nextParser(line)
    }
  })

  return <React.Fragment key={gen.next()}>{elements}</React.Fragment>
}

function parseParagraph(text: string, gen: IdGenerator, nextParser: Parser): JSX.Element {
  const elements = text.split('\n\n').map((part: string) => <p key={gen.next()}>{nextParser(part)}</p>)
  return <React.Fragment key={gen.next()}>{elements}</React.Fragment>
}

function parseText(text: string, gen: IdGenerator): JSX.Element {
  return <React.Fragment key={gen.next()}>{text}</React.Fragment>
}
