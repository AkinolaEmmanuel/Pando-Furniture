import Product from "../model/product.js";

// Create a Product
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category, discount, quantity } = req.body;
        const product = new Product({ name, description, price, image, category, discount, quantity });
        await product.save();
        res.status(201).json({ message: 'Product created successfully', status: 201, data: product });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
}

// Create multiple products 

export const createMultipleProducts = async (req, res) => {
    try {
        const productsData = req.body; 
        const products = await Product.insertMany(productsData);
        res.status(201).json({ message: 'Products created successfully', status: 201, data: products });
    } catch (error) {
        res.status(500).json({ message: 'Error creating products', error });
    }
}

// Get all Products

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }
        res.status(200).json({ message: 'Products retrieved successfully', data: products });
    } catch (error) {
        res.status(500).json({ message: 'Error getting products', error });
    }
}


// Search for a Product

export const searchProduct = async (req, res) => {
    try {
        const q = (req.query.q || '').trim();
        if (!q) {
            return res.status(200).json({ message: 'Products retrieved successfully', data: [] });
        }

        // Use case-insensitive partial match on name or description
        const regex = new RegExp(q, 'i');
        const products = await Product.find({ $or: [{ name: regex }, { description: regex }] }).limit(50);
        res.status(200).json({ message: 'Products retrieved successfully', data: products });
    } catch (error) {
        res.status(500).json({ message: 'Error getting products', error });
    }
}

// Get a Product by ID

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json({ message: 'Product retrieved successfully', data: product });
    } catch (error) {
        res.status(500).json({ message: 'Error getting product', error });
    }
}

// Get a Product by Category

export const getProductByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ category });
        res.status(200).json({ message: 'Products retrieved successfully', data: products });
    } catch (error) {
        res.status(500).json({ message: 'Error getting products', error });
    }
}

// Get a Product by Discount

export const getProductByDiscount = async (req, res) => {
    try {
        const { discount } = req.params;
        const products = await Product.find({ discount });
        res.status(200).json({ message: 'Products retrieved successfully', data: products });
    } catch (error) {
        res.status(500).json({ message: 'Error getting products', error });
    }
}

// Update a Product by ID

export const updateProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, image, category, discount, quantity } = req.body;
        const product = await Product.findByIdAndUpdate(id, { name, description, price, image, category, discount, quantity }, { new: true });
        res.status(200).json({ message: 'Product updated successfully', data: product });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
}

// Delete a Product by ID
export const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        res.status(200).json({ message: 'Product deleted successfully', data: product });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
}
