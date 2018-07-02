import { db } from '../config';
import debugMongooseConnection from './debugMongooseConnection';

export default (mongoose, process, cb) => {
  mongoose.connect(process.env.DB || `mongodb://${db.host}:${db.port}/${db.name}`, {
    useMongoClient: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  });
  mongoose.connection.on('connected', () => cb());

  debugMongooseConnection(mongoose, process);
};
