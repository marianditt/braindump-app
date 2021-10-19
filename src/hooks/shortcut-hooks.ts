import { useEffect } from 'react'

export function useEditShortcut(callback: () => void): void {
  useKeyListener(isEditEvent, callback)

  function isEditEvent(event: KeyboardEvent): boolean {
    return event.key === 'e'
  }
}

export function useCancelShortcut(callback: () => void): void {
  useKeyListener(isCancelEvent, callback)

  function isCancelEvent(event: KeyboardEvent): boolean {
    return event.key === 'Escape'
  }
}

export function useSaveShortcut(callback: () => void): void {
  useKeyListener(isSaveEvent, callback)

  function isSaveEvent(event: KeyboardEvent): boolean {
    return event.ctrlKey && event.key === 's'
  }
}

function useKeyListener(matches: (event: KeyboardEvent) => boolean, callback: () => void): void {
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  })

  function onKeyDown(event: KeyboardEvent): void {
    if (matches(event)) {
      callback()
      event.preventDefault()
    }
  }
}
