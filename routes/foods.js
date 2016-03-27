var express = require('express');
var router = express.Router();


router.post('/addmeal', function(request, response, next) {
   /* var mealObjArr = [newMeal, newMealDetail, newUserMeal]; */
    var newMeal = request.body;
    
    for( var i =0; i<newMeal.userMeals.length; i++) {
        var sessionUse = JSON.parse(request.session.user);
        sessionUse.birthdate = undefined;
        newMeal.userMeals[i].user = sessionUse;
    }
    // response.send(JSON.stringify(newMeal));
    // var parsedMeal = JSON.parse(newMeal);

    var xhr = new XMLHttpRequest();
        xhr.open('post', 'http://localhost:8080/NutriTrac/rest/createmeal');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            console.log('READY STATE');
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log("PERSISST");
                    console.log(JSON.parse(xhr.responseText));
                    
                } else {
                    console.log("ERROR : " + xhr.status);
                }
            }
        };
        xhr.send(JSON.stringify(newMeal));


    console.log(newMeal);
});

router.get('/foodsbychar/:partial', function (request, response, next) {
//    var newFood = new food("Dulce de Leche", 1225);
    var abbrev = request.params.partial;
    var threshold = request.query.threshold;
    if(threshold && abbrev.length < Number(threshold)) {
        response.status(204).send();
        return;
    } 
    console.log(abbrev);
    console.log(threshold);
//        response.send(newFood);

        var xhr = new XMLHttpRequest();
        xhr.open('get', 'http://localhost:8080/NutriTrac/rest/foodsbychar/' + abbrev);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    response.send(xhr.responseText);
                }
            }
        };
        xhr.send();
});

function food(name, ndbno, nutrients) {
    this.name = name;
    this.ndbno = ndbno;
    this.nutrients = nutrients;
}

module.exports = router;