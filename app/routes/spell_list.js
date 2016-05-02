module.exports = function(app, express, authenticate, auth0Manager) {
  var listRouter = express.Router();

  listRouter.use('/', authenticate);

  // route to get all of the current user's spell lists
  listRouter.get('/', function(req, res) {
    var user_id = req.user.sub;
    // get the current user's information using their ID provided 
    //  by the authentication middleware
    auth0Manager.getUser({ id: user_id }, function(err, user) {
      if (err) res.send(err);
      else {
        // return only the user's spell lists
        res.send(user.user_metadata.spell_lists || {});
      }
    });
  });

  // route to create a new empty spell list for the user that is currently authenticated
  listRouter.post('/', function(req, res) {
    var user_id = req.user.sub;
    // make sure the new list name isn't undefined
    if (!req.body.list_name) {
      res.send("A name for the new spell list must be provided");
      return;
    }
    // get the current user in order to update the metadata without
    //  overwriting their lists
    auth0Manager.getUser({ id: user_id }, function(err, user) {
      if (err) res.send(err);
      else {
        var lists = [];
        if (user.user_metadata && user.user_metadata.spell_lists)
          lists = user.user_metadata.spell_lists;

        // make sure the list isn't called "All Lists"
        if ($req.body.list_name === "All Lists") {
          res.send("A spell list cannot be named " + $req.body.list_name);
          return;
        }

        // make sure that no other list has the same name
        for (i in lists) {
          if (lists[i].name === req.body.list_name) {
            res.send("A spell list named \"" + req.body.list_name + "\" already exists");
            return;
          }
        }

        // create a new empty list, and add it to the user's metadata in auth0
        var new_list = { name: req.body.list_name, list: [] };
        lists.push(new_list);
        var metadata = { spell_lists: lists };
        auth0Manager.updateUserMetadata({ id: user_id }, metadata, function(err, user) {
          if (err) res.send(err);
          else {
            // return the user's updated spell lists
            res.send(user.user_metadata.spell_lists || []);
          }
        });
      }
    });
  });

  return listRouter;
};
