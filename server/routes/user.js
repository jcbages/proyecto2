var express = require("express"),
  router  = express.Router();

var User = require("../models/User.js");

router.post("/", function(req, res){
  var new_user = req.body;
  User.create(new_user, function(err, inserted_user){
    if(err){
      res.status(400).json({
        error:err
      });
    }

    res.status(200).json(inserted_user);
  });
});

router.put("/:id", function(req, res){
  var user = req.body;
  User.update(req.params.id, user, function(err, updatedUser){
    if(err){
      res.status(400).json({error:err});
    }
    res.status(200).json(updatedUser);
  });
});

router.get("/:id", function(req, res){
  User.findById(req.params.id, function(err, user){
    if(err){
      res.status(400).json({error:err});
    }
    res.status(200).json(user);
  });
});

router.get("/:idClub", function(req, res){
  User.findByClub(req.params.idClub, function(err, users){
    if(err){
      res.status(400).json({error:err});
    }
    res.status(200).json(users);
  });
});

module.exports = router;