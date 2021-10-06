import { v4 as uuid4 } from 'uuid'
import { Dump } from '../types/dump-types'

export function createDump(id: string | null, summary: string, description: string): Dump {
  return {
    id: id || uuid4(),
    timestamp: Date.now(),
    summary: summary.trim(),
    description: description,
    tags: [],
  }
}
