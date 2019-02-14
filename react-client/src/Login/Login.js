import React from 'react'
import { Col, Card, Label, Input, Form, FormGroup } from 'reactstrap';

const Login = (props) => {
    return (
        <Col xs='auto'>
            <Card body>
                <Form onSubmit={props.handleLogin.bind(this)}>
                    <FormGroup>
                        <Label for="exampleEmail">Username</Label>
                        <Input type="text" name="username" autocomplete="off" id="exampleUsername" placeholder="" onChange={props.handleChange.bind(this)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" autocomplete="off" id="examplePassword" placeholder="" onChange={props.handleChange.bind(this)} />
                    </FormGroup>
                    <Input className="submit" type="Submit" value="Login"/>
                </Form>
            </Card>
            <br/>
            <Card body>
                <Form onSubmit={props.handleRegister.bind(this)}>
                    <FormGroup>
                        <Label for="exampleEmail">Username</Label>
                        <Input type="text" name="username" autocomplete="off" id="exampleUsername" placeholder="" onChange={props.handleChange.bind(this)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" autocomplete="off" id="examplePassword" placeholder="" onChange={props.handleChange.bind(this)} />
                    </FormGroup>
                    <Input className="submit" type="Submit" value="Register"/>
                </Form>
            </Card>
        </Col>
    )
}

export default Login