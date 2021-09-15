interface EventHandler {
  matcher: (event: KeyboardEvent) => boolean
  action: () => void
}

function isSaveEvent(event: KeyboardEvent) {
  return event.ctrlKey && event.key === 's'
}

function isCancelEvent(event: KeyboardEvent) {
  return event.key === 'Escape'
}

export class EventHandlerBuilder {
  constructor(private handlers: EventHandler[] = []) {}

  onSave(action: () => void): EventHandlerBuilder {
    this.handlers.push({
      matcher: isSaveEvent,
      action: action,
    })
    return this
  }

  onCancel(action: () => void): EventHandlerBuilder {
    this.handlers.push({
      matcher: isCancelEvent,
      action: action,
    })
    return this
  }

  build(): (event: KeyboardEvent) => void {
    return (event: KeyboardEvent) => {
      const handler: EventHandler[] = this.handlers.filter((h: EventHandler) => h.matcher(event))
      if (handler.length === 1) {
        handler[0].action()
        event.preventDefault()
      }
    }
  }
}
