const mongoose = require('mongoose');
//requiring mongoose

//defining schema
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }

});


//naming the collection/model
const Contact = mongoose.model('Contact', contactSchema);
//exporting this shit
module.exports = Contact;