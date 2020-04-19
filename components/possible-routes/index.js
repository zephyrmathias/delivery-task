import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Route from '../route'
import Title from '../../common/title'
import Subtitle from '../../common/subtitle'
import Button from '../../common/button'
import Error from '../../common/error'
import Result from '../../common/result'
import styles from './styles.module.scss'

const PossibleRoutes = ({ data }) => {
  const [town1, setTown1] = useState('')
  const [town2, setTown2] = useState('')
  const [maxStops, setMaxStops] = useState(0)
  const [routes, setRoutes] = useState(null)
  const [error, setError] = useState('')
  const result = useRef([])

  const onChangeTown1 = (e) => {
    setTown1(e.target.value)
  }

  const onChangeTown2 = (e) => {
    setTown2(e.target.value)
  }

  const onChangeMaxStops = (e) => {
    const value = parseInt(e.target.value, 10)
    setMaxStops(value)
  }

  const findAllRoutes = (
    matchedRoutes,
    start,
    goal,
    maximumStops,
    tracked = {},
  ) => {
    const totalRoutes = [...matchedRoutes, tracked]

    if (
      matchedRoutes.length <= maximumStops &&
      matchedRoutes.length >= 1 &&
      start === goal
    ) {
      // remove empty object from Array
      const res = totalRoutes.filter((value) => Object.keys(value).length !== 0)
      result.current.push(res)
      setRoutes(result.current)
      return 1
    }

    if (matchedRoutes.length >= maximumStops) {
      return 0
    }

    const newRoutes = [...data].filter((node) => {
      return node.start === start
    })

    const res = newRoutes.reduce((sum, node) => {
      return (
        sum + findAllRoutes(totalRoutes, node.end, goal, maximumStops, node)
      )
    }, 0)

    return res
  }

  const onClick = async () => {
    if (!town1 || !town2 || !maxStops || !parseInt(maxStops, 10)) {
      setError('Incorrect Input Format')
      return
    }

    setError('')
    setRoutes([])
    result.current = []
    findAllRoutes([], town1, town2, maxStops)
  }

  return (
    <div className={styles['possible-routes__container']}>
      <Title title="Find All Possible Routes" />
      <Subtitle subtitle="Find all possible routes with less than N stops" />
      <input
        className={styles['possible-routes__input']}
        name="town1"
        type="text"
        placeholder="Town 1"
        onChange={onChangeTown1}
      />
      <input
        className={styles['possible-routes__input']}
        name="town2"
        type="text"
        placeholder="Town 2"
        onChange={onChangeTown2}
      />
      <input
        className={styles['possible-routes__input']}
        name="cost"
        type="number"
        min={1}
        placeholder="Maximum Stops"
        onChange={onChangeMaxStops}
      />
      <Button onClick={onClick} text="Find All Routes" />
      {error && <Error>ERROR: {error}</Error>}
      {routes?.length > 0 && (
        <Result>
          Total Routes: {result.current.length}
          {routes.map((route, i) => (
            <Route route={route} key={i} />
          ))}
        </Result>
      )}
      {routes?.length === 0 && <Result>No Such Route</Result>}
    </div>
  )
}

PossibleRoutes.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
      cost: PropTypes.number.isRequired,
    }),
  ).isRequired,
}

export default PossibleRoutes
