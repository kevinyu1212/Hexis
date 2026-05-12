const mongoose = require('mongoose');

const specimenSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hexisTag: { type: String, required: true, unique: true },
    nickname: { type: String, required: true },
    species: { type: String, required: true },
    birthDate: { type: Date },
    gender: { type: String, enum: ['Male', 'Female', 'Unknown'], default: 'Unknown' },
    healthStatus: { type: String, default: 'Healthy' },
    growthLog: [{
        date: { type: Date, default: Date.now },
        length: Number,
        weight: Number,
        note: String
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Specimen', specimenSchema);
