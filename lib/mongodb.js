import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URL;
const options = {};

class Singleton {
  static _instance;
  clientPromise;
  constructor() {
    this.clientPromise = new MongoClient(uri, options)
      .connect()
      .then(client => client.db('db1'));
  }

  static get instance() {
    if (!this._instance) {
      this._instance = new Singleton();
    }
    return this._instance.clientPromise;
  }
}
const clientPromise = Singleton.instance;

export default clientPromise;

