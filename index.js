const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Custom middleware for logging
app.use((req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next();
});

// Body parser middleware for POST form data
app.use(bodyParser.urlencoded({ extended: false }));

// Static file middleware
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('home', { title: 'Home Page' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});

app.post('/contact', (req, res) => {
  console.log('Form Data:', req.body);
  res.send('Form submitted successfully!');
});

app.get('/user/:name', (req, res) => {
  const { name } = req.params;
  res.send(`🎉 Hello, ${name}! Welcome to Brooklynn’s Creative Space.`);
});

app.get('/download', (req, res) => {
  const filePath = path.join(__dirname, 'public/images/sample.jpg');
  res.download(filePath, 'downloaded-image.jpg');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
