const express = require('express');
const app = express();

const {open} = require('sqlite');
const sqlite3 = require('sqlite3');

const path = require('path');

const dbpath = path.join(__dirname, 'accounts.db');



app.use(express.json());

const port = 5000;

let db = null;

const initializeDBAndServer = async () => {
    try {
        db = await open({
            filename: dbpath,
            driver: sqlite3.Database,
        });
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}/`);
        });
    } catch (e) {
        console.log(`DB Error: ${e.message}`);
        process.exit(1);
    }
}


initializeDBAndServer();


app.get('/userDetails', async (req, res) => {
    const data = `select * from user;`;
    const result = await db.all(data);
    res.json(result);
});

module.exports = app;