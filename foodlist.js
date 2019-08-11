const Joi = require('@hapi/joi');
const express = require('express');
const app = express();

app.use(express.json());

const foodlist = [
  { id: 1, makanan: 'Ayam goreng' },
  { id: 2, makanan: 'Tempe bacem' },
  { id: 3, makanan: 'Tahu bulat' },
  { id: 4, makanan: 'Mendoan' },
  { id: 5, makanan: 'Sate Kmabing' }
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




const port = process.env.PORT || 3800;
app.listen(port, () => console.log(`Listening on port ${port}...`));