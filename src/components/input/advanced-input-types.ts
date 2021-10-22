export interface InputState {
  value: string
  start: number
  end: number
  direction: 'forward' | 'backward' | 'none'
}

export type InputEnhancer = (key: string, state: InputState) => InputState | null
