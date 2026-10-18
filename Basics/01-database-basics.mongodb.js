db.getMongo().getDBs(); // show databases (show dbs)

// use('admin') // used to switch database

// IMP: the show dbs will only shows those databases that have any collection inside it, so if we run "use admin" and then run "show dbs" then the admin database will not appear there (if it does not have any collections inside it)

// use <database-name>

use("adibas"); // It checks if the adibas database exists then it will switch to it and if the adibas does not exists then it creates a database with name adibas and then switches to it

// db.createCollection("adibas") // it is used to create a collection (it creates the collection inside the selected database)

// db.dropDatabase() // it drops (deletes) the currently selected database

// db.createCollection("shoes") // creates a collection with name shoes
// db.shoes.drop(); // it is used to drop (delete) a collection - drops the shoes collection
