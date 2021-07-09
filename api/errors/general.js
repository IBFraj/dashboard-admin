class MissingPrameter extends Error {
    constructor(message, param) {
        super(message);
        this.name = 'MissingPrameter';
        this.code = 422;
        this.param = param;
    }
}
class ElementNotFound extends Error {
    constructor(message, param) {
        super(message);
        this.name = 'ElementNotFound';
        this.code = 404;
        this.param = param;
    }
}
class MalformedObjectId extends Error {
    constructor(message, param) {
        super(message);
        this.name = 'MalformedObjectId';
        this.code = 400;
        this.param = param;
    }
}
class UknownError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UknownError';
        this.code = 500;
    }
}
module.exports = {
    MissingPrameter,
    ElementNotFound,
    MalformedObjectId,
    UknownError,
};
