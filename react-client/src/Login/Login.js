import React, { Component } from 'react'
import { Row, Col } from 'reactstrap';

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const loginResponse = await fetch('http://localhost:9000/auth', {
                method: 'POST',
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                    trackedBills: [],
                    trackedReps: []
                }),
                credentials: 'include',
                headers: {
                'Content-Type': 'application/json'
                }
            });
        
            if(!loginResponse.ok){
                throw Error(loginResponse.statusText)
            }
        
            const parsedResponse = await loginResponse.json();
        
            this.props.loginSuccess(JSON.parse(parsedResponse.data));
        
            console.log(parsedResponse, ' this is login response from express api')
        
        } catch(err){
            console.log(err)
        }
    
    }
    render() {
        return (
            <Row>
                <Col>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Username:
                            <input type='text' name='username' onChange={this.handleChange} />
                        </label>
                        <label>
                            Password:
                            <input type='password' name='password' onChange={this.handleChange} />
                        </label>
                        <input type='Submit'/>
                    </form>
                </Col>
            </Row>
        )
    }
}

export default Login