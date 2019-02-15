import React, {Component} from 'react'
import { Card, Button, CardTitle, CardText, CardGroup, Row, Col } from 'reactstrap';

export class BillItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            trackedStatus: this.props.trackedStatus,
            imgSrc: this.props.imgSrc,
        }
    }
    addBillToTracking(billInfo){
        if (this.props.logged){
            this.setState({
                trackedStatus: true,
                imgSrc: "/animations/star_click_cropped_single.gif"
            })
            this.props.addBillToTracking(billInfo);
        } else {
            // PROMPT THE USER TO LOGIN
        }
    }
    untrackBill(billId){
        if (this.props.logged){
            this.setState({
                trackedStatus: false,
                imgSrc: "/animations/star_unclick_cropped_single.gif"
            })
            this.props.untrackBill(billId)
        } else {
            // PROMPT THE USER TO LOGIN
        }
    }
    render(){
        return (
            <Card className="grayCard" body>
                <Row>
                    <Col xs="1">
                        <div className="centerButton">
                            <h1 className="trackingCount">{this.props.billInfo.trackingCount}</h1>
                            <figure> 
                                <img onClick={
                                    !this.state.trackedStatus ? 
                                    this.addBillToTracking.bind(this,this.props.billInfo) :
                                    this.untrackBill.bind(this,this.props.billInfo._id)
                                } 
                                className="starIcon" src={this.state.imgSrc}/> 
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
                        <CardTitle><h4>{this.props.billInfo.title}</h4></CardTitle>
                        <CardText>{this.props.billInfo.summary}</CardText>
                    </Col>
                </Row>
            </Card>
        )
    }
}

export default BillItem

