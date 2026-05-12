
const express = require("express");
const router = express.Router();
const Auction = require("../guardian/Auction");
const Specimen = require("../guardian/Specimen");
const { protect } = require("../guardian/auth");

// 1. 모든 경매 목록 조회 (새로 추가)
router.get("/auctions", async (req, res) => {
    try {
        const auctions = await Auction.findAll({
            include: [{ model: Specimen, attributes: ["hexisTag", "morph"] }]
        });
        res.status(200).json({ status: "success", data: auctions });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
});

// 2. 보증서가 포함된 경매 등록
router.post("/auction", protect, async (req, res) => {
    try {
        const { specimenId, startPrice, endTime } = req.body;
        const specimen = await Specimen.findByPk(specimenId);
        
        if (!specimen || specimen.OwnerId !== req.user.id) {
            return res.status(403).json({ message: "내 개체만 경매에 올릴 수 있습니다." });
        }

        const certUrl = "/uploads/cert-" + specimenId + ".png";

        const newAuction = await Auction.create({
            startPrice,
            currentPrice: startPrice,
            endTime,
            SpecimenId: specimenId,
            status: "active",
            note: certUrl 
        });

        res.status(201).json({ status: "success", data: newAuction, certificate: certUrl });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
});

module.exports = router;

