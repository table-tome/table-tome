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

  spellRouter.post('/create', function(req, res) {
    var spell = new Spell();

    spell.name = req.body.name; //
    spell.level = req.body.level; //
    spell.school = req.body.school; //
    spell.ritual = req.body.ritual; //
    spell.classes = req.body.classes;
    spell.castingTime = req.body.castingTime;
    spell.range = req.body.range;
    spell.duration = req.body.duration;
    spell.components = req.body.components;
    spell.description = req.body.description;

    spell.save(function(err) {
      if (err) return res.send(err);
      res.json({
        message: 'Spell created!'
      });
    });
  });

  return spellRouter;
};
