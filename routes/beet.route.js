const express = require('express')
const router = express.Router()
const util = require('./util.route')
const mongoose = require('mongoose')
const beet_controller = require('../controllers/beet.controller')

function id_checker(req, res, next) {
    if (!req.params.id)
        res.status(400).send({'message': 'Missing parameter id.'})  
    if(mongoose.Types.ObjectId.isValid(req.params.id))
        next()
    else
        res.status(400).send({'message': 'Invalid beet id.'})
}

/** /beet/<route> */

router.get('/', util.isAuthenticated, beet_controller.get_beets)
router.get('/:id', util.isAuthenticated, id_checker, beet_controller.get_beet)
router.post('/', util.isAuthenticated, beet_controller.create_beet)
router.put('/:id', util.isAuthenticated, id_checker, beet_controller.update_beet)
router.delete('/:id', util.isAuthenticated, id_checker, beet_controller.delete_beet)
router.get('/like/:id', util.isAuthenticated, id_checker, beet_controller.like)

module.exports = router