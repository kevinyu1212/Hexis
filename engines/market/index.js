const express = require('express');
const router = express.Router();
const Auction = require('./Auction');
const { protect } = require('../guardian/auth');

// [POST] 경매 등록 (Bio-Axis 데이터 연동)
router.post('/create-auction', protect, async (req, res) => {
    try {
        const { specimenId, startPrice, durationHours } = req.body;
        
        const endTime = new Date();
        endTime.setHours(endTime.getHours() + durationHours);

        const newAuction = await Auction.create({
            specimenId,
            sellerId: req.user.id,
            startPrice,
            currentPrice: startPrice,
            endTime
        });

        res.status(201).json({ status: 'success', data: newAuction });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
});

module.exports = router;
