const express = require('express');
const glob = require('glob');

const app = express();

app.use(express.static('public'));

app.get('/random_background', (req, res) => {
    glob("public/images/backgrounds/**/*", (err, files) => {
        const fileIndex = Math.floor(Math.random() * files.length);
        res.send(files[fileIndex].replace("public/", ""));
    });
});

app.listen(4000, ()=> console.log(`Listening on port 4000`));