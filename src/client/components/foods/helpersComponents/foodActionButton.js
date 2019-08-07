import React from 'react';


export default class FoodActionButton extends React.Component {

    handleButtonClick = () => {
        this.props.onViewIngredientsClick();
    };
    render() {
   
        return (
            <div
                className='ui bottom attached green basic button'
                onClick={this.handleButtonClick}
            >
                View Recipe
            </div>
        )
        
    }
}