import React, { Component } from 'react'
import './SearchExercises.css';
import Exercises from '../AddExercises/Exercises/Exercises';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';



class SearchExercises extends Component {

    constructor(props) {
        super(props)
        this.state = {
            date: "",
            exercises: [],
            userId: this.props.user.id,
            errorM:false,
            errorText:""
        }
    }

    onDateChangeListener = (event) => {
        this.setState({ date: event.target.value })
    }

    getWorkouts = () => {
        if(this.props.user.username.length>=1){
            if (this.state.date !== "") {
                fetch(`http://localhost:3000/SearchWorkout/${this.props.user.id}/${this.state.date}`)
                    .then(response => response.json())
                    .then(exe => {
                        if(exe.length===0){
                            this.setError(true,"You did't work on that day bro")
                        }else{
                            this.setError(false,"")
                        }
                        this.setState({ exercises: exe })
                    })
                    this.setError(false,"")
            }else{
                this.setError(true,"Select a date")
            }
        }else{
            this.props.onRouteChange("login",false);
        }
    }

    setError=(condition,message)=>{
        this.setState({errorM:condition})
        this.setState({errorText:message})
    }

    render() {
        return (
            <div className="w-100 flex justify-center items-center flex-column">
                <div className="w-100 flex justify-end mb3 mr5 ttc">
                    <Button variant="outlined" onClick={this.props.noScope}>Back</Button>
                </div>
                {this.state.errorM===true && <ErrorMessage errorMessage={this.state.errorText}/>}
                <div className="w-30">
                <TextField
                    type="date"
                    id="date-picker-dialog"
                    label="Workout date"
                    onChange={this.onDateChangeListener}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button variant="outlined" color="primary" onClick={this.getWorkouts}>Get Workouts</Button>
                </div>
                <div className="w-100 flex items-center justify-center">
                <Exercises exercise={this.state.exercises} />
                </div>
            </div>
        )
    }

}

export default SearchExercises;