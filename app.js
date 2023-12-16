const express = require('express');
const app = express();
const port = 9000;
const {tracksInformation} = require('./data/musics');
const CORS = require('cors');

app.use('/static', express.static('static'));
app.use('/', require('./routes/routers'));
app.use(CORS());

// One and only endpoint to serve musics
app.get('/', (req, res)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(tracksInformation);
});

app.listen(port, () => {
  console.log(`ExtendedAudio on port http://localhost:${port}`);
});