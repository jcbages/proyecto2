var express = require('express');
var router = express.Router();
var mongo = require("mongodb");

var MongoClient = mongo.MongoClient;
//var url = "mongodb://localhost:27017/proyecto2";
var url = "mongodb://carlox18:carlox1801@ds129004.mlab.com:29004/trocalez";

var ObjectId = mongo.ObjectID;

router.get("/",function(req,res){
  MongoClient.connect(url,function(err,db){
    if( err) throw err;
    db.collection("personas").find({}).toArray(function(error, documents) {
      if(err) throw err;
      res.render("index",{data:documents});
      db.close();
    });
  });
});

router.post("/add", function(req, res){
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
router.get("/add", function(req, res){
  MongoClient.connect(url,function(err,db){
    if( err) throw err;
    db.collection("personas").find({}).toArray(function(error, documents) {
      if (err) throw error;
      res.send(documents);
    });
  });
});

router.delete("/delete/:id", function (req, res) {
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
router.get("/update/:id",function(req,res){
  var id = req.params.id;
  MongoClient.connect(url,function(err,db){
    if( err) throw err;
    db.collection("personas").findOne({"_id" : ObjectId(id)}).then(function(pers){
      res.render("updatePersona",{persona:pers});
      db.close();
    });
  });
});
router.put("/update/:id",function(req,res){
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
module.exports = router;
