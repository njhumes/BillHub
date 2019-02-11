import React, { Component } from 'react'

export class Login extends Component {
    constructor() {
        super();
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
    handleSubmit = (e) => {

    }
    render() {
        return (
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
        )
    }
}

export default Login