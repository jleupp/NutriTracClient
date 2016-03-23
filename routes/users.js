var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });





// -- USER   login redirect to JAVA API controller

/*app.post('/login', function (req, res) {

    var username = req.body.username
    var password = req.body.password


    console.log(username);
    console.log(password);




    //var myQuery = "SELECT * FROM users WHERE username='" + username + "'AND password='" + password + "' ";

   var myQuery = "SELECT * FROM users WHERE username= ? AND password=?";   

    conn.query(myQuery,[username, password],   function (err, rows, fields) {
        if (err) {
            console.log("Something is amiss...");
            console.log(err);


        }


        //console.log(rows[0].userid);
        //console.log(rows[0]);
        if (rows[0]) {

  
            var returnObject = {
                username: username,
                "confirmation": "log in was successful"
            };
            
            req.session.user = rows[0].userid;      //   assigned returned user id to session user

            res.send({
                data: [returnObject]
            });



        } else {

            var returnObject = {
                username: username,
                "confirmation": "wrong password or username"
            }


            res.send({
                data: [returnObject]
            });
            console.log({
                data: rows
            });
        }
    });
});*/

router.post('/login', function (request, response, next) {
    console.log(request.body);
    // var email = request.body.email;
    // var password = response.body.password;
    // var xhr = new XMLHttpRequest();
    // xhr.open('post', 'http://localhost:8080/NutriTrac/rest/ping');
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.send();
    // xhr.onreadystatechange = function() {
    //     console.log('READY STATE : ' + xhr.readyState);
    //     if (xhr.readyState ===4) {
    //         console.log(xhr.responseText);
    //     }
    // };
        var xhr = new XMLHttpRequest();
        console.log('ERROR AFTER var xhr');
        xhr.open('post', 'http://localhost:8080/NutriTrac/rest/login');
        console.log('ERROR AFTER xhr.open');
        xhr.setRequestHeader('Content-Type', 'application/json');
        console.log('ERROR AFTER setRequestHeader');
        
        xhr.onreadystatechange = function () {
            console.log("ReadyStateChange : " + xhr.readyState);
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // console.log(xhr.responseText);
                    response.send(xhr.responseText);
                }
            }
        };
        console.log('SENDING');
        xhr.send(JSON.stringify(request.body));
});

module.exports = router;