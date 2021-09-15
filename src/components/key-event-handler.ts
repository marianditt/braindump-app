interface EventHandler {
  matcher: (event: KeyboardEvent) => boolean
  action: () => void
}

function isEditEvent(event: KeyboardEvent): boolean {
  return event.key === 'e'
}

function isSaveEvent(event: KeyboardEvent): boolean {
  return event.ctrlKey && event.key === 's'
}

function isCancelEvent(event: KeyboardEvent): boolean {
  return event.key === 'Escape'
}

export class EventHandlerBuilder {
  constructor(private handlers: EventHandler[] = []) {}

  onEdit(action: () => void): EventHandlerBuilder {
    this.handlers.push({
      matcher: isEditEvent,
      action: action,
    })
    return this
  }

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
