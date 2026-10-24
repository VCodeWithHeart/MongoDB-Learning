db.getMongo().getDBs();
use("shop");
db.getCollectionNames();

// Logical Operators ($and, $or, $not, $nor)

// $and : Performs a logical AND operation on an array of expressions, where all expressions must be true for the document to match.

// Find products with price less than 500 and category equal to 'Books'

// db.products.find({
//   $and: [
//     {
//       price: { $lt: 500 },
//     },
//     {
//       category: "Books",
//     },
//   ],
// });

// we can simply write the above query like this below one (mongoDB implicitly treats this as $and query)
// db.products.find({ price: { $lt: 500 }, category: "Books" });

// $or : Performs a logical OR operation on an array of expressions, where either one expression must be true for the document to match.

// Find products with price less than 500 or category equal to 'Books'

db.products.find({
  $or: [
    {
      price: { $lt: 500 },
    },
    {
      category: "Books",
    },
  ],
});

// The above query will return all the documents with price less than 500 aor the category 'Books'

// $nor : Performs a logical NOR operation on an array of expressions, where none of the expressions can be true for the document to match.

// db.products.find({
//   $nor: [
//     {
//       price: { $lt: 500 },
//     },
//     {
//       category: "Books",
//     },
//   ],
// });

// The above query will return all the documents that doesn't match this criteria (price less than 500 aor the category 'Books')

// $not : Performs a logical NOT operation on a specified expression, selecting documents that do not match it.

// db.products.find({ price: { $not: { $eq: 100 } } });
// Returns products whose price is not equal to 100, including products without a price field.
