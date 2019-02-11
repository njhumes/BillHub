import React from 'react'
import BillItem from './BillItem/BillItem'
// import { type } from 'os';

const BillList = (props) => {
    // MAP OVER DATA AND MAKE BILL ITEMS
    const billList = props.bills.map((bill,i) => {
        return <li data-id={i}> <BillItem billInfo={bill}/> </li>
    })
  
    return (
    <ul style={{"list-style-type":"none", "padding":"0"}}>
        {billList}
    </ul>
    )
}

export default BillList
