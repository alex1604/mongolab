const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const databaseName = 'mongolab';
const collectionName = 'products';

console.log('Connecting to database...');

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log('Could not connect! Error: ', err);
        return;
    }
    console.log('We are connected to the mongolabdb');

    var showMeAll = function (collection) {
        collection.find({}).toArray((err, docs) => {
            client.close();
            console.log('Connection closed.');
            if (err) {
                console.log('Could not use query find: ', err);
                return;
            }
            console.log('The products are: ', docs);
        })
    }
    var deleteData = function (collection, filter, callback) {
        showMeAll(collection);

        collection.deleteMany(
            filter,
            (err, result) => {
                // result är ett document med statusinformation
                console.log('All products were deleted.');
            }
        );
        callback(collection);
    }
    const mongolab = client.db(databaseName);
    const products = mongolab.collection(collectionName);
    const filterAll = {}
    deleteData(products, filterAll, showMeAll)
})

