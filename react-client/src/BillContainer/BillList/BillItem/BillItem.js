import React from 'react'
import { Card, Button, CardTitle, CardText, CardGroup, Row, Col } from 'reactstrap';

const BillItem = (props) => {
    return (
        <Card body>
            <Row>
                <Col xs="1">
                    <h1>{props.billInfo.trackingCount}</h1>
                </Col>
                <Col sm="11">
                    <CardTitle><h4>{props.billInfo.title}</h4></CardTitle>
                    <CardText>{props.billInfo.summary}</CardText>
                    <Button onClick={props.addBillToTracking.bind(this,props.billInfo)}>Track</Button>
                </Col>
            </Row>
        </Card>
    )
}

export default BillItem