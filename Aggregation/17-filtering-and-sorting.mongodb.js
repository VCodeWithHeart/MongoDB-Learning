db.getMongo().getDBs();
use("shop");
db.getCollectionNames();

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

