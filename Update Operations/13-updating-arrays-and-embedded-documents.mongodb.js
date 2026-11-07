db.getMongo().getDBs();
use("shop");
db.getCollectionNames();

// Topics: $push, $each, $addToSet, $pull, $pop, positional $, $[], $[<identifier>],
// arrayFilters, and dot notation with $set and $inc.

// $push adds a value to the end of an array.
// Syntax: { $push: { <arrayField>: <value> } }

// $each adds multiple values to an array when used with $push.
// Syntax: { $push: { <arrayField>: { $each: [<value1>, <value2>] } } }

// $addToSet adds a value to an array only if it is not already there.
// Syntax: { $addToSet: { <arrayField>: <value> } }

// $pull removes array values that match a condition.
// Syntax: { $pull: { <arrayField>: { <field>: <value> } } }

// $pop removes the first or last value from an array.
// Syntax: { $pop: { <arrayField>: 1 } } // 1 removes the last; -1 removes the first.

// Positional $ updates the first array element that matched the filter.
// Syntax: { $set: { "<arrayField>.$.<field>": <value> } }

// Positional $[] updates every element in an array.
// Syntax: { $set: { "<arrayField>.$[].<field>": <value> } }

// Positional $[<identifier>] updates array elements that match arrayFilters.
// Syntax: updateOne(<filter>, { $set: { "<arrayField>.$[item].<field>": <value> } },
//                   { arrayFilters: [{ "item.<field>": <condition> }] })

// Dot notation with $set changes a nested field; with $inc, it increases or decreases a number.
// Syntax: { $set: { "<nestedField>": <value> } } or { $inc: { "<nestedField>": <amount> } }

db.products.find({}).sort({ productId: 1 });

// 1. Use $push to add "featured" to the tags array of product PRD-0001.

db.products.updateOne(
  { productId: "PRD-0001" },
  { $push: { tags: "featured" } },
);

db.products.find({ productId: "PRD-0001" });

// 2. Use $pop to remove the first value from the tags array of product PRD-0001.

db.products.updateOne({ productId: "PRD-0001" }, { $pop: { tags: 1 } });
db.products.find({ productId: "PRD-0001" });

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< NOW WORKING WITH VIDEOS COLLECTION IN THE BELOW EXAMPLES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------

db.getMongo().getDBs();
use("shop");
db.getCollectionNames();

db.videos.find({});

// 3. In one video, use updateOne() and the positional $ operator to increase
//    likes by 5 on Amit's pinned comment (user id 103).

db.videos.updateOne(
  {
    comments: {
      $elemMatch: {
        "user.id": 103,
        status: "pinned",
      },
    },
  },
  { $inc: { "comments.$.likes": 5 } },
);

db.videos.findOne({
  comments: {
    $elemMatch: {
      "user.id": 103,
      status: "pinned",
    },
  },
});

db.videos.findOne({
  comments: {
    $elemMatch: {
      "user.id": 103,
      status: "pinned",
    },
  },
});

// Practice:
// 1. Use $push to add "aggregation" to the tags array of one video tagged "mongodb".

db.videos.updateOne(
  {
    tags: { $all: ["mongodb"] },
  },
  {
    $push: { tags: "aggregation" },
  },
);

db.videos.find({
  tags: { $all: ["mongodb"] },
});

// 2. Use $push with $each to add "beginner" and "tutorial" to one video's tags.

db.videos.updateOne(
  { _id: ObjectId("6ade33dcde869742754aee74") },
  { $push: { tags: { $each: ["beginner", "tutorial"] } } },
);

db.videos.find({ _id: ObjectId("6ade33dcde869742754aee74") });

// 3. Use $addToSet to add "mongodb" to one video's tags without creating a duplicate.

db.videos.updateOne(
  { _id: ObjectId("6ade33dcde869742754aee74") },
  {
    $addToSet: { tags: "mongodb" },
  },
);

// to remove multiple values from an array you can use $pullAll
db.videos.updateOne(
  { _id: ObjectId("6ade33dcde869742754aee74") },
  {
    $pullAll: { tags: ["beginner", "tutorial"] },
  },
);

db.videos.find({ _id: ObjectId("6ade33dcde869742754aee74") });

// 4. Use $pull to remove comments with status "pinned" from one video.

db.videos.updateOne(
  { _id: ObjectId("6ade33dcde869742754aee74") },
  {
    $pull: {
      comments: {
        status: "pinned",
      },
    },
  },
);

db.videos.find({ _id: ObjectId("6ade33dcde869742754aee74") });

// 5. Use $pop to remove the last comment from one video.

db.videos.updateOne(
  { _id: ObjectId("6ade33dcde869742754aee74") },
  { $pop: { comments: 1 } },
);

db.videos.find({ _id: ObjectId("6ade33dcde869742754aee74") });

// 6. Use the positional $ operator to increase likes by 5 on Amit's pinned comment (user id 103).

db.videos.updateOne(
  {
    comments: {
      $elemMatch: {
        "user.id": 103,
        status: "pinned",
      },
    },
  },
  {
    $inc: {
      "comments.$.likes": 5,
    },
  },
);

db.videos.find();

// 7. Use $[] to increase likes by 1 on every comment in one video.

db.videos.updateOne(
  { _id: ObjectId("6ade33dcde869742754aee75") },
  {
    $inc: { "comments.$[].likes": 1 },
  },
);

db.videos.find({ _id: ObjectId("6ade33dcde869742754aee75") });

// 8. Use $[comment] with arrayFilters to increase likes by 5 on Amit's comments (user id 103).

db.videos.updateMany(
  { "comments.user.id": 103 },
  { $inc: { "comments.$[comment].likes": 5 } },
  { arrayFilters: [{ "comment.user.id": 103 }] },
);

// 9. Use dot notation with $set to change one video's video.quality from "1080p" to "4K".

db.videos.updateOne(
  {
    _id: ObjectId("6ade33dcde869742754aee74"),
  },
  {
    $set: {
      "video.quality": "4K",
    },
  },
);

// 10. Use dot notation with $inc to increase likes by 5 on one matching comment.

db.videos.updateOne(
  {
    _id: ObjectId("6ade33dcde869742754aee74"),
    comments: {
      $elemMatch: {
        "user.id": 103,
      },
    },
  },
  {
    $inc: {
      "comments.$.likes": 5,
    },
  },
);

// Example solution for question 6:
// The positional $ refers to the first comments array element matched by the filter.
db.videos.updateOne(
  {
    comments: {
      $elemMatch: {
        "user.id": 103,
        status: "pinned",
      },
    },
  },
  { $inc: { "comments.$.likes": 5 } },
);
