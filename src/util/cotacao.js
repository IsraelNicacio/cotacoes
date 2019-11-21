const request = require('request');

const cotacao = (symbol, callback) => {

    const apiToken = 'i10KqffsXXyJaGdNqGBKHxMTrD742TkAWUe8njoStI9p3gmwVkmh2xChf3dD';
    const url = `https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${apiToken}`;

    request({ url: url, json: true }, (err, response) => {

        if (err) {
            return callback({
                code: 500,
                message: `Ocorreu algum erro: ${err}`
            }, undefined);
        }

        if (response.body === undefined || response.body.Error === undefined) {
            return callback({
                code: 404,
                message: 'Dados nao encontrados'
            }, undefined);
        }

        const parseJson = response.body.data[0];
        const { symbol, price_open, price, day_high, day_low } = parseJson;

        callback(undefined, { symbol, price_open, price, day_high, day_low });
    });
};

module.exports = cotacao;