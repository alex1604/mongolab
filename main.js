const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017';
const databaseName = 'mongolab';
const collectionName = 'products';

console.log('About to connect to MongoDB');
var showMe = (filter) => {
    products.find().toArray((err, docs) => {
        client.close();
        console.log('Connection closed.');
        if( err ) {
            console.log('Could not use query find: ', err);
            return;
        }
        console.log('The products are: ', docs);
    })
}
var generateData = (times) => {
        let myArray = [];
        const n = ['trimmer', 'hair dryer', 'fridge', 'oven', 'smart tv', 'trendy computer',
    'posh sunglasses', 'poorly designed dining table', 'potatos 3kg', 'coca-cole x6 x1l'];
        const p = [100, 25, 57, 64, 89, 500]
        const c = ['home appliances', 'electronics', 'furniture', 'wrench', 'food & beverages']
        
        function randomElement(list) {
            let r = Math.random() * list.length;
            return list[Math.floor(r)];
        }
        function createObject (){
            let newObject = {};
            newObject.name = randomElement(n);
            newObject.price = randomElement(p);
            newObject.category = randomElement(c); 
            myArray.push(newObject);
        }
        for (i=0; i<times; i++){
            createObject();
        }
        return myArray
    }
    var deleteData = (collection, filter) => {
        collection.deleteOne(
            filter,
            (err, result) => {
                // result är ett document med statusinformation
                console.log(result);
            }
        );
        showMe({});
    }

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
	if( err ) {
		console.log('Could not connect! Error: ', err);
		return;
	}
	const mongolab = client.db(databaseName);
	console.log('We are connected to the forestdb');
    const products = mongolab.collection(collectionName)
    products.insertMany(generateData(15), showMeAll({}))
    deleteData(products,{})
})

