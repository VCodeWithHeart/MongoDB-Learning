// Import a JSON file into MongoDB
// mongoimport jsonfile.json -d database_name -c collection_name

// Explanation:
// mongoimport = imports data into MongoDB
// jsonfile.json = file to import
// -d = database name
// -c = collection name

// Import a JSON array into MongoDB
// mongoimport jsonfile.json -d database_name -c collection_name --jsonArray

// Note: MongoDB documents are limited to 16 MB each; this is not a limit on the whole import file.

// Example:
// mongoimport products_ndjson.json -d shop -c products

// Export data from MongoDB to JSON
// mongoexport -d database_name -c collection_name -o output_file.json

// -o = output file path where the exported JSON will be saved

// Example:
// mongoexport -d shop -c products -o products.json

// Useful mongoexport options:

// Export as a JSON array instead of NDJSON
// mongoexport -d shop -c products --jsonArray -o products_array.json

// Export only documents matching a query
// mongoexport -d shop -c products --query '{"category":"Electronics"}' -o electronics.json

// Export only selected fields
// mongoexport -d shop -c products --fields productId,name,price -o product_summary.json

// Export as CSV (list the fields to include)
// mongoexport -d shop -c products --type=csv --fields productId,name,price -o products.csv

// -o and --out both specify the output file
// mongoexport -d shop -c products --out products.json
