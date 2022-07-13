const { config } = require('../config/config');

/* 
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
//POSTGRES
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
//MYSQL
//const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
 */

module.exports = {
    development: {
        //url: URI,
        url: config.dbUrl,
        //POSTGRES
        dialect: 'postgres',
        //Mysql
        //dialect: 'mysql',
    },
    production: {
        //url: URI,
        url: config.dbUrl,
       //POSTGRES
        dialect: 'postgres',
       //Mysql
       //dialect: 'mysql',
        ssl: {
            rejectUnauthorized: false
        }
    }
}