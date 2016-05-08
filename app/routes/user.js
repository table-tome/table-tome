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
            if (user.nickname && user.nickname.toLowerCase() === username.toLowerCase()) {
              res.send(users[i]);
              return;
            }
          }
          res.send(null);
        }
      });
  });

  userRouter.use('/edit', authenticate);

  userRouter.post('/edit/about_me', function(req, res) {
    var about_me = null;
    if (req.body.about_me) about_me = req.body.about_me;

    var metadata = {
      about_me: about_me
    };

    auth0Manager.updateUserMetadata({
      id: req.user.sub
    }, metadata, function(err, user) {
      if (err) res.send(err);
      else {
        res.send(user);
      }
    });
  });

  return userRouter;
};
