import React, { Component } from 'react'
import './Recipe.css'

class Recipe extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div className="recipe">
                <h2 className="recipeLabel">{this.props.recipe.label}</h2>
                <img className="recipeImage" src={this.props.recipe.image} alt={this.props.recipe.label} />
                <a className="recipeInfo" href={this.props.recipe.url} target="_blank" rel="noopener noreferrer">Recipe here</a>
                <button className="recipeButton" onClick={() => this.props.displayNutrients(this.props.recipe)}>Nutrients</button>
            </div>
        )
    }

}

export default Recipe;