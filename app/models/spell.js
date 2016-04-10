var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schools = [
  'abjuration',
  'conjuration',
  'divination',
  'enchantment',
  'evocation',
  'illusion',
  'necromancy',
  'transmutation'
];

var classes = [
  'bard',
  'cleric',
  'druid',
  'paladin',
  'ranger',
  'sorcerer',
  'warlock',
  'wizard'
];

var sources = [
  'phb',
  'ee'
];

var SpellSchema = new Schema({
	// metadata
	author: { type: String },
  source: { name: { type: String, required: true }, page: {type: Number, required: true } },
	// spell information
  name: { type: String, required: true },
  level: { type: Number, required: true, min: 0, max: 9 },
  school: { type: String, required: true, enum: schools },
  ritual: { type: Boolean, required: true },
  classes: { type: [{ type: String, required: true, enum: classes }], required: true },
  castingTime: { type: String, required: true },
  range: { type: String, required: true },
  duration: { type: String, required: true },
  components: {
    verbal: { type: Boolean, required: true },
    somatic: { type: Boolean, required: true },
    material: { has: { type: Boolean, required: true }, items: String }
  },
  description: { type: String, required: true } // description stored as markdown formatted string
});

module.exports = mongoose.model('Spell', SpellSchema);
