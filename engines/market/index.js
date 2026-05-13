
const express = require("express");
const router = express.Router();
let auctions = [
    { id: 1, name: "HEX-20260512-7116", morph: "Lilly White", currentPrice: 610000, bids: 5 },
    { id: 2, name: "HEX-BABY-001", morph: "Lilly White (Gen 2)", currentPrice: 500000, bids: 2 }
];

router.get("/auctions", (req, res) => {
    res.json(auctions);
});

router.post("/bid", (req, res) => {
    const { auctionId, bidAmount } = req.body;
    const auction = auctions.find(a => a.id === auctionId);
    if (!auction) return res.status(404).json({ error: "경매를 찾을 수 없습니다." });
    if (bidAmount <= auction.currentPrice) {
        return res.status(400).json({ error: "현재가보다 높은 금액을 입력해야 합니다." });
    }
    auction.currentPrice = bidAmount;
    auction.bids += 1;
    res.json({ success: true, updatedAuction: auction });
});
module.exports = router;

