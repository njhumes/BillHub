import React from 'react'
import Login from '../Login/Login'
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

const TrackingContainer = (props) => {

    // handleSubmit = async (e) => {
    //     e.preventDefault();
    
    //     try {
    //         const Response = await fetch('http://localhost:9000/auth', {
    //             method: 'POST',
    //             body: JSON.stringify(this.state),
    //             credentials: 'include',
    //             headers: {
    //             'Content-Type': 'application/json'
    //             }
    //         });
    //         if(!loginResponse.ok){
    //             throw Error(loginResponse.statusText)
    //         }
    //         const parsedResponse = await loginResponse.json();
    //         if(parsedResponse.data === 'login successful'){
    //             // If we log in successfully, change the state and push it up
    //             this.props.loginSuccess();
    //         }
    //         console.log(parsedResponse, ' this is login response from express api')
    //     } catch(err){
    //         console.log(err)
    //     }
    // }




    // BEFORE RENDER, CHECK IF USER IS LOGGED IN

    // MAP THE USERS TRACKED BILLS/REPS TO RENDER
    const trackedBills = props.trackedBills.map ((bill,i) => {
        return (
            <Card body key={bill._id}>
                <CardTitle><h4>{bill.title}</h4></CardTitle>
                <CardText>{bill.summary}</CardText>
                <Button onClick={props.untrackBill.bind(this,bill._id)}>UnTrack</Button>
            </Card>
        )
    })
    const trackedReps = props.trackedReps.map ((rep,i) => {
        return (
            <Card body>
                <CardTitle><h4>Rep Name</h4></CardTitle>
                <CardText>Rep Info</CardText>
                <Button>UnTrack</Button>
            </Card>
        )
    })

    return (
        <Row>
            { !props.info ? (
                <Login loginSuccess={props.loginSuccess}/>
            ) : (
                <Col>
                    <hr/>
                    <h1>Bills</h1>
                    {trackedBills}
                    <hr/>
                    <h1>Legislators</h1>
                    {trackedReps}
                    <hr/>
                </Col>
            )}
        </Row>
                
    )
}

export default TrackingContainer
