// server.js
// BASE SETUP
// =============================================================================
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var User       = require('./models/user');
var Watchlist  = require('./models/watchlist');
var Session    = require('./models/session');
// this will let us get the data from a POST
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/sw_database');
//var port = process.env.PORT || 8080;        // set our port
var port = 3000;
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});
// more routes for our API will happen here
/*
 * Sessions
 */
router.route('/sessions')
  .get(function(req, res){
    Session.find(function(err, sessions){
      if(err)
        res.send(err);
      res.json(sessions);
    })
  }) // Write endpoint to delete all sessions by userid
/*
 * Users
 */
router.route('/users')
    // create a user (accessed at POST http://localhost:3000/api/users)
    .post(function(req, res) {        
        var user = new User();      // create a new instance of the User model
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        if(req.body.permissions){
          user.permissions = {
            show: req.body.permissions.show || 2,
            view: req.body.permissions.view || 2,
            edit: req.body.permissions.edit || 1,
            delete: req.body.permissions.delete || 0,
            create: req.body.permissions.create || 0
          }
        } else {
          user.permissions = {
            show: 2,
            view: 2,
            edit: 1,
            delete: 0,
            create: 0
          }
        }
        // save the user and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);
            res.json(user);
        });        
    })
    // get all the users (accessed at GET http://localhost:3000/api/users)
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    });
router.route('/users/username/:username/password/:password')
  .get(function(req, res){
    User.findOne({username: req.params.username, password: req.params.password}, function(err,user){
      if(user){
        if (err)
            res.send(err);
        // clear old session
        Session.findOne({user_id: user._id}, function(err, session){
          if(!session){
            var session = new Session();
            session.user_id = user._id;
            session.save(function(err){
              if(err)
                res.send(err);
              var userSession = {
                user_id: user._id,
                session_id: session._id
              }
              res.json(userSession);
            })
          } else{
            var userSession = {
              user_id: user._id,
              session_id: session._id
            }
            res.json(userSession);          
          }
        })
      } else{
        res.json({message: 'no user found'})
      }
    })
  })
router.route('/users/user/:user_id/session/:session_id')
  .get(function(req, res){
    Session.findById(req.params.session_id, function(err, session){
      if(err)
        res.send(err);
      if(session){
        User.findById(session.user_id, function(err, user){
          if(err)
            res.send(err);
          res.json(user);
        })
      } else {
        res.json({message: 'no session found'});
      }
    })
  })
  .delete(function(req, res){
    Session.remove({_id: req.params.session_id, user_id: req.params.user_id}, function(err, session){
      if(err)
        res.send(err);
      res.json({});
    })
  })
router.route('/users/:user_id')
    // get the user with that id (accessed at GET http://localhost:3000/api/users/:user_id)
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })
    // update the user with this id (accessed at PUT http://localhost:3000/api/users/:user_id)
    .put(function(req, res) {
        // use our user model to find the user we want
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            user.username = req.body.username || user.username;  // update the users info
            user.password = req.body.password || user.password;
            user.email = req.body.email || user.email;
            if(req.body.permissions){
              user.permissions = {
                show: req.body.permissions.show || user.permissions.show,
                view: req.body.permissions.view || user.permissions.view,
                edit: req.body.permissions.edit || user.permissions.edit,
                delete: req.body.permissions.delete || user.permissions.delete,
                create: req.body.permissions.create || user.permissions.create
              };
            }
            // save the user
            user.save(function(err) {
                if (err)
                    res.send(err);
                res.json(user);
            });
        });
    })
    // delete the user with this id (accessed at DELETE http://localhost:3000/api/users/:user_id)
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);
            res.json({});
        });
    });
/*
 * Watchlists
 */
router.route('/watchlists')
    // create a watchlist (accessed at POST http://localhost:3000/api/watchlists)
    .post(function(req, res) {        
        // save the watchlist and check for errors
        var watchlistQuery = Watchlist.findOne({'user_id': req.body.user_id});
        watchlistQuery.exec(function(err, watchlistQueryResult){
          if (err)
              res.send(err);
          if(watchlistQueryResult){
            res.json({message: 'watchlist already exists'});
          } else{
            var userQuery = User.findOne({'user_id': req.body.user_id});
            userQuery.exec(function(err, userQueryResult){
              if(err)
                  res.send(err);
              if(userQueryResult){
                var watchlist = new Watchlist();
                watchlist.user_id = req.body.user_id;
                watchlist.watchlist = req.body.watchlist;
                watchlist.save(function(err){
                  if(err)
                    res.send(err);
                  res.json(watchlist);
                })
              } else {
                res.json({message: 'user does not exist'})
              }
            });
          }
        })    
    })
    // get all the watchlists (accessed at GET http://localhost:8080/api/watchlists)
    .get(function(req, res) {
        Watchlist.find(function(err, watchlists) {
            if (err)
                res.send(err);
            res.json(watchlists);
        });
    });
router.route('/watchlists/:watchlist_id/addItem')
  .put(function(req, res){
    // use our watchlist model to find the watchlist we want
    Watchlist.findById(req.params.watchlist_id, function(err, watchlist) {
        if (err)
            res.send(err);
        if(watchlist){
          if(req.body.watchlist){
            var watchlistItemCount = watchlist.watchlist.length;
            if(watchlist.watchlist.indexOf(req.body.watchlist) < 0){
              watchlist.watchlist.push(req.body.watchlist);
            } else{
              res.json({message: "already in watchlist"});
            }
          } else {
            res.json({message: "nothing added to watchlist"});
          }
          // save the watchlist
          watchlist.save(function(err) {
              if (err)
                  res.send(err);
              res.json(watchlist);
          });
        } else{
          res.json({message: "watchlist not found"});
        }
    });
  });
router.route('/watchlists/:watchlist_id/addItems')
  .put(function(req, res){
    Watchlist.findById(req.params.watchlist_id, function(err, watchlist){
      if (err)
          res.send(err);
      if(watchlist){
        var originalWatchlistChanged = false;
        //if(req.body.watchlist && req.body.watchlist.length && Object.prototype.toString.call( req.body.watchlist ) === '[object Array]'){
        if(req.body.watchlist && req.body.watchlist.length && Array.isArray(req.body.watchlist)){
          var tempWatchlistCount = req.body.watchlist.length;
          var watchlistItemCount = watchlist.watchlist.length;          
          for(var i=0; i<tempWatchlistCount; i++){
            if(watchlist.watchlist.indexOf(req.body.watchlist[i]) < 0){
              watchlist.watchlist.push(req.body.watchlist[i]);
              originalWatchlistChanged = true;
            }
          }
          if(originalWatchlistChanged){
            watchlist.save(function(err){
              if (err)
                 res.send(err);
              res.json(watchlist);
            })
          } else{
            res.json({message: "nothing added to watchlist"})
          }
        }
      } else{
        res.json({message: "watchlist not found"});
      }
    })
  })
router.route('/watchlists/user/:user_id/addItem')
  .put(function(req, res){
    Watchlist.findOne({user_id: req.params.user_id}, function(err, watchlist){
      if (err)
        res.send(err);
        if(watchlist){
          if(req.body.watchlist){
            var watchlistItemCount = watchlist.watchlist.length;
            var notInWatchlist = true;
            for(var i=0; i<watchlistItemCount; i++){
              if(watchlist.watchlist[i] == req.body.watchlist){
                notInWatchlist = false;
              }
            }
            if(notInWatchlist){
              watchlist.watchlist.push(req.body.watchlist);
            } else{
              res.json({message: "already in watchlist"});
            }
          } else {
            res.json({message: "nothing added to watchlist"});
          }
          // save the watchlist
          watchlist.save(function(err) {
              if (err)
                  res.send(err);
              res.json(watchlist);
          });
        } else{
          res.json({message: "watchlist not found"});
        }
    });
  })
router.route('/watchlists/user/:user_id/addItems')
  .put(function(req, res){
    Watchlist.findOne({user_id: req.params.user_id}, function(err, watchlist){
      if (err)
          res.send(err);
      if(watchlist){
        var originalWatchlistChanged = false;
        //if(req.body.watchlist && req.body.watchlist.length && Object.prototype.toString.call( req.body.watchlist ) === '[object Array]'){
        if(req.body.watchlist && req.body.watchlist.length && Array.isArray(req.body.watchlist)){
          var tempWatchlistCount = req.body.watchlist.length;
          var watchlistItemCount = watchlist.watchlist.length;          
          for(var i=0; i<tempWatchlistCount; i++){
            if(watchlist.watchlist.indexOf(req.body.watchlist[i]) < 0){
              watchlist.watchlist.push(req.body.watchlist[i]);
              originalWatchlistChanged = true;
            }
          }
          if(originalWatchlistChanged){
            watchlist.save(function(err){
              if (err)
                 res.send(err);
              res.json(watchlist);
            })
          } else{
            res.json({message: "nothing added to watchlist"})
          }
        }
      } else{
        res.json({message: "watchlist not found"});
      }
    })
  })
router.route('/watchlists/:watchlist_id/removeItem')
  .put(function(req, res){
    Watchlist.findById(req.params.watchlist_id, function(err, watchlist){
      if (err)
          res.send(err);
      if(req.body.watchlist){
        var watchlistItemCount = watchlist.watchlist.length;
        var tempWatchlist = [];
        var notInWatchlist = true;
        for(var i=0; i<watchlistItemCount; i++){
          if(watchlist.watchlist[i] == req.body.watchlist){
            notInWatchlist = false;
          }
        }
        if(notInWatchlist){
          res.json({message: "not in watchlist to remove"});
        } else{
          for(var i=0; i<watchlistItemCount; i++){
            if(watchlist.watchlist[i] != req.body.watchlist){
              tempWatchlist.push(watchlist.watchlist[i]);
            }
          }
          watchlist.watchlist = tempWatchlist;
          // save the watchlist
          watchlist.save(function(err) {
              if (err)
                  res.send(err);
              res.json(watchlist);
          });
        }
      } else{
        res.json({message: "watchlist not found"});
      }
    });
  });
router.route('/watchlists/user/:user_id/removeItem')
  .put(function(req, res){    
    Watchlist.findOne({user_id: req.params.user_id}, function(err, watchlist){
      if (err)
          res.send(err);
      if(req.body.watchlist){
        var watchlistItemCount = watchlist.watchlist.length;
        var notInWatchlist = true;
        for(var i=0; i<watchlistItemCount; i++){
          if(watchlist.watchlist[i] 
             == req.body.watchlist){
            notInWatchlist = false;
            watchlist.watchlist.splice(i, 1);
          }
        }
        if(notInWatchlist){
          res.json({message: "not in watchlist to remove"});
        }
      } else{
        res.json({message: "watchlist not found"});
      }
      // save the watchlist
      watchlist.save(function(err) {
          if (err)
              res.send(err);
          res.json(watchlist);
      });
    });
  })
router.route('/watchlists/:watchlist_id')
    // get the watchlist with that id (accessed at GET http://localhost:3000/api/watchlists/:watchlist_id)
    .get(function(req, res) {
        Watchlist.findById(req.params.watchlist_id, function(err, watchlist) {
            if (err)
                res.send(err);
            res.json(watchlist);
        });
    })
    // delete the watchlist with this id (accessed at DELETE http://localhost:8080/api/watchlists/:watchlist_id)
    .delete(function(req, res) {
        Watchlist.remove({
            _id: req.params.watchlist_id
        }, function(err, watchlist) {
            if (err)
                res.send(err);
            res.json({});
        });
    });
router.route('/watchlists/user/:user_id')
  .get(function(req, res) {    
    var watchlistQuery = Watchlist.findOne({'user_id': req.params.user_id});
    watchlistQuery.exec(function(err, watchlist){
      if (err)
          res.send(err);
      res.json(watchlist);
    });    
  });
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/sneakerwatcher/api', router);
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
