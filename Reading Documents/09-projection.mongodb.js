db.getMongo().getDBs();
use("shop");
db.getCollectionNames();

// find() takes a filter first and a projection second:
// db.collection.find(filter, projection)
// An empty filter ({}) matches every document.
//
// In an inclusion projection, set the fields you want to return to 1.
// MongoDB also includes _id by default unless you explicitly set it to 0.
// Do not mix included and excluded fields in one projection, except for _id.

// Return only these product fields (plus _id, which is included by default).
db.products.find(
  {},
  {
    name: 1,
    brand: 1,
    category: 1,
    inStock: 1,
    price: 1,
    discountPercent: 1,
    finalPrice: 1,
  },
);

// In an exclusion projection, set the fields you want to leave out to 0.
// All other fields are returned. This example omits the listed fields.
db.products.find(
  {},
  {
    name: 0,
    brand: 0,
    category: 0,
    inStock: 0,
    price: 0,
    discountPercent: 0,
    finalPrice: 0,
  },
);

// _id is the exception to the inclusion/exclusion rule:
// it can be excluded while other fields are included.
db.products.find(
  {},
  {
    _id: 0,
    name: 1,
    brand: 1,
  },
);