import { MongoClient, Db, MongoClientOptions, Collection } from "mongodb";
import * as get_settings from '../get_settings';
const settings = get_settings.json()

let db: Db;

export async function connect(url, options?: MongoClientOptions) {
    db = await MongoClient.connect(url, options);
    db = db.db(db.s.options.dbName);
    console.log("Connected successfully to mongodb");
}

export function JobsDB(): Collection {
    return db.collection(settings.collection);
}
