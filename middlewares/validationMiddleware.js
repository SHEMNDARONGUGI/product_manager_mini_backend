// Validation middleware for product creation and updates
const validateProduct = (req, res, next) => {
    const { name, description, price, category, inStock } = req.body;

    // Check if name is provided and is a string
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ message: 'Name is required and must be a non-empty string' });
    }

    // Check if price is provided and is a valid number
    if (price === undefined || typeof price !== 'number' || price < 0) {
        return res.status(400).json({ message: 'Price is required and must be a non-negative number' });
    }

    // Validate optional fields if provided
    if (description && typeof description !== 'string') {
        return res.status(400).json({ message: 'Description must be a string' });
    }

    if (category && typeof category !== 'string') {
        return res.status(400).json({ message: 'Category must be a string' });
    }

    if (inStock !== undefined && typeof inStock !== 'boolean') {
        return res.status(400).json({ message: 'inStock must be a boolean' });
    }

    // Validation passed, proceed to next middleware
    next();
};

module.exports = validateProduct;
