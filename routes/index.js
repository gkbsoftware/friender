var express = require('express');
var router = express.Router();
var pg = require('pg');
var users = require('../services/users');

require('dotenv').load();

var conString = process.env.DATABASE_URL

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.signedCookies.userId) {
    console.log("logged in");
    pg.connect(conString, function(err, client, done) {
      if (err) {
        console.error('error fetching client from pool', err);
        res.status(500).send('Could not connect to database');
        return;
      }

      client.query('SELECT email_address FROM users WHERE id=' + req.signedCookies.userId, function(err, result) {
        done();
        if (err) {
          console.error('error running query', err);
          res.status(500).send('Error running query');
        } else {
          res.render('index', {userEmail: result.rows[0].email_address});
          // res.render('index', { userCount: result.rows[0].userCount });
        }
      });
    });
  }
  else {
    console.log("not logged in");
    res.render('index');
  }
});

router.get('/sign_up', function(req, res) {
  res.render('sign_up')
});

router.post('/sign_up', function(req, res) {
  // console.log('Looking for email='+req.body.emailAddress);
  users.findByEmailAddress(req.body.emailAddress, function(user) {
    if(user) {
      res.render('sign_up', { emailAddress: req.body.emailAddress, error: 'User already exists' });
    } else{
      users.createUser({ emailAddress: req.body.emailAddress, password: req.body.password }, function(user){
        console.log("User "+user.id+" created");
        res.cookie('userId', user.id, { signed: true }).redirect('/');
      });
    }
  });
});

router.get('/log_in', function(req, res) {
  res.render('log_in')
});

router.post('/log_in', function(req, res) {
  users.authenticate(req.body.emailAddress, req.body.password, function(user) {
    if (user) {
      res.cookie('userId', user.id, { signed: true });
      res.redirect('/')
    }
    else {
      res.render('log_in', { err: 'invalid username/password combination.' })
    }
  });
});

router.get('/log_out', function(req, res) {
  res.cookie('userId');
  res.redirect('/');
});

router.get('/forgot_password', function(req, res) {
  res.render('forgot_password');
});

router.post('/forgot_password', function (req, res, next) {
//   // req.app.mailer.send('email', {
//   //   to: 'example@example.com', // REQUIRED. This can be a comma delimited string just like a normal email to field.
//   //   subject: 'Test Email', // REQUIRED.
//   //   otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
//   // }, function (err) {
//   //   if (err) {
//   //     // handle error
//   //     console.log(err);
//   //     res.send('There was an error sending the email');
//   //     return;
//   //   }
    res.send('Email Sent');
});

module.exports = router;
