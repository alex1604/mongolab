const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const databaseName = 'mongolab';
const querylabName = 'querylab';

console.log('About to connect to MongoDB');

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log('Could not connect! Error: ', err);
        return;
    }

    const mongolab = client.db(databaseName);
    console.log('We are connected to the mongolabdb');
    const querylab = mongolab.collection(querylabName);
    
    querylab.dropIndex({category: 1});
})

