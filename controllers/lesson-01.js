const mongodb = require('../db/connect');

const getData = async (req, res, next) => {
    //console.log("in controllers");
    //console.log(req.query);
    let query = {};
    if(req.query) {
        query = req.query;
    }
    const result = await mongodb.getDb().db('CSE341').collection('contacts').find(query);
    //console.log("got db");
    result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    //console.log("header set");
    res.status(200).json(lists);
  });
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
    console.log(__dirname);
    res.render('../contacts/contacts');
}

module.exports = {
    getData,
    //contactRoute,
    jadynRoute,
    julieRoute,
    scottRoute
};
