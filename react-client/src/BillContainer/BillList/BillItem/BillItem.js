import React from 'react'
import { Card, Button, CardTitle, CardText, CardGroup, Row, Col } from 'reactstrap';

const BillItem = (props) => {

    //console.log(`TRACKED BILLS: ${JSON.stringify(props.trackedBills)}`)

    // Check if bill id equals one in your tracking list
    let className = "";
    let buttonStr = "Track";
    let alreadyTracked = false;
    let imgSrc = "/animations/unclicked.gif";
    for (let i=0; i<props.trackedBills.length; i++){
        if (props.trackedBills[i]._id == props.billInfo._id) {
            className = "active";
            buttonStr = "Untrack";
            alreadyTracked = true;
            imgSrc = "/animations/clicked.gif"
        }
    }

    return (
        <Card className="grayCard" body>
            <Row>
                <Col xs="1">
                    <div className="centerButton">
                        <h1 className="trackingCount">{props.billInfo.trackingCount}</h1>
                        <figure> 
                            <img onClick={
                                !alreadyTracked ? 
                                props.addBillToTracking.bind(this,props.billInfo) :
                                props.untrackBill.bind(this,props.billInfo._id)
                            } 
                            className="starIcon" src={imgSrc}/> 
                        </figure>
                        {/* <Button 
                            onClick={
                                !alreadyTracked ? 
                                props.addBillToTracking.bind(this,props.billInfo) :
                                props.untrackBill.bind(this,props.billInfo._id)
                            } 
                            className={className}>
                            {buttonStr}
                        </Button> */}
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

