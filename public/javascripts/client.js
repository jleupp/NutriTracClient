function init() {
    document.getElementById("ping").addEventListener("click", ping);

    var searchField = document.getElementById("searchFood")
    searchField.addEventListener("keyup", function (event) {
        var partial = searchField.value;
        var uri = 'foodsearch/foodsbychar/' + partial;
        var thresh = searchField.dataset.threshold;
        if(thresh && Number(thresh) > 0) {
            uri+='?threshold=' + Number(thresh);
        }
        xhrMethod("GET", uri, displayReturnFood);
    })
}

var ping = function (event) {
    event.preventDefault();
    console.log("Ping Clicked dudes");
    xhrMethod("GET", "/ping/ping", displayPing);
}

var xhrMethod = function (method, url, callback, obj) {
    var xhr = new XMLHttpRequest();
    if (obj) {

        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', 'application/json');
    } else {
        xhr.open(method, url);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if (callback) {
                    console.log(JSON.parse(xhr.responseText));
                    var responseString = JSON.parse(xhr.responseText);
                } else {
                    var responseString = xhr.responseText;
                }
                callback(responseString);
            } else {
                console.log("error : " + xhr.status);
            }
        }
    }
    if (obj) {
        xhr.send(JSON.stringify(obj));
    } else {
        xhr.send();
    }
};

var displayPing = function (responseString) {
    var response = document.createElement("h1");
    document.getElementById("pingResponse").appendChild(response);
    response.innerHTML = responseString;
}

var displayReturnFood = function (foodList) {
    var select = document.getElementById("matches");
    select.innerHTML = "";
    for (var i = 0; i < foodList.length; i++) {
        var opt = document.createElement("option");
        opt.value = foodList[i].ndbno;
        opt.label = foodList[i].name;
        opt.innerHTML = foodList[i].name;
        select.appendChild(opt);
    }
}



var cneed;
var fneed;
var crneed;
var pneed;
var aneed;
var fd;

function cc() {
    var age = parseInt(document.getElementById("age").value);
    var wtype = document.getElementById("wtype").value;
    var foot = parseInt(document.getElementById("foot").value);
    var inch = parseInt(document.getElementById("inch").value);
    var cm = document.getElementById("cen").value;
    var weight = document.getElementById("weight").value;
    if (age != '' && cm != '' && weight != '') {
        if (wtype == "pounds") {
            weight = parseInt(weight);
            weight = Math.round(weight / 2.2046);
        }
        var loa = document.getElementById("loa").value;
        if (document.getElementById("gen").checked) {
            fd = (10 * weight) + (6.25 * cm) - (5 * age) + 5;
        } else {
            fd = (10 * weight) + (6.25 * cm) - (5 * age) - 161;
        }
        switch (loa) {
        case "1":
            cneed = fd * 1.2;
            break;
        case "2":
            cneed = fd * 1.375
            break;
        case "3":
            cneed = fd * 1.53;
            break;
        case "4":
            cneed = fd * 1.725;
            break;
        case "5":
            cneed = fd * 1.9;
            break;
        }
        cneed = Math.floor(cneed);
        //cneed1=Math.floor(cneed*0.0353);
        fneed = Math.floor((cneed * 0.25) / 9);
        if (wtype == "pounds") {
            fneed = Math.floor(fneed * 0.0353);
            //fneed=fneed*0.0022 ;
        }
        pneed = Math.floor((cneed * 0.25) / 4);
        if (wtype == "pounds") {
            pneed = Math.floor(pneed * 0.0353);
        }
        crneed = Math.floor((cneed * 0.25) / 4);
        if (wtype == "pounds") {
            crneed = Math.floor(crneed * 0.0353);
        }
        aneed = Math.floor((cneed * 0.25) / 7);
        if (wtype == "pounds") {
            aneed = Math.floor(aneed * 0.0353);
        }
        document.getElementById("rc").value = " " + cneed;
        document.getElementById("rf").value = " " + fneed;
        document.getElementById("rp").value = " " + pneed;
        document.getElementById("rh").value = " " + crneed;
        document.getElementById("ra").value = " " + aneed;
        document.getElementById("l1").innerHTML = "grams";
        document.getElementById("l2").innerHTML = "grams";
        document.getElementById("l3").innerHTML = "grams";
        document.getElementById("l4").innerHTML = "grams";
        var caltype = document.getElementById("caltype").value;
        if (caltype == 'g') {
            document.getElementById("l1").innerHTML = "grams";
            document.getElementById("l2").innerHTML = "grams";
            document.getElementById("l3").innerHTML = "grams";
            document.getElementById("l4").innerHTML = "grams";
        }
        if (wtype == "pounds") {
            fat1 = fneed * 0.0022;
            pro1 = pneed * 0.0022;
            car1 = crneed * 0.0022;
            alh1 = aneed * 0.0022;
            fat1 = fat1.toFixed(3);
            pro1 = pro1.toFixed(3);
            car1 = car1.toFixed(3);
            alh1 = alh1.toFixed(3);
            document.getElementById("rf").value = " " + fat1;
            document.getElementById("rp").value = " " + pro1;
            document.getElementById("rh").value = " " + car1;
            document.getElementById("ra").value = " " + alh1;
            document.getElementById("l1").innerHTML = "lbs";
            document.getElementById("l2").innerHTML = "lbs";
            document.getElementById("l3").innerHTML = "lbs";
            document.getElementById("l4").innerHTML = "lbs";
        }
        if (caltype == 'pounds') {
            fat1 = fneed * 0.0022;
            pro1 = pneed * 0.0022;
            car1 = crneed * 0.0022;
            alh1 = aneed * 0.0022;
            fat1 = fat1.toFixed(3);
            pro1 = pro1.toFixed(3);
            car1 = car1.toFixed(3);
            alh1 = alh1.toFixed(3);
            document.getElementById("rf").value = " " + fat1;
            document.getElementById("rp").value = " " + pro1;
            document.getElementById("rh").value = " " + car1;
            document.getElementById("ra").value = " " + alh1;
            document.getElementById("l1").innerHTML = "lbs";
            document.getElementById("l2").innerHTML = "lbs";
            document.getElementById("l3").innerHTML = "lbs";
            document.getElementById("l4").innerHTML = "lbs";
        }
        if (caltype == 'kg') {
            fat2 = fneed / 1000;
            pro2 = pneed / 1000;
            car2 = crneed / 1000;
            alh2 = aneed / 1000;
            fat2 = fat2.toFixed(3);
            pro2 = pro2.toFixed(3);
            car2 = car2.toFixed(3);
            alh2 = alh2.toFixed(3);
            document.getElementById("rf").value = " " + fat2;
            document.getElementById("rp").value = " " + pro2;
            document.getElementById("rh").value = " " + car2;
            document.getElementById("ra").value = " " + alh2;
            document.getElementById("l1").innerHTML = "kilogram";
            document.getElementById("l2").innerHTML = "kilogram";
            document.getElementById("l3").innerHTML = "kilogram";
            document.getElementById("l4").innerHTML = "kilogram";
        }
    } else {
        alert("Please fill your details properly!");
    }
}

function con(num) {
    var hc = parseInt(num.value);
    var hi = hc / 2.54;
    var hf = Math.floor(hi / 12);
    var ri = Math.round(hi % 12);
    if (hc > 40 && hc <= 210) {
        document.getElementById("foot").value = hf;
    }
    document.getElementById("inch").value = ri;
}

function hcon() {
    var hf = parseInt(document.getElementById("foot").value);
    var hi = parseInt(document.getElementById("inch").value);
    var hc;
    hc = Math.round((hf * 30.48) + (hi * 2.54));
    document.getElementById("cen").value = hc;
}

function cknum(event, num) {
    var kc;
    if (window.event) {
        kc = event.keyCode;
    } else {
        kc = event.which;
    }
    var a = num.value;
    if (kc == 48) {
        if (a == "") {
            return false;
        } else {
            return true;
        }
    }
    if (kc != 8 && kc != 0) {
        if (kc < 49 || kc > 57) {
            return false;
        }
    }
}

function isNumberKey(id) {
    var no = eval('"' + id + '"');
    var number = document.getElementById(no).value;
    if (!number.match(/^[0-9\.]+$/) && number != "") {
        number = number.substring(0, number.length - 1);
        document.getElementById(id).value = number;
    }
}

function convert() {
    var age = parseInt(document.getElementById("age").value);
    var cm = document.getElementById("cen").value;
    var weight = document.getElementById("weight").value;
    if (age != '' && cm != '' && weight != '') {
        var caltype = document.getElementById("caltype").value;
        var fat = document.getElementById("rf").value;
        var pro = document.getElementById("rp").value;
        var car = document.getElementById("rh").value;
        var alh = document.getElementById("ra").value;
        if (caltype == 'g') {
            document.getElementById("rc").value = " " + cneed;
            document.getElementById("rf").value = " " + fneed;
            document.getElementById("rp").value = " " + pneed;
            document.getElementById("rh").value = " " + crneed;
            document.getElementById("ra").value = " " + aneed;
            document.getElementById("l1").innerHTML = "grams";
            document.getElementById("l2").innerHTML = "grams";
            document.getElementById("l3").innerHTML = "grams";
            document.getElementById("l4").innerHTML = "grams";
        }
        if (caltype == 'pounds') {
            fat1 = fneed * 0.0022;
            pro1 = pneed * 0.0022;
            car1 = crneed * 0.0022;
            alh1 = aneed * 0.0022;
            fat1 = fat1.toFixed(3);
            pro1 = pro1.toFixed(3);
            car1 = car1.toFixed(3);
            alh1 = alh1.toFixed(3);
            document.getElementById("rf").value = " " + fat1;
            document.getElementById("rp").value = " " + pro1;
            document.getElementById("rh").value = " " + car1;
            document.getElementById("ra").value = " " + alh1;
            document.getElementById("l1").innerHTML = "lbs";
            document.getElementById("l2").innerHTML = "lbs";
            document.getElementById("l3").innerHTML = "lbs";
            document.getElementById("l4").innerHTML = "lbs";
        }
        if (caltype == 'kg') {
            fat2 = fneed / 1000;
            pro2 = pneed / 1000;
            car2 = crneed / 1000;
            alh2 = aneed / 1000;
            fat2 = fat2.toFixed(3);
            pro2 = pro2.toFixed(3);
            car2 = car2.toFixed(3);
            alh2 = alh2.toFixed(3);
            document.getElementById("rf").value = " " + fat2;
            document.getElementById("rp").value = " " + pro2;
            document.getElementById("rh").value = " " + car2;
            document.getElementById("ra").value = " " + alh2;
            document.getElementById("l1").innerHTML = "kilogram";
            document.getElementById("l2").innerHTML = "kilogram";
            document.getElementById("l3").innerHTML = "kilogram";
            document.getElementById("l4").innerHTML = "kilogram";
        }
    } else {
        alert("Please fill your details properly!");
    }
}

window.onload = init;