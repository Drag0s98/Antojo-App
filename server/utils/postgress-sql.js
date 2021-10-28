const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.SQL_URI,
    ssl: {
        rejectUnauthorized: false
    }
});
pool.connect();
pool.on("connect", () => {

    console.log("Connection to SQL established");
});

module.exports = pool;