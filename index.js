"use strict"
const Hapi = require('@hapi/hapi');
require('dotenv').config();
const routes = require('./routes/route');
const db = require('./config/db');
const HapiSwagger = require('hapi-swagger');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');

// Swagger Documentation
const swaggerOptions = {
    info: {
        title: 'Company Swagger with Crud Operation',
        version: "1.0.0",
    }
}

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT,
        host: 'localhost'
    });

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])

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