export function trimEmptyLines(lines: string[]): string {
  const emptyFlags = lines.map((line: string) => line.trim().length === 0)

  const first = emptyFlags.indexOf(false)
  const last = emptyFlags.lastIndexOf(false)

  return lines.slice(first, last + 1).join('\n')
}

/**
 * Merges consecutive lines for which the predicate is false.
 *
 * @param lines
 * @param predicate
 */
export function clusterLines(lines: string[], predicate: (line: string) => boolean): string[] {
  const clusters: string[][] = lines.reduce(
    (prev: string[][], line: string) => {
      if (predicate(line)) {
        prev.push([line])
        prev.push([])
      } else {
        prev[prev.length - 1].push(line)
      }
      return prev
    },
    [[]]
  )
  return clusters.filter((cluster: string[]) => cluster.length > 0).map((cluster: string[]) => cluster.join('\n'))
}
