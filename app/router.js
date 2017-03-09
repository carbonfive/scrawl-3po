var express = require('express')
var router = express.Router()
var eventHandler = require('./routes/eventHandler');

router.post('/webhook', eventHandler)
module.exports = router;
