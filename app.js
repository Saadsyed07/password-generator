const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs'); // Import the file system module

const PORT = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set the views folder (where EJS templates are stored)
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Handle root route
app.get('/', (req, res) => {
    // Render the "index" EJS template (located in the "views" folder)
    res.render('index', { title: 'Password Strength Meter' });
});
app.get('/back', (req, res) => {
    res.render('index.ejs');  // Redirects to the index.ejs page when clicking the "back" button
  });
app.get("/generate-password", (req, res) => {
    res.render("generate-password"); // Ensure your 'generate-password.ejs' exists
});
app.post('/save-password', (req, res) => {
  const { password } = req.body;

  if (!password) {
      return res.status(400).json({ message: 'Password is required' });
  }

  // Define file path
  const filePath = path.join(__dirname, 'passwords.txt');

  // Save password to the file
  fs.appendFile(filePath, password + '\n', (err) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Failed to save password' });
      }
      res.status(200).json({ message: 'Password saved successfully' });
  });
});
app.post('/save-password', (req, res) => {
    const { username, password } = req.body;
    
    // Logic to save the data can go here (e.g., save to a database).
    console.log(`Username: ${username}, Password: ${password}`);
  
    // Redirect back to the main page or display a success message
    res.redirect('/');
  });

  
  
// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
