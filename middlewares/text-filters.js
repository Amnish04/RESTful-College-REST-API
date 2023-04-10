const fetch = require('node-fetch');

/**
 * Checks for profanity
 */
module.exports.checkForProfanity = function(req, res, next) {
    let content = Object.values(req.body).join(" ").toLowerCase();
    const { badNames } = require('../assets/badNamesList');

    // Check for statically stored keywords
    let foundNames = badNames.filter(name => content.search(name.toLowerCase()) > -1);

    if (foundNames.length) {
        res.json({
            status: "Profanity Detected",
            data: {
                foundNames: foundNames
            }
        });
        return;
    }

    // If no match with local array, further check from remote service
    sendRequest(content)
    .then(apiRes => {
        if (apiRes['is-bad']) {
            res.json({
                status: "Profanity Detected",
                data: apiRes
            });
        } 
        else {
            // Allow Database Operation
            next();
        } 
    })
    .catch(error => {
        console.log(error);
        res.send("error")
    })
}

/**
 * 
 * @param {string} content Content to be checked for profanity 
 * @returns A promise that resolves to an object containing the profanity info for the content provided
 */
function sendRequest(content) {

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
