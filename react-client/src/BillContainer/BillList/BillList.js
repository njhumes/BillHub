import React from 'react'
import BillItem from './BillItem/BillItem'

const BillList = (props) => {
    // MAP OVER DATA AND MAKE BILL ITEMS
    const billList = props.bills.map((bill,i) => {
        return <li key={i}> <BillItem trackedBills={props.trackedBills} untrackBill={props.untrackBill.bind(this)} addBillToTracking={props.addBillToTracking.bind(this)} billInfo={bill}/> </li>
    })
  
    return (
    <ul style={{"listStyleType":"none", "padding":"0"}}>
        {billList}
    </ul>
    )
}

export default BillList
