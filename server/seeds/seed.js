const db = require('../config/connection');
const { User, Course } = require('../models');

const userData = require('./userData.json');
const courseData = require('./courseData.json');

db.once('open', async () => {
  await User.deleteMany({});
  await Course.deleteMany({});

  const Users = await User.insertMany(userData);
  const Courses = await Course.insertMany(courseData);

  console.log('Users and courses Seeded!');
  console.log(Users)
  console.log(Courses)
  process.exit(0);
});
