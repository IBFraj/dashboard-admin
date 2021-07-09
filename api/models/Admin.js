
const mongoose = require('./db');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required:true
        
    },
    deleted: { type: Boolean, default: false },
}, {
    timestamps: {
        createdAt: 'created_at',
        updateAt: 'updated_at',
        deletedAt: 'deleted_at',
        blockedAt: 'blocked_at',

    },
});
module.exports = mongoose.model('Admin', adminSchema);
