const express = require('express');
const axios = require('axios');
const glob = require('glob');

const app = express();

app.use(express.static('public'));
app.use(express.static('web-build'));

app.get('/random_background', (req, res) => {
  // For local testing with external server uncomment this
  // axios.get('http://pi.local-only.lan/random_background').then( axiosRes => {
  //   res.setHeader('Access-Control-Allow-Origin', '*');
  //   res.send({
  //     image: axiosRes.data
  //   });
  // }).catch(console.warn);
  glob("public/images/backgrounds/**/*", (err, files) => {
    if (files && files.length > 0) {
      const fileIndex = Math.floor(Math.random() * files.length);
      res.send(files[fileIndex].replace("public/", ""));
    } else {
      res.status(500).send('no files found');
    }
  });
});

app.listen(4000, ()=> console.log(`Listening on port 4000`));