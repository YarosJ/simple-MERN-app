import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');

/**
 * @description :: A model definition.  Represents a database for roles.
 */

const { Schema } = mongoose;
const roleSchema = new Schema({ any: Schema.Types.Mixed });
const Role = mongoose.model('Role', roleSchema);
