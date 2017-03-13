var express = require('express')
var router = express.Router()
var eventHandler = require('./routes/eventHandler');
var authWebhook = require('./models/authWebhook');

router.post('/webhook', eventHandler)
router.get('/webhook', authWebhook)
module.exports = router;
