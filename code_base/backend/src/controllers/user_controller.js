const User = require('../models/user/user');
const authController = require('../controllers/auth_controller');
/*
exports.login = function (req, res) {
  res.send("NOT IMPLEMENTED:Login");
};
 */


exports.register = function (req, res) {
  console.log("Recieved Register Request with: "+req.body.username+"/"+req.body.password);
  return authController.handleRegister(req.body.username, req.body.password,
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
 * Finds User by id given in req
 * @param req Request
 * @param res Response
 */
exports.findById = function (req, res) {
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
