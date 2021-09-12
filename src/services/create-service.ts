import { Dump } from '../store/dumps'
import { v4 as uuid4 } from 'uuid'

export function createDump(summary: string, description: string): Dump {
  return {
    id: uuid4(),
    timestamp: new Date(Date.now()),
    summary: summary,
    description: description,
    tags: [],
  }
}
