const express = require('express');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');

const app = express();
app.use(express.json());

const port = 3000;

const initializeDB = async () => {
  try {
    const dbPath = path.join(__dirname, 'accounts.db');
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    return db;
  } catch (e) {
    console.error(`DB Error: ${e.message}`);
    return null;
  }
};

app.get('/userDetails', async (req, res) => {
  const db = await initializeDB();
  if (!db) {
    res.status(500).send('Database connection error');
    return;
  }

  try {
    const query = `SELECT * FROM user;`;
    const result = await db.all(query);
    res.json(result);
  } catch (error) {
    console.error(`Error fetching user details: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

module.exports = app;
