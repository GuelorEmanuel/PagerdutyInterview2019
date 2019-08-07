window.helpers = (function () {
  function newFood(attrs = {}) {
    const food = {
      title: attrs.title || 'Food',
      ingredients: attrs.ingredients,
      id: uuid.v4(), // eslint-disable-line no-undef
    };

    return food;
  }

  function findById(array, id, cb) {
    array.forEach((el) => {
      if (el.id === id) {
        cb(el);
        return;
      }
    });
  }
   
  return {
    newFood,
    findById,
  };
}());
