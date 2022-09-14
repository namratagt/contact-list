const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');


const app = express();


app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views')); //setting the view.. dir name and then the folder name
app.use(express.urlencoded());
//the above statement uses app.use which is a middleware and thus is given the task to encode the request before passing it on to the controller
//app.use signifies middleware ... req : browser->middlewares(s)->controller like the apt one

app.use(express.static('assets'));

//middeleware1
// app.use(function(req, res,next){
//     console.log('middleware 1 called');
//     next();
// });

 //middleware 2
// app.use(function(req, res, next){
//     console.log('middleware 2 called');
//     next();
// })

var contactList = [
    {
        name: "Arpan",
        phone: "1111111"
    },
    {
        name: " Tony Stark",
        phone: "123456788"
    },
    {
        name: " coding ninjas",
        phone: " 12392402324"

    }
];

app.get('/', function(req, res){
    
    Contact.find({},function(err,contacts){
        if (err){
            console.log('Error in fetching contacts from db');
        }

        return res.render('home', {
            title: "Contact List",
            contact_list: contacts
        }); 

    });

    
});

app.get('/practice',function(req,res){
    return res.render('practice',{title: "Contacts list"})
});

app.post('/create-contact', function(req,res){
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    // contactList.push(req.body);

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if (err){console.log('Error in      creating contact'); return;}
            console.log('********', newContact);
            return res.redirect('back');
        });
    });


//for deleting a contact
app.get('/delete-contact', function(req,res){
    //get the query from url

    //get the id from query in the ul
    let id = req.query.id;


    //find the contact in the database using id and delete it

    Contact.findByIdAndDelete(id, function(err){
        if (err){
        console.log('error in deleting an object from database');
        return ;
        }
        return res.redirect('back'); 
    });


    // let phone = req.query.phone;

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactIndex != -1){
    //     contactList.splice(contactIndex,1);
    // }
    
    // return res.redirect('back');
});


app.listen(port, function(err){
    if(err) {
        console.log('Error is running in the server', err);
    }

    console.log('yup express server is running on port', port);
});