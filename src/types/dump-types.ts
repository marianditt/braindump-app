import PropTypes from 'prop-types'

export interface Dump {
  id: string
  timestamp: number
  summary: string
  description: string
  tags: string[]
}

export const dumpShape = {
  id: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  summary: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
}
