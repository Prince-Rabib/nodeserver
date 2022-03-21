const express = require('express');
const appointment = require('./api/appointment');
const mechanic = require('./api/mechanics');
const cors = require('cors');

const connectdb = require('./config/db');

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT);
});


app.use(cors());
app.use(express.json({ extended: false }));

connectdb();

app.get('/', (req, res) => {
  return res.send('app is running');
});


app.use('/api/mechanics', mechanic);
app.use('/api/appointment', appointment);



