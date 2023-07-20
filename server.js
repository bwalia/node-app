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
  const resHeaders = res.getHeaders();
  const reqHeaders = req.headers;
  console.log({ resHeaders, reqHeaders, host: req.headers['host'] });
  res.sendFile(__dirname + '/login.html');
});

app.get('/api/v2/sample-data.json', (req, res) => {

  res.send({
    "id": 1,
    "title": "iPhone 9",
    "description": "An apple mobile which is nothing like apple",
    "price": 549,
    "discountPercentage": 12.96,
    "rating": 4.69,
    "stock": 94,
    "brand": "Apple",
    "category": "smartphones",
    "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    "images": [
      "https://i.dummyjson.com/data/products/1/1.jpg",
      "https://i.dummyjson.com/data/products/1/2.jpg",
      "https://i.dummyjson.com/data/products/1/3.jpg",
      "https://i.dummyjson.com/data/products/1/4.jpg",
      "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
    ]
  })

});
app.get('/api/sample-data.json', (req, res) => {
  res.send({
    "id": 1,
    "firstName": "Terry",
    "lastName": "Medhurst",
    "maidenName": "Smitham",
    "age": 50,
    "gender": "male",
    "email": "atuny0@sohu.com",
    "phone": "+63 791 675 8914",
    "username": "atuny0",
    "password": "9uQFF1Lh",
    "birthDate": "2000-12-25",
    "image": "https://robohash.org/hicveldicta.png?size=50x50&set=set1",
    "bloodGroup": "A−",
    "height": 189,
    "weight": 75.4,
    "eyeColor": "Green",
    "hair": {
      "color": "Black",
      "type": "Strands"
    },
    "domain": "slashdot.org",
    "ip": "117.29.86.254",
    "address": {
      "address": "1745 T Street Southeast",
      "city": "Washington",
      "coordinates": {
        "lat": 38.867033,
        "lng": -76.979235
      },
      "postalCode": "20020",
      "state": "DC"
    },
    "macAddress": "13:69:BA:56:A3:74",
    "university": "Capitol University",
    "bank": {
      "cardExpire": "06/22",
      "cardNumber": "50380955204220685",
      "cardType": "maestro",
      "currency": "Peso",
      "iban": "NO17 0695 2754 967"
    },
    "company": {
      "address": {
        "address": "629 Debbie Drive",
        "city": "Nashville",
        "coordinates": {
          "lat": 36.208114,
          "lng": -86.58621199999999
        },
        "postalCode": "37076",
        "state": "TN"
      },
      "department": "Marketing",
      "name": "Blanda-O'Keefe",
      "title": "Help Desk Operator"
    },
    "ein": "20-9487066",
    "ssn": "661-64-2976",
    "userAgent": "Mozilla/5.0 ..."
  }
  )
});

// Handle login form submission
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Here, you can validate the username and password
  // against your desired authentication mechanism.
  const token = await generateToken(email);
  // res.setHeader('Autorization', `Bearer ${token}`);
  res.cookie('Authorization', `Bearer ${token}`)
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
