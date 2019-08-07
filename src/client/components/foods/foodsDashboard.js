import React from 'react';

import EditableFoodList from  './editableFoodList';
import ToggleableFoodForm from './toggleableFoodForm';
import ViewIngredients from './viewIngredients';
import SearchHeader from './helpersComponents/searchHeader';


export default class FoodsDashboard extends React.Component {
    state = {
        foods: [],
        isIngredientsView: false,
        food: {},
        userIgredients: [],
        loadFoodsFromServerIntervalID: null
    };

    componentDidMount() {
        this.loadFoodsFromServer();
        this.addLoadFromServerInterval();
    };

    addLoadFromServerInterval = () => {
        const loadFoodsFromServerIntervalID = setInterval(this.loadFoodsFromServer, 5000);

        this.setState({ loadFoodsFromServerIntervalID });
    };

    clearLoadFromServerInterval = () => {
        const loadFoodsFromServerIntervalID = null;

        clearInterval(this.state.loadFoodsFromServerIntervalID);
        this.setState({ loadFoodsFromServerIntervalID });

    };

    componentWillUnmount() {
        this.clearLoadFromServerInterval();
    };

    loadFoodsFromServer = () => {
        client.getFoods((serverFoods) => (
            this.setState({ foods: serverFoods })
            )
        );
    };



    handleCreateFormSubmit = (food) => {
        this.createFood(food);
    };

    handleEditFormSubmit = (attrs) => {
        this.updateFood(attrs);
    };

    handleTrashClick = (foodId) => {
        this.deleteFood(foodId);
    };

    handleViewIngredientsClick = (foodId) => {
        const food = this.state.foods.filter( food => food.id === foodId);

        this.setState({ food: food[0], isIngredientsView: true });
    };

    handleViewFoodsClick = () => {
        this.setState({ isIngredientsView: false });
    };

    handleSearch = (searchTerm) => {
        const isNormalSearch = searchTerm.includes(',');

        this.clearLoadFromServerInterval();
        if ( searchTerm.trim() && isNormalSearch ) {
            
            const clientIngredients = { searchTerm: searchTerm.trim()};
            client.hasRecipe(clientIngredients)
            .then( foundFoods => {
                this.setState({ foods: foundFoods })
            });

        } else if( !isNormalSearch) {
            if (searchTerm.trim() === '') {
                this.loadFoodsFromServer();
                this.addLoadFromServerInterval();
            }else {
            client.findByFoodName(searchTerm.trim())
            .then( foundFoods => {
                this.setState({ foods: foundFoods })
            });
            }
        } else if( this.state.loadFoodsFromServerIntervalID === null ) {
            this.loadFoodsFromServer();
            this.addLoadFromServerInterval();
        }
    };

    createFood = (food) => {
        // optimistic updating: update locally before waiting to hear back from server
        const t = helpers.newFood(food);

        this.setState({
            foods: this.state.foods.concat(t),
        });

        client.createFood(t);
    };

    updateFood = (attrs) => {

    };

    deleteFood = (foodId) => {
        // optimistic updating: delete locally before waiting to hear back from server
        this.setState({
            foods: this.state.foods.filter(food => food.id !== foodId),
        });

        client.deleteFood({ id: foodId });
    };

    render() {
        return (
            <div>
                {
                    this.state.isIngredientsView  ?
                    (<di></di>):
                    (<SearchHeader onSearch={this.handleSearch}></SearchHeader>)

                }
                
                <div className='ui three column centered grid'>
                    
                    <div className='column'>
                        {
                            !this.state.isIngredientsView ?
                                (
                                    <div>
                                        <EditableFoodList 
                                            foods={this.state.foods}
                                            onFormSubmit={this.handleEditFormSubmit}
                                            onTrashClick={this.handleTrashClick}
                                            onViewIngredientsClick={this.handleViewIngredientsClick}
                                        />
                                        <ToggleableFoodForm
                                            onFormSubmit={this.handleCreateFormSubmit}
                                        />
                                    </div>
                                ):
                                (
                                    <ViewIngredients 
                                        food={this.state.food}
                                        onViewIngredientsClick={this.handleViewIngredientsClick}
                                        onBackToFoodDashBoard={this.handleViewFoodsClick}
                                    />
                                )
                        }
                    </div>
                </div>
            </div>
        );
    }

}