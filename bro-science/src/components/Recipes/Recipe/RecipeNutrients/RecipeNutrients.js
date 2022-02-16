import React from 'react';
import './RecipeNutrients.css'

class RecipeNutrients extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }

    }

    render() {
        return (
            <div className="nutrientsContainer">
                <div className="headerContainer">
                <h2 className="nutrientsLabel">{this.props.recipe.label}</h2>
                </div>
                <div className="ulContainer">
                {Object.entries(this.props.recipe.totalNutrients).map(nutrient => {
                    return (
                        <ul key={nutrient[1].label} className="nutrientList">
                            <div className="liContainer">
                            <li className="nutrientText">{nutrient[1].label}: </li>
                            <li className="nutrientQuantity"> {nutrient[1].quantity / 10000} {nutrient[1].unit}</li>
                            </div>
                        </ul>)
                })}
                </div>
                <div className="w-100 flex justify-center">
                    <h2 className="backToRecipes" onClick={this.props.clickHandlerForNutrients}>Back</h2>
                </div>
            </div>
        )
    }

}

export default RecipeNutrients;