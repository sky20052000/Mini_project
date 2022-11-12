require("dotenv").config();

module.exports = {
    PORT: process.env.port,
    HOST: process.env.host_url,
    SECRET_KEY: process.env.jwt_key,
    Mongo_Url : process.env.mongo_url,
    GOOGLE_CLIENT_ID: process.env.clientId,
    GOOGLE_CLIENT_SECRET: process.env.clientSecretKey
}