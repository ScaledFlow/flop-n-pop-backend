const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type: String, required: true },
  email: {type: String, required: true,  useCreateIndex: true },
  // email: {type: String, required: true,  unique: true }, // deprecated
  image: { type: String },
  password: { type: String, required: true, minlength: 6 },
  portfolios: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Portfolio' }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);