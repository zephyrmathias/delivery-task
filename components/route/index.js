import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

const Route = ({ route }) => {
  return (
    <div>
      {route.map((data) => (
        <span key={`${data.start}-${data.end}`} className={styles.route}>
          {data.start} - {data.end}
        </span>
      ))}
    </div>
  )
}

Route.propTypes = {
  route: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
}

export default Route
