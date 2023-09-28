const mongodb = require('../db/connect');
const MongoClient = require('mongodb').MongoClient;
 
const getData = async (req, res, next) => {
    console.log("in controllers");
    console.log(req.query);
    let query = {};
    if(req.query) {
        query = req.query;
    }
    console.log(query);
    const result = await mongodb.getDb().db('CSE341').collection('contacts').find(query);
    console.log("got db");
    result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    console.log("header set");
    res.status(200).json(lists);
  });
};

const addContact = async (req, res, next) => {
    console.log('in add contact');
    // console.log(req.query);
    // console.log(req.query['favoriteColor']);
    let newContact = {
        firstName: req.query['firstName'],
        lastName: req.query['lastName'],
        email: req.query['email'],
        favoriteColor: req.query['favoriteColor'],
        birthday: req.query['birthday'],
        id: req.query['id']
    }
    // console.log(newContact);
    if (req.query['firstName'] === undefined || req.query['lastName'] === undefined || req.query['email'] === undefined || req.query['favoriteColor'] === undefined || req.query['birthday'] === undefined || req.query['id'] === undefined) {
        console.log("we've got an undefined!");
        res.send("undefined error");
    }
    let collection = await mongodb.getDb().db('CSE341').collection("contacts");
    req.body = newContact;
    newDocument = req.body;
    let result = await collection.insertOne(newDocument);
    res.send(result).status(201);

};

const deleteContact = async (req, res, next) => {
    const query = {'id': req.query['id']};
    console.log(query);
  
    let result = await mongodb.getDb().db('CSE341').collection("contacts").deleteOne(query);
  
    res.send(result).status(200);
};

const updateContact = async (req, res, next) => {
    // console.log(req.query);
    if(!req.query['id']) {
        res.send("lack of id error");
    } 
    let update = {};
    if (req.query['firstName']) {update.firstName = req.query['firstName']};
    if (req.query['lastName']) {update.lastName = req.query['lastName']};
    if (req.query['email']) {update.email = req.query['email']};
    if (req.query['favoriteColor']) {update.favoriteColor = req.query['favoriteColor']};
    if (req.query['bithday']) {update.bithday = req.query['bithday']};
    // console.log(update);
    let newValues = {$set: update};

    let result = await mongodb.getDb().db('CSE341').collection("contacts").updateOne({'id': req.query['id']}, newValues);

    res.send(result).status(204);




    // let result = await mongodb.getDb().db('CSE341').collection("contacts").updateOne(query, req.query);
    // res.send(result).status(204);

};






const jadynRoute = (req, res) => {
    res.send("Jadyn Iverson");
};
const julieRoute = (req, res) => {
    res.send("Julie Iverson")
};
const scottRoute = (req, res) => {
    res.send("Scott Iverson")
};

const contactRoute = (req, res) => {
    console.log("in contact route");
    let data = getData(req.query, res);
    console.log(data);
    res.render('../views/pages/contacts.ejs', {info: data});
};


module.exports = {
    getData,
    contactRoute,
    jadynRoute,
    julieRoute,
    scottRoute,
    addContact,
    deleteContact,
    updateContact
};
