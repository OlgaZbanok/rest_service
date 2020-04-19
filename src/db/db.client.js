const mongoose = require('mongoose');
const User = require('../resources/users/user.model');

const USERS = [
  new User({ name: 'one', login: 'one', password: 'one' }),
  new User({ name: 'two', login: 'two', password: 'two' })
];

const connectDB = cb => {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', () => {
    console.log('we are connected!');
    db.dropDatabase();
    USERS.forEach(user => user.save());
    cb();
  });
};

module.exports = { USERS, connectDB };
