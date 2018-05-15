var mongoose = require('mongoose');
mongoose.connect('mongodb://andre:andrecalmon00@ds123790.mlab.com:23790/sdceapp');

var userSchema = new mongoose.Schema({
    username: String,
    email: String
}, { collection: 'usercollection' }
);

var schoolSchema = new mongoose.Schema({
    name: String,
    classes: []
}, { collection: 'schoolcollection' }
);
 
module.exports = { Mongoose: mongoose, UserSchema: userSchema, SchoolSchema: schoolSchema }