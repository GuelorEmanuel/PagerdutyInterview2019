import React from 'react';

export default class FoodForm extends React.Component {
    state = {
        title: this.props.title || '',
        ingredients: this.props.ingredients || '',
    };

    handleTitleChange = (e) => {
        this.setState({ title: e.target.value });
    };

    handleIngredientsChange = (e) => {
        this.setState({ ingredients: e.target.value });
    };


    handleSubmit = () => {
        this.props.onFormSubmit({
            id: this.props.id,
            title: this.state.title,
            ingredients: this.state.ingredients,
        });
    };

    render() {
        const submitText = this.props.id ? 'Update' : 'Create';

        return (
            <div className='ui centered card'>
                <div className='content'>
                    <div className='ui form'>
                        <div className='field'>
                            <label>Title</label>
                            <input 
                                type='text' 
                                defaultValue={this.state.title}
                                onChange={this.handleTitleChange}
                            />
                        </div>
                        <div className='field'>
                            <label>Ingredients</label>
                            <input 
                                type='text' 
                                defaultValue={this.state.ingredients}
                                onChange={this.handleIngredientsChange}
                            />
                        </div>
                        <div className='ui two bottom attached buttons'>
                            <button 
                                className='ui basic blue button'
                                onClick={this.handleSubmit}
                            >
                                {submitText}
                            </button>
                            <button 
                                className='ui basic red button'
                                onClick={this.props.onFormClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }   
}