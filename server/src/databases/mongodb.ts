import { MongoClient, Db, MongoClientOptions, Collection } from "mongodb";

let db: Db;

export async function connect(url, options?: MongoClientOptions) {
    db = await MongoClient.connect(url, options);
    console.log("Connected successfully to mongodb");
    db = db.db('octopoda');
}

export function JobsDB(): Collection {
    return db.collection('agenda_jobs');
}
