const mongoose = require('mongoose');
const ENV = require('./static');

mongoose.connect(ENV.CONNECTION_STRING, { useCreateIndex: true, useNewUrlParser: true });
module.exports = mongoose;
