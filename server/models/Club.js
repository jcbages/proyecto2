"use strict";
var db = require("./db.js"),
  ObjectId = require("mongodb").ObjectID;

/*
Club represents the database methods for accesing the clubs collections.
{
  _id,
  ids_admin: [users: ObjectID],
  nombre,
  desc,
  keywords,
  conversation: [messages: {
    text,
    time
  }],
  members: [users: ObjectID],
  messages: [mesages]
}
*/

/*
Object that represents the messages in a group or club board
{
  sender_name,
  sender: user:ObjectID,
  text,
  timestamp: Date
}
*/

var Club = {};

Club.findById = function(id_club, callback){
  var clubs = db.get().collection("clubs");
  clubs.findOne({_id:ObjectId(id_club)}, function(err, club){
    callback(err, club);
  });
};

Club.create = function(club, callback){
  var clubs = db.get().collection("clubs");
  clubs.insertOne(club, function(err, insertedClub){
    callback(err, club);
  });
};

Club.update = function(id, changedClubFields, callback){
  var clubs = db.get().collection("clubs");
  clubs.findOneAndUpdate({_id:id}, {$set:changedClubFields},{returnOriginal:false}, function(err, updatedClub){
    callback(err, updatedClub.value);
  });
};

Club.findByKeywords = function(keywords, callback){
  var clubs = db.get().collection("clubs");
  clubs.find({keywords:{$all: keywords}}).toArray(function(err, clubs){
    callback(err, clubs);
  });
};

Club.find = function(callback){
  var clubs = db.get().collection("clubs");
  clubs.find({}).toArray(function(err, clubs){
    callback(err, clubs);
  });
};

Club.insertUser = function(id, admin ,idUser, callback){
  var clubs = db.get().collection("clubs");
  clubs.findOne({_id:ObjectId(id)}, function(err, club){
    if(err){
      callback(err);
    } else {
      if(club){
        var members = club.members;
        if(members){
          members.push(ObjectId(idUser));
        }
        else {
          members = [ObjectId(idUser)];
        }
        clubs.findOneAndUpdate({_id:ObjectId(id)}, {members:members}, callback);
      }
      else {
        var error = {message:"This club doesnt exist"};
        callback(error);
      }
    }
    callback(err, club);
  });
};

module.exports = Club;

