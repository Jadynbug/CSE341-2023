const routes = require('express').Router();
const lesson01Controller = require('../controllers/lesson-01');

routes.get('/', lesson01Controller.jadynRoute);

routes.get('/Julie', lesson01Controller.julieRoute);

routes.get('/Scott', lesson01Controller.scottRoute);


module.exports = routes;