const express = require('express')
const router = express.Router()
const util = require('./util.route')
const user_controller = require('../controllers/user.controller')


/** /users/<route> */

router.get('/:username', util.isAuthenticated, user_controller.get_profile)
router.put('/update', util.isAuthenticated, user_controller.update_profile)

module.exports = router