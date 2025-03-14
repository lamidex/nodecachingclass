const NodeCache = require('node-cache');

// Initialize cache with 5 minutes TTL (Time To Live)
const cache = new NodeCache({ stdTTL: 300 });

module.exports = cache;