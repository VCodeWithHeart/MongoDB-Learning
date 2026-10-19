use("abibas");

// db.shoes.insertMany([
//   {
//     brand: "Nike",
//     model: "Air Max 90",
//     color: "Red",
//     size: 13,
//     price: 130.0,
//     inStock: true,
//     category: "Running",
//   },
//   {
//     brand: "Adidas",
//     model: "Ultraboost",
//     color: "Core Black",
//     size: 10.5,
//     price: 180.5,
//     inStock: false,
//   },
//   {
//     brand: "Puma",
//     model: "Suede Classic",
//     color: "Royal Blue",
//     size: 9,
//     price: 75.0,
//     inStock: true,
//     category: "Lifestyle",
//   },
//   {
//     brand: "New Balance",
//     model: "574 Core",
//     color: "Grey",
//     size: 11,
//     price: 89.99,
//     inStock: true,
//     rating: 4.5,
//   },
//   {
//     brand: "Vans",
//     model: "Old Skool",
//     color: "Checkerboard",
//     size: 8.5,
//     price: 70.0,
//     inStock: false,
//     category: "Skateboarding",
//   },
//   {
//     brand: "Converse",
//     model: "Chuck Taylor All Star",
//     color: "Optic White",
//     size: 12,
//     price: 65.0,
//     inStock: true,
//   },
//   {
//     brand: "Reebok",
//     model: "Club C 85",
//     color: "Vintage Chalk",
//     size: 10,
//     price: 85.0,
//     inStock: true,
//     rating: 4.7,
//   },
//   {
//     brand: "Asics",
//     model: "Gel-Kayano 28",
//     color: "Directoire Blue",
//     size: 9.5,
//     price: 160.0,
//     inStock: true,
//   },
//   {
//     brand: "Asics",
//     model: "Gel-Kayano 29",
//     color: "Flame Red",
//     size: 10.5,
//     price: 260.0,
//     inStock: true,
//   },
//   {
//     brand: "Jordan",
//     model: "Air Jordan 1 High",
//     color: "Chicago",
//     size: 13,
//     price: 180.0,
//     inStock: true,
//     rating: 4.9,
//   },
// ]);

// find vs findOne

// db.shoes.find(); // returns all the documents inside the shoes collection

// db.shoes.find({ brand: "Asics" }); // returns all with brand name Asics (it is case sensitive)

db.shoes.findOne({ brand: "Asics" }); // returns the first document with name Asics
