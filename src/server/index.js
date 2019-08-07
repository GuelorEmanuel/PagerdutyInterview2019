/* eslint-disable no-param-reassign */
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

const DATA_FILE = path.join(__dirname, 'data.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static('dist'));
app.use('/assets', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.get('/api/foods', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/api/foods', (req, res) => { 
  fs.readFile(DATA_FILE, (err, data) => {
    const foods = JSON.parse(data);
    const newFood = {
      title: req.body.title,
      id: req.body.id,
      ingredients: req.body.ingredients,
    };
    foods.push(newFood);
    fs.writeFile(DATA_FILE, JSON.stringify(foods, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(foods);
    });
  });
});

app.post('/api/foods/:foodname', (req, res) => { 
  fs.readFile(DATA_FILE, (err, data) => {
    let foods = JSON.parse(data);
     foods =  foods.filter( food => food.title.trim().toLowerCase() === req.params.foodname.trim().toLowerCase());

     res.setHeader('Cache-Control', 'no-cache');
     res.json(foods);
  });
});

function hasRecipe(foodIngredients, userIngredients) {
  let  dic = {};
  const foodIngredientsLen = foodIngredients.length;

  for (i = 0; i < foodIngredients.length; i++) {
    const ingredient = foodIngredients[i].toLowerCase().trim();

    dic[ingredient] = false; 
  }
  
  let matchFound = 0;

  for (j = 0; j < userIngredients.length; j++) {
    const ingredient = userIngredients[j].toLowerCase().trim();
    
    if ( ingredient !== '' && (ingredient in  dic)) {
      matchFound += 1;
    }
  }

  return matchFound === foodIngredientsLen;
}

function findRecipe(userIngredients, foods) {
  return foods.filter((food) => {
    if (food.ingredients === "") {
      return false
    }

    const tempIngredients = food.ingredients.split(',');

    return hasRecipe(tempIngredients, userIngredients.split(','));
  });
}

app.post('/api/myingredients', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    let foods = JSON.parse(data);

    foods = findRecipe(req.body.searchTerm, foods);
    res.setHeader('Cache-Control', 'no-cache');
    res.json(foods);
  });

});

app.put('/api/foods', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const foods = JSON.parse(data);

    foods.forEach((food) => {
      if (food.id === req.body.id) {
        food.title = req.body.title;
      }
    });
    fs.writeFile(DATA_FILE, JSON.stringify(foods, null, 4), () => {
      res.json({});
    });
  });
});

app.delete('/api/foods', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    let foods = JSON.parse(data);

    foods = foods.reduce((memo, food) => {
      if (food.id === req.body.id) {
        return memo;
      } else {
        return memo.concat(food);
      }
    }, []);
    fs.writeFile(DATA_FILE, JSON.stringify(foods, null, 4), () => {
      res.json({});
    });
  });
});

app.get('/molasses', (_, res) => {
  setTimeout(() => {
    res.end();
  }, 5000);
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
