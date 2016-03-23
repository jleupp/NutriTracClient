var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;



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

    var email = request.body.email;
    var password = response.body.password;
    
    var newUser = new User(email,password);
    
    var jsonString = JSON.stringify(newUser);
    
    

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8080/NutriTrac/rest/login', false, jsonString);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    response.send(xhr.responseText);
                }
            }
        }
        xhr.send();
});

function User(email, password) {
    this.email = email;
    this.password = password;
}

module.exports = router;