const { Sequelize } = require('sequelize');
const { config } = require('../config/config');

const  setupModels  = require('../db/models');

//const USER = encodeURIComponent(config.dbUser);
//const PASSWORD = encodeURIComponent(config.dbPassword);

//POSTGRES
//const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
//MYSQL
//const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const options = {
    dialect: 'postgres',
    logging: config.isProd ? console.log : true,
}

if(config.isProd){
    options.dialectOptions = {
        ssl : {
            rejectUnauthorized: false
        }
    }
}
const sequelize = new Sequelize(config.dbUrl, options);

/* 
const sequelize = new Sequelize(config.dbUrl, {
    //POSTGRES
    dialect: 'postgres',
    //Mysql
    //dialect: 'mysql',
    logging: console.log,
    ssl: {
        rejectUnauthorized: false
    }
}); */

setupModels(sequelize);

//sequelize.sync();

module.exports = sequelize;
