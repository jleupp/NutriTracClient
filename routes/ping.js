var express = require('express');
var router = express.Router();

router.get('/ping', function(request, response, next) {
    response.send('pong!!');
});

module.exports = router;