import { useHistory } from 'react-router-dom'
import { Dump } from '../types/dump-types'

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

  function navigateHome(): void {
    navigateTo('/')
  }

  function navigateToDetails(dump: Dump): void {
    history.push(`/show/dumps/${dump.id}`)
  }

  function navigateToCreate(): void {
    navigateTo('/create')
  }

  function navigateToEdit(dump: Dump): void {
    navigateTo(`/edit/dumps/${dump.id}`)
  }

  function navigateTo(route: string): void {
    const isHome = history.location.pathname === '/'
    if (isHome) {
      history.push(route)
    } else {
      history.replace(route)
    }
  }

  return {
    navigateHome,
    navigateToDetails,
    navigateToCreate,
    navigateToEdit,
  }
}
