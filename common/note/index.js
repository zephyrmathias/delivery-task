import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

const Note = ({ children }) => {
  return <div className={styles.note}>{children}</div>
}

Note.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
}

export default Note
