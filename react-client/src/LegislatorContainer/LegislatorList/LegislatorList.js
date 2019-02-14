import React from 'react'
import LegislatorItem from './LegislatorItem/LegislatorItem'

const LegislatorList = (props) => {
    // MAP OVER DATA AND MAKE BILL ITEMS
    const legislatorList = props.info.map((rep,i) => {
        return <li key={i}> <LegislatorItem info={rep} /> </li>
    })
  
    return (
    <ul style={{"listStyleType":"none", "padding":"0"}}>
        {legislatorList}
    </ul>
    )
}

export default LegislatorList