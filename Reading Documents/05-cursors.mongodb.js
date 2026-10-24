db.getMongo().getDBs();
use("shop");
db.getCollectionNames();

// Cursor in MongoDB

// Cursor Methods // (count, limit, skip, sort)

// count
// db.products.find({price: {$lt: 1000}}).count()

// limit
db.products.find({ price: { $lt: 1000 } }).limit(2);

// skip
db.products
  .find({ price: { $lt: 1000 } })
  .limit(2)
  .skip(1);

// sort
db.products.find({}).limit(5).sort({ price: 1 }); // asc
db.products.find({}).limit(5).sort({ price: -1 }); // desc

// NOTE:

// skip() can be inefficient for large datasets
// using sort() on a large result sets may impact performance

// Use with caution:

// Be cautious when using limit() and skip() on large collections
// Consider using indexing to optimize query performance
