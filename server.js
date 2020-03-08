const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.listen(process.env.port || 5000);

// routing
app.get('/', (req, res) => {
    res.render('index');
})