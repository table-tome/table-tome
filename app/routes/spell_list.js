module.exports = function(app, express, authenticate, auth0Manager) {
  var listRouter = express.Router();
  var num_max_lists = 5;

  listRouter.use('/', authenticate);

  // route to get all of the current user's spell lists
  listRouter.get('/', function(req, res) {
    var user_id = req.user.sub;
    // get the current user's information using their ID provided
    //  by the authentication middleware
    auth0Manager.getUser({
      id: user_id
    }, function(err, user) {
      if (err) {
        res.send({
          success: false,
          message: err
        });
      } else {
        // return only the user's spell lists
        res.send({
          success: true,
          lists: user.user_metadata.spell_lists || {}
        });
      }
    });
  });

  // route to create a new empty spell list for the user that is currently authenticated
  listRouter.post('/', function(req, res) {
    var user_id = req.user.sub;
    // make sure the new list name isn't undefined
    if (!req.body.list_name) {
      res.send({
        success: false,
        message: "A name for the new spell list must be provided"
      });
      return;
    }
    // get the current user in order to update the spell lists without
    //  overwriting their lists
    auth0Manager.getUser({
      id: user_id
    }, function(err, user) {
      if (err) {
        res.send({
          success: false,
          message: err
        });
      } else {
        var lists = [];
        if (user.user_metadata && user.user_metadata.spell_lists) {
          lists = user.user_metadata.spell_lists;
        }

        // make sure the user doesn't have too many lists already
        if (lists.length >= num_max_lists) {
          res.send({
            success: false,
            message: "You cannot create more than " + num_max_lists + " lists."
          });
          return;
        }

        // make sure the list isn't called "All Lists"
        if (req.body.list_name === "All Lists") {
          res.send({
            success: false,
            message: "A spell list cannot be named " + $req.body.list_name
          });
          return;
        }

        // make sure that no other list has the same name
        for (i in lists) {
          if (lists[i].name === req.body.list_name) {
            res.send({
              success: false,
              message: "A spell list named \"" + req.body.list_name + "\" already exists"
            });
            return;
          }
        }

        // create a new empty list, and add it to the user's metadata in auth0
        var new_list = {
          name: req.body.list_name,
          list: []
        };
        lists.push(new_list);
        var metadata = {
          spell_lists: lists
        };
        auth0Manager.updateUserMetadata({
          id: user_id
        }, metadata, function(err, user) {
          if (err) {
            res.send({
              success: false,
              message: err
            });
          } else {
            // return the user's updated spell lists
            res.send({
              success: true,
              lists: user.user_metadata.spell_lists || []
            });
          }
        });
      }
    });
  });

  // route to add a spell id to an existing list
  listRouter.post('/:list', function(req, res) {
    var user_id = req.user.sub;
    var list_name = req.params.list;
    var spell_id = req.body.spell_id;

    if (!spell_id) {
      res.send({
        success: false,
        message: "No spell id was sent in the body"
      });
      return;
    }

    auth0Manager.getUser({
      id: user_id
    }, function(err, user) {
      if (err) {
        res.send({
          success: false,
          message: err
        });
      } else {
        var lists = null;
        if (user.user_metadata && user.user_metadata.spell_lists)
          lists = user.user_metadata.spell_lists;

        if (lists === null) {
          res.send({
            success: false,
            message: "User does not have a list named " + list_name
          });
          return;
        }

        var found = false;
        for (i in lists) {
          if (lists[i].name === list_name) {
            found = true;

            // if the spell is already in the list, return the original list
            //  should maybe be treated with an error
            for (j in lists[i].list) {
              if (spell_id === lists[i].list[j]) {
                res.send({
                  success: true,
                  lists: lists
                });
                return;
              }
            }

            lists[i].list.push(spell_id);
            var metadata = {
              spell_lists: lists
            };
            auth0Manager.updateUserMetadata({
              id: user_id
            }, metadata, function(err, user) {
              if (err) res.send({
                success: false,
                message: err
              });
              else {
                res.send({
                  success: true,
                  lists: user.user_metadata.spell_lists
                });
              }
            });
          }
        }
        if (!found) {
          res.send({
            success: false,
            message: "User does not have a list named " + list_name
          });
        }
      }
    });
  });

  // deletes the specified list
  listRouter.delete('/:list', function(req, res) {
    auth0Manager.getUser({
      id: req.user.sub
    }, function(err, user) {
      if (err) res.send({
        success: false,
        message: err
      });
      else {
        var lists = null;
        if (user.user_metadata && user.user_metadata.spell_lists)
          lists = user.user_metadata.spell_lists;

        // delete the specified list
        var list_name = req.params.list;
        for (i in lists) {
          if (list_name === lists[i].name) {
            lists.splice(i, 1);
            break;
          }
        }

        // update the spell lists
        var metadata = {
          spell_lists: lists
        };
        auth0Manager.updateUserMetadata({
          id: req.user.sub
        }, metadata, function(err, user) {
          if (err) {
            res.send({
              success: false,
              message: err
            });
          } else res.send({
            success: true,
            lists: user.user_metadata.spell_lists
          });
        });
      }
    });
  });

  // deletes the specified spell from the specified list
  listRouter.delete('/:list/:spell', function(req, res) {
    auth0Manager.getUser({
      id: req.user.sub
    }, function(err, user) {
      if (err) {
        res.send({
          success: false,
          message: err
        });
      } else {
        var lists = null;
        if (user.user_metadata && user.user_metadata.spell_lists)
          lists = user.user_metadata.spell_lists;

        // find the correct list and spell within that list, and remove it
        var list_name = req.params.list;
        for (i in lists) {
          if (list_name === lists[i].name) {
            var spell = req.params.spell;
            for (j in lists[i].list) {
              if (spell === lists[i].list[j]) {
                lists[i].list.splice(j, 1);
                break;
              }
            }
            break;
          }
        }

        // update the spell lists
        var metadata = {
          spell_lists: lists
        };
        auth0Manager.updateUserMetadata({
          id: req.user.sub
        }, metadata, function(err, user) {
          if (err) res.send({
            success: false,
            message: err
          });
          else res.send({
            success: true,
            lists: user.user_metadata.spell_lists
          });
        });
      }
    });
  });

  return listRouter;
};
