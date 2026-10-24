# MongoDB Learning

A practical, hands-on MongoDB learning repository focused on the fundamentals of working with MongoDB using the MongoDB shell (`mongosh`) and JavaScript-style `.mongodb.js` scripts.

This repo is designed for beginners who want to understand core MongoDB concepts by writing small, focused examples and running them directly in a MongoDB environment.

## Why this repository?

MongoDB is a document-oriented NoSQL database that stores data in flexible JSON-like documents. Instead of tables and rows, MongoDB uses:

- Databases
- Collections
- Documents
- Fields

This repository helps you learn the fundamentals through practical examples, from database basics and inserting documents to importing data and querying documents.

## Repository structure

```text
MongoDB Learning/
├── Basics/
│   ├── 01-database-basics.mongodb.js
│   └── 02-insert-documents.mongodb.js
├── Importing and Exporting Data/
│   ├── importing_json.mongodb.js
│   ├── users_array.json
│   ├── products_ndjson.json
│   └── exported_users_array.json
├── Reading Documents/
│   ├── 03-find-and-basic-filters.mongodb.js
│   ├── 04-comparison-operators.mongodb.js
│   ├── 05-cursors.mongodb.js
│   ├── 06-logical-operators.mongodb.js
│   ├── 07-complex-expressions.mongodb.js
│   ├── 08-element-operators.mongodb.js
│   └── 09-projection.mongodb.js
└── README.md
```

## Included lessons

### 1. Database basics

File: [Basics/01-database-basics.mongodb.js](./Basics/01-database-basics.mongodb.js)

This script introduces:

- listing databases with `db.getMongo().getDBs()`
- switching to a database with `use(<database-name>)`
- listing and creating collections
- dropping databases and collections
- understanding how MongoDB creates databases lazily (on first write)

### 2. Insert documents

File: [Basics/02-insert-documents.mongodb.js](./Basics/02-insert-documents.mongodb.js)

This script covers:

- `insertOne()` for adding a single document
- `insertMany()` for inserting multiple documents
- field naming conventions and when to quote field names
- ordered inserts (the default) vs unordered inserts (`{ ordered: false }`)
- handling duplicate or invalid document values during bulk writes

### 3. Importing and exporting JSON

File: [Importing and Exporting Data/importing_json.mongodb.js](./Importing%20and%20Exporting%20Data/importing_json.mongodb.js)

This lesson covers `mongoimport` and `mongoexport`, importing newline-delimited JSON (NDJSON) and JSON arrays, and exporting JSON or CSV. The Database Tools commands run in a terminal, not inside `mongosh`.

### 4. Finding documents and basic filters

File: [Reading Documents/03-find-and-basic-filters.mongodb.js](./Reading%20Documents/03-find-and-basic-filters.mongodb.js)

Learn to retrieve matching documents with `find()` and a single matching document with `findOne()`. Basic equality filters match exact, case-sensitive field values.

### 5. Comparison operators

File: [Reading Documents/04-comparison-operators.mongodb.js](./Reading%20Documents/04-comparison-operators.mongodb.js)

Practice `$eq`, `$ne`, `$gt`, `$gte`, `$lt`, `$lte`, `$in`, and `$nin` to compare field values and match values from a list.

### 6. Cursors

File: [Reading Documents/05-cursors.mongodb.js](./Reading%20Documents/05-cursors.mongodb.js)

Explore cursors and methods such as `count()`, `limit()`, `skip()`, and `sort()`. Large skip offsets can be inefficient; indexes can help support sorting.

### 7. Logical operators

File: [Reading Documents/06-logical-operators.mongodb.js](./Reading%20Documents/06-logical-operators.mongodb.js)

Combine or negate filter conditions with `$and`, `$or`, `$nor`, and `$not`. Conditions on separate fields are implicitly ANDed.

### 8. Complex expressions

File: [Reading Documents/07-complex-expressions.mongodb.js](./Reading%20Documents/07-complex-expressions.mongodb.js)

Use `$expr` with expressions such as `$multiply`, `$add`, and `$divide` to calculate values or compare fields within a document.

### 9. Element operators

File: [Reading Documents/08-element-operators.mongodb.js](./Reading%20Documents/08-element-operators.mongodb.js)

Filter based on field presence, BSON type, or array length with `$exists`, `$type`, and `$size`.

### 10. Projection

File: [Reading Documents/09-projection.mongodb.js](./Reading%20Documents/09-projection.mongodb.js)

Use the second argument to `find()` to include or exclude fields in the returned documents. `_id` is included by default and may be excluded in an inclusion projection. Do not mix inclusion and exclusion fields in one projection, except for `_id`.

## Cheatsheet

### Database and collection commands

```javascript
db.getMongo().getDBs()        // List databases that contain data
use("shop")                   // Switch to a database
db.getCollectionNames()       // List collections in the current database
db.createCollection("products")
db.products.drop()            // Drop a collection
db.dropDatabase()             // Drop the current database
```

Selecting a database does not create it immediately; MongoDB creates it when data is first written.

### Insert documents

```javascript
db.products.insertOne({ name: "Notebook", price: 12 })

db.products.insertMany([
  { name: "Pen", price: 2 },
  { name: "Bag", price: 30 },
])
```

With `insertMany()`, an error stops later inserts by default. Use `{ ordered: false }` to continue with other documents after an individual insert fails.

### Find and filter

```javascript
db.products.find()                              // Find all documents
db.products.find({ category: "Books" })         // Match a field value
db.products.findOne({ category: "Books" })      // Return one match
db.products.find({ price: { $gte: 10, $lt: 50 } })
db.products.find({ price: { $in: [10, 20, 30] } })
```

Common comparison operators: `$eq`, `$ne`, `$gt`, `$gte`, `$lt`, `$lte`, `$in`, `$nin`.

### Combine conditions

```javascript
// AND is implicit for different fields.
db.products.find({ price: { $lt: 500 }, category: "Books" })

db.products.find({
  $or: [{ price: { $lt: 500 } }, { category: "Books" }],
})
```

Use `$nor` when none of the listed conditions should match, and `$not` to negate an operator expression on a field.

### Cursor operations

```javascript
db.products.find({}).sort({ price: 1 }).limit(5)   // Ascending
db.products.find({}).sort({ price: -1 }).limit(5)  // Descending
db.products.find({}).sort({ price: 1 }).skip(10).limit(10)
db.products.countDocuments({ price: { $lt: 1000 } })
```

The cursor lesson demonstrates `.count()`; for new code, use `countDocuments(filter)`. Large `skip()` offsets can be inefficient.

### Expressions and element operators

```javascript
// Compare a calculated value using fields in the same document.
db.products.find({
  $expr: { $lt: [{ $multiply: ["$price", "$stock.available"] }, 10000] },
})

db.products.find({ price: { $exists: true, $lt: 200 } })
db.products.find({ price: { $type: "number" } })
db.products.find({ tags: { $size: 3 } })
```

`$expr` enables aggregation expressions in a query filter. `$exists` checks field presence, `$type` checks BSON type, and `$size` matches an array with exactly the specified number of elements.

### Projection

```javascript
db.products.find({}, { name: 1, brand: 1, price: 1 })  // Include fields
db.products.find({}, { discountPercent: 0 })           // Exclude a field
db.products.find({}, { _id: 0, name: 1, brand: 1 })   // Exclude _id
```

`_id` is returned by default. Apart from excluding `_id` in an inclusion projection, inclusion and exclusion cannot be mixed.

### Import and export

Run these in a terminal with MongoDB Database Tools installed:

```powershell
# Import NDJSON (one document per line).
mongoimport ".\Importing and Exporting Data\products_ndjson.json" --db shop --collection products

# Import a JSON array.
mongoimport ".\Importing and Exporting Data\users_array.json" --db shop --collection users --jsonArray

# Export a collection as NDJSON, or as a JSON array.
mongoexport --db shop --collection products --out products.json
mongoexport --db shop --collection users --jsonArray --out users.json
```

`mongoexport` also supports filtering with `--query`, choosing fields with `--fields`, and CSV output with `--type=csv`. MongoDB's 16 MB document limit applies to each document, not the whole import file.

## Prerequisites

Before running the examples, make sure you have:

- MongoDB installed and running locally, or access to a MongoDB Atlas cluster
- `mongosh` installed
- MongoDB Database Tools installed for the import/export lesson
- a basic understanding of JavaScript syntax

## Running the scripts

From the repository root, open a `mongosh` session:

```powershell
mongosh
```

Load a script from inside `mongosh`:

```javascript
load("./Basics/01-database-basics.mongodb.js")
```

Or run a script directly from the terminal:

```powershell
mongosh ".\Basics\01-database-basics.mongodb.js"
```

Review scripts before running them: some contain write or delete examples, and the insert lesson currently runs an `insertMany()` example.

## Example workflow

```javascript
use("adibas");

db.createCollection("shoes");

db.shoes.insertOne({
  brand: "Trevor O",
  color: "blue",
  size: 10,
});

db.shoes.find({ brand: "Trevor O" });
```

This creates and switches to a database named `adibas`, creates a `shoes` collection, inserts a document, and queries for it.

## Learning goals

By working through the lessons, you will practice:

- creating and switching databases
- creating collections and understanding document structure
- inserting data into MongoDB collections
- handling bulk inserts and validation errors
- importing, exporting, filtering, and projecting documents
- querying with comparison, logical, expression, and element operators
- working with query cursors

## Notes

This repository is intentionally beginner-friendly and focused on fundamental database operations. It is a starting point for deeper topics such as:

- updating and deleting documents
- aggregation
- indexing and performance
- data modeling
- MongoDB Atlas and production use cases

## Recommended next steps

As you progress, explore:

- `updateOne()` and `updateMany()`
- delete operations
- aggregation pipelines such as `$group`
- indexes and query performance
- relationships between documents and collections

## License

This repository is for learning and experimentation purposes.

## Contributing

This project is a personal learning repo, but improvements, corrections, and additional examples are welcome.

---

Built for hands-on MongoDB learning, one script at a time.
