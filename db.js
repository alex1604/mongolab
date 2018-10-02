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

    const mongolab = client.db(databaseName);
    console.log('We are connected to the mongolabdb');
    const products = mongolab.collection(collectionName);
    const querylab = mongolab.collection(querylabName);
    const filterAll = {}
    products.insertMany(generateData(15), showMeAll(products));
    //querylab.insertMany(generateData(10000));
})

// 2.2 Shell Queries: 
/*
    Power Shell > mongo > use mongolab

    1. db.querylab.count() --> 10000
    
    2. db.querylab.createIndex({price: -1})
       db.querylab.aggregate([{$group: {_id: null,antal: { $sum: 1 },summa: {$sum: "$price"}}}])
       --> { "_id" : null, "antal" : 10000, "summa" : 1406229 }
    
       3. db.querylab.find().sort({price: -1, name: 1}) --> 
    { "_id" : ObjectId("5bb3887c8e777a141e14a608"), "name" : "coca-cole x6 x1l", "price" : 500, "category" : "food & beverages" }
    { "_id" : ObjectId("5bb3887c8e777a141e14a6d0"), "name" : "coca-cole x6 x1l", "price" : 500, "category" : "home appliances" }
    { "_id" : ObjectId("5bb3887c8e777a141e14a707"), "name" : "coca-cole x6 x1l", "price" : 500, "category" : "home appliances" }
    { "_id" : ObjectId("5bb3887c8e777a141e14a71d"), "name" : "coca-cole x6 x1l", "price" : 500, "category" : "furniture" }
    { "_id" : ObjectId("5bb3887c8e777a141e14a723"), "name" : "coca-cole x6 x1l", "price" : 500, "category" : "wrench" }
    { "_id" : ObjectId("5bb3887c8e777a141e14a796"), "name" : "coca-cole x6 x1l", "price" : 500, "category" : "electronics" }
    { "_id" : ObjectId("5bb3887c8e777a141e14a7e3"), "name" : "coca-cole x6 x1l", "price" : 500, "category" : "electronics" }
    { "_id" : ObjectId("5bb3887c8e777a141e14a7fe"), "name" : "coca-cole x6 x1l", "price" : 500, "category" : "wrench" }
    { "_id" : ObjectId("5bb3887c8e777a141e14a85f"), "name" : "coca-cole x6 x1l", "price" : 500, "category" : "home appliances" }
    { "_id" : ObjectId("5bb3887c8e777a141e14a8b7"), "name" : "coca-cole x6 x1l", "price" : 500, "category" : "wrench" }
    { "_id" : ObjectId("5bb3887c8e777a141e14a8fc"), "name" : "coca-cole x6 x1l", "price" : 500, "category" : "furniture" }
    { "_id" : ObjectId("5bb3887c8e777a141e14a905"), "name" : "coca-cole x6 x1l", "price" : 500, "category" : "wrench" }
    { "_id" : ObjectId("5bb3887c8e777a141e14a9b0"), "name" : "coca-cole x6 x1l", "price" : 500, "category" : "furniture" }
    { "_id" : ObjectId("5bb3887c8e777a141e14a9c7"), "name" : "coca-cole x6 x1l", "price" : 500, "category" : "electronics" }
    { "_id" : ObjectId("5bb3887c8e777a141e14a9c9"), "name" : "coca-cole x6 x1l", "price" : 500, "category" : "food & beverages" }
    { "_id" : ObjectId("5bb3887c8e777a141e14a9f1"), "name" : "coca-cole x6 x1l", "price" : 500, "category" : "electronics" }
    { "_id" : ObjectId("5bb3887c8e777a141e14aa31"), "name" : "coca-cole x6 x1l", "price" : 500, "category" : "food & beverages" }
    { "_id" : ObjectId("5bb3887c8e777a141e14aa3e"), "name" : "coca-cole x6 x1l", "price" : 500, "category" : "wrench" }
    { "_id" : ObjectId("5bb3887c8e777a141e14aa7c"), "name" : "coca-cole x6 x1l", "price" : 500, "category" : "furniture" }
    { "_id" : ObjectId("5bb3887c8e777a141e14aab8"), "name" : "coca-cole x6 x1l", "price" : 500, "category" : "electronics" }
    Type "it" for more

    4. db.querylab.find().sort({name: 1}).limit(3) -->
    { "_id" : ObjectId("5bb3887c8e777a141e14a5ed"), "name" : "coca-cole x6 x1l", "price" : 57, "category" : "furniture" }
    { "_id" : ObjectId("5bb3887c8e777a141e14a5f1"), "name" : "coca-cole x6 x1l", "price" : 100, "category" : "home appliances" }
    { "_id" : ObjectId("5bb3887c8e777a141e14a5f6"), "name" : "coca-cole x6 x1l", "price" : 57, "category" : "furniture" }
    
    5. db.querylab.aggregate([{$group: {_id: null, max: {$max: "$price"}, min: {$min: "$price"}, average: {$avg: "$price"}}}]) -->
    { "_id" : null, "max" : 500, "min" : 25, "average" : 140.6229 }
    
    6. db.querylab.find({price: {$gt: 134.0671}}).count() --> 1703
    
    7. db.querylab.explain('executionStats').aggregate([{$group: {_id: "$category", antal: { $sum: 1 }} }]) -->
    { "_id" : "food & beverages", "antal" : 1982 }
    { "_id" : "furniture", "antal" : 1973 }
    { "_id" : "home appliances", "antal" : 1970 }
    { "_id" : "wrench", "antal" : 2044 }
    { "_id" : "electronics", "antal" : 2031 }
    
    8. db.querylab.explain('executionStats').find({category: "furniture"}).sort({price: -1}).limit(5) -->
    { "_id" : ObjectId("5bb3887c8e777a141e14a5f8"), "name" : "fridge", "price" : 500, "category" : "furniture" }
    { "_id" : ObjectId("5bb3887c8e777a141e14a63d"), "name" : "smart tv", "price" : 500, "category" : "furniture" }
    { "_id" : ObjectId("5bb3887c8e777a141e14a652"), "name" : "trendy computer", "price" : 500, "category" : "furniture" }
    { "_id" : ObjectId("5bb3887c8e777a141e14a67e"), "name" : "fridge", "price" : 500, "category" : "furniture" }
    { "_id" : ObjectId("5bb3887c8e777a141e14a6a0"), "name" : "posh sunglasses", "price" : 500, "category" : "furniture" }
    
    9. db.querylab.explain('executionStats').find().sort({name: 1}).skip(19).limit(1) -->
    { "_id" : ObjectId("5bb3887c8e777a141e14a6ce"), "name" : "coca-cole x6 x1l", "price" : 25, "category" : "home appliances" }
  
    10. db.querylab.aggregate([ { $match : { category : "furniture" }}, {$group: {_id: null, total_value: {$sum: "$price" }}}]) --> 
    { "_id" : null, "total_value" : 284323 }
)
*/

