const express = require('express');
const axios = require('axios');
const generateToken = require('./jwt');
const { parse } = require('dotenv');

const app = express();
const port = 3009;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve login page
app.get('/', (req, res) => {
  const resHeaders =  res.getHeaders();
  const reqHeaders = req.headers;
  console.log({resHeaders, reqHeaders, host: req.headers['host']});
  res.sendFile(__dirname + '/login.html');
});

app.get('/api/v1/sample-data', (req, res) => {

    res.send({"email":"admin@admin.com","name": "Jojhnas"})
    // res.sendFile(__dirname + '/login.html');
});

// Handle login form submission
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Here, you can validate the username and password
  // against your desired authentication mechanism.
  const token = await generateToken(email);
    // res.setHeader('Autorization', `Bearer ${token}`);
    res.cookie('Autorization', `Bearer ${token}`)
    res.redirect('/success')
});


app.get('/success', (req, res) => {
    // res.getHeader('Autorization')
    res.sendFile(__dirname + '/success.html');
})
// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
