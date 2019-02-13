import React from 'react'
import BillList from './BillList/BillList'

const BillContainer = (props) => {
    return (
      <BillList addBillToTracking={props.addBillToTracking.bind(this)} bills={props.bills} trackedBills={props.trackedBills}/>
    )
}

export default BillContainer
