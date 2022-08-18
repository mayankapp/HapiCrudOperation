"use strict"
const Hapi = require('@hapi/hapi');
require('dotenv').config();
const routes = require('./routes/route');
const db = require('./config/db');

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT,
        host: 'localhost'
    });

    server.route(routes);
    await db.dbConnect();
    await server.start();
    console.log(`Server is Running at port ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();