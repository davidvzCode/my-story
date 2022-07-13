const { Client } = require('pg');

async function getConnection(){
   const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'sa',
        password: '123',
        database: 'my_story'
    });
    await client.connect();
    return client;
}

module.exports = getConnection;

