import React, { useState } from 'react'
import DeliveryData from '../components/delivery-input'
import DeliveryCost from '../components/delivery-cost'
import PossibleRoutes from '../components/possible-routes'
import AllPossibleRoutes from '../components/all-possible-routes'
import AllRoutesByCost from '../components/all-routes-cost'
import Error from '../common/error'
import styles from './styles.module.scss'

const Homepage = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const [town1, setTown1] = useState('')
  const [town2, setTown2] = useState('')
  const [cost, setCost] = useState('')

  const checkIfRoutesExist = (start, end) => {
    const matchedRoutes = data.find((route) => {
      return route.start === start && route.end === end
    })

    return matchedRoutes
  }

  const onSubmitInput = () => {
    setError('')

    const parsedCost = parseInt(cost, 10)

    if (!town1 || !town2 || town1 === town2 || !parsedCost) {
      setError('Incorrect Input Format')
      return
    }

    if (checkIfRoutesExist(town1, town2)) {
      setError('Delivery Routes Already Exist')
      return
    }

    const node = { start: town1, end: town2, cost: parsedCost }
    setData([...data, node])
    setTown1('')
    setTown2('')
    setCost('')
  }

  const onChangeTown1 = (e) => {
    const { value } = e.target
    setTown1(value)
  }

  const onChangeTown2 = (e) => {
    const { value } = e.target
    setTown2(value)
  }

  const onChangeCost = (e) => {
    const { value } = e.target
    setCost(value)
  }

  return (
    <div className={styles.container}>
      <DeliveryData
        data={data}
        town1={town1}
        town2={town2}
        cost={cost}
        onChangeTown1={onChangeTown1}
        onChangeTown2={onChangeTown2}
        onChangeCost={onChangeCost}
        onSubmitInput={onSubmitInput}
        error={error}
      />
      {data.length >= 1 ? (
        <React.Fragment>
          <DeliveryCost data={data} />
          <PossibleRoutes data={data} />
          <AllPossibleRoutes data={data} />
          <AllRoutesByCost data={data} />
        </React.Fragment>
      ) : (
        <Error>Please Add Some Data to Start Calculating</Error>
      )}
    </div>
  )
}

export default Homepage
