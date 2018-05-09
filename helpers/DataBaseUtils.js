import mongoose from "mongoose";
import {db} from '../config.json';

export function setUpConnection() {
    // mongoose.connect(`mongodb://${db.host}:${db.port}/${db.name}`, {useMongoClient: true});

    mongoose.connect(`mongodb://Yaroslaw:19981798@ds119060.mlab.com:19060/solv-express`, {useMongoClient: true});
}

export let mongooseConnection = mongoose.connection;
