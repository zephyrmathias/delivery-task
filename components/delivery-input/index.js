import React from 'react'
import PropTypes from 'prop-types'
import Title from '../../common/title'
import Subtitle from '../../common/subtitle'
import Note from '../../common/note'
import Button from '../../common/button'
import Error from '../../common/error'
import Result from '../../common/result'
import styles from './styles.module.scss'

const DeliveryData = ({
  data,
  onChangeTown1,
  onChangeTown2,
  onChangeCost,
  onSubmitInput,
  town1,
  town2,
  cost,
  error,
}) => {
  return (
    <div className={styles['delivery-data__container']}>
      <Title title="Add Delivery Route" />
      <Subtitle subtitle="Add Delivery Data" />
      <Note>
        *Note: Example data: <b>A, B, 10</b> please note
        <b> Town name is case sensitive</b> and <b>Cost cannot be 0</b>
        <div>
          <u>
            <b>And Delivery Routes cannot be duplicated</b>
          </u>
          <div>Ex: if A-B-10 exist, cannot add another A-B with any cost</div>
        </div>
      </Note>
      <input
        className={styles['delivery-data__input']}
        type="text"
        name="data-town1"
        placeholder="Town 1"
        onChange={onChangeTown1}
        value={town1}
      />
      <input
        className={styles['delivery-data__input']}
        type="text"
        name="data-town2"
        placeholder="Town 2"
        onChange={onChangeTown2}
        value={town2}
      />
      <input
        className={styles['delivery-data__input']}
        type="number"
        name="data-cost"
        placeholder="Cost"
        onChange={onChangeCost}
        value={cost}
        min={1}
      />
      <Button onClick={onSubmitInput} text="Add New Data" />
      {error && <Error>ERROR: {error}</Error>}
      {data.length > 0 && (
        <Result>
          {data.map((node) => (
            <div key={`${node.start}-${node.end}`}>
              {node.start}-{node.end}-{node.cost}
            </div>
          ))}
        </Result>
      )}
    </div>
  )
}

DeliveryData.defaultProps = {
  data: [],
  error: null,
}

DeliveryData.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
      cost: PropTypes.number.isRequired,
    }),
  ),
  town1: PropTypes.string.isRequired,
  town2: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
  onChangeTown1: PropTypes.func.isRequired,
  onChangeTown2: PropTypes.func.isRequired,
  onChangeCost: PropTypes.func.isRequired,
  onSubmitInput: PropTypes.func.isRequired,
  error: PropTypes.string,
}

export default DeliveryData
