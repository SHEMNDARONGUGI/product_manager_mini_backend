// Authentication middleware to check for API key in headers
const authMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(401).json({ message: 'API key is required' });
    }

    // Check against valid API key (you can store this in environment variables or database)
    const validApiKey = process.env.API_KEY || 'default-api-key';

    if (apiKey !== validApiKey) {
        return res.status(403).json({ message: 'Invalid API key' });
    }

    // API key is valid, proceed to next middleware
    next();
};

module.exports = authMiddleware;