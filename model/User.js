const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
})

userSchema.pre('save', function(next){
    user.findOne({ username: this.username, email: this.email})
    .then((user)=>{
        if(user) next({ name: 'ALREADY_EXISTS'});
        else {
            const salt = bcrypt.genSaltSync(10);
            this.password = bcrypt.hashSync(this.password, salt);
            next();
        }
    })
    .catch((err) => next({name: 'DATABASE_ERROR'}));
});
const User = mongoose.model('User', userSchema);
module.exports = User;