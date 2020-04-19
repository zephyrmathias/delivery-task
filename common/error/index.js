import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

const Error = ({ children }) => {
  return <div className={styles.error}>{children}</div>
}

Error.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
}

export default Error
