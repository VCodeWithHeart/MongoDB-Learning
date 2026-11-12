db.getMongo().getDBs();
use("shop");
db.getCollectionNames();

// Operators: $match, $sort, $limit, $skip, $count, $sample

// $match - It filters documents based on specified conditions.

// Syntax:
// {$match: {<query>}}

// Example:
db.products.aggregate([{ $match: { isPublished: false } }]);

// Question - Retrieve products which have discountPercent > 10 and their available quantity should be greater than 50

db.products.aggregate([
  {
    $match: {
      discountPercent: { $gt: 10 },
      "stock.available": { $gt: 50 },
    },
  },
]);

// $sort - It sorts documents based on specified fields in ascending or descending order.
// Syntax:
// {$sort: {<field1>: <sort order>, <field2>: <sort order>, ...}}

// $skip - It skips the specified number of documents in the result set.
// Syntax:
// {$skip: <number of documents to skip>}

// $limit - It limits the number of documents in the result set.
// Syntax:
// {$limit: <number of documents to return>}

// Question - Retrieve the top 5 products which have the best discount (Ignore the first 3 products)

db.products.aggregate([
  {
    $sort: { discountPercent: -1 },
  },
  {
    $skip: 3,
  },
  {
    $limit: 5,
  },
]);

// $count - It counts the number of documents in a collection or the number of documents that match a specified condition.

// Syntax:
// {$count: "<field name>"}

// Question - Count the number of products which have discountPercent > 10 and their available quantity should be greater than 50

db.products.aggregate([
  {
    $match: {
      discountPercent: { $gt: 10 },
      "stock.available": { $gt: 50 },
    },
  },
  {
    $count: "totalProducts",
  },
]);

// $sample - It randomly selects a specified number of documents from a collection.

// Syntax:
// {$sample: {size: <number of documents to return>}}

db.products.aggregate([{ $sample: { size: 3 } }]);
