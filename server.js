const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 5000;

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('dist', {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
            res.set('Content-Type', 'application/javascript');
        }
    }
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const mongoURI = process.env.MONGO_URI || '';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

const UserSchema = new mongoose.Schema({
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      username: { type: String }
  });
  

const User = mongoose.model('User', UserSchema);

app.post('/register', async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
      return res.status(400).send('Email, password, and username are required');
  }
  try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword, username });
      await newUser.save();
      res.status(201).send('User registered');
  } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).send('Error registering user');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
      return res.status(400).send('Email and password are required');
  }
  try {
      const user = await User.findOne({ email });
      if (user && await bcrypt.compare(password, user.password)) {
          res.status(200).send('User signed in');
      } else {
          res.status(400).send('Invalid credentials');
      }
  } catch (error) {
      console.error('Error signing in user:', error);
      res.status(500).send('Error signing in user');
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


const appName = 'car-dealership';

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port} (${appName})`);
});
