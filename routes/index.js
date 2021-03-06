var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SDCE' });
});

module.exports = router;

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
   var db = require("../db");
   var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
   Users.find({}).lean().exec(
      function (e, docs) {
         res.render('userlist', { "userlist": docs });
   });
});

/* GET Escolaslist page. */
router.get('/schoollist', function(req, res) {
   var db = require("../db");
   var Schools = db.Mongoose.model('schoolcollection', db.SchoolSchema, 'schoolcollection');
   Schools.find({}).lean().exec(
      function (e, docs) {
         res.render('schoollist', { "schoollist": docs });
   });
});

/* GET Classlist page. */
router.get('/classlist', function(req, res) {
   var db = require("../db");
   var Schools = db.Mongoose.model('schoolcollection', db.SchoolSchema, 'schoolcollection');
   Schools.find({}).lean().exec(
      function (e, docs) {
         res.render('classlist', { "classlist": docs });
   });
});


/* GET New User page. */
router.get('/newuser', function(req, res) {
res.render('newuser', { title: 'Add New User' });
});

/* GET New Escola page. */
router.get('/createschool', function(req, res) {
res.render('createschool', { title: 'Adicionar Nova Escola' });
});

/* GET New Turma page. */
router.get('/createclass', function(req, res) {
   var db = require("../db");
   var Schools = db.Mongoose.model('schoolcollection', db.SchoolSchema, 'schoolcollection');
   Schools.find({}).lean().exec(
      function (e, docs) {
         res.render('createclass', { "createclass": docs });
   });
});

/* POST to Add User Service */
router.post('/adduser', function (req, res) {

    var db = require("../db");
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
    var user = new Users({ username: userName, email: userEmail });
    user.save(function (err) {
        if (err) {
            console.log("Error! " + err.message);
            return err;
        }
        else {
            console.log("Post saved");
            res.redirect("/");
        }
    });
});

/* POST to Add Escola Service */
router.post('/addschool', function (req, res) {

    var db = require("../db");
    var nome = req.body.nome;

    var Schools = db.Mongoose.model('schoolcollection', db.SchoolSchema, 'schoolcollection');
    var school = new Schools({ name: nome, classes: [] });
    school.save(function (err) {
        if (err) {
            console.log("Error! " + err.message);
            return err;
        }
        else {
            console.log("Post saved");
            res.redirect("/");
        }
    });
});

/* POST to Add Turma Service */
router.post('/addclass', function (req, res) {

    var db = require("../db");
    var nome = req.body.nome;
    var strSchool = req.body.escola;

    console.log(strSchool);
    //var e = document.getElementById("qualEscola");
    //var strSchool = e.options[e.selectedIndex].value;

    var Classes = db.Mongoose.model('classcollection', db.ClassSchema, 'classcollection');
    var classe = new Classes({ name: nome, students: [] });
    classe.save(function (err) {
        if (err) {
            console.log("Error! " + err.message);
            return err;
        }
        else {
          var Schools = db.Mongoose.model('schoolcollection', db.SchoolSchema, 'schoolcollection');
          Schools.findOne({ 'name': strSchool}, 'classes', function(err, school){
      if (err) return handleError(err);
      school.classes.push(nome);
      school.save(function(err){
        if (err) {
          console.log("Error!" + err.message);
          return err;
        }
        else {
          console.log('School updated!')
        }
      }

        )
    });
            console.log("Post saved");
            res.redirect("/");
        }
    });
});

/* GET Select School Service. */
router.get('/choicelist', function(req, res) {
   var db = require("../db");
   var strSchool = req.query.escola;
   
   console.log(strSchool);

   var Schools = db.Mongoose.model('schoolcollection', db.SchoolSchema, 'schoolcollection');
   Schools.findOne({ 'name': strSchool}, 'classes', function(err, docs){
      if (err) return handleError(err);
      console.log(docs);
      res.render('choicelist', { "choicelist": docs });
   });
});
