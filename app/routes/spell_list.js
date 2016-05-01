module.exports = function(app, express, authenticate, auth0Manager) {
  var listRouter = express.Router();

  listRouter.use('/', authenticate);

  listRouter.get('/', function(req, res) {
    // get the current user's information using their ID provided 
    //  by the authentication middleware
    auth0Manager.getUser({ id: req.user.sub }, function(err, user) {
      if (err) res.send(err);
      else {
        // return only the user's spell lists
        res.send(user.user_metadata.spell_lists || {});
      }
    });
  });

  return listRouter;
};
