import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

const Result = ({ children }) => {
  return <div className={styles.result}>{children}</div>
}

Result.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
}

export default Result
