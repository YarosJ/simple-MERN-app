import mongoose from "mongoose";

mongoose.Promise = require('bluebird');

const Schema = mongoose.Schema;
const roleSchema = new Schema({any: Schema.Types.Mixed});

const Role = mongoose.model('Role', roleSchema);
