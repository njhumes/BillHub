import React from 'react'
import LegislatorList from './LegislatorList/LegislatorList'

const LegislatorContainer = (props) => {
    return (
      <LegislatorList info={props.info}/>
    )
}

export default LegislatorContainer
