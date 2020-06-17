const User = require('../models/user/user');
const authController = require('../controllers/auth_controller');

/**
 * Handles User Registration for Rest path /users/register
 * Checks for duplicated Username and PW constraints
 *
 * @param req Request
 * @param res Response
 */
exports.register = function (req, res) {
  console.log("Recieved Register Request with: "+req.body.username+"/"+req.body.password);
  authController.handleRegister(req.body.username, req.body.password,
      function (err, user, addInfo) {
        if (err) {
          return res.send(err);
        }
        if(!user){
          return res.send(addInfo.message);
        }
        return res.send(user);
      });
};

/**
 * REST function
 * Finds User details by id given in req
 * @param req Request
 * @param res Response
 */
exports.getUserDetails = function (req, res) {
  User.findById(req.params.id, {}, function (err, result) {
    if (err) {
      console.error(err);
      return res.send(err);
    }
    if (!result) {
      res.statusCode = 404;
      return res.send(result);
    }
    return res.send(result);
  })
};

/**
 * Test Cookies
 * @param req Request
 * @param res Response
 */
exports.findFromCookie = function (req, res) {
  //console.log("User: "+req.user);
  res.send(req.user);
};

/**
 * Add user details to logged in user
 * @param req Request
 * @param res Response
 */
exports.addUserDetails = (req, res) => {
  let userDetails = req.body;

  User.findOneAndUpdate({_id: req.user._id}, userDetails, {upsert: true}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
};

// Gets all the users.
exports.getAllUsers = (req, res) => {

  User.find({}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  })
};

