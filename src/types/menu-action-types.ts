import PropTypes from 'prop-types'

export interface MenuAction {
  title: string
  action: () => void
}

export const menuActionShape = {
  title: PropTypes.string.isRequired,
  action: PropTypes.func,
}
