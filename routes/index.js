const routes = require('express').Router();
const Controller = require('../controllers/lesson-01');


routes.use('/', require('./swagger'));

routes.get('/', Controller.jadynRoute);

routes.get('/Julie', Controller.julieRoute);

routes.get('/Scott', Controller.scottRoute);

routes.get('/Contacts', Controller.getData);

// routes.get('/contacts', Controller.contactRoute);

routes.post('/Contacts', Controller.addContact);

routes.delete("/Contacts", Controller.deleteContact);

routes.put("/Contacts", Controller.updateContact);

module.exports = routes;