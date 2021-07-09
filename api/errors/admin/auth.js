class ClientNotFound extends Error {
    constructor(message) {
        super(message);
        this.name = 'ClientNotFound';
        this.code = 401;
    }
}
module.exports = {
    ClientNotFound,
};
