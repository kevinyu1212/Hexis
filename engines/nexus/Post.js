const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, enum: ['Journal', 'Info', 'Q&A', 'Showcase'], default: 'Journal' },
    
    // Bio-Axis 데이터 연동: 포스트에 내 개체 정보를 첨부
    linkedSpecimenId: { type: mongoose.Schema.Types.ObjectId, ref: 'Specimen' },
    
    tags: [String],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    viewCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
