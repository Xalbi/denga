import { MongoClient, Db, MongoClientOptions, Collection } from "mongodb";
const Config = require('conf');
const settings = new Config();

let db: Db;

export async function connect(url, options?: MongoClientOptions) {
    db = await MongoClient.connect(url, options);
    db = db.db(db.s.options.dbName);
    console.log("Connected successfully to mongodb");
}

export function JobsDB(): Collection {
    return db.collection(settings.get('collection'));
}
