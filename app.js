const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/data', (req, res) => {
    res.send(JSON.stringify([1, 2, 3, 4, 6]));
});

app.get('/api/data/:id/:name', (req, res) => {
    res.send(req.query);
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));