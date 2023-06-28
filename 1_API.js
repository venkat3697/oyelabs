const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'our_host',
  user: 'our_user',
  password: 'our_password',
  database: 'our_database'
});

// Add Customer API endpoint
app.post('/customer', (req, res) => {
  const { name, phoneNumber } = req.body;

  // Validate input parameters
  if (!name || !phoneNumber) {
    return res.status(400).json({ error: 'Name and phone number are required.' });
  }

  // Check for duplicates
  connection.query('SELECT * FROM customers WHERE phone_number = ?', [phoneNumber], (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      return res.status(500).json({ error: 'An error occurred while checking for duplicates.' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'Customer with the same phone number already exists.' });
    }

    // Insert customer record using transaction
    connection.beginTransaction((beginTransactionError) => {
      if (beginTransactionError) {
        console.error('Error starting database transaction:', beginTransactionError);
        return res.status(500).json({ error: 'An error occurred while starting the transaction.' });
      }

      const customer = { name, phone_number: phoneNumber };
      connection.query('INSERT INTO customers SET ?', customer, (insertError, insertResult) => {
        if (insertError) {
          connection.rollback(() => {
            console.error('Error inserting customer record:', insertError);
            return res.status(500).json({ error: 'An error occurred while inserting the customer record.' });
          });
        }

        connection.commit((commitError) => {
          if (commitError) {
            connection.rollback(() => {
              console.error('Error committing database transaction:', commitError);
              return res.status(500).json({ error: 'An error occurred while committing the transaction.' });
            });
          }

          return res.status(200).json({ message: 'Customer added successfully.' });
        });
      });
    });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
