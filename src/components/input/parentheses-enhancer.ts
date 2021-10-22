import { InputState } from './advanced-input-types'

const pairs = [
  ['(', ')'],
  ['[', ']'],
  ['{', '}'],
  ['<', '>'],
  ['"', '"'],
  ["'", "'"],
]

export function openParentheses(key: string, state: InputState): InputState | null {
  const pair = pairs.find((pair) => pair[0] === key) || null
  if (pair === null) {
    return null
  }

  const [prefix, selection, suffix] = split(state.value, state.start, state.end)
  return {
    value: prefix + pair[0] + selection + pair[1] + suffix,
    start: prefix.length + 1,
    end: prefix.length + 1 + selection.length,
    direction: state.direction,
  }
}

export function closeParentheses(key: string, state: InputState): InputState | null {
  const ch = state.value[state.start]
  if (key !== ch || state.start !== state.end) {
    return null
  }

  const isClosing = pairs.some((pair) => pair[1] === ch)
  if (!isClosing) {
    return null
  }

  return {
    value: state.value,
    start: state.start + 1,
    end: state.end + 1,
    direction: state.direction,
  }
}

export function removeParentheses(key: string, state: InputState): InputState | null {
  if (key !== 'Backspace' || state.start !== state.end) {
    return null
  }

  const [prefix, pairAtCursor, suffix] = split(state.value, state.start - 1, state.start + 1)
  const isPair = pairs.some((pair) => pair[0] === pairAtCursor[0] && pair[1] === pairAtCursor[1])
  if (!isPair) {
    return null
  }

  return {
    value: prefix + suffix,
    start: prefix.length,
    end: prefix.length,
    direction: state.direction,
  }
}

function split(value: string, start: number, end: number): [string, string, string] {
  return [value.slice(0, start), value.slice(start, end), value.slice(end)]
}
