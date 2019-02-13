import React from 'react'
import { Card, Button, CardTitle, CardText, CardGroup, Row, Col } from 'reactstrap';

const BillItem = (props) => {
    return (
        <Card body>
            <Row>
                <Col xs="1">
                    <div className="centerButton">
                        <h1 className="trackingCount">{props.billInfo.trackingCount}</h1>
                        <Button onClick={props.addBillToTracking.bind(this,props.billInfo)}>Track</Button>
                    </div>
                </Col>
                <Col sm="11">
                    <CardTitle><h4>{props.billInfo.title}</h4></CardTitle>
                    <CardText>{props.billInfo.summary}</CardText>
                </Col>
            </Row>
        </Card>
    )
}

export default BillItem