const mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost/Data', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize :10
});

module.exports = mongoose;