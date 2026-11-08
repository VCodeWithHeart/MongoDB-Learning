db.getMongo().getDBs();
use("shop");
db.getCollectionNames();

// Delete operations are used to remove documents from a collection

// delete a single document
// Syntax: db.collectionName.deleteOne({ <filter> });
// db.collectionName.deleteOne({ _id: ObjectId("12345") });

// delete multiple documents
// Syntax: db.collectionName.deleteMany({ <filter> });

db.products.find();

db.products.deleteOne({ _id: ObjectId("6ae39e9886aeacb8c7e34843") });

db.products.find({ _id: ObjectId("6ae39e9886aeacb8c7e34843") });

// Suppose we want to delete all the products that are not published and are on discount, we can use the deleteMany() method.

db.products.find().count(); // 149 products

db.products.find({ isPublished: false, onDiscount: true }).count(); // 5 products

// now we have to delete these five products

db.products.deleteMany({ isPublished: false, onDiscount: true });

db.products.find({ isPublished: false, onDiscount: true }).count(); // 0 products now

db.products.find().count(); // 144 products now
