class ClientEmailExist extends Error {
    constructor(message) {
        super(message);
        this.name = 'ClientEmailExist';
        this.code = 409;
    }
}

module.exports = {
  
    ClientEmailExist,
   
};