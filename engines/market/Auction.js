const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    specimenId: { type: mongoose.Schema.Types.ObjectId, ref: 'Specimen', required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    // 경매 설정
    startPrice: { type: Number, required: true },
    currentPrice: { type: Number, required: true },
    bidIncrement: { type: Number, default: 1000 }, // 입찰 단위
    buyNowPrice: { type: Number }, // 즉시 구매가
    
    // 시간 설정
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date, required: true },
    
    // 입찰 히스토리
    bids: [{
        bidderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        amount: Number,
        timestamp: { type: Date, default: Date.now }
    }],
    
    status: { type: String, enum: ['Pending', 'Active', 'Completed', 'Canceled'], default: 'Active' },
    winnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Auction', auctionSchema);
