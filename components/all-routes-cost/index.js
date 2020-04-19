import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Title from '../../common/title'
import Subtitle from '../../common/subtitle'
import Note from '../../common/note'
import Button from '../../common/button'
import Error from '../../common/error'
import Result from '../../common/result'
import styles from './styles.module.scss'

const AllRoutesByCost = ({ data }) => {
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [town1, setTown1] = useState('')
  const [town2, setTown2] = useState('')
  const [cost, setCost] = useState(0)

  const calculateCost = (routes) => {
    let total = 0

    for (let i = 0; i < routes.length - 1; i += 1) {
      const start = routes[i]
      const end = routes[i + 1]

      const matchedPath = data.find((node) => {
        return node.start === start && node.end === end
      })

      total += matchedPath?.cost
    }

    return total
  }

  const getPossibleRoutes = (routes, start, goal, expectedCost) => {
    const totalRoutes = [...routes, start]
    const totalCost = calculateCost(totalRoutes)
    const matchedRoutes = [...data].filter((node) => node.start === start)

    if (totalCost < expectedCost && start === goal && totalRoutes.length > 1) {
      return (
        1 +
        matchedRoutes.reduce(
          (sum, node) =>
            sum + getPossibleRoutes(totalRoutes, node.end, goal, expectedCost),
          0,
        )
      )
    }

    if (totalCost >= expectedCost) {
      return 0
    }

    return matchedRoutes.reduce(
      (sum, node) =>
        sum + getPossibleRoutes(totalRoutes, node.end, goal, expectedCost),
      0,
    )
  }

  const onClick = () => {
    setError('')

    if (!town1 || !town2 || !cost || !parseInt(cost, 10)) {
      setError('Incorrect Input Format')
      setResult('')
      return
    }

    setResult('')
    const res = getPossibleRoutes([], town1, town2, cost)
    setResult(res)
  }

  const onChangeTown1 = (e) => {
    setTown1(e.target.value)
  }

  const onChangeTown2 = (e) => {
    setTown2(e.target.value)
  }

  const onChangeCost = (e) => {
    const value = parseInt(e.target.value, 10)
    setCost(value)
  }

  return (
    <div className={styles['all-routes__container']}>
      <Title title="Find Possible Routes By Cost" />
      <Subtitle subtitle="The number of possible routes from Town A to Town B that delivery cost is only less than N" />
      <Note>
        <span>
          *Note: Example of Inputs <b>E, E, 20</b> and Town names are case
          sensitive
        </span>
      </Note>
      <input
        className={styles['all-routes__input']}
        name="town1"
        type="text"
        placeholder="Town 1"
        onChange={onChangeTown1}
      />
      <input
        className={styles['all-routes__input']}
        name="town2"
        type="text"
        placeholder="Town 2"
        onChange={onChangeTown2}
      />
      <input
        className={styles['all-routes__input']}
        name="cost"
        type="number"
        placeholder="Cost"
        onChange={onChangeCost}
        min={1}
      />
      <Button onClick={onClick} text="Find All Possible Routes" />
      {error && <Error>ERROR: {error}</Error>}
      {result !== '' && <Result>Number of Possible Routes: {result}</Result>}
    </div>
  )
}

AllRoutesByCost.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
      cost: PropTypes.number.isRequired,
    }),
  ).isRequired,
}

export default AllRoutesByCost
