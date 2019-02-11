import React from 'react'
import BillList from './BillList/BillList'

const BillContainer = (props) => {
    return (
      <BillList bills={props.bills}/>
    )
}

export default BillContainer
