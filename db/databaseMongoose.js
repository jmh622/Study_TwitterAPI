import Mongoose from 'mongoose';
import { config } from '../config.js';

export async function connectDB() {
  Mongoose.connect(config.db.connectionString);
}

export function useVirtualId(schema) {
  // _id -> id
  schema.virtual('id').get(function () {
    return this._id.toString();
  });
  schema.set('toJSON', { virtuals: true });
  schema.set('toObject', { virtuals: true });
}
