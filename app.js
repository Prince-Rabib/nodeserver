const express = require('express');
const appointment = require('./api/appointment');
const mechanic = require('./api/mechanics');
const cors = require('cors');

const connectdb = require('./config/db');

const app = express();


app.use(cors());
app.use(express.json({ extended: false }));

connectdb();

app.get('/', (req, res) => {
  return res.send('app is running');
});


app.use('/api/mechanics', mechanic);
app.use('/api/appointment', appointment);

const PORT = process.env.PORT || 5000;

const server = app.listen(process.env.PORT || 5000, () => {
  const port = server.address().port;
  console.log(`Express is working on port ${port}`);
});
