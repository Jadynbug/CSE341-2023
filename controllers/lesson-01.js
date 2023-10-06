const mongodb = require('../db/connect');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

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

        if (req.query["id"] || req.query['_id']) {
            newContact = {
                firstName: req.query['firstName'],
                lastName: req.query['lastName'],
                email: req.query['email'],
                favoriteColor: req.query['favoriteColor'],
                birthday: req.query['birthday'],
            }
            if (req.query['id']) {newContact.push({"id": req.query['id']}); };
            // console.log(newContact);
            if (req.query['firstName'] === undefined || req.query['lastName'] === undefined || req.query['email'] === undefined || req.query['favoriteColor'] === undefined || req.query['birthday'] === undefined) {
                console.log("we've got an undefined!");
                res.send("undefined error");
            }

            req.body = newContact;

        } else {
            if (req.body['id']) {newContact.push({"id": req.body['id']}); };

            if (req.body['firstName'] === undefined || req.body['lastName'] === undefined || req.body['email'] === undefined || req.body['favoriteColor'] === undefined || req.body['birthday'] === undefined) {
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
        // console.log(req.body["_id"]);

        if (req.query['id']) {
            query = {'id': req.query['id']};
        }; 
        if (req.query['_id']) {
            query = {'_id': new ObjectId(req.query['_id'])};
            console.log("query _id");
        };
        if (req.body['id']) {
            query = {'id': req.body['id']};
        }; 
        if (req.body['_id']) {
            query = {'_id': new ObjectId(req.body['_id'])};
            console.log("body _id");
        };
        if (req.params['_id']) {
            query = {'_id': new ObjectId(req.params['_id'])};
            console.log("params _id");
        };
        if (!req.query['id'] && !req.body['id'] && !req.body['_id'] && !req.query["_id"] && !req.params['_id']) {
            console.log(query);
            res.send('lack of id error in delete');
        };

        console.log(query);
    
        let result = await mongodb.getDb().db('CSE341').collection("contacts").deleteOne(query);

        if(typeof window === "object") {
            location.reload(true);
            res.send(result).status(204);
        };
    
        res.send(result).status(200);
    } catch {
        res.status(500).json(err);
    }
};

const updateContact = async (req, res, next) => {
    // console.log(req.query);
    console.log(req.params);
    try {
        if((!req.query['id'] && !req.query['_id']) && (!req.body['id'] && !req.body['_id']) && (!req.params['id'] && !req.params['_id'])) {
            res.send("lack of id error");
        };
        let update = {};
        let id = {};
        if(req.query['id']) {
            id = {"id": req.query['id']};
            console.log("update query id");
        };
        if(req.query['_id']) {
            id = {"_id": new ObjectId(req.query['_id'])};
            console.log("update query _id");
        };
        if (req.query['id'] || req.query['_id']) {
            if (req.query['firstName']) {update.firstName = req.query['firstName']};
            if (req.query['lastName']) {update.lastName = req.query['lastName']};
            if (req.query['email']) {update.email = req.query['email']};
            if (req.query['favoriteColor']) {update.favoriteColor = req.query['favoriteColor']};
            if (req.query['bithday']) {update.bithday = req.query['bithday']};
        };
        if(req.body['id']) {
            id = {"id": req.body['id']};
            console.log("update body id");
        };
        if(req.body['_id']) {
            id = {"_id": new ObjectId(req.body['_id'])};
            console.log("update params _id");
        };
        if(req.body['id'] || req.body['_id'] || req.params['_id']) {
            if (req.body['firstName']) {update.firstName = req.body['firstName']};
            if (req.body['lastName']) {update.lastName = req.body['lastName']};
            if (req.body['email']) {update.email = req.body['email']};
            if (req.body['favoriteColor']) {update.favoriteColor = req.body['favoriteColor']};
            if (req.body['bithday']) {update.bithday = req.body['bithday']};
        };
        if(req.params['id']) {
            id = {"id": req.params['id']};
            console.log("update params id");
        };
        if(req.params['_id']) {
            id = {"_id": new ObjectId(req.params['_id'])};
            console.log("update params _id");

        };
        // console.log(update);
        let newValues = {$set: update};

        console.log(id);

        let result = await mongodb.getDb().db('CSE341').collection("contacts").updateOne(id, newValues);

        if(typeof window === "object") {
            location.reload(true);
            res.send(result).status(204);
        };

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
