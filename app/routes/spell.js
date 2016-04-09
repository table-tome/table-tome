var Spell = require('../models/spell');

module.exports = function(app, express) {
  var spellRouter = express.Router();

  spellRouter.get('/', function(req, res) {
    res.json({
      message: 'Welcome to the Table Tome Spell API!'
    })
  });

  spellRouter.get('/all', function(req, res) {
    Spell.find({}, function(err, spells) {
      if (err) return res.send(err);
      res.json(spells);
    });
  });

  return spellRouter;
};
