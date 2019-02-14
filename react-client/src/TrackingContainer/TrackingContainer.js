import React from 'react'
import Login from '../Login/Login'
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

const TrackingContainer = (props) => {
// =======================================================
// MAP THE USERS TRACKED BILLS/REPS TO RENDER
// =======================================================
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
        <Row className="justify-content-center" >
            { !props.info ? (
                <Login handleRegister={props.handleRegister.bind(this)} handleChange={props.handleChange.bind(this)} handleLogin={props.handleLogin} loginSuccess={props.loginSuccess}/>
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
