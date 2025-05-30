const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a contact name']
    },
    email: {
        type: String,
        required: [true, 'Please add an contact email address'],
        unique: true
    },
    phone: {
        type: String,
        required: [true, 'Please add the contact phone number']
    }
}, {
    timestamps: true
}); 

module.exports = mongoose.model('Contact', contactSchema);