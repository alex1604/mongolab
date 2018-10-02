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

    //querylab.createIndex({category: 1});
    //querylab.createIndex({price: -1});
    //querylab.createIndex({name: 1});
    //querylab.insertMany(generateData(10000));

    /* PUNKT 3 */
    /* 1:
 
        --> 21772
        --> 12241
        --> 13615
        --> 13772, 13075, 11595 / 39,94%


        2: 

        --> 12414
        --> 5132
        --> 9  
        --> 1, 28, 2 / 99.98%

        3: 
        
        --> 16235
        --> 16545
        --> 14910
        --> 3, 25, 0 / 99,98%

    */
})

