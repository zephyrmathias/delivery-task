import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

const Button = ({ onClick, text }) => {
  return (
    <button className={styles.button} type="submit" onClick={onClick}>
      {text}
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
}

export default Button
