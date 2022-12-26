class Utils {
    constructor() {}

    getFullUrl(req) {
        return req.get('origin');
    }
}

module.exports = new Utils();
