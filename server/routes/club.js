var express = require("express"),
  router  = express.Router();

var Club = require("../models/Club.js");
var User = require("../models/User.js");

router.post("/:idCreator", function(req, res){
  var new_club = req.body;
  User.findById(req.params.idCreator, function(err, user){
    if(err){
      res.status(400).json(err);
    }
    if(!user){
      res.status(400).json({message:"That user doesnt exist"});
    }
    new_club.ids_admin = [req.params.idCreator];
    Club.create(new_club, function(err, inserted_club){
      if(err){
        res.status(400).json(err);
      }

      res.status(200).json(inserted_club);
    });
  });
});

router.put("/:id", function(req, res){
  var club = req.body;
  Club.update(req.params.id, club, function(err, updatedClub){
    if(err){
      res.status(400).json(err);
    }
    res.status(200).json(updatedClub);
  });
});

router.get("/keywords",function(req, res){
  //Comma separated kewwords
  var keywords = req.query.keywords.split(",");
  Club.findByKeywords(keywords, function(err, clubs){
    if(err){
      res.status(400).json(err);
    }
    res.status(200).json(clubs);
  });
});

router.get("/", function(req, res){
  Club.find(function(err, users){
    if(err) res.status(400).json(err);
    res.status(200).json(users);
  });
});

router.get("/:id", function(req, res){
  Club.findById(req.params.id, function(err, club){
    if(err){
      res.status(400).json(err);
    }
    res.status(200).json(club);
  });
});

router.post("/:id/members", function(req, res){
  var admin = req.body.admin;
  var newUser = req.body.newUser;

  User.findById(newUser, function(err, user){
    if(!user){
      res.status(400).json({message:"That user doesnt exist"});
    }
    Club.findById(req.params.id, function(err, club){
      if(err){
        res.status(400).json(err);
      } else {
        if(club){
          if(!club.ids_admin.includes(admin)){
            res.sendStatus(403);
          }
          var members = club.members;
          if(members){
            members.push(newUser);
          }
          else {
            members = [newUser];
          }
          Club.update(club._id, {members:members}, function(err, club){
            if(err){
              res.status(400).json(err);
            } else {
              res.status(200).json(club);
            }
            
          });
        }
        else {
          var error = {message:"This club doesnt exist"};
          res.status(400).json(error);
        }
      }
    });
  });
});

module.exports = router;