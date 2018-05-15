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

var classSchema = new mongoose.Schema({
    name: String,
    students: []
}, { collection: 'classcollection' }
);

var studentSchema = new mongoose.Schema({
    name: String,
    matricula: String
}, { collection: 'classcollection' }
);
 
module.exports = { Mongoose: mongoose, UserSchema: userSchema, SchoolSchema: schoolSchema, ClassSchema: classSchema, StudentSchema: studentSchema }