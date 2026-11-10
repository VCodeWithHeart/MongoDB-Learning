db.getMongo().getDBs();
use("shop");
db.getCollectionNames();

// Aggregation = process data in steps.
// It filters, groups, sorts, and transforms data inside MongoDB.

// find() = fetch matching documents.
// aggregate() = analyze and change data.

// aggregate() syntax:
// db.collection.aggregate([stage1, stage2, stage3])

// Pipeline = a list of stages.
// Each stage runs in order, and the output of one stage becomes the input of the next.

// Basic Syntax Anatomy

db.collection.aggregate([
  // Stage 1: Filter incoming data
  {
    $stageOne: {
      /* operations */
    },
  },

  // Stage 2: Transform or group data from Stage 1
  {
    $stageTwo: {
      /* operations */
    },
  },

  // Stage 3: Sort or format data from Stage 2
  {
    $stageThree: {
      /* operations */
    },
  },
]);

// Let's see an example query of aggregation() method with some real data:

// This aggregation analyzes your inventory: it filters active products, groups them by category, computes summary statistics, formats the output, and sorts them.

// =============================================================================
// AGGREGATION PIPELINE: Category-Level Inventory & Pricing Summary
// =============================================================================

db.products.aggregate([
  // ---------------------------------------------------------------------------
  // STAGE 1: $match
  // Role: Filters documents (acts like WHERE in SQL).
  // Why first? Placing $match at the start reduces document count immediately,
  // allowing subsequent stages to use less memory and leverage indexes.
  // ---------------------------------------------------------------------------
  {
    $match: {
      isPublished: true,
      inStock: true,
    },
  },

  // ---------------------------------------------------------------------------
  // STAGE 2: $group
  // Role: Groups documents by an identifier (_id) and calculates aggregates.
  // '$' prefix (e.g., "$finalPrice") references the field value in the document.
  // ---------------------------------------------------------------------------
  {
    $group: {
      // The grouping key: Groups products by their "category" field
      _id: "$category",

      // $sum: 1 acts as a counter for total documents in each group
      totalProducts: { $sum: 1 },

      // $avg: Calculates the average final price per category
      avgPrice: { $avg: "$finalPrice" },

      // Nested field access: sums stock.available across all matched items
      totalStockAvailable: { $sum: "$stock.available" },

      // $min / $max: Finds the lowest and highest customer ratings
      lowestRating: { $min: "$rating.average" },
      highestRating: { $max: "$rating.average" },
    },
  },

  // ---------------------------------------------------------------------------
  // STAGE 3: $project
  // Role: Reshapes documents (acts like SELECT in SQL).
  // Renames _id, formats numeric values, or drops unneeded calculation fields.
  // ---------------------------------------------------------------------------
  {
    $project: {
      _id: 0, // Suppress the default MongoDB _id
      category: "$_id", // Rename _id back to "category"
      totalProducts: 1,
      totalStockAvailable: 1,
      avgPriceRounded: { $round: ["$avgPrice", 2] }, // Round average to 2 decimal places
      ratingRange: {
        min: "$lowestRating",
        max: "$highestRating",
      },
    },
  },

  // ---------------------------------------------------------------------------
  // STAGE 4: $sort
  // Role: Orders the resulting documents.
  // -1 = Descending (highest to lowest), 1 = Ascending (lowest to highest).
  // ---------------------------------------------------------------------------
  {
    $sort: {
      totalProducts: -1,
      totalStockAvailable: -1,
    },
  },

  // ---------------------------------------------------------------------------
  // STAGE 5: $limit
  // Role: Restricts the output to the top N results.
  // ---------------------------------------------------------------------------
  {
    $limit: 5,
  },
]);

// How the Data Transforms Step-by-Step

// Raw Documents in "products"
//        │
//        ▼
// [ Stage 1: $match ]   ──> Drops unpublished and out-of-stock items
//        │
//        ▼
// [ Stage 2: $group ]   ──> Condenses 1,000s of product docs into 1 doc per category
//        │
//        ▼
// [ Stage 3: $project ] ──> Cleans keys: renames _id to category, rounds avgPrice
//        │
//        ▼
// [ Stage 4: $sort ]    ──> Sorts categories with the most items to the top
//        │
//        ▼
// [ Stage 5: $limit ]   ──> Returns only the top 5 largest categories
