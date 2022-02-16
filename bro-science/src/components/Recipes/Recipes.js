import React, { Component } from 'react';
import './Recipes.css'
import Recipe from './Recipe/Recipe'
import RecipeNutrients from './Recipe/RecipeNutrients/RecipeNutrients'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Filters from './Filters/Filters';

class Recipes extends Component{

    constructor(props){
        super(props);
        this.state={
            inputValue:"",
            recipes:[],
            showNutrientsDetails:false,
            recipe:{},
            errorMessage:"",
            isFiltered:false,
            caloriesFrom:"",
            caloriesTo:"",
            diet:""
        }
    }

    onInputValueChange=(event)=>{
        this.setState({inputValue:event.target.value})
        console.log(this.state.caloriesFrom)
    }

    onCaloriesFromChange=(event)=>{
        this.setState({caloriesFrom:event.target.value})
        console.log(this.state.caloriesTo)
    }

    onCaloriesToChange=(event)=>{
        this.setState({caloriesTo:event.target.value})
        console.log(this.state.diet)
    }

    onDietChange=(event)=>{
        this.setState({diet:event.target.value})
    }

    getData(){
        const APP_ID="4d347f16";
        const APP_KEY="891ada19106f34a20658ce9ed7d9522d";
        let apiCall="";
        if(this.state.caloriesFrom!=="" && this.state.caloriesTo!=="" && this.state.diet!=="" &&this.state.isFiltered){
            apiCall=`https://api.edamam.com/search?q=${this.state.inputValue}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=10&calories=${this.state.caloriesFrom}-${this.state.caloriesTo}&health=${this.state.diet}`
        }else{
            apiCall=`https://api.edamam.com/search?q=${this.state.inputValue}&app_id=${APP_ID}&app_key=${APP_KEY}`;
        }
        if(this.state.inputValue!==""){
            fetch(apiCall)
            .then(response=>response.json())
            .then(response=>{
                if(response.more){
                    this.setState({recipes:response.hits});
                    console.log(this.state.recipes)
                    this.setState({errorMessage:""})
                }else{
                    this.setState({errorMessage:"Invalid search!"})
                }
                
            })
            this.setState({inputValue:""});
        }else{
            this.setState({errorMessage:"Please fill in the form!"});
        }
        
    }

    onSubmit=(event)=>{
        event.preventDefault();
        this.getData();
    }

    clickHandlerForNutrients = () => {
        this.setState({ showNutrientsDetails: false })
    }

    displayNutrients = (rcp) => {
        this.setState({ showNutrientsDetails: true });
        this.setState({recipe:rcp});
    }

    render(){
        return(
            <div className="mt5 flex flex-column items-center">
                <h1 className="receipes-title">Search Receipes</h1>
                {this.state.errorMessage
                ?<ErrorMessage errorMessage={this.state.errorMessage} />
                :<div></div>}
                <form className="recipesForm" onSubmit={this.onSubmit}>
                    <input 
                    className="search"
                    type="text" 
                    placeholder='ex: "chicken"'
                    autoComplete="off"
                    onChange={this.onInputValueChange}
                    value={this.state.inputValue}
                    />
                    <input
                    className="searchButton"
                    type="submit"
                    value="search"
                    />
                    {this.state.isFiltered
                    ?<Filters
                     onCaloriesFromChange={this.onCaloriesFromChange} 
                     onCaloriesToChange={this.onCaloriesToChange} 
                     onDietChange={this.onDietChange} 
                     caloriesFrom={this.state.caloriesFrom}
                     caloriesTo={this.state.caloriesTo} 
                     diet={this.state.diet} 
                     />
                    :<div></div>
                    }
                    <input
                    className="filterButton"
                    type="button"
                    value="\/"
                    onClick={()=>this.setState({isFiltered:!this.state.isFiltered})}
                    />
                </form>
                {this.state.showNutrientsDetails
                ?<div className="w-100 h-100 flex items-center justify-center">
                    <RecipeNutrients recipe={this.state.recipe} clickHandlerForNutrients={this.clickHandlerForNutrients}/>
                </div>
                :<div className="recipesArray">
                    {this.state.recipes!==[]
                    && this.state.recipes.map(recipe=>{
                        return(<Recipe key={recipe.recipe.label} recipe={recipe.recipe} displayNutrients={this.displayNutrients}/>)
                    })}
                </div>}
            </div>
        )
    }
}

export default Recipes;