import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

const Subtitle = ({ subtitle }) => {
  return <p className={styles.subtitle}>{subtitle}</p>
}

Subtitle.propTypes = {
  subtitle: PropTypes.string.isRequired,
}

export default Subtitle
