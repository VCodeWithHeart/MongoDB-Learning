db.getMongo().getDBs();
use("shop");
db.getCollectionNames();

// $filter, $map, $reduce, $size, $arrayElemAt

// $filter - It is used to filter the elements of an array based on a specified condition.
// Syntax:
// { $filter: { input: <array>, as: <string>, cond: <expression> } }

db.products.find();

// Question: Write an aggregation pipeline that returns each matching product’s name, category, and a featuredTags array containing only tags equal to "bestseller" or "limited-stock". Exclude products where featuredTags is empty. Don’t use $unwind.

db.products.aggregate([
  {
    $project: {
      name: 1,
      category: 1,
      featuredTags: {
        $filter: {
          input: "$tags",
          as: "tag",
          cond: {
            $in: ["$$tag", ["bestseller", "limited-stock"]],
          },
        },
      },
    },
  },
  {
    // $match: {
    //   "featuredTags.0": { $exists: true },
    // },
    $match: {
      $expr: {
        $gt: [{ $size: "$featuredTags" }, 0],
      },
    },
  },
]);

// remember in the aggregation the operator comes first unlike the find one $gt comes first but in find fieldname: operator comes

// $map - It is used to apply a specified expression to each element of an array and return a new array with the results.
// Syntax:
// { $map: { input: <array>, as: <string>, in: <expression> } }

// Question:- Transform the tags array into uppercase and store them in upperCaseTags field and only show the name and upperCaseTags field in output

db.products.aggregate([
  {
    $project: {
      name: 1,
      upperCaseTags: {
        $map: {
          input: "$tags",
          as: "tag",
          in: { $toUpper: "$$tag" },
        },
      },
    },
  },
]);

// $reduce - It is used to apply a specified expression to each element of an array and return a single value. It can be used to perform operations like summing, concatenating, or finding the maximum/minimum value in an array.
// Syntax:
// { $reduce: { input: <array>, initialValue: <expression>, in: <expression> } }

// Question:- Write an aggregation pipeline that returns each product's name and a tagSummary field containing all tags joined into a single string, separated by " | ".

db.products.aggregate([
  {
    $project: {
      name: 1,
      tagSummary: {
        $reduce: {
          input: "$tags",
          initialValue: "",
          in: {
            $cond: {
              if: { $eq: ["$$value", ""] },
              then: "$$this",
              else: { $concat: ["$$value", " | ", "$$this"] },
            },
          },
        },
      },
    },
  },
]);

// $size - It is used to return the number of elements in an array.
// Syntax:
// { $size: <array> }

// Question:- Write an aggregation pipeline that returns each product's name and the number of tags it has in a tagCount field.

db.products.aggregate([
  {
    $project: {
      name: 1,
      tagCount: {
        $size: "$tags",
      },
    },
  },
]);

// $arrayElemAt - It is used to return the element at a specified array index.
// Syntax:
// { $arrayElemAt: [ <array>, <index> ] }

// Question:- Write an aggregation pipeline that returns each product's name, its first tag, and its last tag from the tags array using $arrayElemAt.

db.products.aggregate([
  {
    $project: {
      name: 1,
      firstTag: { $arrayElemAt: ["$tags", 0] },
      lastTag: { $arrayElemAt: ["$tags", -1] },
    },
  },
]);
