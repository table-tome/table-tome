module.exports = function(app, express) {
	var api = express.Router();

	api.get('/', function(req, res) {
    res.json({
      message: 'Welcome to the Table Tome API!'
    })
  });

	var spellRouter = require('./spell')(app, express);
	api.use('/spell', spellRouter);

	return api;
};