



//require the library
const mongoose = require('mongoose');


//connected to database
mongoose.connect('mongodb://localhost/contacts_list_db');

//acquire the connection to check if it is successful
//now db is a connection between mongoose and database
const db = mongoose.connection;

//error
db.on('error', console.error.bind(console, 'error connecting to db'));

//up and running then print
db.once('open', function(){
    console.log('Successfully connected to the database');
});