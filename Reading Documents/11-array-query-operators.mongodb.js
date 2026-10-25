db.getMongo().getDBs();
use("shop");
db.getCollectionNames();

// Array Query Operators ($all vs $elemMatch)

// $all operator selects the documents where the value of a field is an array that contains all the specified elements

// Syntax
// {<field>: {$all: {<value1>, <value2>...}}}

// The $elemMatch operator matches documents that contain an array field with at least one element that matches all the specified query criteria

// Syntax
// {<field>: {$elemMatch: {<query1>, <query2>, ...}}}

// db.fieldLabKits.find();

// Q1. In shop.fieldLabKits, find kits whose tags include both "night-ops" and "electronics" ?

// db.fieldLabKits.find({ tags: { $all: ["night-ops", "electronics"] } });

// this query also does the same task but $all is simpler to write
// db.fieldLabKits.find({
//   $and: [{ tags: "electronics" }, { tags: "night-ops" }],
// });

// Q2. find a single mission using the "thermal-camera" at the "advanced" level.

// db.fieldLabKits.find({
//   missions: {
//     $elemMatch: {
//       tool: "thermal-camera",
//       level: "advanced",
//     },
//   },
// });

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< NOW WORKING WITH VIDEOS COLLECTION IN THE BELOW EXAMPLES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------

// db.videos.find()

// Q1. Get only those videos which include "mongodb" and "backend" in their tags

db.videos.find({
  tags: { $all: ["mongodb", "backend"] },
});

// Q2. Get only those videos which have comments from rahul and priya

db.videos.find({
  "comments.user.username": { $all: ["rahul", "priya"] },
});

// Q3. Find the videos in which rahul's comment has got 10 or more likes

// db.videos.find({
//   comments: {
//     $elemMatch: {
//       "user.username": "rahul",
//       likes: { $gte: 10 },
//     },
//   },
// });

// Q4. find comments where username is amit and the status is pinned with likes 20 or more

db.videos.find({
  comments: {
    $elemMatch: {
      "user.username": "amit",
      status: "pinned",
      likes: { $gte: 20 },
    },
  },
});

// Q5. Find videos where tags contain "mongodb", "backend", and "database", video quality is 1080p, and a single comment by amit (user id 103) has pinned status and 20 or more likes.

db.videos.find({
  tags: {
    $all: ["mongodb", "backend", "database"],
  },
  "video.quality": { $eq: "1080p" },
  comments: {
    $elemMatch: {
      "user.id": { $eq: 103 },
      status: "pinned",
      likes: { $gte: 20 },
    },
  },
});

// NOTE:
// Use $all when an array must contain every listed value (like tags).
// Use $elemMatch when several conditions must match the same object in an array (like one comment).
// Quick guide: all values in an array -> $all; all conditions on one array object -> $elemMatch.
