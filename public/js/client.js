/* eslint-disable no-console */
/* eslint-disable no-undef */
window.client = (function () {
  function getFoods(success) {
    return fetch('/api/foods', {
      headers: {
        Accept: 'application/json',
      },
    }).then(checkStatus)
      .then(parseJSON)
      .then(success);
  }

  function createFood(data) {
    return fetch('/api/foods', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(checkStatus);
  }

  function hasRecipe(data) {
    return fetch('/api/myingredients', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(checkStatus)
      .then(parseJSON);
  }

  function findByFoodName(searchTerm) {
    return fetch(`/api/foods/${searchTerm}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(checkStatus)
      .then(parseJSON);
  }

  function updateFood(data) {
    return fetch('/api/foods', {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(checkStatus);
  }

  function deleteFood(data) {
    return fetch('/api/foods', {
      method: 'delete',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(checkStatus);
  }

  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new Error(`HTTP Error ${response.statusText}`);
      error.status = response.statusText;
      error.response = response;
      console.log(error);
      throw error;
    }
  }

  function parseJSON(response) {
    return response.json();
  }

  return {
    getFoods,
    findByFoodName,
    createFood,
    hasRecipe,
    updateFood,
    deleteFood,
  };
}());
