import React from 'react';

export default class FoodIngredientsList extends React.Component {

    render() {
        const ingredients = this.props.ingredients.split(',').map(
            (ingredient) => (
                <div className='item'
                     ingredient={ingredient}
                >
                    {ingredient}
                </div>
            ) /* Is there a difference between closing the block map with either {} or () ?
                 With {} we need to explicitly return the block whereas with () the block is 
                 implicitly returned for us.
               */
        );
        return (
            <div className='ui list' id='foods'>
               {ingredients}
            </div>
        );
    }
}