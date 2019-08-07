import React from 'react';

import EditableFood from './editableFood';

export default class EditableFoodList extends React.Component {

    render() {
        const foods = this.props.foods.map(
            (food) => (
                <EditableFood
                    key={food.id}
                    id={food.id}
                    title={food.title}
                    ingredients={food.ingredients}
                    onFormSubmit={this.props.onFormSubmit}
                    onTrashClick={this.props.onTrashClick}
                    onViewIngredientsClick={this.props.onViewIngredientsClick}
                />
            ) /* Is there a difference between closing the block map with either {} or () ?
                 With {} we need to explicitly return the block whereas with () the block is 
                 implicitly returned for us.
               */
        );
        return (
            <div id='foods'>
               {foods}
            </div>
        );
    }
}