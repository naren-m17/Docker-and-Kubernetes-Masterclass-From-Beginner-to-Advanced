const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const name = process.env.NAME || "Express app";

app.get( '/', (req, res) => {
    res.send(`Hello from ${name}!`);
});

app.listen( port, ()=> {
    console.log(`Server listening on port ${port}`);
});