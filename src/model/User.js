const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// user schema
const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'password must be at least 6 character'],
  },
});

// middleware untuk hash password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10); // membuat salt
    //hash password
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Sembunyikan field tertentu saat objek di-serialize
UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password; // Hapus password dari output
    return ret;
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
