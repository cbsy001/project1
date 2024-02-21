const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 5000;


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Configure MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Use the MySQL user you created
  password: 'zain_12345',  // Use the MySQL user password you specified
  database: 'sample_db',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.post('/login', (req, res) => {

  console.log("Req.body : ",req.body);

  const { username, password } = req.body;

  const query = `select * from users where username="${req.body.username}" and password="${req.body.password}"` 

  console.log("Query : ",query);

  db.query(query, (err, rows) => {
    if (err) 
    {
      
      res.status(404).json({ success: false, message: 'Error fetching data from db' });
      return;

    }
    
    if(rows.length >= 1)
    {
      res.status(200).json({ success: true, message: 'Login successful' });
      return;
    }
    
  });
  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
