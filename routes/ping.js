var express = require('express');
var router = express.Router();

router.post('/ping', function(request, response, next) {
    var xhr = new XMLHttpRequest();
    xhr.open('post', 'http://localhost:8080/NutriTrac/rest/ping');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200){
                console.log(xhr.responseText);
                // response.send(xhr.responseText);
            }
        }
    };
    xhr.send();
});

module.exports = router;