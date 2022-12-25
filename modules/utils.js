class Utils {
    constructor() {}

    getFullUrl(req) {
        return req. protocol + '://' + req. get('host');
    }
}

module.exports = new Utils();
