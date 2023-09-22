const routes = require('express').Router();
const Controller = require('../controllers/lesson-01');

routes.get('/', Controller.jadynRoute);

routes.get('/Julie', Controller.julieRoute);

routes.get('/Scott', Controller.scottRoute);

routes.get('/Contacts', Controller.getData);

//routes.get('/contacts', Controller.contactRoute);


module.exports = routes;