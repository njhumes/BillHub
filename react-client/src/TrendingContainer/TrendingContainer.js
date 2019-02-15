import React from 'react'
import BillList from '../BillContainer/BillList/BillList'

const TrendingContainer = (props) => {

  // WE ONLY CARE ABOUT TOP TRACKED BILLS IN MONGO HERE
  // getTopTrackedBills = async (e) => {
  //     e.preventDefault();
  
  //     try {
  //         const topBills = await fetch('http://localhost:9000/trending', {
  //             method: 'GET',
  //             // body: JSON.stringify(this.state),
  //             credentials: 'include',
  //             headers: {
  //             'Content-Type': 'application/json'
  //             }
  //         });
  //         if(!topBills.ok){
  //             throw Error(topBills.statusText)
  //         }
  //         const parsedTopBills = await topBills.json();
  //         // Update the main state
  //         this.props.updateTrending(parsedTopBills.data);
  
  //         console.log(parsedResponse, ' this is login response from express api')
  //     } catch(err){
  //         console.log(err)
  //     }
  // }


  return (
    <BillList 
      untrackBill={props.untrackBill.bind(this)} 
      addBillToTracking={props.addBillToTracking.bind(this)} 
      bills={props.bills} 
      trackedBills={props.trackedBills}
      logged={props.logged}
    />
  )
}

export default TrendingContainer
