db.getMongo().getDBs();
use("shop");
db.getCollectionNames();

// Elements Operator: ($exists, $type, $size)

// Syntax:
// {field: {$exists: <boolean>}}
// {field: {$type: <bson-data-type>}}
// {field: {$size: <array-length>}}

// $exists: Matches documents that have a specific field, regardless of its value.

// Q1. Find documents with the "price" field present, and if present then check it's value is less than 200

db.products.find({ price: { $exists: true, $lt: 200 } });

// $type: The $type operator filters documents based on the BSON data type of a field

// The <BSONType> value can be one of the following:

// 1: Double
// 2: String
// 3: Object
// 4: Array
// 5: Binary data
// 6: Undefined
// 7: Object Id
// 8: Boolean
// 9: Date
// 10: Null
// 11: Regular expression
// 12: Javascript code

// db.products.find({});
db.products.find({ price: { $type: "number" } }).count();
db.products.find({ price: { $type: "string" } }).count();
db.products.find({ inStock: { $type: "bool" } }).count();
db.products.find({ inStock: { $type: 8 } }).count(); // it works as 8 represents boolean

// $size: The $size operator matches documents where the size of an array field matches a specificed value

db.products.find({ tags: { $size: 3 } });
