import React, { Component } from 'react'
import { Row, Col } from 'reactstrap';

const TrackingContainer = (props) => {
    return (
            <Row>
            {/* FAVORITES CONTENT */}  
                <Col>
                    <h1>Bills</h1>
                    {JSON.stringify(props.info)}
                    <hr/>
                    <h1>Legislators</h1>
                    <hr/>
                </Col>
            </Row>
    )
}

export default TrackingContainer
