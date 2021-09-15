import React from 'react'

export function parseMarkdown(text: string) {
  const gen = new IdGenerator()
  return parseParagraphs(text, gen, (x1: string) => parseLinebreak(x1, gen, (x2: string) => parseText(x2, gen)))
}

type Parser = (text: string) => JSX.Element

class IdGenerator {
  constructor(private id: number = 0) {}

  next(): string {
    const id = ++this.id
    return `md-element-${id}`
  }
}

function parseParagraphs(text: string, gen: IdGenerator, nextParser: Parser): JSX.Element {
  const elements = text.split('\n\n').map((part: string) => <p key={gen.next()}>{nextParser(part)}</p>)
  return <React.Fragment key={gen.next()}>{elements}</React.Fragment>
}

function parseLinebreak(text: string, gen: IdGenerator, nextParser: Parser): JSX.Element {
  const elements = text.split('\n').map((part: string) => (
    <React.Fragment key={gen.next()}>
      {nextParser(part)}
      <br key={gen.next()} />
    </React.Fragment>
  ))
  return <React.Fragment key={gen.next()}>{elements}</React.Fragment>
}

function parseText(text: string, gen: IdGenerator): JSX.Element {
  return <React.Fragment key={gen.next()}>{text}</React.Fragment>
}
