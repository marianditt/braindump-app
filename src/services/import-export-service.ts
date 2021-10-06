import { RootState } from '../store/store'

export async function importState(file: File): Promise<RootState> {
  return new Promise<RootState>((resolve) => _importDumps(file, resolve))
}

function _importDumps(file: File, resolve: (result: RootState) => void): void {
  const reader = new FileReader()
  reader.onload = () => {
    const fileData: string = _decodeData(reader.result)
    const jsonData: any = JSON.parse(fileData)
    resolve(jsonData)
  }

  reader.readAsText(file)
}

function _decodeData(data: string | ArrayBuffer | null): string {
  if (data === null) {
    return ''
  }
  if (data instanceof ArrayBuffer) {
    return new TextDecoder().decode(data)
  }
  return data
}

export function exportState(state: RootState): void {
  const jsonData: string = JSON.stringify(state)
  const blob = new Blob([jsonData], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.download = 'braindump.json'
  link.href = url
  link.click()
}
