module.exports = function(app, express, authenticate, auth0Manager) {
  var api = express.Router();

  api.get('/', function(req, res) {
    res.json({
      message: 'Welcome to the Table Tome API!'
    })
  });

  var spellRouter = require('./spell')(app, express, authenticate);
  api.use('/spells', spellRouter);

  var listRouter = require('./spell_list')(app, express, authenticate, auth0Manager);
  api.use('/spell_lists', listRouter)

  return api;
};
