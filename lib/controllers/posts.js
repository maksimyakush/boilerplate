import Db from "../mongodb.js"

export const getPosts = async() => {
  const db = await Db;
  const collection = db.collection('posts');
  const data = collection.find({}).toArray()

  return data;
}