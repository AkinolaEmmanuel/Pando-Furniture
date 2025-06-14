import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
        user_id: {
            type: String,
            required: true,
        },
        product_id: {
            type: String,
            required: true,
        },
        paid: {
            type: Boolean,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        total_amount: {
            type: Number,
            required: true,
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
        updated_at: {
            type: Date,
            default: Date.now,
        },
})

export default mongoose.model('Purchase', purchaseSchema);