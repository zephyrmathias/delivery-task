import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Title from '../../common/title'
import Subtitle from '../../common/subtitle'
import Note from '../../common/note'
import Button from '../../common/button'
import Error from '../../common/error'
import Result from '../../common/result'
import styles from './styles.module.scss'

const DeliveryCost = ({ data }) => {
  const [totalCost, setTotalCost] = useState(null)
  const [error, setError] = useState('')
  const [routes, setRoutes] = useState('')

  const onChangeRoutes = (e) => {
    setRoutes(e.target.value)
  }

  const calculateTotalCost = () => {
    const towns = routes.split('-')

    if (towns.length <= 1) {
      setError('Incorrect Input Format')
      setTotalCost(null)
      return null
    }

    setError('')

    let total = 0

    for (let i = 0; i < towns.length - 1; i += 1) {
      const start = towns[i]
      const end = towns[i + 1]

      const matchedPath = data.find((node) => {
        return node.start === start && node.end === end
      })

      if (matchedPath) {
        total += matchedPath.cost
      } else {
        total = 'No Such Route'
        break
      }
    }

    setTotalCost(total)
  }

  return (
    <div className={styles['delivery-cost__container']}>
      <Title title="Delivery Cost" />
      <Subtitle subtitle="Calculate delivery cost for given delivery route" />
      <Note>*Note: Example input is A-B-C-D</Note>
      <input
        className={styles['delivery-cost__input']}
        type="text"
        placeholder="Delivery Routes"
        name="routes"
        onChange={onChangeRoutes}
      />
      <Button onClick={calculateTotalCost} text="Calculate Delivery Cost" />
      {error && <Error>ERROR: {error}</Error>}
      {totalCost && <Result>Delivery Cost = {totalCost}</Result>}
    </div>
  )
}

DeliveryCost.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
      cost: PropTypes.number.isRequired,
    }),
  ).isRequired,
}

export default DeliveryCost
