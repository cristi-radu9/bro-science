import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Alert from '@material-ui/lab/Alert';
import './Nutrition.css'
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';


class Nutrition extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: "1 apple",
            title: 'Recipe Title',
            yield: 1,
            displayAlert: true,
            nutritionInfo: {},
            wantToTrack: false,
            goal: 0,
            date: this.getDate(),
            viewProgress: false,
            goalFromDb:0,
            caloriesFromDb:0,
            noGoal:false,
            noCalories:false
        }
    }

    getDate = () => {
        var today = new Date();
        var month = "";
        var day = "";
        if ((today.getMonth() + 1) <= 9) {
            month = "0" + (today.getMonth() + 1)
        } else {
            month = (today.getMonth() + 1)
        }

        if (today.getDate() <= 9) {
            day = "0" + today.getDate();
        } else {
            day = today.getDate();
        }

        var date = today.getFullYear() + '-' + month + '-' + day;
        return date;
    }

    textAreaChange = (event) => {
        this.setState({ search: event.target.value })
    }

    onNutritionClick = () => {
        console.log(this.state.search.split("\n"))
        let APP_ID = "344e9240";
        let APP_KEY = "e594aca390a71a17d00bb4c5040a6727";
        fetch(`https://api.edamam.com/api/nutrition-details?app_id=${APP_ID}&app_key=${APP_KEY}`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: this.state.title,
                yield: this.state.yield,
                ingr: this.state.search.split("\n")
            })
        }).then(response => response.json())
            .then(response => {
                console.log(response);
                this.setState({ nutritionInfo: response })
            })
    }

    onCaloricGoalChange = (event) => {
        this.setState({ goal: event.target.value })
    }

    onTrackClick = () => {
        if (this.props.user.username.length >= 1) {
            if (this.state.goal >= 1) {
                fetch('http://localhost:3000/AddGoal', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        goal: this.state.goal,
                        date: this.state.date,
                        userId: this.props.user.id
                    })
                }).then(response => response.json())
                    .then(response => {
                        console.log(response);
                    })
            }
        } else {
            this.props.onRouteChange('login', false);
        }
    }

    onSaveClick=()=>{
        if(this.props.user.username.length>=1){
            fetch('http://localhost:3000/SaveCalories', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        calories: this.state.nutritionInfo.calories,
                        date: this.state.date,
                        userId: this.props.user.id
                    })
                }).then(response => response.json())
                    .then(response => {
                        console.log(response);
                    })
        }else{
            this.props.onRouteChange('login', false);
        }
    }

    onViewProgress=()=>{
        if(this.props.user.username.length>=1){
            fetch(`http://localhost:3000/ViewProgress/${this.props.user.id}/${this.state.date}`)
            .then(response=>response.json())
            .then(response=>{
                console.log(response)
                if(response==='no goal'){
                    this.setState({noGoal:true});
                    this.setState({viewProgress:true});
                }else if(response==='no calories'){
                    this.setState({noCalories:true});
                    this.setState({viewProgress:true});
                }else{
                    this.setState({viewProgress:true});
                    this.setState({goalFromDb:response.goal})
                    this.setState({caloriesFromDb:response.totalCalories})
                }
            })
        }else{
            this.props.onRouteChange('login', false);
        }
    }

    render() {
        return (
            <div className="mt5 w-100 flex flex-column justify-center items-center">
                <h1 className="receipes-title">Nutrition Details</h1>

                {this.state.displayAlert === true
                    ? <Alert severity="warning" onClose={() => { this.setState({ displayAlert: false }) }}>Food that isn't ready for consmption will not be matched.Example: raw meats or raw goods.</Alert>
                    : null}

                <h3 className="i">Enter the ingredients here</h3>
                <div className="nutrition-form">
                    <TextareaAutosize className="nutrition-textarea" onChange={this.textAreaChange} value={this.state.search} aria-label="minimum height" rowsMin={3} placeholder="Please write each ingredient on a line" />
                    <div className="nutrition-button">
                        <Button variant="contained" color="secondary" onClick={this.onNutritionClick}>Search</Button>
                    </div>
                </div>


                {this.state.nutritionInfo.error === "low_quality"
                    ? <Alert severity="error" onClose={() => { this.setState({ nutritionInfo: {} }) }}>Please check the spelling or if the quantity is itroduced and try again</Alert>
                    : null
                }
                <h2 className="caloric-goal" onClick={() => this.setState({ wantToTrack: true })}>I want to add a caloric goal for today</h2>

                {
                    this.state.wantToTrack === true
                        ? <div className="goal-track">
                            <input type="number" className="goal-input" onChange={this.onCaloricGoalChange} />
                            <Button variant="contained" color="secondary" onClick={this.onTrackClick}>Track</Button>
                        </div>
                        : null
                }

                <h2 className="caloric-goal" onClick={this.onViewProgress}>View progress</h2>

                {
                    this.state.viewProgress===true && this.state.noGoal===true && this.state.noCalories===false
                    ?<Alert severity="error">Please set a goal the check the progress again</Alert>
                    :this.state.viewProgress===true && this.state.noGoal===false && this.state.noCalories===true
                    ?<Alert severity="error">Please add some food then check the progress again</Alert>
                    :this.state.viewProgress===true && this.state.noGoal===false && this.state.noCalories===false
                    ?<h3 className="i mb4">Your goal is: {this.state.goalFromDb} and you have a total calories of {this.state.caloriesFromDb} for today</h3>
                    :null
                }

                {
                    Object.entries(this.state.nutritionInfo).length !== 0 && this.state.nutritionInfo.error !== "low_quality"
                        ? <div className="info-container">
                            <h2 className=" h3-style ">Calories:{this.state.nutritionInfo.calories}</h2>

                            <div className="container-position">
                                <h3 className="h3-style">Caution</h3>
                                {this.state.nutritionInfo.cautions.map(caution => {
                                    return <div className="enumeration" key={caution}>{caution}</div>
                                })}
                            </div>

                            <div className="container-position">
                                <h3 className="h3-style" >Diets</h3>
                                {this.state.nutritionInfo.dietLabels.map(diets => {
                                    return <div className="enumeration" key={diets}>{diets}</div>
                                })}
                            </div>

                            <div className="container-position">
                                <h3 className="h3-style" >Health Labels</h3>
                                {this.state.nutritionInfo.healthLabels.map(health => {
                                    return <span className="enumeration" key={health}> {health}, </span>
                                })}
                            </div>
                            <div className="container-position">
                                <h3 className="h3-style" >Total Nutrients</h3>
                                {Object.entries(this.state.nutritionInfo.totalNutrients).map(nutrient => {
                                    return <div className="enumeration nutrients-position" key={nutrient[1].label}>
                                        <span className="span-position">{nutrient[1].label}</span>
                                        <span className="span-position">{nutrient[1].quantity} </span>
                                        <span className="span-position">{nutrient[1].unit}</span>
                                    </div>
                                })}
                            </div>

                            <div className="w-100 flex justify-center">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    onClick={this.onSaveClick}
                                    startIcon={<SaveIcon />}
                                >Save</Button>
                            </div>

                        </div>
                        : null
                }
            </div>
        )
    }
}

export default Nutrition;