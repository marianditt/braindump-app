import { useHistory } from 'react-router-dom'
import { Dump } from '../types/dump-types'
import { useCallback } from 'react'

export interface DumpRouteParam {
  dumpId: string
}

export interface Navigation {
  navigateHome: () => void
  navigateToDetails: (dump: Dump) => void
  navigateToEdit: (dump: Dump) => void
  navigateToCreate: () => void
}

export function useNavigation(): Navigation {
  const history = useHistory<string>()

  const navigateTo = useCallback(
    (route: string): void => {
      const isHome = history.location.pathname === '/'
      if (isHome) {
        history.push(route)
      } else {
        history.replace(route)
      }
    },
    [history]
  )

  const navigateHome = useCallback((): void => {
    navigateTo('/')
  }, [navigateTo])

  const navigateToDetails = useCallback(
    (dump: Dump): void => {
      navigateTo(`/show/dumps/${dump.id}`)
    },
    [navigateTo]
  )

  const navigateToCreate = useCallback((): void => {
    navigateTo('/create')
  }, [navigateTo])

  const navigateToEdit = useCallback(
    (dump: Dump): void => {
      navigateTo(`/edit/dumps/${dump.id}`)
    },
    [navigateTo]
  )

  return {
    navigateHome,
    navigateToDetails,
    navigateToCreate,
    navigateToEdit,
  }
}
