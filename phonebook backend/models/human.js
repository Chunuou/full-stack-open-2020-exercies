const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGO_DB_URL;

console.log('connecting to', url);

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).then((reslut) => {
  console.log('connected to MongoDB');
}).catch((error) => {
  console.error('error connecting to MongoDB:', error.message);
});

const humanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
  },
});

humanSchema.plugin(uniqueValidator);

humanSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString();
    delete returnObject._id;
    delete returnObject._v;
  },
});

const Human = mongoose.model('Human', humanSchema);

module.exports = Human;
