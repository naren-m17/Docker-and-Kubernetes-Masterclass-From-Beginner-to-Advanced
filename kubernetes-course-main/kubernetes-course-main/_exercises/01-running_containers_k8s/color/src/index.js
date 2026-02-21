const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const color = "blue";

app.use(bodyParser.json()); // ← FIXED

app.get('/', (req, res) =>{
    res.send({color});
});

app.listen(port, ()=>{
    console.log(`Server listening to port : ${port}`);
});
