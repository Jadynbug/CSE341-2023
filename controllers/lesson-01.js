const mongodb = require('../db/connect');
const MongoClient = require('mongodb').MongoClient;

const err = "Problem in controller";
 
const getData = async (req, res, next) => {
    console.log("in controllers");
    try {
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
    } catch {
        res.status(500).json(err);
    }
};

const addContact = async (req, res, next) => {
    console.log('in add contact');
    
    try {
        let newContact = {};

        if (req.query["id"]) {
            newContact = {
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

            req.body = newContact;

        } else {
            if (req.body['firstName'] === undefined || req.body['lastName'] === undefined || req.body['email'] === undefined || req.body['favoriteColor'] === undefined || req.body['birthday'] === undefined || req.body['id'] === undefined) {
                console.log("we've got an undefined!");
                res.send("undefined error");
            }
        }
        
        // console.log(newContact);
        
        let collection = await mongodb.getDb().db('CSE341').collection("contacts");
        
        newDocument = req.body;
        let result = await collection.insertOne(newDocument);
        res.send(result).status(201);
    } catch {
        res.status(500).json(err);
    }

};

const deleteContact = async (req, res, next) => {
    try {
        let query = {};
        //console.log(req.body["id"]);

        if (req.query['id']) {
            query = {'id': req.query['id']};
        } 
        if (req.body['id']) {
            query = {'id': req.body['id']};
        } 
        if (!req.query['id'] && !req.body['id']) {
            console.log(query);
            res.send('lack of id error in delete');
        }

        //console.log(query);
    
        let result = await mongodb.getDb().db('CSE341').collection("contacts").deleteOne(query);
    
        res.send(result).status(200);
    } catch {
        res.status(500).json(err);
    }
};

const updateContact = async (req, res, next) => {
    // console.log(req.query);
    try {
        if(!req.query['id'] && !req.body['id']) {
            res.send("lack of id error");
        } 
        let update = {};
        let id = {};
        if(req.query['id']) {
            if (req.query['firstName']) {update.firstName = req.query['firstName']};
            if (req.query['lastName']) {update.lastName = req.query['lastName']};
            if (req.query['email']) {update.email = req.query['email']};
            if (req.query['favoriteColor']) {update.favoriteColor = req.query['favoriteColor']};
            if (req.query['bithday']) {update.bithday = req.query['bithday']};
            id = req.query['id'];
        }
        if(req.body['id']) {
            if (req.body['firstName']) {update.firstName = req.body['firstName']};
            if (req.body['lastName']) {update.lastName = req.body['lastName']};
            if (req.body['email']) {update.email = req.body['email']};
            if (req.body['favoriteColor']) {update.favoriteColor = req.body['favoriteColor']};
            if (req.body['bithday']) {update.bithday = req.body['bithday']};
            id = req.body['id'];
        }
        // console.log(update);
        let newValues = {$set: update};

        let result = await mongodb.getDb().db('CSE341').collection("contacts").updateOne({'id':id}, newValues);

        res.send(result).status(204);
    } catch {
        res.status(500).json(err);
    }
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
