class Utils {
    constructor() {}

    getFullUrl(req) {
        return req.protocol + '://' + req.headers.host;
    }
}

module.exports = new Utils();
