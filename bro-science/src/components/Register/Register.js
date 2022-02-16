import React, { Component } from 'react';
import '../LogIn/Login.css'
import '../ErrorMessage/ErrorMessage'
import ErrorMessage from '../ErrorMessage/ErrorMessage';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            height: '',
            weight: '',
            gender: '',
            confirmPassword: '',
            error:0
        }
    }

    onUsernameChange = (event) => {
        this.setState({ username: event.target.value })
    }
    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }
    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }
    onHeightChange = (event) => {
        this.setState({ height: event.target.value })
    }
    onWeightChange = (event) => {
        this.setState({ weight: event.target.value })
    }
    onGenderChange = (event) => {
        this.setState({ gender: event.target.value })
    }

    onConfirmPasswordChange = (event) => {
        this.setState({ confirmPassword: event.target.value })
    }

    onSubmitRegister = () => {
        if (this.state.password === this.state.confirmPassword) {
            fetch('http://localhost:3000/register', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                    height: this.state.height,
                    weight: this.state.weight,
                    gender: this.state.gender
                })
            }).then(response => response.json())
                .then(user => {
                    if (user !== 'unable to register') {
                        this.props.onRouteChange('login', false)
                        this.setState({error:0})
                    } else {
                        this.setState({error:1});
                    }
                })
        } else {
            this.setState({ confirmPassword: '' })
            this.setState({error:2});
        }
    }

    render() {
        let errStyle=""
        if(this.state.error!==0){
            errStyle="mt6 flex items-center flex-column"
        }
        return (
            <div className={errStyle}>
                {this.state.error===1?
                <ErrorMessage errorMessage="User already exits with that email"/>:
                this.state.error===2?
                <ErrorMessage errorMessage="Password don't match"/>:null
                }
                <article className="articleStyle">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="legendStyle">Register</legend>
                                <div className="mv3">
                                    <label className="labelStyle" htmlFor="text">Username</label>
                                    <input className="inputStyle"
                                        type="text"
                                        name="username"
                                        id="username"
                                        onChange={this.onUsernameChange}
                                    />
                                </div>
                                <div className="mt3">
                                    <label className="labelStyle" htmlFor="email-address">Email</label>
                                    <input className="inputStyle"
                                        type="email"
                                        name="email-address"
                                        id="email-address"
                                        onChange={this.onEmailChange}
                                    />
                                </div>
                                <div className="mt3">
                                    <label className="labelStyle" htmlFor="password">Password</label>
                                    <input className="inputStyle"
                                        type="password"
                                        name="password"
                                        id="password"
                                        onChange={this.onPasswordChange}
                                    />
                                </div>
                                <div className="mt3">
                                    <label className="labelStyle" htmlFor="password">Confirm Password</label>
                                    <input className="inputStyle"
                                        type="password"
                                        name="password"
                                        id="password"
                                        onChange={this.onConfirmPasswordChange}
                                        value={this.state.confirmPassword}
                                    />
                                </div>
                                <div className="mt3">
                                    <label className="labelStyle" htmlFor="number">Height (cm)</label>
                                    <input className="inputStyle"
                                        type="number"
                                        name="height"
                                        id="height"
                                        onChange={this.onHeightChange}
                                    />
                                </div>
                                <div className="mt3">
                                    <label className="labelStyle" htmlFor="number">Weight (kgs)</label>
                                    <input className="inputStyle"
                                        type="number"
                                        name="weight"
                                        id="weight"
                                        onChange={this.onWeightChange}
                                    />
                                </div>
                                <div className="mt3">
                                    <label className="labelStyle" htmlFor="number">Gender (M/F)</label>
                                    <input className="inputStyle"
                                        type="text"
                                        name="gender"
                                        id="gender"
                                        onChange={this.onGenderChange}
                                    />
                                </div>


                            </fieldset>
                            <div className="">
                                <input onClick={this.onSubmitRegister} className="log-reg-button" type="submit" value="Register" />
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        )
    }

}

export default Register;