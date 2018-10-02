const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const databaseName = 'mongolab';
const pictureCollection = 'pictures';

console.log('Connecting to database...');

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log('Could not connect! Error: ', err);
        return;
    }
    console.log('We are connected to the mongolabdb');

    var showMeOnly = function (amount, collection) {
        collection.find({}).toArray((err, docs) => {
            client.close();
            console.log('Connection closed.');
            if (err) {
                console.log('Could not use query find: ', err);
                return;
            }
            console.log('The products are: ', docs.slice(0, amount));
        })
    }
    const mongolab = client.db(databaseName);
    const pictures = mongolab.collection(pictureCollection);
    showMeOnly(8, pictures);
})