"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// Example usage of the generateUniqueId function
const app = (0, express_1.default)();
const port = 5001; // Change the port number to 5001 or any other available port
const currentDate = new Date();
const year = currentDate.getFullYear().toString();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
// Middleware
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// MySQL Connection
const connection = mysql_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rentify'
});
connection.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});
// -------------------------------------------------------------------------------- //
// -------------------------------------------------------------------------------- //
// -------------------------------------------------------------------------------- //
// --------------------------- register page start ------------------------------- //
// -------------------------------------------------------------------------------- //
// -------------------------------------------------------------------------------- //
// -------------------------------------------------------------------------------- //
// Endpoint to insert user registration data
app.post('/register', (req, res) => {
    console.log('Received data:', req.body);
    const { firstName, lastName, email, phoneNumber, password, confirmPassword, userTypeID, userType } = req.body;
    const timestamp = new Date();
    const INSERT_USER_QUERY = `INSERT INTO login (firstName, lastName, email, phoneNumber, password, confirmPassword, userTypeID, userType, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    connection.query(INSERT_USER_QUERY, [firstName, lastName, email, phoneNumber, password, confirmPassword, userTypeID, userType, timestamp], (err, results) => {
        if (err) {
            console.error('Error inserting user: ' + err);
            res.status(500).send('Error inserting user');
            return;
        }
        console.log('User inserted successfully');
        res.status(200).send('User inserted successfully');
    });
});
// ---------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------- //
// ------------------------------- register page end ------------------------------------- //
// ---------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------- //
// -------------------------------------------------------------------------------- //
// -------------------------------------------------------------------------------- //
// -------------------------------------------------------------------------------- //
// --------------------------- login page start ------------------------------- //
// -------------------------------------------------------------------------------- //
// -------------------------------------------------------------------------------- //
// -------------------------------------------------------------------------------- //
// Endpoint to insert user registration data
app.post('/login', (req, res) => {
    console.log('Received data:', req.body);
    const { email, password, userTypeID } = req.body;
    const timestamp = new Date();
    const CHECK_USER_QUERY = `SELECT id, firstName, lastName, userType FROM login WHERE email = ? AND password = ? AND userTypeID = ?`;
    connection.query(CHECK_USER_QUERY, [email, password, userTypeID], (err, results) => {
        if (err) {
            console.error('Error checking user:', err);
            res.status(500).send('Error checking user');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('User not found');
        }
        else {
            const { id, firstName, lastName, userType } = results[0];
            console.log('User found:', firstName, lastName, userType);
            // Update user status to 1
            const UPDATE_USER_STATUS_QUERY = `UPDATE login SET status = 1 WHERE id = ?`;
            connection.query(UPDATE_USER_STATUS_QUERY, [id], (updateErr, updateResults) => {
                if (updateErr) {
                    console.error('Error updating user status:', updateErr);
                    res.status(500).send('Error updating user status');
                    return;
                }
                console.log('User status updated successfully');
                res.status(200).json({ id, firstName, lastName, userType });
            });
        }
    });
});
// ---------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------- //
// ------------------------------- login page end ------------------------------------- //
// ---------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------- //
// -------------------------------------------------------------------------------- //
// -------------------------------------------------------------------------------- //
// -------------------------------------------------------------------------------- //
// --------------------------- logout page start ------------------------------- //
// -------------------------------------------------------------------------------- //
// -------------------------------------------------------------------------------- //
// -------------------------------------------------------------------------------- //
// Endpoint to insert user registration data
app.post('/logout', (req, res) => {
    console.log('Received data:', req.body);
    const { userId } = req.body; // Assuming you receive the user ID in the request body
    const timestamp = new Date();
    // Update user status to 1
    const UPDATE_USER_STATUS_QUERY = `UPDATE login SET status = 0 WHERE id = ?`; // Assuming 'id' is the column name for the user ID
    connection.query(UPDATE_USER_STATUS_QUERY, [userId], (updateErr, updateResults) => {
        if (updateErr) {
            console.error('Error updating user status:', updateErr);
            res.status(500).send('Error updating user status');
            return;
        }
        console.log('User status updated successfully');
        res.status(200).send('User status updated successfully');
    });
});
// ---------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------- //
// ------------------------------- logout page end ------------------------------------- //
// ---------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------- //
// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
