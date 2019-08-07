import React from 'react';

import FoodActionButton from './foodActionButton';


export default class Food extends React.Component {

    handleTrashClick = () => {
        this.props.onTrashClick(this.props.id);
    };

    handleViewIngredientsClick = () => {
        this.props.onViewIngredientsClick(this.props.id);
    };

    render() {
        return (
          <div className='ui centered card'>
            <div className='content'>
                <div className='header'>
                    {this.props.title}
                </div>
              
                <div className='center aligned description'>
                </div> 
                <div className='extra content'>
                    {/* <span 
                        className='right floated edit icon'
                        onClick={this.props.onEditClick}
                    >
                        <i className='edit icon'/>
                    </span> */}
                    <span 
                        className='right floated trash icon'
                        onClick={this.handleTrashClick}
                    >
                        <i className='trash icon'/>
                    </span>
                </div>
            </div>
            <FoodActionButton 
                onViewIngredientsClick={this.handleViewIngredientsClick}
            />
          </div>  
        );
    }
}