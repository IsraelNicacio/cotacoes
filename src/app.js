const path = require('path');
const express = require('express');
const hbs = require('hbs');
const cotacoes = require('./util/cotacao');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        Title: 'Bem vido ao sistema de cotações',
        Autor: 'Israel'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        Title: 'Sobre',
        Autor: 'Israel'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        Title: 'Ajuda',
        Autor: 'Israel'
    });
});

app.get('/cotacoes', (req, res) => {

    if (!req.query.ativo) {
        return res.status(400).json({
            message: 'Ativo deve ser informado'
        });
    }

    const symbol = req.query.ativo;
    console.log(req.query.ativo);

    cotacoes(symbol, (err, body) => {
        if (err) {
            const { message, code } = err;
            return res.status(code).json(message);
        }

        console.log(body);
        res.status(200).json(body);
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        Title: '404',
        errormessage: 'Pagina não encontrada'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        Title: '404',
        errormessage: 'Pagina não encontrada'
    });
});

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`server is up port ${port}`);
});