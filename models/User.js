const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { Schema } = mongoose;
const bcrypt = require('bcryptjs');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  createdAt: { type: Date },
});

UserSchema.virtual('password')
  .set(function (password) {
    this.salt = bcrypt.genSaltSync(10);
    this.hashedPassword = this.encryptPassword(password);
  });

UserSchema.methods = {
  encryptPassword(password) {
    return bcrypt.hashSync(password, this.salt);
  },

  validPassword(password) {
    return bcrypt.compareSync(password, this.hashedPassword);
  },
};

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User1', UserSchema);
