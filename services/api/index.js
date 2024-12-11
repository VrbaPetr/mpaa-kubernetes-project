const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 3000;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const { Client } = require('@elastic/elasticsearch');
const esClient = new Client({ node: 'http://elasticsearch:9200' });

app.get('/search', async (req, res) => {
    const query = req.query.q || '';
    try {
        const result = await esClient.search({
            index: 'example',
            query: {
                match: { name: query }
            }
        });
        res.json(result.hits.hits);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/', (req, res) => {
    res.send('API is running!');
});

app.get('/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM example');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});
