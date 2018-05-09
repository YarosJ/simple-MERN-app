import mongoose from "mongoose";
import {db} from '../config.json';

export function setUpConnection() {
    mongoose.connect(`mongodb://${db.host}:${db.port}/${db.name}`, {useMongoClient: true});
}

export let mongooseConnection = mongoose.connection;
