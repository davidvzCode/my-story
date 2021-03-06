require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'dev',
	isProd: process.env.NODE_ENV === 'production',
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	dbHost: process.env.DB_HOST,
	dbPort: process.env.DB_PORT,
	dbName: process.env.DB_NAME,
	dbUrl: process.env.DATABASE_URL,
	apikey: process.env.API_KEY,
	jwtSecret: process.env.JWT_SECRET,
	gmailUser: process.env.GMAIL_EMAIL,
	gmailPassword: process.env.GMAIL_PASSWORD,
}

module.exports = { config };