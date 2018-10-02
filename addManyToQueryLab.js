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
    var countAll = function (collection) {
            collection.find({}).count((err, counter) => {
                console.log('Inserted 10 000 items to querylab collection. Total amount: ', counter);
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
    const querylab = mongolab.collection(querylabName);
    querylab.insertMany(generateData(10000), () => {
        countAll(querylab);
    })
})