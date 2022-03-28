const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const courseSchema = require('./Course')

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    userCourses: [courseSchema]
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);


// hash user password
userSchema.pre('save', async function (next) {

  this.username =  this.username.toLowerCase();

  console.log(this)
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate('password')

  if (update.password) {
    const saltRounds = 10;
    update.password = await bcrypt.hash(update.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `animeCount` with the number of saved animes we have
userSchema.virtual('reviewCount').get(function () {
  return this.userReviews.length;
});

const User = model('User', userSchema)

module.exports = User;
