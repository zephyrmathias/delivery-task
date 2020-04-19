import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Route from '../route'
import Title from '../../common/title'
import Subtitle from '../../common/subtitle'
import Button from '../../common/button'
import Error from '../../common/error'
import Result from '../../common/result'
import styles from './styles.module.scss'

const ExactStops = ({ data }) => {
  const [town1, setTown1] = useState('')
  const [town2, setTown2] = useState('')
  const [routes, setRoutes] = useState(null)
  const [error, setError] = useState('')
  const result = useRef([])

  const onChangeTown1 = (e) => {
    setTown1(e.target.value)
  }

  const onChangeTown2 = (e) => {
    setTown2(e.target.value)
  }

  const isDuplicatedRoute = (src, val) => {
    return src.find(
      (route) => route.start === val.start && route.end === val.end,
    )
  }

  const findAllRoutes = (matchedRoutes, start, goal, tracked = {}) => {
    if (isDuplicatedRoute(matchedRoutes, tracked)) {
      return 0
    }

    const totalRoutes = [...matchedRoutes, tracked]

    if (matchedRoutes.length >= 1 && start === goal) {
      // remove empty object from Array
      const res = totalRoutes.filter((value) => Object.keys(value).length !== 0)
      result.current.push(res)
      setRoutes(result.current)
      return 1
    }

    const newRoutes = [...data].filter((node) => {
      return node.start === start
    })

    const res = newRoutes.reduce((sum, node) => {
      return sum + findAllRoutes(totalRoutes, node.end, goal, node)
    }, 0)

    return res
  }

  const onClick = async () => {
    if (!town1 || !town2) {
      setError('Incorrect Input Format')
      return
    }

    setError('')
    setRoutes([])
    result.current = []
    findAllRoutes([], town1, town2)
  }

  return (
    <div className={styles['all-possible-routes__container']}>
      <Title title="Find All Routes Between Town 1 and Town 2" />
      <Subtitle subtitle="Find all possible routes" />
      <input
        className={styles['all-possible-routes__input']}
        name="town1"
        type="text"
        placeholder="Town 1"
        onChange={onChangeTown1}
      />
      <input
        className={styles['all-possible-routes__input']}
        name="town2"
        type="text"
        placeholder="Town 2"
        onChange={onChangeTown2}
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

ExactStops.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
      cost: PropTypes.number.isRequired,
    }),
  ).isRequired,
}

export default ExactStops
