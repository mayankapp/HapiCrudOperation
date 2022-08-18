const { MongoClient } = require('mongodb');
let db;
const url = process.env.DB_URL;
let dbName = process.env.DB_NAME;
let client = new MongoClient(url);

const main = async () => {
    try {
        await client.connect();
        db = client.db(dbName);
        console.log("MongoDB Connected Successfully");
        return 'done';
    } catch (error) {
        console.log(error);
    }
}

exports.dbConnect = () => {
    main();
}
exports.get = () => {
    return db;
}