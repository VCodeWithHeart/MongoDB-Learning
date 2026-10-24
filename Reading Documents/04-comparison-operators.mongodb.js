db.getMongo().getDBs();
use("shop");
db.getCollectionNames();

// Comparison Operators: ($eq, $ne, $gt, $gte, $lt, $lte, $in, $nin)

// $eq finds products with a price equal to 2969.
db.products.find({ price: { $eq: 2969 } });

// $ne finds products with a price other than 2969.
db.products.find({ price: { $ne: 2969 } });

// count() returns how many products match the query.
db.products.find({ price: { $ne: 2969 } }).count();

// $gt finds products with a price greater than 2969.
db.products.find({ price: { $gt: 2969 } });
db.products.find({ price: { $gt: 2969 } }).count();

// $gte finds products with a price of 2969 or higher.
db.products.find({ price: { $gte: 2969 } });
db.products.find({ price: { $gte: 2969 } }).count();

// $lt finds products with a price less than 2969.
db.products.find({ price: { $lt: 2969 } });
db.products.find({ price: { $lt: 2969 } }).count();

// $lte finds products with a price of 2969 or lower.
db.products.find({ price: { $lte: 2969 } });
db.products.find({ price: { $lte: 2969 } }).count();

// $in returns products whose price matches at least one value in the list.
db.products.find({ price: { $in: [1175, 1375, 2969] } });
// This finds products priced 1175, 1375, or 2969. Prices with no matching product are simply skipped.

// $nin returns products whose price does not match any value in the list.
db.products.find({ price: { $nin: [1175, 1375, 2969] } });
// This finds products priced anything other than 1175, 1375, or 2969.
