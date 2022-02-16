import React from 'react'
import './Navbar.css'
import 'tachyons'
import SideNavButton from '../SideNav/SideNavButton'
import whitelogo from './whiteLogo.png'
class Navbar extends React.Component {
    logoClick=()=>{
        if(this.props.user.username.length>=1){
            this.props.onRouteChange('home',true);
        }else{
            this.props.onRouteChange('home',false);
        }
    }

    logOutHandler=()=>{
        this.props.onRouteChange('home',false);
        this.props.logOut();
    }

    render(){
        return (
            <header className="nav-head">
                <nav className="navigation">
                    <div>
                        <SideNavButton click={this.props.sideButtonHandler}/>
                    </div>
                    <div className="ml2"><img onClick={this.logoClick} className="logoAdjustmentNav pointer" alt="logo"src={whitelogo}/></div>
                    <div className="flex-auto"></div>
                    <div>
                        <ul className="list flex ma0 pa0">
                            <li className="navItems"><a className="navA" href="/">About</a></li>
                            {(this.props.isSignedIn===false)
                            ?<li onClick={() => this.props.onRouteChange('login',false)} className="navItems navA">Log in</li>
                            :<li onClick={this.logOutHandler} className="navItems navA">{this.props.user.username}</li>}
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
    
}

export default Navbar;