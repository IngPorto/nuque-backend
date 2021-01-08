const express = require('express')
const router = express.Router()

const controller = require('../../controllers/service/service.controllers')
const { validateFileRoute, validateWorkspace } = require('../../controllers/service/service.middlewares')

router.get('/', (req, res)=>{
    res.send(`Service API Gateway`)
})

router.get('/users_services/:proyecto/:servicio', controller.getService)

router.post('/loadService', validateFileRoute, controller.loadService)

router.post('/createServiceDirectory/', validateFileRoute, controller.createServiceDirectory);

router.post('/saveService', validateFileRoute, validateWorkspace, controller.saveService); 

router.post('/deployService', validateFileRoute, validateWorkspace, controller.deployService); 


module.exports = router;