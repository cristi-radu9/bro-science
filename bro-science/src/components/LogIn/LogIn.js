import React from 'react';
import './Login.css';

class LogIn extends React.Component {

    constructor(props){
        super(props);
        this.state={
            signInEmail:'',
            signInPassword:''
        }
    }

    onEmailChange=(event)=>{
        this.setState({signInEmail:event.target.value})
    }

    onPasswordChange=(event)=>{
        this.setState({signInPassword:event.target.value})
    }

    onSubmitSignIn=()=>{
        fetch('http://localhost:3000/signin',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                email:this.state.signInEmail,
                password:this.state.signInPassword
            })
        }).then(response=>response.json())
        .then(user=>{
            if(user!=='wrong credentials'){
                this.props.loadUser(user);
                this.props.onRouteChange('home',true)
            }
        })
       
    }

    render(){
        return (
            <article className="articleStyle">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="legendStyle">Log In</legend>
                            <div className="mt3">
                                <label className="labelStyle" htmlFor="email-address">Email</label>
                                <input className="inputStyle" 
                                type="email" 
                                name="email-address" 
                                id="email-address"
                                onChange={this.onEmailChange}
                                 />
                            </div>
                            <div className="mv3">
                                <label className="labelStyle" htmlFor="password">Password</label>
                                <input className="inputStyle" 
                                type="password" 
                                name="password" 
                                id="password" 
                                onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input onClick={this.onSubmitSignIn} className="log-reg-button" type="submit" value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={()=>this.props.onRouteChange('register',false)} className="f6 pointer link dim black db">Don't have account? Register.</p>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default LogIn;