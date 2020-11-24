const mongoose = require('mongoose');
const db = mongoose.connection;

module.exports = () => {
    mongoose.connect('mongodb://localhost/ClashofVillage', {useNewUrlParser: true, useUnifiedTopology: true});
    db.on('error', (err) => console.log(err));
    db.once('open', () => console.log('Database is connection'));
}