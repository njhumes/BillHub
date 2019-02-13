import React from 'react'
import TrendingItem from './TrendingItem/TrendingItem'

const TrendingList = (props) => {
    // MAP OVER DATA AND MAKE BILL ITEMS
    const trendingList = props.bills.map((bill,i) => {
        return <li key={i}> <TrendingItem trackedBills={props.trackedBills} addBillToTracking={props.addBillToTracking.bind(this)} billInfo={bill}/> </li>
    });
  
    return (
    <ul style={{"listStyleType":"none", "padding":"0"}}>
        {trendingList}
    </ul>
    )
}

export default TrendingList