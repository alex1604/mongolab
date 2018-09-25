const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017';
const databaseName = 'mongolab';
const collectionName = 'products';
const pictureCollection = 'pictures';
const querylabName = 'querylab';

console.log('About to connect to MongoDB');

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log('Could not connect! Error: ', err);
        return;
    }
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
    var showMeOnly = function (amount, collection){
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
    var generateData = function (times) {
        let myArray = [];
        const n = ['trimmer', 'hair dryer', 'fridge', 'oven', 'smart tv', 'trendy computer',
            'posh sunglasses', 'poorly designed dining table', 'potatos 3kg', 'coca-cole x6 x1l'];
        const p = [100, 25, 57, 64, 89, 500]
        const c = ['home appliances', 'electronics', 'furniture', 'wrench', 'food & beverages']

        function randomElement(list) {
            let r = Math.random() * list.length;
            return list[Math.floor(r)];
        }
        function createObject() {
            let newObject = {};
            newObject.name = randomElement(n);
            newObject.price = randomElement(p);
            newObject.category = randomElement(c);
            myArray.push(newObject);
        }
        for (i = 0; i < times; i++) {
            createObject();
        }
        return myArray
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
        showMeAll(collection);
        callback(8,pictures);
    }

    const mongolab = client.db(databaseName);
    console.log('We are connected to the mongolabdb');
    const products = mongolab.collection(collectionName);
    const pictures = mongolab.collection(pictureCollection)
    const querylab = mongolab.collection(querylabName);
    const filterAll = {}
    let callback = () => {
        deleteData(products, filterAll, showMeOnly)
    }
    products.insertMany(generateData(15), callback)
    querylab.insertMany(generateData(10000));
})

// 2.2 Shell Queries: 
/*
    Power Shell > mongo > use mongolab

    1. db.querylab.count()
    2. db.querylab.createIndex({price: -1})
       db.querylab.aggregate([{$group: {_id: null,antal: { $sum: 1 },summa: {$sum: "$price"}}}])
    3.
    Sortera produkterna i första hand fallande efter pris, i andra hand 
    i stigande bokstavsordning efter namn.
*/

