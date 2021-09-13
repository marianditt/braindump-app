import { Dump } from '../store/dumps'
import { v4 as uuid4 } from 'uuid'

export function createDump(id: string | null, summary: string, description: string): Dump {
  return {
    id: id || uuid4(),
    timestamp: Date.now(),
    summary: summary,
    description: description,
    tags: [],
  }
}
