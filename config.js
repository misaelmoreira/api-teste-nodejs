const path = require('path');
require('ts-node').register();  // Para compilar TypeScript em tempo real

module.exports = require('./src/db/config/database.ts');
