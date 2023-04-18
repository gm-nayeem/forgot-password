const router = require('express').Router();
const getUser = require('../controller/userController');
const authenticate = require('../middleware/authenticate');


// user valid
router.get("/", authenticate, getUser);


module.exports = router;