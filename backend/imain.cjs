const express = require('express');
const Datastore = require('nedb');
const cors = require('cors');

const app = express();
app.use(cors());
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post('/apisearch', (request, response) => {
  const data = request.body;
  console.log(request.body);
  database.find(data, (err, d) => {
    if (err) {
      response.end();
      return;
    }
    response.json(d);
  });
});



app.post('/api', (request, response) => {
  const data = request.body;
  console.log(request.body);
  database.insert(data);
  response.json(data);
});