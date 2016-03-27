var Spell = require('../models/spell');

module.exports = function(app, express) {
  var spellRouter = express.Router();

  spellRouter.get('/', function(req, res) {
    res.json({
      message: 'Welcome to the Table Tome Spell API!'
    })
  });

  return spellRouter;
};
