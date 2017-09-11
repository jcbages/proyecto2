var mongo = require("mongodb");
var favicon = require("serve-favicon");

var express = require("express");
var bodyParser = require("body-parser");
var ObjectId = mongo.ObjectID;

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var MongoClient = mongo.MongoClient;
//var url = "mongodb://localhost:27017/proyecto2";
var url = "mongodb://carlox18:carlox1801@ds129004.mlab.com:29004/trocalez";

app.set("/views","./views");
app.set("view engine", "pug");

app.use(favicon(__dirname + "/public/" + "favicon.ico"));


function sendViewMiddleware(req, res, next) {
  res.sendView = function(view) {
    return res.sendFile(__dirname +"/"+ view);
  };
  next();
}
app.use("/views", express.static(__dirname + "/views"));
app.use("/public",express.static(__dirname + "/public"));
app.use(sendViewMiddleware);

app.get("/",function(req,res){
  MongoClient.connect(url,function(err,db){
    if( err) throw err;
    db.collection("personas").find({}).toArray(function(error, documents) {
      if(err) throw err;
      res.render("index",{byWho:"", data:documents});
      db.close();
    });
  });
});

app.post("/add", function(req, res){
  var item = {
    name: req.body.name,
    number: req.body.number,
    email: req.body.email
  };

  MongoClient.connect(url,function(err,db){
    if( err) throw err;
    db.collection("personas").insertOne(item).then(function(){
      res.sendStatus(200);
      db.close();
    });
  });
});
app.get("/add", function(req, res){

  MongoClient.connect(url,function(err,db){
    if( err) throw err;
    db.collection("personas").find({}).toArray(function(error, documents) {
      if (err) throw error;
      res.send(documents);
    });
  });
});

app.delete("/delete/:id", function (req, res) {
  var id = req.params.id;
  console.log(id);
  MongoClient.connect(url,function(err,db){
    if( err) throw err;
    db.collection("personas").remove({"_id" : ObjectId(id)}).then(function(){
      res.sendStatus(200);
      db.close();

    });
  });
});
app.get("/update/:id",function(req,res){
  var id = req.params.id;
  MongoClient.connect(url,function(err,db){
    if( err) throw err;
    db.collection("personas").findOne({"_id" : ObjectId(id)}).then(function(pers){
      res.render("updatePersona",{persona:pers});
      db.close();
    });
  });
});
app.put("/update/:id",function(req,res){
  var id = req.params.id;
  var name = req.body.pname;
  var email = req.body.pEmail;
  var number = req.body.pNumber;
  MongoClient.connect(url,function(err,db){
    if( err) throw err;
    db.collection("personas").update({"_id" : ObjectId(id)},{name:name, email:email,number:number},{ upsert: true }).then(function(){
      res.sendStatus(200);
      db.close();
    });
  });  
});

app.listen(8000);




