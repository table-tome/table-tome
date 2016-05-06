module.exports = function(app, express, authenticate, auth0Manager) {
  var userRouter = express.Router();

  userRouter.get('/:username', function(req, res) {
    var username = req.params.username;

    auth0Manager.getUsers({
        fields: "nickname,picture,user_metadata,user_id",
        include_fields: true
      },
      function(err, users) {
        if (err) res.send(err);
        else {
          for (i in users) {
            var user = users[i];
            console.log(user.nickname)
            if (user.nickname && user.nickname.toLowerCase() === username.toLowerCase()) {
              res.send(users[i]);
              return;
            }
          }
          res.send("USER NOT FOUND");
        }
      });
  });

  return userRouter;
};
