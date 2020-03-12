const express = require('express');
const mongoose = require('mongoose');
const ShortURL = require('./models/ShortURL');
const app = express();

mongoose.connect('mongodb://localhost/urlShortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false}));

// routing
app.get('/', async (req, res) => {
    const shortUrls = await ShortURL.find();
    res.render('index', { shortUrls: shortUrls});
});

app.post('/shortenUrl', async (req, res) => {
    console.log(`url is ${req.body.url}`);
    const url = await ShortURL.findOne({ full:  req.body.url });
    if (url == null) {
        await ShortURL.create({
            full: req.body.url
        });
    }
    res.redirect('/');
});

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortURL.findOne({ short:  req.params.shortUrl });
    if (shortUrl == null) return res.sendStatus(404);
    shortUrl.clicks++;
    shortUrl.save();

    res.redirect(shortUrl.full);
})

app.listen(process.env.port || 5000);
