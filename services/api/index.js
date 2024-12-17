// Dependencies
const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 3000;

// DB Connection Pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const { Client } = require('@elastic/elasticsearch');
const esClient = new Client({ node: 'http://elasticsearch:9200' });



/**
 * ENDPOINT
 * Vyhledavani dat pomoci ElasticSearch
 */
app.get('/search', async (req, res) => {
    const query = req.query.q || '';
    try {
        const result = await esClient.search({
            index: 'airports',
            query: {
                match: { name: query }
            }
        });
        res.json(result.hits.hits);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

/**
 * ENDPOINT
 * Indexace dat z PostreSQL do Elasticsearch
 */
app.post('/elastic-index', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM airports'); // Získání dat z PostgreSQL
        const data = result.rows;

        // Indexování každého řádku do Elasticsearch
        for (const item of data) {
            try {
                await esClient.index({
                    index: 'airports', // Název indexu v Elasticsearch
                    document: item,    // Data, která se indexují
                });
            } catch (err) {
                console.error('Chyba při indexování dokumentu:', err);
            }
        }

        res.send('Data byla indexována do Elasticsearch.');
    } catch (err) {
        console.error('Chyba při získávání dat z PostgreSQL:', err);
        res.status(500).send('Chyba při indexování dat do Elasticsearch.');
    }
});

/**
 * ENDPOINT
 * Testovaci endpoint
 */
app.get('/', (req, res) => {
    res.send('API is running!');
});

/**
 * Zobrazeni kompletnich dat z PostgreSQL
 */
app.get('/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM airports');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

/**
 * ENDPOINT
 * Jmenny seznam letist v databazi
 */
app.get('/airports', async (req, res) => {
    try {
        const result = await pool.query('SELECT name FROM airports');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Server Init
app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});

