const express = require('express')
const routes = express.Router()

const AnnotationController = require('./controllers/AnnotationController.jsx')
const ContentController = require('./controllers/ContentController.jsx')
const PriorityController = require('./controllers/PriorityController.jsx')


//Rota Annotations
routes.post('/annotations', AnnotationController.create)  //toda vez que requisitr via get a rota annotations, será executada a fç AnnotationController.create
routes.get('/annotations', AnnotationController.read)
routes.delete('/annotations/:id', AnnotationController.delete)


//Rota Priority
routes.get('/priorities', PriorityController.read)
routes.post('/priorities/:id', PriorityController.update)


//Rota Content
routes.post('/contents/:id', ContentController.update)

module.exports = routes