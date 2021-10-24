import { InputState } from './advanced-input-types'

const pairs = createPairs()
const invPairs = invertPairs(pairs)

function createPairs(): Map<string, string> {
  const map = new Map<string, string>()
  map.set('(', ')')
  map.set('[', ']')
  map.set('{', '}')
  map.set('<', '>')
  map.set('"', '"')
  map.set("'", "'")
  return map
}

function invertPairs(map: Map<string, string>): Map<string, string> {
  const invMap = new Map<string, string>()
  map.forEach((value, key) => invMap.set(value, key))
  return invMap
}

export function openParentheses(key: string, state: InputState): InputState | null {
  const value = pairs.get(key) || null
  if (value === null) {
    return null
  }

  const [prefix, selection, suffix] = split(state.value, state.start, state.end)
  return {
    value: prefix + key + selection + value + suffix,
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

  const isClosing = !!invPairs.get(ch)
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
  const isPair = !!pairs.get(pairAtCursor[0]) && !!invPairs.get(pairAtCursor[1])
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
