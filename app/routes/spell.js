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
    var pass = req.body.pass;
    if (req.body.pass === process.env.CONTRIBUTE_PASS) {
      Spell.findOne({ name: req.body.spell.name }, function(err, found) {
        if (!found) {
          var spell = new Spell();
          spell.source = req.body.spell.source;
          spell.name = req.body.spell.name;
          spell.level = req.body.spell.level;
          spell.school = req.body.spell.school;
          spell.ritual = req.body.spell.ritual;
          spell.classes = req.body.spell.classes;
          spell.castingTime = req.body.spell.castingTime;
          spell.range = req.body.spell.range;
          spell.duration = req.body.spell.duration;
          spell.components = req.body.spell.components;
          spell.description = req.body.spell.description;
          spell.save(function(err) {
            if (err) return res.send(err);
            res.json({
              status: 'success'
            });
          });
        } else {
          res.json({
            status: 'error',
            message: 'The spell you are adding already exists in Table Tome, check the spellbook before attempting to contribute another'
          });
        }
      });
    } else {
      res.json({
        status: 'error',
        message: 'Incorrect password, you must provide the correct password to contribute a spell'
      });
    }
  });

  return spellRouter;
};
