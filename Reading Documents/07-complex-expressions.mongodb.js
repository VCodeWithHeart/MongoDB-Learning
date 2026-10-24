db.getMongo().getDBs();
use("shop");
db.getCollectionNames();

// COMPLEX EXPRESSIONS

// the $expr operator allows using aggregation expressions within a query

// It is useful when you need to compare fields from the same document in a more complex manner

//  Syntax:

// {$expr: {operator: [field, value]}}

// Q1: return only those products whose total stock value is less than 10000 amount

db.products.find({
  $expr: { $lt: [{ $multiply: ["$price", "$stock.available"] }, 10000] },
});

// Q2: Return products whose price would still be less than 250 after increasing it by their discount percentage.
// formula
// price * (1 + discountPercent / 100);

db.products.find({
  $expr: {
    $lt: [
      {
        $multiply: [
          "$price",
          { $add: [1, { $divide: ["$discountPercent", 100] }] },
        ],
      },
      250,
    ],
  },
});
