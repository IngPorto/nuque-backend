require('dotenv').config();
const mongoose = require('mongoose')
const { DEV_DATABASE_ACCESS } = require('./config.json')
const DATABASE_ACCESS = process.env.NODE_ENV === 'production' ? process.env.DATABASE_ACCESS : DEV_DATABASE_ACCESS

mongoose.connect (DATABASE_ACCESS, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then( db => console.log('Database: Connected'))
    .catch( err => console.error(err));

module.exports = mongoose
