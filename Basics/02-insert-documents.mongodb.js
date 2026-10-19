use("adibas");

// syntax of insert one
// db.<collection-name>.insertOne({
// })

// When to use Quotes and when not to?
// Case 1: Special Characters
// If the field name contains special characters or spaces, or starts with a numeric digit, using quotes is necessary

// db.adibas.insertOne({
//   "shoes-title": "trever O sports shoes",
//   "shoes desc": "Sports shoes for running/walking",
//   "%discount": true,
// });

// db.shoes.find();

// Case 2: Reserved Words
// If the field name is a reserved keyword in MongoDB, use quotes to distinguish it from those reserved words

// db.shoes.insertOne({
//   title: "trever O sports shoes",
//   desc: "Sports shoes for running/walking",
// });

// syntax of insert many
// db.<collection-name>.insertOne([{
// }])

// Example of inset many
// db.shoes.insertMany([
//   {
//     color: "red",
//     size: 12,
//   },
//   {
//     color: "blue",
//     size: 11,
//   },
//   {
//     color: "green",
//     size: 10,
//   },
//   {
//     color: "black",
//     size: 11,
//   },
//   {
//     color: "grey",
//     size: 8,
//   },
//   {
//     color: "white",
//     size: 12,
//   },
//   {
//     color: "olive",
//     size: 9,
//   },
// ]);

// Ordered and Unordered Inserts

// When executing bulk write operations, "ordered" and "unordered" determine the batch behaviour

// Ordered Inserts
// Default behaviour is ordered, where mongoDB stops on the first error

// Ex:

// db.shoes.insertMany([
//   { color: "cyan", size: 5 },
//   { _id: ObjectId("6ad4fe3af78d7968129b7d00"), color: "maroon", size: 13 }, // this will cause error so this data and the upcoming data after this will not be inserted - only cyan will be inserted
//   { color: "magenta", size: 6 },
// ]);

// db.shoes.find();

// But if you want the rest of the inserts to continue (ignoring those with errors) then the unordered inserts is used

// Unordered Inserts
// When executing bulk write operations with unordered flag, MongoDB stop

db.shoes.insertMany(
  [
    { color: "cyan", size: 5 },
    { _id: ObjectId("6ad4fe3af78d7968129b7d00"), color: "maroon", size: 13 },
    { color: "magenta", size: 6 },
  ],
  { ordered: false },
);

// this above query will insert all the documents expect those with errors (so it will not stop after encountering the first document with error, it will skip it and then continue with others)

// case sensitivity in mongoDB

// these both commands look for different collection 
// db.shoes.find() 
// db.shoes.find()
