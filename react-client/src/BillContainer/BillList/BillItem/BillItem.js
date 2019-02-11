import React from 'react'
import { Card, Button, CardTitle, CardText } from 'reactstrap';

const BillItem = (props) => {
    return (
        <Card body>
            <CardTitle>Bill Title</CardTitle>
            <CardText>Bill text.</CardText>
            <Button>Track</Button>
        </Card>
    )
}

export default BillItem