import React,{Component} from 'react'
import './Filters.css'

class Filters extends Component{

    render(props){
        return(
            <div className="filterContainer">
                <div className="caloriesContainer">
                    <h2>Calories:</h2>
                    <input
                    className="filtersInputStyle"
                    type="number" 
                    placeholder="From"
                    autoComplete="off"
                    onChange={this.props.onCaloriesFromChange}
                    value={this.props.caloriesFrom}
                    />
                    <input
                    className="filtersInputStyle"
                    type="number" 
                    placeholder="To"
                    autoComplete="off"
                    onChange={this.props.onCaloriesToChange}
                    value={this.props.caloriesTo}
                    />
                </div>
                <h3 className="f5 w-100">Diets:</h3>
                <input
                className="filtersInputStyle dietInputStyle" 
                type="text"
                placeholder='Ex:"vegetarian","vegan","alcohol-free"' 
                autoComplete="off"
                onChange={this.props.onDietChange}
                value={this.props.diet}
                />
            </div>
        )
    }
}

export default Filters;