class Utils {
    constructor() {}

    getFullUrl(req) {
        return req.get('host');
    }
}

module.exports = new Utils();
