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

var credentials = require('./credentials.js');




var session = require('express-session');

router.use(session({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
    key: "user"
}));





var cookieParser = require('cookie-parser');



router.use(cookieParser(credentials.cookieSecret));








router.post('/login', function (request, response, next) {
    console.log(request.body);
     
    //request.session.user = "Session Test on server side";
    
    
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
        console.log(request.cookies);

        xhr.onreadystatechange = function () {
            console.log("ReadyStateChange : " + xhr.readyState);
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log("Response text print out" + xhr.responseText);
                   
                    request.session.user = xhr.responseText;
                    //response.cookie('testCookie', {test : "test"}/*, {signed : true}*/);
                    
                    console.log("This is my response cookie:   "  + response.cookie('cookieUser', xhr.responseText))
                    console.log(credentials.cookieSecret)
                    console.log(request.session.user);
                    response.send(xhr.responseText);
                                      
                }
            }
        };
        console.log('SENDING');
        xhr.send(JSON.stringify(request.body));
});


router.post("/logout", function (request, response, next) {
    
    console.log("Inside my log out user function on server side")
    console.log("Request body:   " + request.body);
    console.log("Session user inside my log out user function on server side "  +request.session.user);
    
   //var sessionUserName = request.session.user.firstname;
   // var sessionUserEmail = request.session.user.email;
   var sessionUserName = "Current User";
   var sessionUserEmail = "User logged out";
    
    console.log("Session info here: " + request.session.user);
    
     var returnObject = {
        firstname: sessionUserName,
        email : sessionUserEmail
     };
    
    delete request.session.user;
    
    response.cookie('cookieUser', null)
    
   // console.log("This is my cookie in log out:   "  + request.signedCookies['testCookie'])
    
    console.log("This is my cookie in log out:   "  + request.signedCookies.testCookie)
    
    console.log(request.cookies.testCookie);
    
   console.log("Session user after delete"  + request.session.user)
    
   console.log("My object to send back after log out"  + returnObject.firstname + "  "+ returnObject.email)
    
    response.send(JSON.stringify(returnObject));
    
    
});


router.get("/checklogged", function (request, response, next) {
    
  
    if(request.session.user)   {
        
        response.send(true)
        
    }
    
    else  {
        
        response.send()false
    }
   

})

module.exports = router;