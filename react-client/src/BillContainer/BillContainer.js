import React from 'react'
import BillList from './BillList/BillList'
import ModalPrompt from '../Login/ModalPrompt/ModalPrompt'

const BillContainer = (props) => {
    return (
      <div>
        <ModalPrompt />
        <BillList 
          addBillToTracking={props.addBillToTracking.bind(this)} 
          untrackBill={props.untrackBill.bind(this)} 
          bills={props.bills} 
          trackedBills={props.trackedBills}
          logged={props.logged}
          history={props.history}
        />
      </div>
    )
}

export default BillContainer
