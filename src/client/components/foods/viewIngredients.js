import React from 'react';

import FoodIngredientsList from './helpersComponents/foodIngredientsList';

export default class ViewIngredients extends React.Component {

    handleTrashClick = () => {
        this.props.onTrashClick(this.props.food.id);
    };
    
    handleButtonClick = () => {
        this.props.onBackToFoodDashBoard();
    };

    render() {
        return (
          <div className='ui centered card'>
            <div className='content'>
                <div className='header'>
                    {`${this.props.food.title} Ingredients`}
                </div>
              
                <div className='center aligned description'>
                    <FoodIngredientsList 
                        ingredients={this.props.food.ingredients}
                        id={this.props.food.id}
                    />
                </div> 
            </div>
            <button 
                class="ui labeled icon button"
                onClick={this.handleButtonClick}
            >
                <i class="left chevron icon"></i>
                Back
            </button>
          </div>  
        );
    }
}