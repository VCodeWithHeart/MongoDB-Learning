# MongoDB Learning

A practical, hands-on MongoDB learning repository focused on the fundamentals of working with MongoDB using the MongoDB shell (`mongosh`) and JavaScript-style `.mongodb.js` scripts.

This repo is designed for beginners who want to understand core MongoDB concepts by writing small, focused examples and running them directly in a MongoDB environment.

## Why this repository?

MongoDB is a document-oriented NoSQL database that stores data in flexible JSON-like documents. Instead of tables and rows, MongoDB uses:

- Databases
- Collections
- Documents
- Fields

This repository helps you learn the fundamentals through simple examples such as:

- switching databases
- creating collections
- inserting single and multiple documents
- understanding ordered and unordered inserts

## Repository structure

```text
MongoDB Learning/
├── Basics/
│   ├── 01-database-basics.mongodb.js
│   └── 02-insert-documents.mongodb.js
└── README.md
```

## Included lessons

### 1. Database basics
File: `Basics/01-database-basics.mongodb.js`

This script introduces:

- listing databases with `db.getMongo().getDBs()`
- switching to a database with `use(<database-name>)`
- creating collections
- dropping databases and collections
- understanding how MongoDB creates databases lazily

### 2. Insert documents
File: `Basics/02-insert-documents.mongodb.js`

This script covers:

- `insertOne()` for adding a single document
- `insertMany()` for inserting multiple documents
- field naming conventions
- quoting field names when they contain spaces, special characters, or reserved words
- ordered vs unordered inserts
- handling duplicate or invalid document values during bulk writes

## Prerequisites

Before running the examples, make sure you have:

- MongoDB installed and running locally, or access to a MongoDB Atlas cluster
- `mongosh` installed
- a basic understanding of JavaScript syntax

## Running the scripts

If you are using a local MongoDB instance, start MongoDB first, then open a terminal and run:

```bash
mongosh
```

Once connected, you can load a script like this:

```javascript
load("./Basics/01-database-basics.mongodb.js")
```

Or you can run it directly from the shell:

```bash
mongosh ./Basics/01-database-basics.mongodb.js
```

## Example workflow

```javascript
use("adibas");

db.createCollection("shoes");

db.shoes.insertOne({
  brand: "Trevor O",
  color: "blue",
  size: 10,
});
```

This creates a database named `adibas`, creates a collection named `shoes`, and inserts a document into it.

## Learning goals

By the end of this repository, you should be comfortable with:

- creating and switching databases
- creating collections
- understanding document structure
- inserting data into MongoDB collections
- handling real-world insert scenarios like bulk writes and validation errors

## Notes

This repository is intentionally beginner-friendly and focused on fundamental database operations. It is a starting point for deeper topics such as:

- querying data
- updating and deleting documents
- indexing
- aggregation
- data modeling
- MongoDB Atlas and production use cases

## Recommended next steps

As you progress, explore:

- `find()` queries
- `updateOne()` and `updateMany()`
- `$group` aggregation
- indexes and performance
- relationships between documents and collections

## License

This repository is for learning and experimentation purposes.

## Contributing

This project is a personal learning repo, but improvements, corrections, and additional examples are welcome.

---

Built for hands-on MongoDB learning, one script at a time.
