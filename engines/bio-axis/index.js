
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Specimen = require("../guardian/Specimen");
const { protect } = require("../guardian/auth");

// 이미지 저장 설정
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, "HEX-" + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// 1. 개체 등록 (가계도 정보 FatherId, MotherId 포함)
router.post("/register", protect, async (req, res) => {
    try {
        const { hexisTag, species, morph, FatherId, MotherId } = req.body;
        const newSpecimen = await Specimen.create({
            hexisTag,
            species,
            morph,
            FatherId,
            MotherId,
            OwnerId: req.user.id
        });
        res.status(201).json({ status: "success", data: newSpecimen });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
});

// 2. 개체 사진 업로드
router.post("/upload/:id", protect, upload.single("image"), async (req, res) => {
    try {
        const specimen = await Specimen.findByPk(req.params.id);
        if (!specimen || specimen.OwnerId !== req.user.id) {
            return res.status(403).json({ message: "권한이 없습니다." });
        }
        const imageUrl = "/uploads/" + req.file.filename;
        res.status(200).json({ status: "success", url: imageUrl });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
});

module.exports = router;

