import React, {Component} from 'react';
import './SideNav.css';
class SideNav extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    onRouteChangeClickHandler=(route)=>{
        if(this.props.user.username.length>=1){
            this.props.onRouteChange(route,true);
        }else{
            this.props.onRouteChange(route,false);
        } 
    }
    render(){
        let sideNavOpen='sideNav';
        if(this.props.show){
            sideNavOpen='sideNav open';
        }
        return(
            <nav className={sideNavOpen}>
                <ul className="flex list flex-column justify-center h-100">
                    <li className="sideNavItems" onClick={()=>this.onRouteChangeClickHandler('recipes')}>Receipes</li>
                    <li className="sideNavItems" onClick={()=>this.onRouteChangeClickHandler('myworkouts')}>My Workouts</li>
                    <li className="sideNavItems" onClick={()=>this.onRouteChangeClickHandler('nutrition')}>Nutrition</li>
                </ul>
            </nav>
        )
    }
}

export default SideNav;