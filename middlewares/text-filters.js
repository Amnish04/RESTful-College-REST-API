const fetch = require('node-fetch');

/**
 * Checks for profanity
 */
module.exports.checkForProfanity = function(req, res, next) {
    sendRequest(req.body)
    .then(apiRes => {
        if (apiRes['is-bad']) {
            res.json(apiRes);
        } 
        else {
            next();
        } 
    })
    .catch(error => {
        console.log(error);
        res.send("error")
    })
}

function sendRequest(body) {
    let content = Object.values(body).join(" ");

    return new Promise((resolve, reject) => {
        const encodedParams = new URLSearchParams();
        encodedParams.append("censor-character", "*");
        encodedParams.append("content", content);

        const url = 'https://neutrinoapi-bad-word-filter.p.rapidapi.com/bad-word-filter';

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': 'de3f6a666fmsh450242bcb7fc1d3p14870djsn7c5bd520ad1c',
            },
            body: encodedParams
        };

        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                resolve(json);
            })
            .catch(err => {
                reject(err);
            });
    });
}
