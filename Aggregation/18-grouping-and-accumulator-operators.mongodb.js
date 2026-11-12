db.getMongo().getDBs();
use("shop");
db.getCollectionNames();

// Operators: $group, $sum, $avg, $min, $max, $push, $addToSet, $first, $last

// $group - It groups documents by specified fields and performs aggregate operations on grouped data.

// Syntax:
// { $group: { _id: <expression>, fieldName: { <accumulator>: <expression> }, ... } }

// Example:
db.products.aggregate([
  {
    $group: {
      _id: "$category",
    },
  },
]);

// $sum - It calculates the sum of numeric values in a group.

// Syntax:
// { $group: { _id: "$category", total: { $sum: "$price" } } }
// { $group: { _id: "$category", totalProducts: { $sum: 1 } } }

// $avg - It calculates the average value of a numeric field in a group.

// Syntax:
// { $group: { _id: "$category", averagePrice: { $avg: "$price" } } }

// $min - It returns the minimum value of a field within a group.

// Syntax:
// { $group: { _id: "$category", lowestPrice: { $min: "$price" } } }

// $max - It returns the maximum value of a field within a group.

// Syntax:
// { $group: { _id: "$category", highestPrice: { $max: "$price" } } }

// $push - It creates an array of all values from a field in each group.

// Syntax:
// { $group: { _id: "$category", productNames: { $push: "$name" } } }

// $addToSet - It creates an array of unique values from a field in each group.

// Syntax:
// { $group: { _id: "$category", uniqueProducts: { $addToSet: "$name" } } }

// $first - It returns the first value encountered in the group after sorting.

// Syntax:
// { $group: { _id: "$category", firstAdded: { $first: "$name" } } }

// $last - It returns the last value encountered in the group after sorting.

// Syntax:
// { $group: { _id: "$category", lastAdded: { $last: "$name" } } }

// Question - Retrieve the total number of products, average price, total stock available and total value of products after discount for each category

db.products.aggregate([
  {
    $group: {
      _id: "$category",
      totalProducts: { $sum: 1 },
      averagePrice: { $avg: "$price" },
      totalStock: { $sum: "$stock.available" },
      totalValue: { $sum: { $multiply: ["$finalPrice", "$stock.available"] } },
    },
  },
]);

db.products.find();

// Question - list the product with minimum final price grouped by their category

db.products.aggregate([
  {
    $group: {
      _id: "$category",
      mostAffordable: { $min: "$finalPrice" },
    },
  },
]);

// Question - list the product with the maximum final price grouped by their category

db.products.aggregate([
  {
    $group: {
      _id: "$category",
      mostAffordable: { $max: "$finalPrice" },
    },
  },
]);

// Question - list all the products grouped by their category

db.products.aggregate([
  {
    $group: {
      _id: "$category",
      productItems: { $push: "$name" },
    },
  },
]);

// Question - list all the unique products grouped by their category

db.products.aggregate([
  {
    $group: {
      _id: "$category",
      productItems: { $addToSet: "$name" },
    },
  },
]);

// Question - list the first added product and the latest (newly or we can say lastly) added product based on their category

db.products.aggregate([
  { $sort: { createdAt: 1 } },
  {
    $group: {
      _id: "$category",
      firstAdded: { $first: "$name" },
      newlyAdded: { $last: "$name" },
    },
  },
]);

// Question - Sort products which have the best discount grouped by category

db.products.aggregate([
  {
    $group: {
      _id: "$category",
      discountPercent: { $min: "$discountPercent" },
    },
  },

  {
    $sort: { discountPercent: -1 },
  },
]);
