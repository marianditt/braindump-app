import { useEffect } from 'react'
import { EventHandlerBuilder } from '../components/key-event-handler'

export function useEditShortcut(callback: () => void): void {
  const eventHandler = new EventHandlerBuilder().onEdit(callback).build()

  const onKeyDown = (event: KeyboardEvent) => {
    eventHandler(event)
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  })
}

export function useCancelShortcut(callback: () => void): void {
  const eventHandler = new EventHandlerBuilder().onCancel(callback).build()

  function onKeyDown(event: KeyboardEvent): void {
    eventHandler(event)
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  })
}

export function useSaveShortcut(callback: () => void): void {
  const eventHandler = new EventHandlerBuilder().onSave(callback).build()

  function onKeyDown(event: KeyboardEvent): void {
    eventHandler(event)
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  })
}
