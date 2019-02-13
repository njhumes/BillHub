import React from 'react'
import { Card, Button, CardTitle, CardText } from 'reactstrap';

const BillItem = (props) => {
    return (
        <Card body>
            <CardTitle><h4>{props.billInfo.title}</h4></CardTitle>
            <CardText>{props.billInfo.summary}</CardText>
            <Button onClick={props.addBillToTracking.bind(this,props.billInfo)}>Track</Button>
        </Card>
    )
}

export default BillItem