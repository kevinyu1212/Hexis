const express = require("express");
const router = express.Router();

// 서버 메모리에 입찰 데이터 저장 (실제 서비스에선 DB 사용)
let auctions = [
    { id: 1, name: "HEX-20260512-7116", currentPrice: 610000 },
    { id: 2, name: "HEX-BABY-001", currentPrice: 500000 }
];

router.get("/auctions", (req, res) => res.json(auctions));

// 입찰 처리 API
router.post("/bid/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const auction = auctions.find(a => a.id === id);
    if (auction) {
        auction.currentPrice += 10000; // 1만 원씩 상향
        res.json({ success: true, newPrice: auction.currentPrice });
    } else {
        res.status(404).send("Not Found");
    }
});

module.exports = router;
