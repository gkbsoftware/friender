var pg = require('pg');
var jsSHA = require("jssha");

require('dotenv').load();

var conString = process.env.DATABASE_URL;

module.exports = {
  findByEmailAddress: function(emailAddress, cb) {
    pg.connect(conString, function(err, client, done) {
      if (err) {
        console.log(err);
        throw(err);
      }
      client.query('SELECT * FROM users WHERE email_address = $1', [emailAddress], function(err, result) {
        done();
        if (err) {
          console.log(err);
          throw(err);
        }

        cb(result.rows[0]);
      });
    });
  },

  createUser: function(user, cb) {
    pg.connect(conString, function(err, client, done) {
      if (err) {
        console.log(err);
        throw(err);
      }

      var shaObj = new jsSHA("SHA-1", "TEXT");
      shaObj.setHMACKey(process.env.SECRET_KEY, "TEXT");
      shaObj.update(user.password);
      user.password = shaObj.getHMAC("HEX");

      client.query('INSERT INTO users (email_address, password, created_at, updated_at) VALUES ($1, $2, now(), now()) RETURNING id', [user.emailAddress, user.password], function(err, result) {
        done();
        if (err) {
          console.log(err);
          throw(err);
        }

        user.id = result.rows[0].id;
        cb(user);
      });
    });
  },

  authenticate: function(authEmail, authPassword, cb) {

    var shaObj = new jsSHA("SHA-1", "TEXT");
    shaObj.setHMACKey(process.env.SECRET_KEY, "TEXT");
    shaObj.update(authPassword);
    authPassword = shaObj.getHMAC("HEX");

    pg.connect(conString, function(err, client, done) {
      if (err) {
        console.log(err);
        throw(err);
      }

      client.query('SELECT id, password FROM users WHERE email_address = $1', [authEmail], function(err, result) {
        var user = null;

        done();
        if (err) {
          console.log(err);
          throw(err);
        }

         if (result.rows[0]) {
           if  (authPassword == result.rows[0].password) {
             console.log("successfully allow login");
             user = result.rows[0];
           }
           else {
             console.log('Password does not match');
           }
         }
         else {
           console.log('User with this email does not exist');
         }

         cb(user);
      });
    });
  }
}
