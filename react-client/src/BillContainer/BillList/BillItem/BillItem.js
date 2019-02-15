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
            alert("You need to log in to follow bills!")
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
            alert("You need to log in to follow bills!")
        }
    }
    render(){
        return (
            <Card className="grayCard" body>
                <Row>
                    <Col xs="2" md="1">
                        <div className="centerButton">
                            <div >
                                <h1 className="trackingCount">{this.props.billInfo.trackingCount}</h1>
                            </div>
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
                    <Col xs="10" md="11">
                        <div className="cardContent">
                            <CardTitle>
                                <h4>
                                    {this.props.billInfo.title.length > 80 ? 
                                        this.props.billInfo.title.slice(0,80) + "..." : 
                                        this.props.billInfo.title
                                    }
                                </h4>
                            </CardTitle>
                            <CardText className="cardText">
                                {this.props.billInfo.summary.length > 300 ? 
                                    this.props.billInfo.summary.slice(0,300) + "..." : 
                                    this.props.billInfo.summary
                                }
                            </CardText>
                        </div>
                    </Col>
                </Row>
            </Card>
        )
    }
}

export default BillItem

