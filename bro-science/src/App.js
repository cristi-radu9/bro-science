import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import SideNav from './components/SideNav/SideNav';
import BackDrop from './components/Backdrop/Backdrop';
import Banner from './components/Banner/Banner';
import LogIn from './components/LogIn/LogIn'
import Register from './components/Register/Register'
import Recipes from './components/Recipes/Recipes';
import MyWorkouts from './components/MyWorkouts/MyWorkouts';
import Nutrition from './components/Nutrition/Nutrition';
class App extends Component {

  constructor() {
    super();
    this.state = {
      sideNavOpen: false,
      route: 'home',
      isSignedIn: false,
      user: {
        id: '',
        username: '',
        email: '',
        height: '',
        weight: '',
        gender: '',
        bmi:''
      }
    }
  }

  loadUser = (usr) => {
    this.setState({user:{
      id: usr.id,
      username: usr.username,
      email: usr.email,
      height: usr.height,
      weight: usr.weight,
      gender: usr.gender
    }})
    console.log(this.state.user);
  }

  sideNavButtonClickHandler = () => {
    this.setState((prevState) => {
      return { sideNavOpen: !prevState.sideNavOpen };
    })
  }

  backDropClickHandler = () => {
    this.setState({ sideNavOpen: false })
  }

  onRouteChange = (route, isLogged) => {
    this.setState({ route: route })
    this.setState({ isSignedIn: isLogged })
    console.log(this.state.route);
  }

  logOut=()=>{
    const newUser={
      id: '',
      username: '',
      email: '',
      height: '',
      weight: '',
      gender: '',
      bmi:''
    }
    this.setState({user:newUser})
  }

  render() {
    let backDrop;
    if (this.state.sideNavOpen) {
      backDrop = <BackDrop click={this.backDropClickHandler} />
    }

    return (
      <div className="h-100">
        <Navbar
          sideButtonHandler={this.sideNavButtonClickHandler}
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
          user={this.state.user}
          logOut={this.logOut}
        />
        <SideNav show={this.state.sideNavOpen} user={this.state.user} onRouteChange={this.onRouteChange}/>
        {backDrop}
        {this.state.route === 'home' ?
          <main style={{ marginTop: '64px' }}>
            <Banner />
          </main>
          : this.state.route === "login"
            ? <LogIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            : this.state.route==='register'
            ?<Register onRouteChange={this.onRouteChange} />
            : this.state.route==='recipes'
            ?<Recipes/>
            :this.state.route==="myworkouts"
            ?<MyWorkouts onRouteChange={this.onRouteChange} user={this.state.user}/>
            :<Nutrition onRouteChange={this.onRouteChange} user={this.state.user}/>
          }
      </div>
    );
  }
}

export default App;
