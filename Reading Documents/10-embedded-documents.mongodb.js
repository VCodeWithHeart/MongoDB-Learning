db.getMongo().getDBs();
use("shop");
db.getCollectionNames();

db.products.find();

// Q1: find supplier with rating greater than 4.5

db.products.find({ "supplier.rating": { $gt: 4.5 } }, { supplier: 1, _id: 0 });

// Q2: find products with no warranty

db.products.find(
  { "attributes.warrantyMonths": { $eq: 0 } },
  { attributes: 1, _id: 0 },
);

// Q3: find products with 0 available stock

db.products.find({ "stock.available": { $lte: 10 } });

// Inserted for complex array accessing using dot notation

// db.users.insertOne({
//   firstName: "Vir",
//   lastName: "Sharma",
//   fullName: "Vir Sharma",
//   email: "vir.sharma001@example.com",
//   phone: "+91-9163119758",
//   age: NumberInt("39"),
//   dateOfBirth: "1987-04-05",
//   gender: "male",
//   isEmailVerified: true,
//   status: "pending_verification",
//   role: "user",
//   occupation: "Frontend Developer",
//   department: "Engineering",
//   address: {
//     street: "4 GM Road",
//     city: "Mumbai",
//     state: "Maharashtra",
//     country: "India",
//     postalCode: "600041",
//   },
//   account: {
//     plan: "premium",
//     createdAt: "2023-07-18",
//     lastLoginAt: "2023-09-10",
//     loginCount: NumberInt("574"),
//     twoFactorEnabled: true,
//   },
//   preferences: {
//     language: "gu",
//     theme: "system",
//     newsletterSubscribed: false,
//     notifications: {
//       email: true,
//       sms: false,
//       push: false,
//     },
//   },
//   skills: [
//     { language: "JS", proficiency: 80 },
//     { language: "C++", proficiency: 50 },
//     { language: "Python", proficiency: 60 },
//   ],
//   tags: ["verified", "returning"],
// });

// `skills` is an array of skill documents. Dot notation checks each document
// in that array, so this finds users with at least one skill whose language is JS.
// db.users.find({ "skills.language": "JS" });
