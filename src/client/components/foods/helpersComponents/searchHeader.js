import React from 'react';

export default class SearchHeader extends React.Component {

    handleSearchClick = () => {
        this.props.onTrashClick(this.props.id);
    };

    handleAddIngredientReturnKey = (event, data) => {
        this.props.onSearch(event.target.value)
    };

    render() {
        const placeholder = "Add mutilple search term for my ingredient search";
        const divStyle = {
            paddingRight: "40px",
            paddingLeft: "40px",
            paddingBottom: "40px"
        };
        return (
            // className='ui three column centered grid'
            <div style= {divStyle}>
                <div class="ui icon input column centered grid">
                    <input type="text" placeholder={placeholder} onChange={this.handleAddIngredientReturnKey}/>
                    <i aria-hidden="true" class="search icon"></i>
                </div>
            </div>
        );
    }
}