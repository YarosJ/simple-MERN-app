const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    rights: {
        type: String,
        default: 'admin'
    },
    createdAt: {type: Date}
});

UserSchema.virtual('password')
    .set(function (password) {
        this.salt = bcrypt.genSaltSync(10);
        this.hashedPassword = this.encryptPassword(password);
    });

UserSchema.methods = {

    encryptPassword: function (password) {
        console.log(password);
        return bcrypt.hashSync(password, this.salt);
    },

    validPassword: function (password) {
        console.log(bcrypt.compareSync(password, this.hashedPassword));
        return bcrypt.compareSync(password, this.hashedPassword);
    }

};

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);