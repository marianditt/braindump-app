export type SearchHash = string[]

export function createSearchHash(...values: string[]): SearchHash {
  type StringSet = { [value: string]: any }

  return Object.keys(
    values
      .map((value: string) => value.replace("'", ''))
      .map((value: string) => value.toLowerCase())
      .flatMap((value: string) => value.split(/[^a-z0-9]/))
      .filter((value: string) => value.length > 0)
      .reduce((set: StringSet, value: string) => {
        set[value] = true
        return set
      }, {})
  )
}

export function scoreSearchable(content: SearchHash, keywords: SearchHash): number {
  const searchableContent = content.join(';')
  return keywords.filter((kw: string) => searchableContent.includes(kw)).length
}
