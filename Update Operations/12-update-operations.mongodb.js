db.getMongo().getDBs();
use("shop");
db.getCollectionNames();

// updateOne() updates the first document that matches the filter.
// updateMany() updates every document that matches the filter.
// Use update operators such as $set to change specific fields.
// $set also creates a field if it does not already exist.
// $unset removes a field from a document.
// $rename changes a field's name while keeping its value.

// Syntax
// db.<collection>.updateOne(
//   <filter>,
//   { $set: { <field>: <newValue> } }
// );

// Example: set the price of the product with _id 1 to 99.99.
// db.products.updateOne(
//   { _id: 1 },
//   { $set: { price: 99.99 } }
// );

// Syntax
// db.<collection>.updateMany(
//   <filter>,
//   { $set: { <field>: <newValue> } }
// );

// Example: mark every product in the Accessories category as unavailable.
// db.products.updateMany(
//   { category: "Accessories" },
//   { $set: { available: false } }
// );

// db.products.find({}).sort({ productId: 1 });

// 1. Use updateOne() to change the price of product PRD-0001 to 199.

// db.products.updateOne({ productId: "PRD-0001" }, { $set: { price: 199 } });

// db.products.find({}).sort({ productId: 1 });

// 2. Use updateOne() to change product PRD-0001's stock.lowStockThreshold to 15.

// db.products.updateOne(
//   { productId: "PRD-0001" },
//   { $set: { "stock.lowStockThreshold": 15 } },
// );

// db.products.find({}).sort({ productId: 1 });

// 3. Use updateOne() to add a new field named featured with the value true
//    to product PRD-0001.

// db.products.updateOne({ productId: "PRD-0001" }, { $set: { featured: true } });

// db.products.find({}).sort({ productId: 1 });

// 4. Use updateMany() to set isPublished to false for all Electronics products.

// db.products.updateMany(
//   { category: "Electronics" },
//   { $set: { isPublished: false } },
// );

// db.products.find({ category: "Electronics" });

// 5. Use updateMany() to set inStock to false for products with fewer than
//    10 available units in stock.

// db.products.updateMany(
//   { "stock.available": { $lt: 10 } },
//   { $set: { inStock: false } },
// );

// db.products.find({ "stock.available": { $lt: 10 } });

// 6. Use updateMany() to increase stock.available by 5 for all products
//    supplied by Westline Traders.

// db.products.updateMany(
//   { "supplier.name": "Westline Traders" },
//   {
//     $inc: {
//       "stock.available": 5,
//     },
//   },
// );

// db.products
//   .find({ "supplier.name": "Westline Traders" })
//   .sort({ productId: 1 });

// 7. Use updateMany() to add a new field named onSale with the value true
//    to products whose discountPercent is greater than 0.

// db.products.updateMany(
//   { discountPercent: { $gt: 0 } },
//   {
//     $set: {
//       onSale: true,
//     },
//   },
// );

// db.products
//   .find({ discountPercent: { $gt: 0 } })

// 8. Use updateMany() to remove the featured field from all products where
//    it exists.

// db.products.updateMany(
//   {
//     featured: {
//       $exists: true,
//     },
//   },
//   {
//     $unset: { featured: 1 },
//   },
// );

// db.products.find({
//   featured: {
//     $exists: true,
//   },
// });

// 9. Use updateMany() to rename the onSale field to onDiscount for all products that have onSale.

// db.products.updateMany(
//   {
//     onSale: {
//       $exists: true,
//     },
//   },
//   { $rename: { onSale: "onDiscount" } },
// );

// db.products.find();
