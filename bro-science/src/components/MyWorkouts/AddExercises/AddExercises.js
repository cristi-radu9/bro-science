import React,{Component} from 'react';
import './AddExercises.css'
import Exercises from './Exercises/Exercises'
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import WokroutsIdeasTable from './WorkoutsIdeasTable/WokroutsIdeasTable';

class AddExercises extends Component{
    
    constructor(props){
        super(props)
        this.wrapper = React.createRef();
        this.state={
            exercises:[],
            nameEx:"",
            reps:"",
            sets:"",
            date:this.getDate(),
            errorFields:false,
            workout:"",
            showIdeas:false,
            workoutIdeas:[]
        }
    }

    getDate=()=>{
        var today = new Date();
        var month="";
        var day="";
        if((today.getMonth() + 1)<=9){
            month="0"+(today.getMonth() + 1)
        }else{
            month=(today.getMonth() + 1)
        }

        if(today.getDate()<=9){
            day="0"+today.getDate();
        }else{
            day=today.getDate();
        }

        var date = today.getFullYear()+ '-' + month + '-' + day ;
        return date;
    }

    onNameExChange=(event)=>{
        this.setState({nameEx:event.target.value})
    }

    onRepsChange=(event)=>{
        this.setState({reps:event.target.value})
    }
    onSetsChange=(event)=>{
        this.setState({sets:event.target.value})
    }

    workoutSubmits=(event)=>{
        event.preventDefault();
        const newExercises=this.state.exercises;
        const name=this.state.nameEx;
        const reps=this.state.reps;
        const sets=this.state.sets;
        const id=name+reps+sets;
        if(name!=="" && reps!=="" && sets!==""){
            newExercises.push({id,name,reps,sets});
            this.setState({errorFields:false});
        }else{
            this.setState({errorFields:true});
        }
        this.setState({exercises:newExercises});
        this.setState({nameEx:""})
        this.setState({reps:""})
        this.setState({sets:""})
        this.setState({workoutIdeas:[]})
    }

    onDelelteHandler=id=>{
        const newExercises=this.state.exercises.filter(ex=>ex.id!==id);
        this.setState({exercises:newExercises});
    }

    onSaveWorkoutClickHandler=()=>{
        if(this.props.user.username.length>=1){
            fetch('http://localhost:3000/AddWorkouts',{
                method:'post',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    exercises:this.state.exercises,
                    date:this.state.date,
                    userId:this.props.user.id
                })
            }).then(response=>response.json())
            .then(user=>{
                // if(user!=='unable to register'){
                //     this.props.onRouteChange('login',false)
                // }
            })
        }else{
            this.props.onRouteChange('login',false);
        }
    }
    
    ideasHandleChange=(event)=>{
        this.setState({workout:event.target.value})
    }

    onClickIdeas=()=>{
        if(this.state.workout!==""){
            fetch(`http://localhost:3000/WorkoutIdeas/${this.state.workout}`)
            .then(response=>response.json())
            .then(response=>{
                this.setState({workoutIdeas:response})
                this.setState({showIdeas:true})
                console.log(this.state.workoutIdeas)
            })
        }else{
            this.setState({showIdeas:false})
        }
        if(this.state.workout===""){
            this.setState({workoutIdeas:[]})
        }
    }
    


    render(){
        return(
            <div className="w-100 flex flex-column items-center"> 
                <div className="w-100 flex justify-end mb3 mr5 ttc">
                    <Button variant="outlined" onClick={this.props.noScope}>Back</Button>
                </div>
                {this.state.errorFields===true && <ErrorMessage errorMessage={"Complete all fields"}/>}
                <form className="workout-form" onSubmit={this.workoutSubmits}>
                    <input 
                    className="workout-input"
                    type="text" 
                    placeholder='exercise'
                    autoComplete="off"
                    onChange={this.onNameExChange}
                    value={this.state.nameEx}
                    />
                    <input 
                    className="workout-input"
                    type="number" 
                    placeholder='reps'
                    autoComplete="off"
                    onChange={this.onRepsChange}
                    value={this.state.reps}
                    />
                    <input 
                    className="workout-input"
                    type="number" 
                    placeholder='sets'
                    autoComplete="off"
                    onChange={this.onSetsChange}
                    value={this.state.sets}
                    />
                    <input 
                    className="add-workout-button"
                    type="submit" 
                    value="add"
                    />
                </form>
                <div ref={this.state.wrapper} className="w-100 flex justify-center items-center">
                    <FormControl ref={this.state.wrapper}>
                        <InputLabel ref={this.state.wrapper} id="select-autowidth-label">Workouts</InputLabel>
                        <Select
                        labelId="dselect-autowidth-label"
                        id="select-autowidth"
                        value={this.state.workout}
                        onChange={this.ideasHandleChange}
                        autoWidth
                        ref={this.state.wrapper}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value={"Biceps"}>Biceps</MenuItem>
                            <MenuItem value={"Triceps"}>Triceps</MenuItem>
                            <MenuItem value={"Chest"}>Chest</MenuItem>
                            <MenuItem value={"Back"}>Back</MenuItem>
                            <MenuItem value={"legs"}>Shoulders</MenuItem>
                            <MenuItem value={"legs"}>Legs</MenuItem>
                            </Select>
                            <FormHelperText>You don't know what to work?</FormHelperText>
                    </FormControl>
                    <div className="ml2">
                    <Button className="h-50"variant="outlined" onClick={this.onClickIdeas}>Find</Button>
                    </div>
                </div>
                {this.state.workoutIdeas.length>=1 && <WokroutsIdeasTable workoutIdeas={this.state.workoutIdeas}/>}
                <Exercises
                checkAdd={true} 
                exercise={this.state.exercises} 
                onDelete={this.onDelelteHandler}
                />
                {this.state.exercises.length>=1
                &&
                <div className="mb3">
                    <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={this.onSaveWorkoutClickHandler}
                    startIcon={<SaveIcon />}
                    >Save</Button>
                </div>}
            </div>
        )
    }
}

export default AddExercises;