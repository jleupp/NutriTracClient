var express = require('express');
var router = express.Router();

router.post('/addmeal', function(request, response, next) {
   /* var mealObjArr = [newMeal, newMealDetail, newUserMeal]; */
   
    console.log(request.body.length);
    console.log(request.body[0]);
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    console.log(request.body[1]);
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    console.log(request.body[2]);
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
        }
        xhr.send();
});

function food(name, ndbno, nutrients) {
    this.name = name;
    this.ndbno = ndbno;
    this.nutrients = nutrients;
}

module.exports = router;