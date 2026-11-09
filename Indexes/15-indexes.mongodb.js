db.getMongo().getDBs();
use("shop");
db.getCollectionNames();

// What are indexes?
// Indexes are data structures that help MongoDB find and sort documents faster.

// What problem do indexes solve?
// Example:- We have a collection of products in an e-commerce application. If we want to find all products with a specific category, without an index, the database would have to scan the entire collection to find matching documents. This can be slow and inefficient, especially as the collection grows in size. By creating an index on the "category" field, the database can quickly locate the relevant documents without scanning the entire collection, resulting in faster query performance.

db.products.find({ category: "Books" }).explain("executionStats");
// Without an index, MongoDB scans every product to find matching documents.

db.products.createIndex({ category: 1 }); // here 1 indicates ascending order for the index

db.products.find({ category: "Books" }).explain("executionStats");
// With an index, MongoDB can find matching documents faster.

// Benefits of Indexes:
// 1. Faster queries: Find documents without scanning the whole collection.
// 2. Faster sorting: Return sorted results more efficiently.
// 3. Unique values: Prevent duplicate values in a field.
// 4. Less disk reading: Read less data to find results.

db.products.getIndexes();

// MongoDB automatically indexes _id, so queries by _id are fast. Create indexes on other fields as needed.

db.products.createIndex({ name: 1 }); // Creating an index on the "name" field in ascending order

db.products.find({ name: "Insulated Flask" }).explain("executionStats");

// Dropping Indexes (both queries will work same the difference is in the way of specifying the index to be dropped)
db.products.dropIndex("name_1"); // Dropping the index on the "name" field using the index name
db.products.dropIndex({ name: 1 }); // Dropping the index on the "name" field using the index specification

db.products.getIndexes(); // Checking the indexes after dropping the index on the "name" field

// unique index

// example below

db.products.createIndex({ productId: 1 }, { unique: true }); // Creating a unique index on the "productId" field

db.products.insertOne({ productId: 101, name: "Product A" }); // This will succeed
db.products.insertOne({ productId: 101, name: "Product B" }); // This will fail due to unique index constraint

// Types of Indexes in MongoDB:

// 1. Single Field Indexes: Index one document field.

// Example:
db.products.createIndex({ category: 1 }); // Creating a single field index on the "category" field

// 2. Compound Indexes: Index multiple fields for queries that use them together.

// Example:
db.products.createIndex({ category: 1, price: -1 }); // Creating a compound index on the "category" and "price" fields

// 3. Multikey Indexes: Index array fields to find documents by array values.

// Example:
db.products.createIndex({ tags: 1 }); // Creating a multikey index on the "tags" array field

// 4. Text Indexes: Index string fields for text search.

// Example:
db.products.createIndex({ description: "text" }); // Creating a text index on the "description" field

// 5. Geospatial Indexes: Index location data for location-based queries.

// Example:
db.places.createIndex({ location: "2dsphere" }); // Creating a geospatial index on the "location" field (rarely used in most applications)

// 6. Partial Indexes: Index a subset of documents in a collection based on a filter expression.

// Example:
db.products.createIndex(
  { discountPercent: 1 },
  { partialFilterExpression: { discountPercent: { $gt: 0 } } },
);

// 7. TTL (Time-To-Live) Index: Automatically remove documents after a certain period of time.

// Example:
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 }); // Creating a TTL index on the "createdAt" field to automatically delete documents after 1 hour

// When not to use Indexes:
// 1. Small collections: Indexes may add more overhead than benefit.
// 2. Frequent writes: Updating indexes can slow down writes.
// 3. Rarely queried fields: An index may not help much.
