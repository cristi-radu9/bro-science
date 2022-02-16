import React,{Component} from 'react'
import './MyWorkouts.css'
import AddExercises from './AddExercises/AddExercises'
import SearchExercises from './SearchExercises/SearchExercises'

class MyWorkouts extends Component{
    
    constructor(props){
        super(props)
        this.state={
            scope:""
        }
    }

    addScope=()=>{
        this.setState({scope:"add"})
    }

    searchScope=()=>{
        this.setState({scope:"search"})
    }

    noScope=()=>{
        this.setState({scope:""})
    }

    render(){
        return(
            <div className="mt5 flex flex-column items-center">
                <h1 className="my-workouts">My workouts</h1>
                {this.state.scope===""
                ?<div className="flex">
                    <div className="add-view-image-container">
                        <h2>Add Workout</h2>
                        <img src="https://cdn.pixabay.com/photo/2016/03/27/07/08/man-1282232_1280.jpg" 
                        alt="add pic" 
                        className="add-view-images"
                        onClick={this.addScope}/>
                    </div>
                    <div className="add-view-image-container">
                        <h2>View Workout</h2>
                        <img src="https://cdn.pixabay.com/photo/2017/05/25/15/08/jogging-2343558_1280.jpg" 
                        alt="view pic" 
                        className="add-view-images"
                        onClick={this.searchScope}/>
                    </div>

                </div>
                :this.state.scope==="add"
                ?<AddExercises onRouteChange={this.props.onRouteChange} user={this.props.user} noScope={this.noScope}/>
                :<SearchExercises onRouteChange={this.props.onRouteChange} user={this.props.user} noScope={this.noScope}/>}
            </div>
        )
    }
}

export default MyWorkouts;