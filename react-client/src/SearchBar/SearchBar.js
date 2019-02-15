import React from 'react'
import { Button, ButtonGroup, Container, Col, Row, Input, InputGroup, Form } from 'reactstrap';

const SearchBar = (props) => {
    return (
            <Row>

                {/* FILTER BUTTONS */}
                <Col xs={{ size: 'auto', offset: 0 }}>
                    <ButtonGroup>
                        <Button color="primary" onClick={props.onRadioBtnClick.bind(this,1)} active={props.selected === 1}>ALL</Button>
                        <Button color="primary" onClick={props.onRadioBtnClick.bind(this,2)} active={props.selected === 2}>CO</Button>
                        <Button color="primary" onClick={props.onRadioBtnClick.bind(this,3)} active={props.selected === 3}>US</Button>
                    </ButtonGroup>
                </Col>

                {/* SEARCH BAR */}
                <Col xs={{size: 'auto'}}>
                    <Form onSubmit={props.getBillsFromQuery.bind(this)}>
                        <InputGroup>
                            <Input placeholder="username" onChange={props.handleInput.bind(this)} />
                        </InputGroup>
                        <Input className="submit" type="Submit" value="Search"/>
                    </Form>
                </Col>
            </Row>
    )
}

export default SearchBar

