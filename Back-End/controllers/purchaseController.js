import Purchase from "../model/purchase.js";

// Create a Purchase
export const createPurchase = async (req, res) => {
    try {
        const { user_id, product_id, paid, quantity, total_amount } = req.body;
        const purchase = new Purchase({ user_id, product_id, paid, quantity, total_amount });
        await purchase.save();
        res.status(201).json({ message: 'Purchase created successfully', status: 201, data: purchase });
    } catch (error) {
        res.status(500).json({ message: 'Error creating purchase', error });
    }
}

// Get all Purchases
export const getAllPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find();
        res.status(200).json({ message: 'Purchases retrieved successfully', data: purchases });
    } catch (error) {
        res.status(500).json({ message: 'Error getting purchases', error });
    }
}

// Get a purchase by user ID
export const getPurchaseByUserId = async (req, res) => {
    try {
        const { user_id } = req.params;
        const purchases = await Purchase.find({ user_id });
        res.status(200).json({ message: 'Purchases retrieved successfully', data: purchases });
    } catch (error) {
        res.status(500).json({ message: 'Error getting purchases', error });
    }
}

// Get a purchase by ID
export const getPurchaseById = async (req, res) => {
    try {
        const { id } = req.params;
        const purchase = await Purchase.findById(id);
        res.status(200).json({ message: 'Purchase retrieved successfully', data: purchase });
    } catch (error) {
        res.status(500).json({ message: 'Error getting purchase', error });
    }
}

// Get a purchase by product ID
export const getPurchaseByProductId = async (req, res) => {
    try {
        const { product_id } = req.params;
        const purchases = await Purchase.find({ product_id });
        res.status(200).json({ message: 'Purchases retrieved successfully', data: purchases });
    } catch (error) {
        res.status(500).json({ message: 'Error getting purchases', error });
    }
}

// Update a purchase by ID
export const updatePurchaseById = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, product_id, paid, quantity, total_amount } = req.body;
        const purchase = await Purchase.findByIdAndUpdate(id, { user_id, product_id, paid, quantity, total_amount }, { new: true });
        res.status(200).json({ message: 'Purchase updated successfully', data: purchase });
    } catch (error) {
        res.status(500).json({ message: 'Error updating purchase', error });
    }
}

// Update a purchase by user ID

export const updatePurchaseByUserId = async (req, res) => {
    try {
        const {user_id} = req.params;
        const {product_id, paid, quantity, total_amount} = req.body;
        const purchase = await Purchase.findOneAndUpdate({user_id}, {product_id, paid, quantity, total_amount}, {new: true});
        res.status(200).json({ message: 'Purchase updated successfully', data: purchase });
    } catch (error) {
        res.status(500).json({ message: 'Error updating purchase', error });
    }
}

// Delete a purchase by ID
export const deletePurchaseById = async (req, res) => {
    try {
        const { id } = req.params;
        const purchase = await Purchase.findByIdAndDelete(id);
        res.status(200).json({ message: 'Purchase deleted successfully', data: purchase });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting purchase', error });
    }
}