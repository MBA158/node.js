const mongoose = require('mongoose');

const incomeScheme = new mongoose.Schema({
    title :{
        type: String,
        required: true,
        trim: true,
    },
    description :{
        type: String,
        trim: true,
    },
    amount :{
        type: Number,
        required: true,
    },
    tag :{
        type: String,
        required: true,
        enum: ['Salary','Bonus','Gift','Other'],
    },
    currency :{
        type: String,
        required: true,
        default: 'ILS',
        enum: ['ILS','USD','EUR']
    },
},
    { timestamps: true }
);
module.exports = mongoose.model('Income', incomeScheme);