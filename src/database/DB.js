const mysql = require("mysql");
require("dotenv").config();


const dbConfig = ({
    host: process.env.dsn,
    user: process.env.admin,
    password: process.env.password,
    database: `craiglist2_project`
});

const connectionHandler = () => {
    connection = mysql.createConnection(dbConfig);

    connection.connect((err) => {
        if (err) {
            console.log(err.message);
            //set a timer for reconnecting
            setTimeout(connectionHandler, 2000);
        } else {
            console.log("connected");
        }
    });

    connection.on("error", (err) => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            connectionHandler();
        } else {
            throw err;
        }
    });
    return connection;
};

module.exports = connectionHandler;