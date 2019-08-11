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

app.get('/api/foodlist/:id', (req,res) => {
  const food = foodlist.find(i => i.id === parseInt(req.params.id));
  if(!food) return res.status(404).send('Ooops, makanan yang anda cari tidak ditemukan');
  res.send(food);
});




const port = process.env.PORT || 3800;
app.listen(port, () => console.log(`Listening on port ${port}...`));