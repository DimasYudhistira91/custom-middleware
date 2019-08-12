const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('@hapi/joi');
const logger = require('./logger');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled...');
}

app.use(logger);

app.use(function(req, res, next) {
  console.log('Authenticating...');
  next();
});

const foodlist = [
  { id: 1, makanan: 'Ayam goreng' },
  { id: 2, makanan: 'Tempe bacem' },
  { id: 3, makanan: 'Tahu bulat' },
  { id: 4, makanan: 'Mendoan' },
  { id: 5, makanan: 'Sate Kambing' }
];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/foodlist', (req, res) => {
  res.send(foodlist);
});

app.get('/api/foodlist/:id', (req,res) => {
  const food = foodlist.find(i => i.id === parseInt(req.params.id));
  if(!food) return res.status(404).send('Ooops, makanan yang anda cari tidak ditemukan');
  res.send(food);
});

app.post('/api/foodlist', (req, res) => {
  const {error} = validasiFood(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const food = {
    id: foodlist.length + 1,
    makanan: req.body.makanan
  };

  foodlist.push(food);
  res.send(food);
});

app.put('/api/foodlist/:id', (req, res) => {
  const food = foodlist.find(i => i.id === parseInt(req.params.id));
  if(!food) return res.status(404).send('Ooops, makanan yang anda cari tidak ditemukan');

  const {error} = validasiFood(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  food.makanan = req.body.makanan;
  res.send(food);
});

app.delete('/api/foodlist/:id', (req, res) => {
  const food = foodlist.find(i => i.id === parseInt(req.params.id));
  if(!food) return res.status(404).send('Ooops, makanan yang anda cari tidak ditemukan');

  const index = foodlist.indexOf(food);
  foodlist.splice(index, 1);

  res.send(food);
});

function validasiFood(food) {
  const skema = {
    makanan: Joi.string().min(3).required()
  };

  return Joi.validate(food, skema);
}


const port = process.env.PORT || 3800;
app.listen(port, () => console.log(`Listening on port ${port}...`));