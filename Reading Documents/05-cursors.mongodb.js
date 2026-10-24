db.getMongo().getDBs();
use("shop");
db.getCollectionNames();

// Cursor in MongoDB
// A cursor is like a pointer to the documents returned by a query.
// It lets you go through matching documents one at a time or in batches instead of loading them all at once.
// By default, the first batch contains up to 101 documents, with a 16 MiB limit.

// Cursor Methods // (count, limit, skip, sort)

// count (returns the count of data which matches the query)
db.products.find({ price: { $lt: 1000 } }).count();

// limit (returns only the specified number of matching documents)
db.products.find({ price: { $lt: 1000 } }).limit(2);

// skip (skips the specified number of matching documents)
db.products
  .find({ price: { $lt: 1000 } })
  .limit(2)
  .skip(1);

// sort (orders the matching documents by the specified field)
db.products.find({}).limit(5).sort({ price: 1 }); // asc
db.products.find({}).limit(5).sort({ price: -1 }); // desc

// NOTE:

// skip() can be inefficient for large datasets
// using sort() on a large result sets may impact performance

// Use with caution:

// Be cautious when using limit() and skip() on large collections
// Consider using indexing to optimize query performance
