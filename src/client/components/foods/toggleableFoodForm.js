import React from 'react';

import FoodForm from './helpersComponents/foodForm';

export default class ToggleableFoodForm extends React.Component {
    state = {
        isOpen: false,
    }

    handleFormOpen = () => {
        this.setState({ isOpen: true });
    };

    handleFormClose = () => {
        this.setState({ isOpen: false });
    };

    handleFormSubmit = (food) => {
        this.props.onFormSubmit(food);
        this.setState({ isOpen: false });
    };
    
    render() {
        if (this.state.isOpen) {
            return (
                <FoodForm
                    onFormSubmit={this.handleFormSubmit}
                    onFormClose={this.handleFormClose} 
                />
            );
        } else {
            return (
                <div className='ui basic content center aligned segment'>
                    <button 
                        className='ui basic button icon'
                        onClick={this.handleFormOpen}
                    >
                        <i className='plus icon'/>
                    </button>
                </div>
            )
        }
    }
}
