// Vercel serverless function
const { createServer } = require('http');
const express = require('express');
require('../server/index.js');

const app = express();
const server = createServer(app);

module.exports = server;
