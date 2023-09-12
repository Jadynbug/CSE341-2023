const routes = require('express').Router();
const lesson01Controller = require('../controllers/lesson-01');

routes.get('/', lesson01Controller.jadynRoute);

routes.get('/Iverson', lesson01Controller.iversonRoute);

module.exports = routes;