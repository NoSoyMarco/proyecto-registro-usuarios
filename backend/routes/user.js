const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    
    db.query(query, [username, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Usuario registrado con éxito' });
    });
});

module.exports = router;