var port = 3000;
var express = require('express');
var app = express();
var sqlite3 = require('sqlite3')
var db = new sqlite3.Database('db/users.db');
var bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.post('/login', function(request, response){
    console.log("POST request received at /login");
    console.log(request.body.email + " " + request.body.password);
    var email = request.body.email
    var password = request.body.password
    db.all("SELECT * FROM users", function(err, rows){
        if (err) {
            console.log(err);
            response.redirect('login.html');
        } else if (!rows) {
            console.log("Table is empty");
            response.redirect('login.html');
        } else {
            var ok = false;
            for (var i = 0; i < rows.length; i++) {
                if(rows[i].email === email && rows[i].password === password) {
                    ok = true;
                }
            }
            if(!ok) {
                console.log("Incorrect email/password");
                response.redirect('login.html');
            } else {
                response.redirect('main.html');
            }
        }
    });
});

app.post('/suprafete', function(request, response) {
    console.log("POST request received at /suprafete");
    db.run('INSERT INTO suprafete VALUES (?, ?, ?, ?)', [request.body.anCumparare, request.body.op, request.body.oa, request.body.suprafataHA], function(err){
        if (err) {
            console.log("Error: " + err);
        } else {
            console.log(request.body.anCumparare);
            response.send("Suprafata adaugata cu succes");
        }
    });
    
});

app.get('/suprafete', function(request, response){
    console.log('GET request received at /suprafete');
    db.all("SELECT * FROM suprafete", function(err, rows){
        if(err) {
            console.log("Error: " + err);
        } else {
            var ol = [];
            for (var i = 0; i < rows.length; i++) {
                var obj = {
                    anCumparare: rows[i].anCumparare,
                    op: rows[i].op,
                    oa: rows[i].oa,
                    suprafataHA: rows[i].suprafataHA
                }
                ol.push(obj);
            }
            response.send({suprafete: ol});
        }
    });
});

app.listen(port, function(){
    console.log("Server is running on port " + port);
});

