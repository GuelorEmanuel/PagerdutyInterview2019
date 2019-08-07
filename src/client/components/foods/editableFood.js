import React from 'react';

import FoodForm from './helpersComponents/foodForm';
import Food from './helpersComponents/food';

export default class EditableFood extends React.Component {
    state = {
        editFormOpen: false,
    }

    handleEditClick = () => {
        this.openForm()
    };

    handleFormClose = () => {
        this.closeForm();
    };

    handleSubmit = (food) => {
        this.props.onFormSubmit(food);
        this.closeForm();
    };

    closeForm = () => {
        this.setState({ editFormOpen: false });
    };

    openForm = () => {
        this.setState({ editFormOpen: true });
    };

    render() {
        if (this.state.editFormOpen) {

            return (
                <FoodForm 
                    id={this.props.id}
                    title={this.props.title}
                    ingredients={this.ingredients}
                    onFormSubmit={this.handleSubmit}
                    onFormClose={this.handleFormClose}
                />
            );
        } else {
            return (
                <Food
                    id={this.props.id}
                    title={this.props.title}
                    ingredients={this.props.ingredients}
                    onTrashClick={this.props.onTrashClick}
                    onViewIngredientsClick={this.props.onViewIngredientsClick}
                />
            );
        }
    }
}