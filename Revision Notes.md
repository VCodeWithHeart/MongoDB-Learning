# MongoDB Revision Notes

Use the questions before the answer key for active recall. The examples follow the collections and fields used in this repository; `shop.products` and `shop.users` are the import examples, while `videos` and `fieldLabKits` are query-practice collections.

## A. Quick Revision Index

| Group | Topic or operator | Purpose | Use it when... |
|---|---|---|---|
| Basics | Databases and collections | Select a database and work with its collections. | You need to orient yourself in `mongosh` or understand when a database is created. |
| Basics | `insertOne()`, `insertMany()` | Add one or many documents. | You are putting new documents into a collection. |
| Find | `find()`, `findOne()` | Retrieve matching documents or one match. | You need to read documents, with or without a filter. |
| Comparison | `$eq`, `$ne`, `$gt`, `$gte`, `$lt`, `$lte` | Compare a field with a value. | A requirement describes equality, inequality, or a numeric boundary. |
| Comparison | `$in`, `$nin` | Match a value against a list of alternatives or exclusions. | A field may have any of several values, or must avoid all listed values. |
| Cursors | `count()`, `limit()`, `skip()`, `sort()` | Count, limit, skip, and order query results. | You need a result count or a manageable, ordered subset. |
| Logic | `$and`, `$or`, `$not`, `$nor` | Combine or negate filter conditions. | A requirement says “and,” “or,” or “none of these.” |
| Expressions | `$expr`, `$multiply`, `$add`, `$divide` | Calculate with document fields inside a filter. | The condition depends on a calculated value or compares fields in one document. |
| Field/element | `$exists`, `$type`, `$size` | Check field presence, BSON type, or exact array length. | A requirement is about a field’s existence, type, or array length. |
| Output | Projection | Choose which fields `find()` returns. | You want to include or exclude fields in the result. |
| Nested data | Dot notation | Query fields inside embedded documents or array elements. | A field is nested, such as `stock.available` or `skills.language`. |
| Arrays | `$all`, `$elemMatch` | Require multiple array values or conditions on one array element. | You are filtering tags or objects stored in an array. |
| Data tools | `mongoimport`, `mongoexport` | Import or export JSON and CSV data from a terminal. | You need to move collection data to or from files. |

## B. Topic-Wise Revision Notes

### 1. Databases and collections
**Core idea:** A database contains collections, and collections contain documents. Selecting a database with `use()` does not persist an empty database; it is created when data is first written.

**When to use it:** When switching databases, checking available collections, or preparing to work with a collection.

**Basic syntax:**
```javascript
use("shop");
db.getCollectionNames();
```

**Example from my practice:** `use("adibas");` selects the `adibas` database in the database-basics lesson.

**Common mistake:** Do not assume that `use("name")` alone makes a new database appear in the database list. Also, dropping a database or collection deletes data.

**Related concepts:** `db.getMongo().getDBs()` lists databases that contain data; `db.getCollectionNames()` lists collections in the selected database.

**Active recall:** What must happen before a newly selected database is persisted? Which command lists collections in the current database?

### 2. Inserting documents
**Core idea:** `insertOne()` adds one document; `insertMany()` adds a list of documents. `insertMany()` is ordered by default and stops processing later documents after an error; `{ ordered: false }` allows other valid inserts to continue.

**When to use it:** When adding one new record or loading several documents into a collection.

**Basic syntax:**
```javascript
db.shoes.insertOne({ color: "red", size: 12 });
db.shoes.insertMany([{ color: "blue", size: 11 }, { color: "green", size: 10 }]);
```

**Example from my practice:** The shoes lesson uses `insertMany()` with `color` and `size`, and demonstrates `{ ordered: false }`.

**Common mistake:** `insertMany()` expects an array of documents. Quote field names that contain spaces or special characters, such as `"shoes desc"`.

**Related concepts:** Ordered insertion is the default; unordered insertion continues after an individual insert error, but documents that fail are still not inserted.

**Active recall:** What is the default behavior when one document in an ordered `insertMany()` fails? How can a field name containing a space be written?

### 3. Finding documents
**Core idea:** `find()` returns matching documents through a cursor; `findOne()` returns one matching document. An empty filter matches all documents.

**When to use it:** Use a filter to retrieve matching documents, or use `findOne()` when only one matching document is needed.

**Basic syntax:**
```javascript
db.shoes.find({ brand: "Asics" });
db.shoes.findOne({ brand: "Asics" });
```

**Example from my practice:** The `abibas.shoes` lesson finds shoes by `brand: "Asics"`.

**Common mistake:** String equality is case-sensitive: `"Asics"` and `"ASICS"` are different values.

**Related concepts:** `find()` can return many matches; `findOne()` returns only one matching document, not necessarily a uniquely identified one.

**Active recall:** What does `find({})` match? Does `findOne()` mean that the filter is unique?

### 4. Comparison operators
**Core idea:** Comparison operators match a field against one or more values or boundaries.

**When to use it:** Use them when a requirement specifies an exact value, a range, or a set of allowed or excluded values.

**Basic syntax:**
```javascript
db.products.find({ price: { $gte: 100, $lt: 500 } });
db.products.find({ price: { $in: [1175, 1375, 2969] } });
```

**Example from my practice:** The `shop.products` lesson uses `$gt`, `$gte`, `$lt`, `$lte`, `$ne`, `$in`, and `$nin` with `price`.

**Common mistake:** `$gt` and `$lt` exclude the boundary; `$gte` and `$lte` include it. `$in` means any listed value, not all listed values.

**Related concepts:** `$eq` is explicit equality; `{ price: 2969 }` is the shorter direct-equality form.

**Active recall:** Which operator includes the lower boundary of a range? If `price` may be 10, 20, or 30, should you use `$in` or `$all`?

### 5. Cursors: count, limit, skip, and sort
**Core idea:** A cursor represents query results and can be narrowed or ordered with cursor methods.

**When to use it:** Use `count()` in the lesson’s examples to count matches, `limit()` to cap results, `skip()` to move past results, and `sort()` to order them.

**Basic syntax:**
```javascript
db.products.find({ price: { $lt: 1000 } }).sort({ price: 1 }).skip(1).limit(2);
```

**Example from my practice:** The cursor lesson sorts `shop.products` by `price: 1` (ascending) or `price: -1` (descending).

**Common mistake:** Large `skip()` offsets can be inefficient. Do not assume result order unless you sort.

**Related concepts:** The lesson demonstrates `find(filter).count()`; `countDocuments(filter)` is the count method also shown in the repository README.

**Active recall:** What do `1` and `-1` mean in a sort specification? What does `skip(1)` do before a `limit(2)`?

### 6. Logical operators
**Core idea:** Logical operators combine or negate filter conditions. Conditions on different fields in one filter are implicitly ANDed.

**When to use it:** Use `$or` when either condition can match, `$nor` when none may match, or `$not` to negate a field operator expression.

**Basic syntax:**
```javascript
db.products.find({
  $or: [{ price: { $lt: 500 } }, { category: "Books" }],
});
```

**Example from my practice:** The logical-operators lesson queries `shop.products` for price below 500 **or** category `"Books"`.

**Common mistake:** `$and` combines document-level conditions; it does not require conditions on an array to match the same array element.

**Related concepts:** `{ price: { $lt: 500 }, category: "Books" }` is an implicit AND. Use `$elemMatch` when several conditions must match one object in an array.

**Active recall:** How does `$nor` differ from `$or`? When would implicit AND be enough?

### 7. Calculated filters with `$expr`
**Core idea:** `$expr` lets a query filter use aggregation expressions, including calculations with fields from the same document.

**When to use it:** Use it when a requirement depends on a calculated value rather than comparing a field directly to a constant.

**Basic syntax:**
```javascript
db.products.find({
  $expr: { $lt: [{ $multiply: ["$price", "$stock.available"] }, 10000] },
});
```

**Example from my practice:** The `shop.products` lesson compares `price * stock.available` with `10000`.

**Common mistake:** Inside an expression, field references need a `$` prefix, such as `"$price"`; a bare string `"price"` is not a field reference.

**Related concepts:** `{ price: { $lt: 10000 } }` compares the stored `price`; `$expr` can compare a computed expression instead.

**Active recall:** Why is `$expr` needed to compare a product’s calculated stock value with 10000? How is a field referenced inside `$multiply`?

### 8. Field and element operators
**Core idea:** `$exists` tests whether a field is present, `$type` tests its BSON type, and `$size` matches an array’s exact length.

**When to use it:** Use these when a requirement concerns presence, type, or exact array length rather than an ordinary field value.

**Basic syntax:**
```javascript
db.products.find({ price: { $exists: true, $lt: 200 } });
db.products.find({ price: { $type: "number" } });
db.products.find({ tags: { $size: 3 } });
```

**Example from my practice:** The element-operators lesson checks for numeric `price`, boolean `inStock`, and arrays with three `tags`.

**Common mistake:** `$size` matches an exact array length; it is not a minimum or maximum length operator.

**Related concepts:** `$exists: true` checks presence even if the value is `null`; it does not mean that the value is non-null.

**Active recall:** What does `$size: 3` require? Does `$exists: true` guarantee a useful or non-null value?

### 9. Projection
**Core idea:** The second argument to `find()` controls which fields are returned, not which documents match.

**When to use it:** Use an inclusion projection to return selected fields or an exclusion projection to omit selected fields.

**Basic syntax:**
```javascript
db.products.find({}, { name: 1, brand: 1, _id: 0 });
```

**Example from my practice:** The projection lesson includes `name`, `brand`, and other product fields while omitting `_id`.

**Common mistake:** Do not mix inclusion and exclusion fields in one projection, except that `_id` may be excluded in an inclusion projection. `_id` is included by default.

**Related concepts:** The first `find()` argument is the filter; the second is the projection.

**Active recall:** In `find(filter, projection)`, which argument chooses documents? What happens to `_id` if you do not mention it?

### 10. Embedded documents and dot notation
**Core idea:** Dot notation addresses a nested field by joining its path segments with dots. It works for fields in embedded documents and can also match fields in embedded documents inside arrays.

**When to use it:** Use it when a field is nested, such as a supplier’s rating or a product’s available stock.

**Basic syntax:**
```javascript
db.products.find({ "supplier.rating": { $gt: 4.5 } });
db.products.find({ "stock.available": { $lte: 10 } });
```

**Example from my practice:** The embedded-document lesson uses `"attributes.warrantyMonths": 0` and `"stock.available"`.

**Common mistake:** Put quotes around a dotted field path. For an array of objects, independent dotted conditions may match different array elements.

**Related concepts:** A single embedded document such as `supplier` has nested fields; an array such as `comments` contains multiple embedded documents and may need `$elemMatch`.

**Active recall:** How do you query `rating` inside `supplier`? Why can two dotted conditions on an array be less strict than `$elemMatch`?

### 11. Array operators: `$all` and `$elemMatch`
**Core idea:** `$all` requires an array to contain every listed value. `$elemMatch` requires at least one array element to satisfy every condition inside it.

**When to use it:** Use `$all` for multiple required tag values; use `$elemMatch` for multiple conditions that must describe one comment, mission, or other array object.

**Basic syntax:**
```javascript
db.videos.find({ tags: { $all: ["mongodb", "backend"] } });

db.videos.find({
  comments: {
    $elemMatch: {
      "user.username": "amit",
      status: "pinned",
      likes: { $gte: 20 },
    },
  },
});
```

**Example from my practice:** The array lesson requires `mongodb` and `backend` tags, and separately requires one `comments` element to have Amit’s username, pinned status, and at least 20 likes.

**Common mistake:** Dotted conditions such as `"comments.user.username": "rahul"` and `"comments.likes": { $gte: 10 }` can be satisfied by different comments. `$and` does not fix this; use `$elemMatch` to require one comment to satisfy both.

**Related concepts:** `$in` means at least one listed value matches; `$all` means every listed value is present. `$elemMatch` ties conditions to one array element; `$and` only combines conditions at the document level.

**Active recall:** Which operator checks all required tag values? Which one makes multiple predicates apply to one comment?

### 12. Importing and exporting data
**Core idea:** `mongoimport` and `mongoexport` are MongoDB Database Tools commands run in a terminal, not in `mongosh`.

**When to use it:** Use `mongoimport` to load JSON into a collection and `mongoexport` to write collection data to JSON or CSV.

**Basic syntax:**
```powershell
mongoimport --db shop --collection products ".\Importing and Exporting Data\products_ndjson.json"
mongoimport --db shop --collection users --file ".\Importing and Exporting Data\users_array.json" --jsonArray
```

**Example from my practice:** `products_ndjson.json` is newline-delimited JSON; `users_array.json` is a JSON array and uses `--jsonArray`.

**Common mistake:** Do not use `--jsonArray` for NDJSON. A JSON array import needs the option, while NDJSON stores one document per line.

**Related concepts:** `mongoexport --jsonArray` controls the export format; `--type=csv` with `--fields` exports selected columns as CSV.

**Active recall:** Which input file in this workspace needs `--jsonArray`? Do you run `mongoimport` inside `mongosh`?

## C. Important Differences Between Similar Concepts

| Concepts | Difference | Choose this when... |
|---|---|---|
| `$all` vs `$in` | `$all` requires every listed value in an array. `$in` matches a field equal to any listed value. | Use `$all` for all required tags; use `$in` for one of several accepted prices. |
| `$elemMatch` vs dotted array paths | `$elemMatch` requires one array element to satisfy all enclosed conditions. Independent dotted paths can be satisfied by different elements. | Use `$elemMatch` when conditions must describe the same comment or mission. |
| `$and` vs `$elemMatch` | `$and` requires all filter expressions to match the document; it does not bind array conditions to one element. | Use `$and` for document-level conditions; use `$elemMatch` for same-element array conditions. |
| `$eq` vs direct equality | `{ price: { $eq: 2969 } }` and `{ price: 2969 }` both express equality. | Direct equality is concise; `$eq` is useful when making the comparison operator explicit. |
| `$gt` / `$gte` vs `$lt` / `$lte` | `$gt` and `$lt` exclude the boundary; `$gte` and `$lte` include it. | Pick inclusive or exclusive boundaries from the wording of the requirement. |
| Embedded document vs array of embedded documents | A nested path like `stock.available` addresses a field in one embedded object. An array path may match across its elements. | Use dot notation for a nested field; add `$elemMatch` when multiple predicates must belong to one array object. |

#### Array-of-objects example

Suppose a video query has these independent predicates:

```javascript
{ "comments.user.username": "rahul", "comments.likes": { $gte: 10 } }
```

They can be met by separate comment elements: one comment may be by Rahul and another may have 10 or more likes. Writing those predicates inside `$and` still does not require one comment to satisfy both. To bind them to one comment, use:

```javascript
{
  comments: {
    $elemMatch: {
      "user.username": "rahul",
      likes: { $gte: 10 },
    },
  },
}
```

By contrast, `tags: { $all: ["mongodb", "backend"] }` says the same `tags` array must contain both values; `$all` is not a substitute for same-object matching.

## D. Common Mistakes to Avoid

The practice files do not provide enough evidence to identify recurring personal mistakes, so these are general reminders rather than claims about mistakes you made.

| Mistake or confusion | Correct understanding | Reminder |
|---|---|---|
| Expecting `use()` to create a visible database immediately | A database is persisted after data is written. | Select first; write to create it. |
| Treating `$gt` as inclusive | `$gt` excludes the compared value; `$gte` includes it. | Check whether the requirement says “greater than” or “at least.” |
| Using `$in` to require every array value | `$in` means any; `$all` means every listed array value. | “Any of these” → `$in`; “all of these” → `$all`. |
| Assuming dotted array conditions refer to one object | Conditions may match different array elements. | Use `$elemMatch` when the same element must satisfy them. |
| Treating `$and` as array-element binding | `$and` combines document-level predicates only. | `$and` is not a replacement for `$elemMatch`. |
| Mixing inclusion and exclusion in a projection | Inclusion and exclusion cannot be mixed, except for `_id`. | Choose one projection style. |
| Importing a JSON array like NDJSON | JSON arrays need `--jsonArray`; NDJSON is one document per line. | Check the file shape before importing. |

## E. Active Recall Practice

Try each question before opening the answer key.

1. **Choose an operator:** A product’s `price` may be 1175, 1375, or 2969. Which operator matches any one of those values?
2. **Write a query:** Find products whose supplier rating is greater than 4.5 and whose available stock is at most 10.
3. **Predict a match:** In the supplied product data, `PRD-0001` has `price: 154` and `inStock: true`. Does it match `{ price: { $gte: 154, $lt: 200 }, inStock: true }`?
4. **Compare concepts:** A video needs both `"mongodb"` and `"backend"` in `tags`. Should the filter use `$in` or `$all`?
5. **Write a query:** Find videos with one comment by Amit, marked `"pinned"`, with at least 20 likes.
6. **Predict a match:** `PRD-0001` has `price: 154` and `stock.available: 62`. Does it match `$expr: { $lt: [{ $multiply: ["$price", "$stock.available"] }, 10000] }`?
7. **Explain the difference:** Why can independent dotted conditions on `comments` match a video when no single comment satisfies both conditions? What operator prevents that?
8. **Write a query:** Return only `name` and `brand` from `products`, and do not return `_id`.
9. **Combine concepts:** Find videos that have all three tags `"mongodb"`, `"backend"`, and `"database"`, have `video.quality` equal to `"1080p"`, and have one comment from user id `103` that is pinned and has at least 20 likes.
10. **Choose an import option:** Which import file in this workspace requires `--jsonArray`, `users_array.json` or `products_ndjson.json`?

### Answer key

1. Use `$in`: `db.products.find({ price: { $in: [1175, 1375, 2969] } })`. It matches any listed price.
2. `db.products.find({ "supplier.rating": { $gt: 4.5 }, "stock.available": { $lte: 10 } })`. Different fields in one filter are implicitly ANDed.
3. Yes. 154 is at least 154 and below 200, and the document is in stock.
4. Use `$all`: `db.videos.find({ tags: { $all: ["mongodb", "backend"] } })`. Both values must occur in the tags array.
5. Use `$elemMatch` on `comments`:
   ```javascript
   db.videos.find({
     comments: {
       $elemMatch: {
         "user.username": "amit",
         status: "pinned",
         likes: { $gte: 20 },
       },
     },
   });
   ```
   One comment must meet all three conditions.
6. Yes. `154 * 62 = 9548`, which is less than 10000.
7. Each dotted predicate is evaluated independently and may match a different comment. `$elemMatch` makes the predicates apply to one array element.
8. `db.products.find({}, { name: 1, brand: 1, _id: 0 })`. The second argument is the projection.
9. Use `$all` for tags, direct equality for quality, and `$elemMatch` for the one matching comment:
   ```javascript
   db.videos.find({
     tags: { $all: ["mongodb", "backend", "database"] },
     "video.quality": { $eq: "1080p" },
     comments: {
       $elemMatch: {
         "user.id": { $eq: 103 },
         status: "pinned",
         likes: { $gte: 20 },
       },
     },
   });
   ```
10. `users_array.json` needs `--jsonArray`; `products_ndjson.json` is newline-delimited JSON and does not.

## F. Quick Syntax Reference

```javascript
// Select a database; list its collections
use("shop");
db.getCollectionNames();

// Insert documents
db.collection.insertOne({ field: "value" });
db.collection.insertMany([{ field: "one" }, { field: "two" }], { ordered: false });

// Find and compare
db.products.find({ price: { $gte: 100, $lt: 500 } });
db.products.find({ price: { $in: [1175, 1375, 2969] } });
db.products.find({ $or: [{ price: { $lt: 500 } }, { category: "Books" }] });

// Nested fields, array values, and same-element matching
db.products.find({ "stock.available": { $lte: 10 } });
db.videos.find({ tags: { $all: ["mongodb", "backend"] } });
db.videos.find({ comments: { $elemMatch: { status: "pinned", likes: { $gte: 20 } } } });

// Calculated filter and projection
db.products.find({ $expr: { $lt: [{ $multiply: ["$price", "$stock.available"] }, 10000] } });
db.products.find({}, { name: 1, brand: 1, _id: 0 });

// Order and limit results
db.products.find({}).sort({ price: 1 }).skip(10).limit(10);
```

Run data-tool commands in a terminal:

```powershell
mongoimport --db shop --collection products ".\Importing and Exporting Data\products_ndjson.json"
mongoimport --db shop --collection users --file ".\Importing and Exporting Data\users_array.json" --jsonArray
mongoexport --db shop --collection products --jsonArray --out products_array.json
mongoexport --db shop --collection products --type=csv --fields productId,name,price --out products.csv
```
